import moment from "moment";

import { timestamp } from "@metacodi/node-utils";
import { Balance, CoinType, KlineIntervalType, Limit, MarketKline, MarketPrice, MarketSymbol, MarketType, Order, OrderBookPrice, OrderEvent, OrderSide, OrderStatus, OrderType, ResultOrderStatus, SymbolType } from "@metacodi/abstract-exchange";

import { BinanceWsSpotOrderUpdate, BinanceWsFuturesOrderUpdate, BinanceWs24hrMiniTicker, BinanceWsKline } from "./binance-websocket.types";
import { BinanceSpotAccountBalance, BinanceSpotOrder, BinanceSpotSymbolExchangeInfo, BinanceSpotSymbolOrderBookTicker, BinanceSpotSymbolPriceTicker } from "./binance-spot.types";
import { BinanceFuturesAccountBalance, BinanceFuturesOrder, BinanceFuturesOrderType, BinanceFuturesSymbolExchangeInfo, BinanceFuturesSymbolOrderBookTicker, BinanceFuturesSymbolPriceTicker } from "./binance-futures.types";
import { BinanceKlineInterval, BinanceMarketType, BinanceOrderSide, BinanceOrderStatus, BinanceOrderType, BinanceRateLimiter } from "./binance.types";


const acceptedBinanceSymbols: { [bianceSymbol: string]: SymbolType } = {
  BNBUSDT: 'BNB_USDT',
  BTCUSDT: 'BTC_USDT',
  ETCUSDT: 'ETC_USDT',
};

const parseBinanceSymbol = (symbol: string): SymbolType => {
  if (!acceptedBinanceSymbols.hasOwnProperty(symbol)) { throw ({ message: `No s'ha descrit el símbol '${symbol}' pel parser de Binance.` }); }
  return acceptedBinanceSymbols[symbol];
}

const binanceSymbol = (symbol: SymbolType): string => {
  const found = Object.keys(acceptedBinanceSymbols).find(key => acceptedBinanceSymbols[key] === symbol);
  if (found) { return found; }
  throw ({ message: `No s'ha trobat el símbol '${symbol}' equivalent de Binance.` });
}

const parseBinanceInterval = (interval: BinanceKlineInterval): KlineIntervalType => {
  // Els valors coincideixen.
  return interval as KlineIntervalType;
}

const binanceInterval = (interval: KlineIntervalType): BinanceKlineInterval => {
  // Els valors coincideixen.
  return interval as BinanceKlineInterval;
}

const parseBinanceMarket = (market: BinanceMarketType): MarketType => {
  switch (market) {
    case 'spot': return 'spot';
    case 'usdm': return 'futures';
    case 'coinm': return 'futures';
    default: throw ({ message: `No s'ha implementat el parser de Binance del mercat '${market}'` });
  }
}

const binanceMarket = (market: MarketType, baseAsset?: CoinType | SymbolType): BinanceMarketType => {
  switch (market) {
    case 'spot': return 'spot';
    case 'futures': return !baseAsset?.includes('USDT') ? 'coinm' : 'usdm';
    default: throw ({ message: `No s'ha implementat el parser per Binance del mercat '${market}'` });
  }
}

const parseBinanceSide = (side: BinanceOrderSide): OrderSide => {
  switch (side) {
    case 'BUY': return 'buy';
    case 'SELL': return 'sell';
    default: throw ({ message: `No s'ha implementat el parser per Binance del side '${side}'` });
  }
}

const binanceSide = (side: OrderSide): BinanceOrderSide => {
  switch (side) {
    case 'buy': return 'BUY';
    case 'sell': return 'SELL';
    default: throw ({ message: `No s'ha implementat el parser per Binance del side '${side}'` });
  }
}

const binanceSpotOrderType = (type: OrderType): BinanceOrderType => {
  switch (type) {
    case 'limit': return 'LIMIT';
    case 'market': return 'MARKET';
    case 'stop': return 'STOP_LOSS_LIMIT';
    case 'stop_market': return 'STOP_LOSS_LIMIT';
    default: throw ({ message: `No s'ha implementat el get per Binance del type Spot '${type}'` });
  }
}

const binanceFuturesOrderType = (type: OrderType): BinanceFuturesOrderType => {
  switch (type) {
    case 'limit': return 'LIMIT';
    case 'market': return 'MARKET';
    case 'stop': return 'STOP';
    case 'stop_market': return 'STOP_MARKET';
    default: throw ({ message: `No s'ha implementat el get per Binance del type Futures '${type}'` });
  }
}

const parseBinanceType = (type: BinanceOrderType | BinanceFuturesOrderType, market: MarketType): OrderType => {
  if (market === 'spot') {
    switch (type) {
      case 'LIMIT':
      case 'LIMIT_MAKER':
        return 'limit';
      case 'MARKET': return 'market';
      case 'STOP_LOSS': return 'stop';
      default: throw ({ message: `No s'ha implementat el parser per Binance del type Spot '${type}'` });
    }
  } else if (market === 'futures') {
    switch (type) {
      case 'LIMIT': return 'limit';
      case 'MARKET': return 'market';
      case 'STOP': return 'stop';
      case 'STOP_MARKET': return 'stop_market';
      default: throw ({ message: `No s'ha implementat el parser per Binance del type Futures '${type}'` });
    }
  }
}

const parseBinanceStatus = (status: BinanceOrderStatus): ResultOrderStatus => {
  switch (status) {
    case 'NEW': return 'new';
    case 'FILLED': return 'filled';
    case 'PARTIALLY_FILLED': return 'partial';
    case 'CANCELED': return 'canceled';
    case 'EXPIRED': return 'expired';
    case 'REJECTED': return 'rejected';
    // case 'TRADE': return 'filled';
    default: throw ({ message: `No s'ha implementat el parser per Binance del type Spot '${status}'` });
  }
}

// ---------------------------------------------------------------------------------------------------
//  interface parsers
// ---------------------------------------------------------------------------------------------------

const parseBinanceSymbolExchangeInfo = (marketSymbol: BinanceSpotSymbolExchangeInfo | BinanceFuturesSymbolExchangeInfo): MarketSymbol => {
  if ((marketSymbol as any).permissions) {
    // SPOT
    const spot = marketSymbol as BinanceSpotSymbolExchangeInfo;
    const result = {
      symbol: parseBinanceSymbol(spot.symbol),
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
      symbol: parseBinanceSymbol(futures.symbol),
      ready: true,
      quotePrecision: futures.quotePrecision,
      basePrecision: futures.baseAssetPrecision,
      quantityPrecision: futures.quantityPrecision,
      pricePrecision: futures.pricePrecision,
    };
    return result;
  }
}

const parseBinanceMiniTicker = (data: BinanceWs24hrMiniTicker): MarketPrice => {
  return {
    symbol: parseBinanceSymbol(data.symbol),
    price: data.close,
    timestamp: timestamp(data.eventTime),
    baseVolume: data.baseAssetVolume,  // BNB
    quoteVolume: data.quoteAssetVolume, // USDT
  };
}

const parseBinancePriceTicker = (data: (BinanceSpotSymbolPriceTicker | BinanceFuturesSymbolPriceTicker | (BinanceSpotSymbolPriceTicker | BinanceFuturesSymbolPriceTicker)[])): MarketPrice => {
  if (Array.isArray(data)) { if (data.length) { data = data[0]; } else { return undefined; } }
  return {
    symbol: parseBinanceSymbol(data.symbol),
    price: +data.price,
    timestamp: timestamp((data as any).time),
  };
}

const parseBinanceOrderBookTicker = (data: (BinanceSpotSymbolOrderBookTicker | BinanceFuturesSymbolOrderBookTicker) | (BinanceSpotSymbolOrderBookTicker | BinanceFuturesSymbolOrderBookTicker)[]): OrderBookPrice => {
  if (Array.isArray(data)) { if (data.length) { data = data[0]; } else { return undefined; } }
  if (data.hasOwnProperty('time')) 
  return {
    symbol: parseBinanceSymbol(data.symbol),
    bidPrice: +data.bidPrice,
    bidQty: +data.bidQty,
    askPrice: +data.askPrice,
    askQty: +data.askQty,
    timestamp: timestamp(),
  };
}

const parseBinanceKline = (data: BinanceWsKline): MarketKline => {
  return {
    symbol: parseBinanceSymbol(data.symbol),
    interval: parseBinanceInterval(data.interval),
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

const parseBinanceBalanceSpot = (coinBalance: BinanceSpotAccountBalance): Balance => {
  const available = +coinBalance?.free;
  const locked = +coinBalance?.locked;
  const balance = available + locked;
  return { asset: (coinBalance.coin as CoinType), available, locked, balance };
}

const parseBinanceBalanceFutures = (coinBalance: BinanceFuturesAccountBalance): Balance => {
  const available = +coinBalance?.availableBalance;
  const balance = +coinBalance?.balance;
  const locked = balance - available;
  return { asset: (coinBalance.asset as CoinType), available, locked, balance };
}

const parseBinanceOrder = (order: BinanceSpotOrder | BinanceFuturesOrder, market: MarketType): Order => {
  if ((order as any).orderListId) {
    // SPOT
    const spot = order as BinanceSpotOrder;
    const status: OrderStatus = parseBinanceStatus(spot.status);
    return {
      id: spot.clientOrderId,
      exchangeId: spot.orderId,
      side: parseBinanceSide(spot.side),
      type: parseBinanceType(spot.type, market),
      status: status,
      symbol: parseBinanceSymbol(spot.symbol),
      baseQuantity: isExecutedStatus(status) ? +spot.executedQty : +spot.origQty,
      quoteQuantity: +spot.cummulativeQuoteQty,
      price: +spot.price,
      stopPrice: +spot.stopPrice,
      isOco: spot.orderListId > -1,
      posted: timestamp(spot.time),
      executed: isExecutedStatus(status) ? timestamp(spot.updateTime) : undefined,
      syncronized: false,
    };
  } else {
    // FUTURES
    const futures = order as BinanceFuturesOrder;
    const status: OrderStatus = parseBinanceStatus(futures.status);
    return {
      id: futures.clientOrderId,
      exchangeId: futures.orderId,
      side: parseBinanceSide(futures.side),
      type: parseBinanceType(futures.type, market),
      status: status,
      symbol: parseBinanceSymbol(futures.symbol),
      baseQuantity: isExecutedStatus(status) ? +futures.executedQty : +futures.origQty,
      quoteQuantity: +futures.cumQuote,
      price: futures.avgPrice ? +futures.avgPrice : +futures.price,
      stopPrice: +futures.stopPrice,
      // isOco: futures. > -1,
      posted: timestamp(futures.time),
      executed: isExecutedStatus(status) ? timestamp(futures.updateTime) : undefined,
      syncronized: false,
    };
  }
}

const parseBinanceOrderUpdate = (orderUpdate: BinanceWsSpotOrderUpdate | BinanceWsFuturesOrderUpdate, market: MarketType): OrderEvent => {
  const result = (orderUpdate as any).order || orderUpdate;
  const status: OrderStatus = parseBinanceStatus(result.orderStatus);
  if ((result as any).originalClientOrderId) {
    // SPOT
    const spot = result as BinanceWsSpotOrderUpdate;
    const symbol = parseBinanceSymbol(spot.symbol);
    const order: Order = {
      id: spot.originalClientOrderId,
      exchangeId: spot.orderId,
      side: parseBinanceSide(spot.side),
      type: parseBinanceType(spot.orderType, market),
      status, symbol,
      baseQuantity: isExecutedStatus(status) ? +spot.accumulatedQuantity : spot.quantity,
      quoteQuantity: +spot.cumulativeQuoteAssetTransactedQty,
      price: spot.lastTradePrice,
      posted: timestamp(spot.orderCreationTime),
      executed: isExecutedStatus(status) ? timestamp(spot.tradeTime) : undefined,
    };
    return { order, data: {
      commission: spot.commission,
      commissionAsset: (spot.commissionAsset as CoinType),
    }} as OrderEvent;

  } else {
    // FUTURES
    const futures = result as BinanceWsFuturesOrderUpdate['order'];
    const symbol = parseBinanceSymbol(futures.symbol);
    const order: Order = {
      id: futures.clientOrderId,
      exchangeId: futures.orderId,
      side: parseBinanceSide(futures.orderSide),
      type: parseBinanceType(futures.orderType, market),
      status, symbol,
      baseQuantity: isExecutedStatus(status) ? +futures.orderFilledAccumulatedQuantity : futures.originalQuantity,
      // quoteQuantity: fixQuote(+futures.orderFilledAccumulatedQuantity * (futures.averagePrice ? +futures.averagePrice : +futures.lastFilledPrice), symbol),
      quoteQuantity: +futures.orderFilledAccumulatedQuantity * (futures.averagePrice ? +futures.averagePrice : +futures.lastFilledPrice),
      price: futures.averagePrice ? futures.averagePrice : futures.lastFilledPrice,
      profit: futures.realisedProfit,
    };
    const time = timestamp(futures.orderTradeTime);
    if (isExecutedStatus(status)) { order.executed = time; } else { order.posted = time; }
    return { order, data: {
      commission: futures.commissionAmount,
      commissionAsset: (futures.commissionAsset as CoinType),
    }} as OrderEvent;
  }
}


const parseBinanceRateLimit = (data: BinanceRateLimiter): Limit => {
  const { rateLimitType, intervalNum, limit } = data;
  const unitOfTime = data.interval.toLowerCase() as moment.unitOfTime.DurationAs;
  const seconds = moment.duration(intervalNum, unitOfTime).asSeconds();
  const maxQuantity = Math.floor(data.limit / seconds);
  return { type: rateLimitType, maxQuantity, period: 1, unitOfTime };
}

// ---------------------------------------------------------------------------------------------------
//  helpers
// ---------------------------------------------------------------------------------------------------

// const fixBase = (base: number, symbol: SymbolType) => {
//   const found = this.symbols.find(s => s.symbol === symbol);
//   return +base.toFixed(found.basePrecision);
// }

// const fixQuote = (quote: number, symbol: SymbolType) => {
//   const found = this.symbols.find(s => s.symbol === symbol);
//   return +quote.toFixed(found.quotePrecision);
// }

const isExecutedStatus = (status: ResultOrderStatus): boolean => { return status === 'new' || status === 'expired'; }

