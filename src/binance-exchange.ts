import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import moment from 'moment';

import { logTime, timestamp } from '@metacodi/node-utils';
import { AbstractExchange, AbstractAccount, ExchangeType, AccountEvent, AccountReadyStatus } from '@metacodi/abstract-exchange';
import { Balance, MarketType, MarketSymbol, Limit, SymbolType, MarketPrice, OrderBookPrice, KlineIntervalType, MarketKline } from '@metacodi/abstract-exchange';
import { Order, OrderType, OrderSide, OrderEvent, OrderStatus, ResultOrderStatus, OrderTask, CoinType, acceptedCoins } from '@metacodi/abstract-exchange';

import { BinanceApiSpot } from './binance-api-spot';
import { BinanceApiFutures } from './binance-api-futures';
import { BinanceWebsocket } from './binance-websocket';
import { BinanceKlineInterval, BinanceMarketType, BinanceOrderSide, BinanceOrderStatus, BinanceOrderType, BinanceRateLimiter } from './types/binance.types';
import { BinanceSpotAccountBalance, BinanceSpotOrder, BinanceSpotPostOrderRequest, BinanceSpotSymbolExchangeInfo, BinanceSpotSymbolOrderBookTicker, BinanceSpotSymbolPriceTicker } from './types/binance-spot.types';
import { BinanceFuturesAccountBalance, BinanceFuturesOrder, BinanceFuturesOrderType, BinanceFuturesPostOrderRequest, BinanceFuturesSymbolExchangeInfo, BinanceFuturesSymbolOrderBookTicker, BinanceFuturesSymbolPriceTicker, BinanceFuturesSymbolPriceTickerRequest } from './types/binance-futures.types';
import { BinanceWs24hrMiniTicker, BinanceWsFuturesAccountUpdate, BinanceWsFuturesOrderUpdate, BinanceWsKline, BinanceWsSpotAccountUpdate, BinanceWsSpotOrderUpdate } from './types/binance-websocket.types';


interface BinanceLimit { rateLimitType: string; interval: moment.unitOfTime.DurationAs; intervalNum: number; limit: number };

export class BinanceExchange extends AbstractExchange {

  exchange: ExchangeType = 'binance';
  /** Referència a la instància de l'API. */
  api: BinanceApiSpot | BinanceApiFutures;
  /** Referència al websockets pel market stream. */
  marketWs: BinanceWebsocket;
  /** Referencies als websockets de cada compte. */
  accountsWs: { [accounId: string]: BinanceWebsocket } = {};
  /** Colecciona els timers per controlar les ordres parcialment satisfetes. */
  partials: { [orderId: string]: any } = {};

  constructor(
    public market: MarketType,
  ) {
    super(market);
  }


  // ---------------------------------------------------------------------------------------------------
  //  Api
  // ---------------------------------------------------------------------------------------------------

  getApiClient(account?: AbstractAccount): BinanceApiSpot | BinanceApiFutures {
    const market: BinanceMarketType = this.binanceMarket(this.market)
    if (!this.api) { this.api = this.market === 'spot' ? new BinanceApiSpot() : new BinanceApiFutures(); }
    if (!!account) { this.api.setCredentials(account.exchanges[this.exchange]); }
    return this.api;
  }

  
  // ---------------------------------------------------------------------------------------------------
  //  Exchange info
  // ---------------------------------------------------------------------------------------------------

  async retrieveExchangeInfo() {
    console.log(this.constructor.name + '.retrieveExchangeInfo()');
    const api = this.getApiClient();
    api.getExchangeInfo().then(response => {
      if (response?.symbols) { this.processExchangeSymbols(response.symbols); }
      if (response?.rateLimits) { this.processExchangeLimits(response.rateLimits); }
    }).catch(error => {
      console.error('getExchangeInfo error: ', error);
    });
  }

  protected processExchangeSymbols(exchangeSymbols: BinanceSpotSymbolExchangeInfo[] | BinanceFuturesSymbolExchangeInfo[]): void {
    const firstTime = !this.symbols.length;
    for (const marketSymbol of exchangeSymbols) {
      const symbol = this.parseBinanceSymbol(marketSymbol.symbol);
      if (symbol) {
        const found = this.symbols.find(s => s.symbol === symbol);
        const ready = marketSymbol.status === 'TRADING';
        if (found) {
          const changed = found.ready !== ready;
          found.ready = ready;
          if (changed) { this.marketSymbolStatusChanged.next(found); }
        } else {
          const symbolExchange = this.parseBinanceSymbolExchangeInfo(marketSymbol);
          this.symbols.push(symbolExchange);
          this.marketSymbolStatusChanged.next(symbolExchange);
        }
      }
    }
    if (firstTime) { this.symbolsInitialized.next(this.symbols.map(s => s.symbol)); }
  }

  protected processExchangeLimits(rateLimits: BinanceRateLimiter[]): void {
    // Cerquem els límits amb la proporció més baixa.
    const findLimit = (rateLimitType: string, limits: BinanceRateLimiter[]): Limit => {
      return limits.map(l => this.parseBinanceRateLimit(l))
        .filter(l => l.type === rateLimitType && moment.duration(1, l.unitOfTime).asSeconds() <= 60)
        .reduce((prev: Limit, cur: Limit) => (!prev || (cur.maxQuantity / cur.period < prev.maxQuantity / prev.period)) ? cur : prev)
    };
    const requests = findLimit('REQUEST_WEIGHT', rateLimits);
    const orders = findLimit('ORDERS', rateLimits);
    // Comprovem si han canviat.
    const limitChanged = (limitA: Limit, limitB: Limit): boolean => !limitA || !limitB || limitA.maxQuantity !== limitB.maxQuantity || limitA.period !== limitB.period;
    if (requests && limitChanged(this.limitRequest, requests)) {
      this.limitRequest = requests;
      // Actualitzem el nou límit de requests que gestiona aquest executor.
      this.updateLimit(requests);
    }
    if (orders && limitChanged(this.limitOrders, orders)) {
      this.limitOrders = orders;
      // Notifiquem el nou límit d'ordres que correspon actualitzar a cada controlador.
      this.ordersLimitsChanged.next(orders);
    }
  }

  protected parseBinanceRateLimit(data: BinanceRateLimiter): Limit {
    const { rateLimitType, intervalNum, limit } = data;
    const unitOfTime = data.interval.toLowerCase() as moment.unitOfTime.DurationAs;
    const seconds = moment.duration(intervalNum, unitOfTime).asSeconds();
    const maxQuantity = Math.floor(data.limit / seconds);
    return { type: rateLimitType, maxQuantity, period: 1, unitOfTime };
  }


  // ---------------------------------------------------------------------------------------------------
  //  market
  // ---------------------------------------------------------------------------------------------------

  protected getMarketWebsocket(symbol?: SymbolType) {
    if (this.marketWs) { return this.marketWs; }
    this.marketWs = new BinanceWebsocket({
      streamType: 'market',
      streamFormat: 'stream',
      market: this.binanceMarket(this.market, symbol),
    });
    return this.marketWs;
  }

  protected createMarketPriceSubject(symbol: SymbolType): Subject<MarketPrice> {
    const ws = this.getMarketWebsocket(symbol);
    const subject = new Subject<MarketPrice>();
    this.marketPriceSubjects[symbol] = subject;
    ws.miniTicker(this.binanceSymbol(symbol)).subscribe(data => subject.next(this.parseBinanceMiniTicker(data)));
    return subject;
  }

  async getMarketPrice(symbol: SymbolType): Promise<MarketPrice> {
    this.countPeriod++;
    const api = this.getApiClient();
    return api.getSymbolPriceTicker({ symbol: this.binanceSymbol(symbol) }).then(data => this.parseBinancePriceTicker(data));
  }

  async getOrderBookTicker(symbol: SymbolType): Promise<OrderBookPrice> {
    this.countPeriod++;
    const api = this.getApiClient();
    return api.getSymbolOrderBookTicker({ symbol: this.binanceSymbol(symbol) }).then(data => this.parseBinanceOrderBookTicker(data));
  }

  protected createMarketKlineSubject(symbol: SymbolType, interval: KlineIntervalType): Subject<MarketKline> {
    const ws = this.getMarketWebsocket(symbol);
    const subject = new Subject<MarketKline>();
    this.marketKlineSubjects[`${symbol}_${interval}`] = subject;
    ws.kline(this.binanceSymbol(symbol), this.binanceInterval(interval)).subscribe(data => subject.next(this.parseBinanceKline(data)));
    return subject;
  }


  // ---------------------------------------------------------------------------------------------------
  //  account
  // ---------------------------------------------------------------------------------------------------

  protected getAccountWebsocket(account: AbstractAccount, symbol?: SymbolType): BinanceWebsocket {
    const accountId = `${account.idreg}`;
    const stored = this.accountsWs[accountId];
    if (stored) { return stored; }
    const { apiKey, apiSecret } = account.exchanges[this.exchange];
    const created = new BinanceWebsocket({
      streamType: 'user',
      streamFormat: 'stream',
      market: this.binanceMarket(this.market, symbol),
      apiKey, apiSecret,
    });
    this.accountsWs[accountId] = created;
    return created;
  }

  protected createAccountEventsSubject(account: AbstractAccount, symbol?: SymbolType): Subject<AccountEvent> {
    const ws = this.getAccountWebsocket(account, symbol);
    const subject = new Subject<AccountEvent>();
    const accountId = `${account.idreg}`;
    this.accountEventsSubjects[accountId] = subject;
    // Recuperem la info del compte per veure si està disponible.
    this.retrieveAcountInfo(account).then(ready => subject.next({ type: 'accountReady', ready } as AccountReadyStatus));
    // Ens suscribim a les notificacions de balaços.
    ws.accountUpdate().subscribe(balance => this.onAccountUpdate(account, balance));
    // Ens suscribim a les notificacions d'ordres.
    ws.orderUpdate().subscribe(order => this.onOrderUpdate(account, order));
    return subject;
  }

  async retrieveAcountInfo(account: AbstractAccount): Promise<boolean> {
    console.log(this.constructor.name + '.retrieveAcountInfo()');
    const api = this.getApiClient(account);
    const perms = await api.getApiKeyPermissions(); // .catch(error => console.error(error));
    const info = await api.getAccountInformation(); // .catch(error => console.error(error));
    const canTrade = !!info?.canTrade && !!perms?.ipRestrict && (this.market === 'spot' ? !!perms?.enableSpotAndMarginTrading : !!perms?.enableFutures);
    if (!canTrade) { throw ({ message: `No es pot fer trading amb el compte '${account.idreg}' al mercat '${this.market}'.` }); }
    const coins = await api.getBalances();
    this.processInitialBalances(account, coins);
    const balances = account.markets[this.market].balances;
    const balanceReady = !!Object.keys(balances).length;
    if (!balanceReady) { throw new Error(`Error recuperant els balanços del compte '${account.idreg}' al mercat '${this.market}'.`); }
    return Promise.resolve(balanceReady && canTrade);
  }

  protected processInitialBalances(account: AbstractAccount, coins: BinanceSpotAccountBalance[] | BinanceFuturesAccountBalance[]): void {
    const getBalanceCoin = (c: any) => this.market === 'spot' ? (c as BinanceSpotAccountBalance).coin : (c as BinanceFuturesAccountBalance).asset;
    const parseBalance = (b: any) => this.market === 'spot' ? this.parseBinanceBalanceSpot(b) : this.parseBinanceBalanceFutures(b);
    coins.forEach(coinBalance => {
      // Comprovem que és una moneda acceptada.
      const coin = acceptedCoins.find(c => c === getBalanceCoin(coinBalance));
      if (coin) {
        const balance = parseBalance(coinBalance);
        const balances = account.markets[this.market].balances;
        // NOTA: Podria haver-se establert un preu més recent des del websocket (el respectem).
        if (!balances[coin]) { balances[coin] = balance; };
      }
    });
  }

  protected onAccountUpdate(account: AbstractAccount, balance: BinanceWsSpotAccountUpdate | BinanceWsFuturesAccountUpdate) {
    const { market } = this;
    const accountId = `${account.idreg}`;
    const accountMarket = account.markets[this.market];
    const balances: Balance[] = [];
    if (market === 'spot') {
      const spot = balance as BinanceWsSpotAccountUpdate;
      // Actualitzem els balanços de cada asset.
      spot.balances?.map(balance => {
        accountMarket.balances[balance.asset].balance = balance.free + balance.locked;
        accountMarket.balances[balance.asset].available = balance.free;
        accountMarket.balances[balance.asset].locked = balance.locked;
        balances.push(accountMarket.balances[balance.asset]);
      });

    } else if (market === 'futures') {
      const futures = balance as BinanceWsFuturesAccountUpdate;
      // Actualitzem el preu promig de cada posició/symbol.
      futures.updateData?.updatedPositions?.map(position => {
        accountMarket.averagePrices[position.symbol] = position.entryPrice;
      });
      // Actualitzem els balanços de cada asset.
      futures.updateData?.updatedBalances?.map(balance => {
        accountMarket.balances[balance.asset].balance = balance.walletBalance;
        balances.push(accountMarket.balances[balance.asset]);
      });
    }
    // Notifiquem els balanços actualitzats.
    this.accountEventsSubjects[accountId].next({ type: 'accountUpdate', market, balances });
  }


  // ---------------------------------------------------------------------------------------------------
  //  orders
  // ---------------------------------------------------------------------------------------------------

  protected async getOrderTask(task: OrderTask) {
    const { account } = task.data as { account: AbstractAccount; };
    const api = this.getApiClient();
    const { symbol, id } = Object.assign({}, task.data.order);    
    
    api.getOrder({ symbol: this.binanceSymbol(symbol), origClientOrderId: id }).then(result => {
      const order = this.parseBinanceOrder(result);
      super.processGetOrderTask(account, order);
    });
  }

  protected postOrderTask(task: OrderTask) {
    const { account } = task.data;
    const { market } = this;
    const api = this.getApiClient();

    const copy: Order = Object.assign({}, task.data.order);
    account.markets[this.market].orders.push(copy);

    const order: BinanceSpotPostOrderRequest | BinanceFuturesPostOrderRequest = {
      side: this.binanceSide(copy.side),
      symbol: this.binanceSymbol(copy.symbol),
      type: market === 'spot' ? this.binanceSpotOrderType(copy.type) : this.binanceFuturesOrderType(copy.type) as any,
      timeInForce: 'GTC',
      price: copy.price,
      quantity: copy.baseQuantity,
      newClientOrderId: copy.id,
    };
    // if (copy.type === 'stop' || copy.type === 'stop_market') { order.stopPrice = copy.stopMarket; }
    if (market === 'futures' && copy.type === 'stop_market') { (order as BinanceFuturesPostOrderRequest).closePosition = 'true'; }

    return api.postOrder(order as any);
  }

  protected cancelOrderTask(task: OrderTask) {
    const { account, order } = task.data as { account: AbstractAccount; order: Order; };
    const api = this.getApiClient();

    const found: Order = account.markets[this.market].orders.find(o => o.id === order.id);
    if (found) { found.status = 'cancel'; }

    return api.cancelOrder({
      symbol: this.binanceSymbol(order.symbol),
      // orderId: order.exchangeId,
      origClientOrderId: order.id,
    });
  }

  protected onOrderUpdate(account: AbstractAccount, orderUpdate: BinanceWsSpotOrderUpdate | BinanceWsFuturesOrderUpdate) {
    const { exchange, market } = this;
    const order: BinanceWsSpotOrderUpdate | BinanceWsFuturesOrderUpdate['order'] = (orderUpdate as any).order || orderUpdate;
    switch (order.orderStatus) {
      case 'NEW': case 'FILLED': case 'PARTIALLY_FILLED': case 'CANCELED': case 'EXPIRED': case 'REJECTED':
        const event: OrderEvent = this.parseBinanceOrderUpdate(orderUpdate);
        super.processOrderUpdate(account, event);
        break;
      case 'CANCELLING': case 'PENDING_CANCEL': // case 'TRADE':
        break;
      default:
        const orderId = (order as any).originalClientOrderId || (order as any).clientOrderId;
        throw ({ message: `No s'ha implementat l'estat '${order.orderStatus}' d'ordre ${orderId} de Binance` });
    }
  }


  // ---------------------------------------------------------------------------------------------------
  //  type parsers
  // ---------------------------------------------------------------------------------------------------

  private acceptedBinanceSymbols: { [bianceSymbol: string]: SymbolType } = {
    BNBUSDT: 'BNB_USDT',
    BTCUSDT: 'BTC_USDT',
    ETCUSDT: 'ETC_USDT',
  };
  
  private parseBinanceSymbol(symbol: string): SymbolType {
    if (!this.acceptedBinanceSymbols.hasOwnProperty(symbol)) { throw ({ message: `No s'ha descrit el símbol '${symbol}' pel parser de Binance.` }); }
    return this.acceptedBinanceSymbols[symbol];
  }

  private binanceSymbol(symbol: SymbolType): string {
    const found = Object.keys(this.acceptedBinanceSymbols).find(key => this.acceptedBinanceSymbols[key] === symbol);
    if (found) { return found; }
    throw ({ message: `No s'ha trobat el símbol '${symbol}' equivalent de Binance.` });
  }
  
  private parseBinanceInterval(interval: BinanceKlineInterval): KlineIntervalType {
    // Els valors coincideixen.
    return interval as KlineIntervalType;
  }

  private binanceInterval(interval: KlineIntervalType): BinanceKlineInterval {
    // Els valors coincideixen.
    return interval as BinanceKlineInterval;
  }
  
  private parseBinanceMarket(market: BinanceMarketType): MarketType {
    switch (market) {
      case 'spot': return 'spot';
      case 'usdm': return 'futures';
      case 'coinm': return 'futures';
      default: throw ({ message: `No s'ha implementat el parser de Binance del mercat '${market}'` });
    }
  }

  private binanceMarket(market: MarketType, baseAsset?: CoinType | SymbolType): BinanceMarketType {
    switch (market) {
      case 'spot': return 'spot';
      case 'futures': return !baseAsset?.includes('USDT') ? 'coinm' : 'usdm';
      default: throw ({ message: `No s'ha implementat el parser per Binance del mercat '${market}'` });
    }
  }

  private parseBinanceSide(side: BinanceOrderSide): OrderSide {
    switch (side) {
      case 'BUY': return 'buy';
      case 'SELL': return 'sell';
      default: throw ({ message: `No s'ha implementat el parser per Binance del side '${this.market}'` });
    }
  }

  private binanceSide(side: OrderSide): BinanceOrderSide {
    switch (side) {
      case 'buy': return 'BUY';
      case 'sell': return 'SELL';
      default: throw ({ message: `No s'ha implementat el parser per Binance del side '${side}'` });
    }
  }
  
  private binanceSpotOrderType(type: OrderType): BinanceOrderType {
    switch (type) {
      case 'limit': return 'LIMIT';
      case 'market': return 'MARKET';
      case 'stop': return 'STOP_LOSS_LIMIT';
      case 'stop_market': return 'STOP_LOSS_LIMIT';
      default: throw ({ message: `No s'ha implementat el get per Binance del type Spot '${type}'` });
    }
  }

  private binanceFuturesOrderType(type: OrderType): BinanceFuturesOrderType {
    switch (type) {
      case 'limit': return 'LIMIT';
      case 'market': return 'MARKET';
      case 'stop': return 'STOP';
      case 'stop_market': return 'STOP_MARKET';
      default: throw ({ message: `No s'ha implementat el get per Binance del type Futures '${type}'` });
    }
  }

  private parseBinanceType(type: BinanceOrderType | BinanceFuturesOrderType): OrderType {
    if (this.market === 'spot') {
      switch (type) {
        case 'LIMIT':
        case 'LIMIT_MAKER':
          return 'limit';
        case 'MARKET': return 'market';
        case 'STOP_LOSS': return 'stop';
        default: throw ({ message: `No s'ha implementat el parser per Binance del type Spot '${this.market}'` });
      }
    } else if (this.market === 'futures') {
      switch (type) {
        case 'LIMIT': return 'limit';
        case 'MARKET': return 'market';
        case 'STOP': return 'stop';
        case 'STOP_MARKET': return 'stop_market';
        default: throw ({ message: `No s'ha implementat el parser per Binance del type Futures '${this.market}'` });
      }
    }
  }

  private parseBinanceStatus(status: BinanceOrderStatus): ResultOrderStatus {
    switch (status) {
      case 'NEW': return 'new';
      case 'FILLED': return 'filled';
      case 'PARTIALLY_FILLED': return 'partial';
      case 'CANCELED': return 'canceled';
      case 'EXPIRED': return 'expired';
      case 'REJECTED': return 'rejected';
      // case 'TRADE': return 'filled';
      default: throw ({ message: `No s'ha implementat el parser per Binance del type Spot '${this.market}'` });
    }
  }

  // ---------------------------------------------------------------------------------------------------
  //  interface parsers
  // ---------------------------------------------------------------------------------------------------

  private parseBinanceSymbolExchangeInfo(marketSymbol: BinanceSpotSymbolExchangeInfo | BinanceFuturesSymbolExchangeInfo): MarketSymbol {
    if ((marketSymbol as any).permissions) {
      // SPOT
      const spot = marketSymbol as BinanceSpotSymbolExchangeInfo;
      const result = {
        symbol: this.parseBinanceSymbol(spot.symbol),
        ready: true,
        quotePrecision: spot.quoteAssetPrecision,
        basePrecision: spot.baseAssetPrecision,
        quantityPrecision: spot.baseAssetPrecision,
        pricePrecision: 5,
      };
      return result;
    } else {
      // FUTURES
      const futures = marketSymbol as BinanceFuturesSymbolExchangeInfo;
      const result = {
        symbol: this.parseBinanceSymbol(futures.symbol),
        ready: true,
        quotePrecision: futures.quotePrecision,
        basePrecision: futures.baseAssetPrecision,
        quantityPrecision: futures.quantityPrecision,
        pricePrecision: futures.pricePrecision,
      };
      return result;
    }
  }

  private parseBinanceMiniTicker(data: BinanceWs24hrMiniTicker): MarketPrice {
    return {
      symbol: this.parseBinanceSymbol(data.symbol),
      price: data.close,
      timestamp: timestamp(data.eventTime),
      baseVolume: data.baseAssetVolume,  // BNB
      quoteVolume: data.quoteAssetVolume, // USDT
    };
  }
  
  private parseBinancePriceTicker(data: (BinanceSpotSymbolPriceTicker | BinanceFuturesSymbolPriceTicker | (BinanceSpotSymbolPriceTicker | BinanceFuturesSymbolPriceTicker)[])): MarketPrice {
    if (Array.isArray(data)) { if (data.length) { data = data[0]; } else { return undefined; } }
    return {
      symbol: this.parseBinanceSymbol(data.symbol),
      price: +data.price,
      timestamp: timestamp((data as any).time),
    };
  }

  private parseBinanceOrderBookTicker(data: (BinanceSpotSymbolOrderBookTicker | BinanceFuturesSymbolOrderBookTicker) | (BinanceSpotSymbolOrderBookTicker | BinanceFuturesSymbolOrderBookTicker)[]): OrderBookPrice {
    if (Array.isArray(data)) { if (data.length) { data = data[0]; } else { return undefined; } }
    if (data.hasOwnProperty('time')) 
    return {
      symbol: this.parseBinanceSymbol(data.symbol),
      bidPrice: +data.bidPrice,
      bidQty: +data.bidQty,
      askPrice: +data.askPrice,
      askQty: +data.askQty,
      timestamp: timestamp(),
    };
  }

  private parseBinanceKline(data: BinanceWsKline): MarketKline {
    return {
      symbol: this.parseBinanceSymbol(data.symbol),
      interval: this.parseBinanceInterval(data.interval),
      open: data.open,
      close: data.close,
      high: data.high,
      low: data.low,
      openTime: timestamp(data.startTime),
      closeTime: timestamp(data.closeTime),
      quoteVolume: data.quoteVolume, // USDT
      // baseVolume: data.baseVolume, // BNB
    };
  }
  
  private parseBinanceBalanceSpot(coinBalance: BinanceSpotAccountBalance): Balance {
    const available = +coinBalance?.free;
    const locked = +coinBalance?.locked;
    const balance = available + locked;
    return { asset: (coinBalance.coin as CoinType), available, locked, balance };
  }

  private parseBinanceBalanceFutures(coinBalance: BinanceFuturesAccountBalance): Balance {
    const available = +coinBalance?.availableBalance;
    const balance = +coinBalance?.balance;
    const locked = balance - available;
    return { asset: (coinBalance.asset as CoinType), available, locked, balance };
  }

  private parseBinanceOrder(order: BinanceSpotOrder | BinanceFuturesOrder): Order {
    if ((order as any).orderListId) {
      // SPOT
      const spot = order as BinanceSpotOrder;
      const status: OrderStatus = this.parseBinanceStatus(spot.status);
      return {
        id: spot.clientOrderId,
        exchangeId: spot.orderId,
        side: this.parseBinanceSide(spot.side),
        type: this.parseBinanceType(spot.type),
        status: status,
        symbol: this.parseBinanceSymbol(spot.symbol),
        baseQuantity: this.isExecutedStatus(status) ? +spot.executedQty : +spot.origQty,
        quoteQuantity: +spot.cummulativeQuoteQty,
        price: +spot.price,
        stopPrice: +spot.stopPrice,
        isOco: spot.orderListId > -1,
        posted: timestamp(spot.time),
        executed: this.isExecutedStatus(status) ? timestamp(spot.updateTime) : undefined,
        syncronized: false,
      };
    } else {
      // FUTURES
      const futures = order as BinanceFuturesOrder;
      const status: OrderStatus = this.parseBinanceStatus(futures.status);
      return {
        id: futures.clientOrderId,
        exchangeId: futures.orderId,
        side: this.parseBinanceSide(futures.side),
        type: this.parseBinanceType(futures.type),
        status: status,
        symbol: this.parseBinanceSymbol(futures.symbol),
        baseQuantity: this.isExecutedStatus(status) ? +futures.executedQty : +futures.origQty,
        quoteQuantity: +futures.cumQuote,
        price: futures.avgPrice ? +futures.avgPrice : +futures.price,
        stopPrice: +futures.stopPrice,
        // isOco: futures. > -1,
        posted: timestamp(futures.time),
        executed: this.isExecutedStatus(status) ? timestamp(futures.updateTime) : undefined,
        syncronized: false,
      };
    }
  }

  private parseBinanceOrderUpdate(orderUpdate: BinanceWsSpotOrderUpdate | BinanceWsFuturesOrderUpdate): OrderEvent {
    const result = (orderUpdate as any).order || orderUpdate;
    const status: OrderStatus = this.parseBinanceStatus(result.orderStatus);
    if ((result as any).originalClientOrderId) {
      // SPOT
      const spot = result as BinanceWsSpotOrderUpdate;
      const symbol = this.parseBinanceSymbol(spot.symbol);
      const order: Order = {
        id: spot.originalClientOrderId,
        exchangeId: spot.orderId,
        side: this.parseBinanceSide(spot.side),
        type: this.parseBinanceType(spot.orderType),
        status, symbol,
        baseQuantity: this.isExecutedStatus(status) ? +spot.accumulatedQuantity : spot.quantity,
        quoteQuantity: +spot.cumulativeQuoteAssetTransactedQty,
        price: spot.lastTradePrice,
        posted: timestamp(spot.orderCreationTime),
        executed: this.isExecutedStatus(status) ? timestamp(spot.tradeTime) : undefined,
      };
      return { order, data: {
        commission: spot.commission,
        commissionAsset: (spot.commissionAsset as CoinType),
      }} as OrderEvent;

    } else {
      // FUTURES
      const futures = result as BinanceWsFuturesOrderUpdate['order'];
      const symbol = this.parseBinanceSymbol(futures.symbol);
      const order: Order = {
        id: futures.clientOrderId,
        exchangeId: futures.orderId,
        side: this.parseBinanceSide(futures.orderSide),
        type: this.parseBinanceType(futures.orderType),
        status, symbol,
        baseQuantity: this.isExecutedStatus(status) ? +futures.orderFilledAccumulatedQuantity : futures.originalQuantity,
        quoteQuantity: this.fixQuote(+futures.orderFilledAccumulatedQuantity * (futures.averagePrice ? +futures.averagePrice : +futures.lastFilledPrice), symbol),
        price: futures.averagePrice ? futures.averagePrice : futures.lastFilledPrice,
        profit: futures.realisedProfit,
      };
      const time = timestamp(futures.orderTradeTime);
      if (this.isExecutedStatus(status)) { order.executed = time; } else { order.posted = time; }
      return { order, data: {
        commission: futures.commissionAmount,
        commissionAsset: (futures.commissionAsset as CoinType),
      }} as OrderEvent;
    }
  }

  // ---------------------------------------------------------------------------------------------------
  //  helpers
  // ---------------------------------------------------------------------------------------------------

  fixBase(base: number, symbol: SymbolType) {
    const found = this.symbols.find(s => s.symbol === symbol);
    return +base.toFixed(found.basePrecision);
  }

  fixQuote(quote: number, symbol: SymbolType) {
    const found = this.symbols.find(s => s.symbol === symbol);
    return +quote.toFixed(found.quotePrecision);
  }

}


// ---------------------------------------------------------------------------------------------------
//  test
// ---------------------------------------------------------------------------------------------------
//  npx ts-node task-executor.ts
// ---------------------------------------------------------------------------------------------------

const accountXavi = {
  idreg: 1,
  nombre: 'Xavi',
  apellidos: 'Giral',
  telefono: '609868620',
  email: 'xgiral@gmail.com',
  password: 'a123456A',
  folder: 'xavi',
  exchanges: {
    binance: {
      apiKey: 'eL6y9S0jkEqqkSnT1hwnNQ9ipn4yW4yLZIojcTLoCLQw8ETiqgGGkEOM6de7jtOx',
      apiSecret: '3uXfopHqLUAT4CTQ1rIL8B825NcfeVy4p5xCJZM67j23GRFV3UJcNF782IIHge0E'
    }
  }
};

// const test = () => {
//   const e = new BinanceExchange('spot');
//   const rmin = 1;
//   const rmax = 5;
//   for (let i = 1; i <= 200; i++) {
//     const priority = Math.floor(Math.random() * (rmax - rmin + 1) + rmin);
//     e.do({ i, priority });
//   }
//   // setTimeout(() => {
//   //   e.do({ i: 'A', priority: 2 });
//   //   e.do({ i: 'B', priority: 1 });
//   //   e.do({ i: 'C', priority: 3 });
//   //   e.do({ i: 'D', priority: 4 });
//   //   e.do({ i: 'E', priority: 5 });
//   // }, 5000);
//   setTimeout(() => {
//     e.retrieveExchangeInfo();
//   }, 7000);
// };

// test();

