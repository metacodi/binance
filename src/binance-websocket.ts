import WebSocket from 'isomorphic-ws';
import EventEmitter from 'events';
import { Subject, interval, timer, Subscription } from 'rxjs';

import { BinanceApi } from './binance-api';
import { BinanceApiOptions, BinanceApiFutures, BinanceMarketType, BinanceWebsocketOptions, WsConnectionState, WsStreamType, WsStreamFormat, BinanceApiSpot, BinanceWs24hrMiniTicker, BinanceWs24hrMiniTickerRaw, WsUserStreamEmitterType, BinanceWsSpotBalanceUpdate, BinanceWsSpotBalanceUpdateRaw, BinanceWsSpotAccountUpdateRaw, BinanceWsSpotAccountUpdate, BinanceWsFuturesAccountUpdateRaw, BinanceWsFuturesAccountUpdate, BinanceWsBookTickerRaw, BinanceWsBookTicker, BinanceWsSpotOrderUpdate, BinanceWsSpotOrderUpdateRaw, BinanceWsFuturesOrderUpdateRaw, BinanceWsFuturesOrderUpdate } from ".";


export class BinanceWebsocket extends EventEmitter {
  /** Opcions de configuració. */
  protected options: BinanceWebsocketOptions;
  /** Referència a la instància del websocket subjacent. */
  protected ws: WebSocket
  /** Referència a la instància del client API. */
  protected api: BinanceApi;
  /** Estat de la connexió. */
  protected status: WsConnectionState = 'initial';
  /** Subscripció al interval que envia un ping al servidor per mantenir viva la connexió.  */
  protected pingInterval?: Subscription;
  /** Subscriptor al timer que controla la resposta del servidor. */
  protected pongTimer?: Subscription;
  /** Clau associada amb l'stream d'usuari. */
  protected listenKey?: string;
  /** Subscriptor al timer que controla la renovació de la clau. */
  protected listenKeyTimer?: Subscription;
  /** Emisors de missatges. */
  protected emitters: { [WsStreamEmitterType: string]: Subject<any> } = {};

  constructor(
    options: BinanceWebsocketOptions,
  ) {
    super();
    this.options = { ...this.defaultOptions, ...options };

    this.initialize();
  }


  // ---------------------------------------------------------------------------------------------------
  //  options
  // ---------------------------------------------------------------------------------------------------

  get market(): BinanceMarketType { return this.options?.market; }

  get streamType(): WsStreamType { return this.options?.streamType; }

  get streamFormat(): WsStreamFormat { return this.options?.streamFormat; }

  get apiKey(): string { return this.options?.apiKey; }

  get apiSecret(): string { return this.options?.apiSecret; }

  get isTest(): boolean { return this.options?.isTest; }

  get reconnectPeriod(): number { return this.options?.reconnectPeriod; }

  get pingPeriod(): number { return this.options?.pingPeriod; }

  get pongPeriod(): number { return this.options?.pongPeriod; }

  get defaultOptions(): Partial<BinanceWebsocketOptions> {
    return {
      isTest: false,
      streamFormat: 'stream',
      reconnectPeriod: 500,
      pingPeriod: 3 * 60 * 1000,
      pongPeriod: 7500,
    }
  }


  // ---------------------------------------------------------------------------------------------------
  //  api
  // ---------------------------------------------------------------------------------------------------

  protected getApiClient(): BinanceApi {
    const { apiKey, apiSecret, isTest } = this.options;
    return this.market === 'spot' ? new BinanceApiSpot({ apiKey, apiSecret, isTest }) :  new BinanceApiFutures({ apiKey, apiSecret, isTest });
  }

  protected async initialize() {
    // Instanciem un client per l'API.
    this.api = this.getApiClient();
    // Iniciem la connexió amb l'stream de l'exchange.
    this.connect();
  }

  // ---------------------------------------------------------------------------------------------------
  //  connect . terminate
  // ---------------------------------------------------------------------------------------------------

  get baseUrl(): string {
    switch (this.market) {
      case 'spot': return this.isTest ? `wss://testnet.binance.vision` : `wss://stream.binance.com:9443`;
      case 'usdm': return this.isTest ? `wss://stream.binancefuture.com` : `wss://fstream.binance.com`;
      case 'coinm': return this.isTest ? `wss://dstream.binancefuture.com` : `wss://dstream.binance.com`;
      case 'margin': return this.isTest ? `wss://testnet.binance.vision` : `wss://stream.binance.com:9443`;
      case 'voptions': return this.isTest ? `wss://testnetws.binanceops.vision` : `wss://vstream.binance.com`;
    }
  }

  get url(): string {
    const format = this.streamFormat === 'raw' ? 'ws' : 'stream';
    const listenKey = this.streamType === 'user' ? (format === 'ws' ? `/${this.listenKey}` : `?streams=${this.listenKey}`) : '';
    return `${this.baseUrl}/${format}${listenKey}`;
  }

  async connect() {
    // Obtenim una clau per l'stream de l'usuari.
    if (this.streamType === 'user') { await this.getUserDataListenKey(); }
    // Nova instància.
    this.ws = new WebSocket(this.url);
    console.log(this.wsId, 'connecting', this.url);
    // Listeners.
    this.ws.onopen = event => this.onWsOpen(event);
    this.ws.onerror = event => this.onWsError(event);
    this.ws.onclose = event => this.onWsClose(event);
    this.ws.onmessage = event => this.onWsMessage(event);
    // ping . pong
    if (typeof this.ws.on === 'function') {
      this.ws.on('ping', event => this.onWsPing(event));
      this.ws.on('pong', event => this.onWsPong(event));
    }
    // Not sure these work in the browser, the traditional event listeners are required for ping/pong frames in node
    (this.ws as any).onping = (event: WebSocket.Event) => this.onWsPing(event);
    (this.ws as any).onpong = (event: WebSocket.Event) => this.onWsPong(event);
  }

  reconnect() {
    if (this.status === 'reconnecting') { return; }
    this.status = 'reconnecting';
    this.close();
    setTimeout(() => this.connect(), this.reconnectPeriod);
  }

  async close() {
    if (this.status !== 'reconnecting') { this.status = 'closing'; }
    if (this.pingInterval) { this.pingInterval.unsubscribe(); }
    if (this.pongTimer) { this.pongTimer.unsubscribe(); }
    if (this.listenKeyTimer) { this.listenKeyTimer.unsubscribe(); }
    await this.api.closeUserDataListenKey(this.listenKey);
    this.ws.close();
    // #168: ws.terminate() undefined in browsers.
    if (typeof this.ws.terminate === 'function') { this.ws.terminate(); }
  }

  destroy() {
    Object.keys(this.emitters).map(WsStreamEmitterType => this.emitters[WsStreamEmitterType].complete());
    this.emitters = {};
  }


  // ---------------------------------------------------------------------------------------------------
  //  open . close . error
  // ---------------------------------------------------------------------------------------------------

  protected onWsOpen(event: WebSocket.Event) {
    if (this.status === 'reconnecting') {
      console.log(this.wsId, 'reconnected!');
      this.emit('reconnected', { event });
    } else {
      console.log(this.wsId, 'connected!');
      this.emit('open', { event });
    }
    this.status = 'connected';
    // Iniciem la comunicació ping-pong.
    if (this.pingInterval) { this.pingInterval.unsubscribe(); }
    this.pingInterval = interval(this.pingPeriod).subscribe(() => this.ping());
    // Establim les subscripcions dels emisors de market.
    this.respawnMarketStreamSubscriptions();
  }

  protected onWsClose(event: WebSocket.CloseEvent) {
    console.log(this.wsId, 'closed');
    if (this.status !== 'closing') {
      this.reconnect();
      this.emit('reconnecting', { event });
    } else {
      this.status = 'initial';
      this.emit('close', { event });
    }
  }

  protected onWsError(event: WebSocket.ErrorEvent) {
    console.error(this.wsId, event?.error || event);
  }


  // ---------------------------------------------------------------------------------------------------
  //  ping . pong
  // ---------------------------------------------------------------------------------------------------

  protected ping() {
    console.log(this.wsId, `Sending ping...`);
    try {
      if (this.pongTimer) { this.pongTimer.unsubscribe(); }
      this.pongTimer = timer(this.pongPeriod).subscribe(() => {
        console.log(this.wsId, `Pong timeout - closing socket to reconnect`);
        this.reconnect();
      });

      // Binance allows unsolicited pongs, so we send both (though we expect a pong in response to our ping if the connection is still alive).
      this.ws.ping();
      this.ws.pong();

    } catch (error) {
      console.error(this.wsId, `Failed to send WS ping`);
    }
  }

  protected onWsPing(event: any) {
    console.log(this.wsId, 'Received ping, sending pong');
    this.ws.pong();
  }

  protected onWsPong(event: any) {
    console.log(this.wsId, 'Received pong, clearing timer');
    if (this.pongTimer) { this.pongTimer.unsubscribe(); }
  }


  // ---------------------------------------------------------------------------------------------------
  //  listen Key
  // ---------------------------------------------------------------------------------------------------

  /**
   * {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-spot LISTEN KEY SPOT}
   * {@link https://binance-docs.github.io/apidocs/futures/en/#start-user-data-stream-user_stream Start User Data Stream (USER_STREAM)}
   */
  protected async getUserDataListenKey(): Promise<void> {
    if (this.listenKeyTimer) { this.listenKeyTimer.unsubscribe(); }
    // Obtenim una clau per l'stream d'usuari.
    const response = await this.api.getUserDataListenKey();
    this.listenKey = response.listenKey;
    console.log(this.wsId, 'listenKey: ', this.listenKey);
    // Mantenim viva la clau d'usuari.
    this.listenKeyTimer = timer(30 * 60 * 1000).subscribe(() => this.api.keepAliveUserDataListenKey(this.listenKey));
    return Promise.resolve();
  }


  // ---------------------------------------------------------------------------------------------------
  //  message event
  // ---------------------------------------------------------------------------------------------------

  protected onWsMessage(event: WebSocket.MessageEvent) {
    // console.log(this.wsId, event.data);
    // console.log(event.data);
    // console.log(this.parseWsMessage(event));
    const data = this.parseWsMessage(event);
    this.emit('message', data);
    switch (this.discoverEventType(data)) {
      // Account events
      case 'balanceUpdate': return this.emitBalanceUpdate(data);
      case 'outboundAccountPosition': return this.emitAccountUpdate(data);
      case 'ACCOUNT_UPDATE': this.emitBalanceUpdate(data); this.emitAccountUpdate(data); break;
      case 'executionReport': case 'ORDER_TRADE_UPDATE': return this.emitOrderUpdate(data);
      case 'listenKeyExpired':
        if (this.status !== 'closing' && this.status !== 'initial') { this.reconnect(); }
        break;
      // Market events
      case '24hrMiniTicker': return this.emitMiniTicker(data);
      case 'bookTicker': return this.emitBookTicker(data);
      default:
        console.log(data);
    }
  }

  protected parseWsMessage(event: any): any {
    if (typeof event === 'string') {
      const parsedEvent = JSON.parse(event);
      if (parsedEvent.data) {
        return this.parseWsMessage(parsedEvent.data);
      }
    }
    return event?.data ? JSON.parse(event.data) : event;
  }

  protected discoverEventType(data: any): string {
    const obj = Array.isArray(data) ? (data.length ? data[0] : undefined) : data;
    if (this.streamFormat === 'raw') {
      if (!obj?.e) {
        if (this.isBookTickerEventType(obj)) { obj.e = 'bookTicker'; }
      }
      return obj?.e;
    } else {
      if (!obj.data?.e && obj.stream && obj.stream.includes('@')) {
        const eventType = obj.stream.split('@')[1];
        obj.data.e = eventType;
      }
      return obj.data ? obj.data.e : undefined;
    }
  }

  private isBookTickerEventType(data: any): boolean {
    if (!data) { return false; }
    if (typeof data !== 'object') { return false; }
    const match = ['u', 's', 'b', 'B', 'a', 'A'];
    const keys = Object.keys(data);
    return keys.length === match.length && keys.every(key => match.includes(key));
  }


  // ---------------------------------------------------------------------------------------------------
  //  USER DATA
  // ---------------------------------------------------------------------------------------------------

  protected registerAccountSubscription(key: WsUserStreamEmitterType) {
    const stored = this.emitters[key];
    if (stored) { return stored; }
    const created = new Subject<any>();
    this.emitters[key] = created;
    return created;
  }

  protected emitNextAccountEvent(key: string, event: any, parser: (data: any) => any) {
    const data = this.streamFormat === 'raw' ? event : event.data;
    const stored = this.emitters[key];
    if (!this.isSubjectUnobserved(stored)) {
      stored.next(parser(data));
    }
  }

  // ---------------------------------------------------------------------------------------------------
  //  accountUpdate
  // ---------------------------------------------------------------------------------------------------

  accountUpdate(): Subject<BinanceWsSpotAccountUpdate | BinanceWsFuturesAccountUpdate> { return this.registerAccountSubscription('accountUpdate'); }

  protected emitAccountUpdate(event: any) { this.emitNextAccountEvent('accountUpdate', event, this.parseAccountUpdate); }

  /**
   * {@link https://binance-docs.github.io/apidocs/spot/en/#payload-account-update Payload: Account Update}
   * {@link https://binance-docs.github.io/apidocs/futures/en/#event-balance-and-position-update Event: Balance and Position Update}
   */
  protected parseAccountUpdate(data: BinanceWsSpotAccountUpdateRaw | BinanceWsFuturesAccountUpdateRaw): BinanceWsSpotAccountUpdate | BinanceWsFuturesAccountUpdate {
    if (data.e === 'outboundAccountPosition') {
      // spot
      return {
        eventType: 'outboundAccountPosition',
        eventTime: data.E,
        lastAccountUpdateTime: data.u,
        balances: data.B.map(b => ({
          asset: b.a,
          free: +b.f,
          locked: +b.l,
        })) as BinanceWsSpotAccountUpdate['balances'],
      }

    } else if (data.e === 'ACCOUNT_UPDATE') {
      // usdm
      return {
        eventType: 'ACCOUNT_UPDATE',
        eventTime: data.E,
        transactionId: data.T,
        updateData: {
          updateEventType: data.a.m,
          updatedBalances: data.a.B.map(b => ({
            asset: b.a,
            balanceChange: +b.bc,
            crossWalletBalance: +b.cw,
            walletBalance: +b.wb,
          })) as BinanceWsFuturesAccountUpdate['updateData']['updatedBalances'],
          updatedPositions: data.a.P.map(p => ({
            symbol: p.s,
            marginAsset: undefined,  // (margin only)
            positionAmount: +p.pa,
            entryPrice: +p.ep,
            accumulatedRealisedPreFee: +p.cr,
            unrealisedPnl: +p.up,
            marginType: p.mt,
            isolatedWalletAmount: +p.iw,
            positionSide: p.ps,
          })) as BinanceWsFuturesAccountUpdate['updateData']['updatedPositions'],
        },
      };
    }
  }

  // ---------------------------------------------------------------------------------------------------
  //  balanceUpdate
  // ---------------------------------------------------------------------------------------------------

  balanceUpdate(): Subject<BinanceWsSpotBalanceUpdate | BinanceWsFuturesAccountUpdate> { return this.registerAccountSubscription('balanceUpdate'); }

  protected emitBalanceUpdate(event: any) { this.emitNextAccountEvent('balanceUpdate', event, this.parseBalanceUpdate); }

  /**
   * {@link https://binance-docs.github.io/apidocs/spot/en/#payload-balance-update Payload: Balance Update}
   * {@link https://binance-docs.github.io/apidocs/futures/en/#event-balance-and-position-update Event: Balance and Position Update}
   */
   protected parseBalanceUpdate(data: BinanceWsSpotBalanceUpdateRaw | BinanceWsFuturesAccountUpdateRaw): BinanceWsSpotBalanceUpdate | BinanceWsFuturesAccountUpdate {
    if (data.e === 'balanceUpdate') {
      // spot
      return {
        eventType: 'balanceUpdate',
        eventTime: data.E,
        asset: data.a,
        balanceDelta: +data.d,
        clearTime: data.T,
      }

    } else if (data.e === 'ACCOUNT_UPDATE') {
      // usdm
      return {
        eventType: 'ACCOUNT_UPDATE',
        eventTime: data.E,
        transactionId: data.T,
        updateData: {
          updateEventType: data.a.m,
          updatedBalances: data.a.B.map(b => ({
            asset: b.a,
            balanceChange: +b.bc,
            crossWalletBalance: +b.cw,
            walletBalance: +b.wb,
          })) as BinanceWsFuturesAccountUpdate['updateData']['updatedBalances'],
          updatedPositions: data.a.P.map(p => ({
            symbol: p.s,
            marginAsset: undefined,  // (margin only)
            positionAmount: +p.pa,
            entryPrice: +p.ep,
            accumulatedRealisedPreFee: +p.cr,
            unrealisedPnl: +p.up,
            marginType: p.mt,
            isolatedWalletAmount: +p.iw,
            positionSide: p.ps,
          })) as BinanceWsFuturesAccountUpdate['updateData']['updatedPositions'],
        },
      };
    }
  }

  // ---------------------------------------------------------------------------------------------------
  //  orderUpdate
  // ---------------------------------------------------------------------------------------------------

  orderUpdate(): Subject<BinanceWsSpotOrderUpdate | BinanceWsFuturesOrderUpdate> { return this.registerAccountSubscription('orderUpdate'); }

  protected emitOrderUpdate(event: any) { this.emitNextAccountEvent('orderUpdate', event, this.parseOrderUpdate); }

  /**
   * {@link https://binance-docs.github.io/apidocs/spot/en/#payload-order-update Payload: Order Update}
   * {@link https://binance-docs.github.io/apidocs/futures/en/#event-order-update Event: Order Update}
   */
  protected parseOrderUpdate(data: BinanceWsSpotOrderUpdateRaw | BinanceWsFuturesOrderUpdateRaw): BinanceWsSpotOrderUpdate | BinanceWsFuturesOrderUpdate {
    if (data.e === 'executionReport') {
      // spot
      return {
        eventType: 'executionReport',
        eventTime: data.E,
        symbol: data.s,
        newClientOrderId: data.c,
        side: data.S,
        orderType: data.o,
        cancelType: data.f,
        quantity: +data.q,
        price: +data.p,
        stopPrice: +data.P,
        icebergQuantity: +data.F,
        orderListId: data.g,
        originalClientOrderId: data.C,
        executionType: data.x,
        orderStatus: data.X,
        rejectReason: data.r,
        orderId: data.i,
        lastTradeQuantity: +data.l,
        accumulatedQuantity: +data.z,
        lastTradePrice: +data.L,
        commission: +data.n,
        commissionAsset: data.N,
        tradeTime: data.T,
        tradeId: data.t,
        ignoreThis1: data.I,
        isOrderOnBook: data.w,
        isMaker: data.m,
        ignoreThis2: data.M,
        orderCreationTime: data.O,
        cumulativeQuoteAssetTransactedQty: +data.Z,
        lastQuoteAssetTransactedQty: +data.Y,
        orderQuoteQty: +data.Q,
      };
    } else if (data.e === 'ORDER_TRADE_UPDATE') {
      // usdm
      return {
        eventType: 'ORDER_TRADE_UPDATE',
        eventTime: data.E,
        transactionTime: data.T,
        order: {
          symbol: data.o.s,
          clientOrderId: data.o.c,
          orderSide: data.o.S,
          orderType: data.o.o,
          orderTimeInForce: data.o.f,
          originalQuantity: +data.o.q,
          originalPrice: +data.o.p,
          averagePrice: +data.o.ap,
          stopPrice: +data.o.sp,
          executionType: data.o.x,
          orderStatus: data.o.X,
          orderId: data.o.i,
          lastFilledQuantity: +data.o.l,
          orderFilledAccumulatedQuantity: +data.o.z,
          lastFilledPrice: +data.o.L,
          commissionAsset: data.o.N,
          commissionAmount: +data.o.n,
          orderTradeTime: +data.o.T,
          tradeId: data.o.t,
          bidsNotional: +data.o.b,
          asksNotional: +data.o.a,
          isMakerTrade: data.o.m,
          isReduceOnly: data.o.R,
          stopPriceWorkingType: data.o.wt,
          originalOrderType: data.o.ot,
          positionSide: data.o.ps,
          isCloseAll: data.o.cp,
          trailingStopActivationPrice: +data.o.AP,
          trailingStopCallbackRate: +data.o.cr,
          realisedProfit: +data.o.rp,
        }
      };
    }
  }


  // ---------------------------------------------------------------------------------------------------
  //  MARKET STREAMS
  // ---------------------------------------------------------------------------------------------------

  private subscriptionId = 0;

  protected subscribeMarketStream(params: string[]) {
    const id = ++this.subscriptionId;
    const data = { method: "SUBSCRIBE", id, params };
    console.log(this.wsId, 'subscribeMarketStream => ', data);
    this.ws.send(JSON.stringify(data), error => error ? this.onWsError(error as any) : undefined);
  }

  protected unsubscribeMarketStream(params: string[]) {
    const id = ++this.subscriptionId;
    const data = { method: "UNSUBSCRIBE", id, params };
    this.ws.send(JSON.stringify(data), error => error ? this.onWsError(error as any) : undefined);
  }

  protected respawnMarketStreamSubscriptions() {
    const params: string[] = [];
    Object.keys(this.emitters).map(key => {
      const stored = this.emitters[key];
      if (this.isSubjectUnobserved(stored)) {
        if (stored) { stored.complete(); }
        delete this.emitters[key];
      } else if (key.includes('@')) {
        params.push(key);
      }
    });
    if (params.length) {
      this.subscribeMarketStream(params);
    }
  }

  protected isSubjectUnobserved(emitter: Subject<any>): boolean {
    return !emitter || emitter.closed || !emitter.observers?.length;
  }

  protected registerMarketStreamSubscription(key: string) {
    const stored = this.emitters[key];
    if (stored) { return stored; }
    const created = new Subject<any>();
    this.emitters[key] = created;
    if (this.status === 'connected') { this.subscribeMarketStream([key]); }
    return created;
  }

  protected emitNextMarketStreamEvent(key: string, event: any, parser: (data: any) => any) {
    const data = this.streamFormat === 'raw' ? event : event.data;
    const stored = this.emitters[key];
    if (this.isSubjectUnobserved(stored)) {
      this.unsubscribeMarketStream([key]);
      if (stored) { stored.complete(); }
      delete this.emitters[key];
    } else {
      stored.next(parser(data));
    }
  }

  // ---------------------------------------------------------------------------------------------------
  //  miniTicker
  // ---------------------------------------------------------------------------------------------------

  miniTicker(symbol: string): Subject<BinanceWs24hrMiniTicker> {
    const key = `${symbol.toLocaleLowerCase()}@miniTicker`;
    return this.registerMarketStreamSubscription(key);
  }

  protected emitMiniTicker(event: any) {
    const key = this.streamFormat === 'raw' ? `${(event.s as string).toLowerCase()}@miniTicker` : event.stream;
    this.emitNextMarketStreamEvent(key, event, this.parseMiniTicker);
  }

  /**
   * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-mini-ticker-stream Individual Symbol Mini Ticker Stream}
   * {@link https://binance-docs.github.io/apidocs/futures/en/#individual-symbol-mini-ticker-stream Individual Symbol Mini Ticker Stream}
   */
  protected parseMiniTicker(data: BinanceWs24hrMiniTickerRaw): BinanceWs24hrMiniTicker {
    return {
      eventType: '24hrMiniTicker',
      eventTime: data.E,
      symbol: data.s,
      contractSymbol: data.ps,
      close: +data.c,
      open: +data.o,
      high: +data.h,
      low: +data.l,
      baseAssetVolume: +data.v,
      quoteAssetVolume: +data.q,
    };
  }

  // ---------------------------------------------------------------------------------------------------
  //  bookTicker
  // ---------------------------------------------------------------------------------------------------

  bookTicker(symbol: string): Subject<BinanceWsBookTicker> {
    const key = `${symbol.toLocaleLowerCase()}@bookTicker`;
    return this.registerMarketStreamSubscription(key);
  }

  protected emitBookTicker(event: any) {
    const key = this.streamFormat === 'raw' ? `${(event.s as string).toLowerCase()}@bookTicker` : event.stream;
    this.emitNextMarketStreamEvent(key, event, this.parseBookTicker);
  }

  /**
   * {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker Symbol Order Book Ticker}
   * {@link https://binance-docs.github.io/apidocs/futures/en/#individual-symbol-book-ticker-streams Individual Symbol Book Ticker Streams}
   */
  protected parseBookTicker(data: BinanceWsBookTickerRaw): BinanceWsBookTicker {
    return {
      eventType: 'bookTicker',
      updateId: data.u,
      symbol: data.s,
      bidPrice: +data.b,
      bidQty: +data.B,
      askPrice: +data.a,
      askQty: +data.A,
      // eventTime: data.E,  // (usmd only)
      // transactionTime: data.T,  // (usmd only)
    };
  }


  // ---------------------------------------------------------------------------------------------------
  //  log
  // ---------------------------------------------------------------------------------------------------

  protected get wsId(): string { return `${this.market}-${this.streamType}-ws =>`; }
}


