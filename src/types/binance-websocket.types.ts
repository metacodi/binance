import { Subject, Subscription } from 'rxjs';
import WebSocket from 'isomorphic-ws';

import { BinanceFuturesOrderType, BinanceFuturesWorkingType, BinanceKlineInterval, BinanceMarketType, BinanceOrderExecutionType, BinanceOrderSide, BinanceOrderStatus, BinanceOrderTimeInForce, BinanceOrderType, BinancePositionSide } from '..';


export type WsConnectionState = 'initial' | 'connecting' | 'connected' | 'reconnecting' | 'closing';

export type WsStreamType = 'user' | 'market';

export type WsStreamFormat = 'raw' | 'stream';

export type WsUserStreamEmitterType = 'accountUpdate' | 'balanceUpdate' | 'orderUpdate';

export type WsMarketStreamEmitterType = 'symbolMiniTicker' | 'symbolTicker';

export type WsStreamEmitterType = WsUserStreamEmitterType | WsMarketStreamEmitterType;

export interface BinanceWebsocketOptions {
  /** Market associat. S'utilitza per discernir les variants de futurs: 'usdm' | 'coinm'. */
  market: BinanceMarketType;
  /** Indica si l'stream és d'usuari o de mercat. */
  streamType: WsStreamType;
  /** Indica el tipus de format de les dades. */
  streamFormat?: WsStreamFormat;
  /** Public user api key. */
  apiKey?: string;
  /** Private user api key. */
  apiSecret?: string;
  /** Indica si l'api està en mode test o en real. */
  isTest?: boolean,
  /** Indica el periode de delay abans de tornar a connectar. */
  reconnectPeriod?: number;
  /** Temps en milisegons per l'interval qua ha de manetenir viva la connexió. */
  pingPeriod?: number;
  /** Temps en milisegons pel timeout si no hi ha la resposta per part del servidor. */
  pongPeriod?: number;
}


// ---------------------------------------------------------------------------------------------------
//  balanceUpdate
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/spot/en/#payload-balance-update Payload: Balance Update} */
export interface BinanceWsSpotBalanceUpdateRaw {
  e: 'balanceUpdate';
  E: number;
  a: string;
  d: string;
  T: number;
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#payload-balance-update Payload: Balance Update} */
export interface BinanceWsSpotBalanceUpdate {
  eventType: 'balanceUpdate';
  eventTime: number;
  asset: string;
  balanceDelta: number;
  clearTime: number;
}

/**
 * {@link https://binance-docs.github.io/apidocs/spot/en/#payload-balance-update Payload: Balance Update}
 * {@link https://binance-docs.github.io/apidocs/futures/en/#event-balance-and-position-update Event: Balance and Position Update}
 */
export function parseBalanceUpdate(data: BinanceWsSpotBalanceUpdateRaw | BinanceWsFuturesAccountUpdateRaw): BinanceWsSpotBalanceUpdate | BinanceWsFuturesAccountUpdate {
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
//  accountUpdate
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/spot/en/#payload-account-update Payload: Account Update} */
export interface BinanceWsSpotAccountUpdateRaw {
  e: 'outboundAccountPosition';
  E: number;
  u: number;
  B: {
    a: string;
    f: string;
    l: string;
  }[];
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#payload-account-update Payload: Account Update} */
export interface BinanceWsSpotAccountUpdate {
  eventType: 'outboundAccountPosition';
  eventTime: number;
  lastAccountUpdateTime: number;
  balances: {
    asset: string;
    free: number;
    locked: number;
  }[];
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#event-balance-and-position-update Event: Balance and Position Update} */
type BinanceAccountUpdateEventType = "DEPOSIT" | "WITHDRAW" | "ORDER" | "FUNDING_FEE" | "WITHDRAW_REJECT" | "ADJUSTMENT" | "INSURANCE_CLEAR" | "ADMIN_DEPOSIT" | "ADMIN_WITHDRAW" | "MARGIN_TRANSFER" | "MARGIN_TYPE_CHANGE" | "ASSET_TRANSFER" | "OPTIONS_PREMIUM_FEE" | "OPTIONS_SETTLE_PROFIT" | "AUTO_EXCHANGE";

/** {@link https://binance-docs.github.io/apidocs/futures/en/#event-balance-and-position-update Event: Balance and Position Update} */
export interface BinanceWsFuturesAccountUpdateRaw {
  e: 'ACCOUNT_UPDATE';
  E: number;
  T: number;
  a: {
    m: BinanceAccountUpdateEventType;
    B: {
      a: string;
      wb: string;
      cw: string;
      bc: string;
    }[];
    P: {
      s: string;
      pa: string;
      ep: string;
      cr: string;
      up: string;
      mt: 'cross' | 'isolated';
      iw: string;
      ps: BinancePositionSide;
    }[];
  };
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#event-balance-and-position-update Event: Balance and Position Update} */
export interface BinanceWsFuturesAccountUpdate {
  eventType: 'ACCOUNT_UPDATE';
  eventTime: number;
  transactionId: number;
  updateData: {
    updateEventType: BinanceAccountUpdateEventType;
    updatedBalances: {
      asset: string;
      balanceChange: number; // this is except for pnl and commission
      crossWalletBalance: number;
      walletBalance: number;
    }[];
    updatedPositions: {
      symbol: string;
      marginAsset?: string; // (margin only)
      positionAmount: number;
      entryPrice: number;
      accumulatedRealisedPreFee: number;
      unrealisedPnl: number;
      marginType: 'cross' | 'isolated';
      isolatedWalletAmount: number;
      positionSide: BinancePositionSide;
    }[]
  };
}

/**
 * {@link https://binance-docs.github.io/apidocs/spot/en/#payload-account-update Payload: Account Update}
 * {@link https://binance-docs.github.io/apidocs/futures/en/#event-balance-and-position-update Event: Balance and Position Update}
 */
export function parseAccountUpdate(data: BinanceWsSpotAccountUpdateRaw | BinanceWsFuturesAccountUpdateRaw): BinanceWsSpotAccountUpdate | BinanceWsFuturesAccountUpdate {
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
//  orderUpdate
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/spot/en/#payload-order-update Payload: Order Update} */
export interface BinanceWsSpotOrderUpdateRaw {
  e: 'executionReport';
  E: number;
  s: string;
  c: string;
  S: BinanceOrderSide;
  o: BinanceOrderType;
  f: BinanceOrderTimeInForce;
  q: string;
  p: string;
  P: string;
  F: string;
  g: number;
  C: string;
  x: BinanceOrderExecutionType;
  X: BinanceOrderStatus;
  r: string;
  i: number;
  l: string;
  z: string;
  L: string;
  n: string;
  N: string | null;
  T: number;
  t: number;
  I: number;
  w: boolean;
  m: boolean;
  M: boolean;
  O: number;
  Z: string;
  Y: string;
  Q: string;
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#payload-order-update Payload: Order Update} */
export interface BinanceWsSpotOrderUpdate {
  eventType: 'executionReport';
  eventTime: number;
  symbol: string;
  newClientOrderId: string;
  side: BinanceOrderSide;
  orderType: BinanceOrderType;
  cancelType: BinanceOrderTimeInForce;
  quantity: number;
  price: number;
  stopPrice: number;
  icebergQuantity: number;
  orderListId: number;
  originalClientOrderId: string;
  executionType: BinanceOrderExecutionType;
  orderStatus: BinanceOrderStatus;
  rejectReason: string;
  orderId: number;
  lastTradeQuantity: number;
  accumulatedQuantity: number;
  lastTradePrice: number;
  commission: number;
  commissionAsset: string | null;
  tradeTime: number;
  tradeId: number;
  ignoreThis1: number;
  isOrderOnBook: boolean;
  isMaker: boolean;
  ignoreThis2: boolean;
  orderCreationTime: number;
  cumulativeQuoteAssetTransactedQty: number;
  lastQuoteAssetTransactedQty: number;
  orderQuoteQty: number;
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#event-order-update Event: Order Update} */
export interface BinanceWsFuturesOrderUpdateRaw {
  e: 'ORDER_TRADE_UPDATE';
  E: number;
  T: number;
  o: {
    s: string;
    c: string;
    S: BinanceOrderSide;
    o: BinanceFuturesOrderType;
    f: BinanceOrderTimeInForce;
    q: string;
    p: string;
    ap: string;
    sp: string;
    x: BinanceOrderExecutionType;
    X: BinanceOrderStatus;
    i: number;
    l: string;
    z: string;
    L: string;
    N: string;
    n: string;
    T: string;
    t: number;
    b: string;
    a: string;
    m: boolean;
    R: boolean;
    wt: BinanceFuturesWorkingType;
    ot: BinanceFuturesOrderType;
    ps: BinancePositionSide;
    cp: boolean;
    AP: string;
    cr: string;
    rp: string;
  };
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#event-order-update Event: Order Update} */
export interface BinanceWsFuturesOrderUpdate {
  eventType: 'ORDER_TRADE_UPDATE';
  eventTime: number;
  transactionTime: number;
  order: {
    symbol: string;
    clientOrderId: string;
    orderSide: BinanceOrderSide;
    orderType: BinanceFuturesOrderType;
    orderTimeInForce: BinanceOrderTimeInForce;
    originalQuantity: number;
    originalPrice: number;
    averagePrice: number;
    stopPrice: number;
    executionType: BinanceOrderExecutionType;
    orderStatus: BinanceOrderStatus;
    orderId: number;
    lastFilledQuantity: number;
    orderFilledAccumulatedQuantity: number;
    lastFilledPrice: number;
    commissionAsset: string;
    commissionAmount: number;
    orderTradeTime: number;
    tradeId: number;
    bidsNotional: number;
    asksNotional: number;
    isMakerTrade: boolean;
    isReduceOnly: boolean;
    stopPriceWorkingType: BinanceFuturesWorkingType;
    originalOrderType: BinanceFuturesOrderType;
    positionSide: BinancePositionSide;
    isCloseAll: boolean;
    trailingStopActivationPrice: number;
    trailingStopCallbackRate: number;
    realisedProfit: number;
  };
}

/**
 * {@link https://binance-docs.github.io/apidocs/spot/en/#payload-order-update Payload: Order Update}
 * {@link https://binance-docs.github.io/apidocs/futures/en/#event-order-update Event: Order Update}
 */
export function parseOrderUpdate(data: BinanceWsSpotOrderUpdateRaw | BinanceWsFuturesOrderUpdateRaw): BinanceWsSpotOrderUpdate | BinanceWsFuturesOrderUpdate {
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

//  minTicker
// ---------------------------------------------------------------------------------------------------

/**
 * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-mini-ticker-stream Individual Symbol Mini Ticker Stream}
 * {@link https://binance-docs.github.io/apidocs/futures/en/#individual-symbol-mini-ticker-stream Individual Symbol Mini Ticker Stream}
 */
export interface BinanceWs24hrMiniTickerRaw {
  e: '24hrMiniTicker';
  E: number;
  s: string;
  ps?: string;
  c: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
}

/**
 * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-mini-ticker-stream Individual Symbol Mini Ticker Stream}
 * {@link https://binance-docs.github.io/apidocs/futures/en/#individual-symbol-mini-ticker-stream Individual Symbol Mini Ticker Stream}
 */
export interface BinanceWs24hrMiniTicker {
  eventType: '24hrMiniTicker';
  eventTime: number;
  symbol: string;
  contractSymbol?: string; // coinm only
  close: number;
  open: number;
  high: number;
  low: number;
  baseAssetVolume: number;
  quoteAssetVolume: number;
}

/**
 * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-mini-ticker-stream Individual Symbol Mini Ticker Stream}
 * {@link https://binance-docs.github.io/apidocs/futures/en/#individual-symbol-mini-ticker-stream Individual Symbol Mini Ticker Stream}
 */
export function parseMiniTicker(data: BinanceWs24hrMiniTickerRaw): BinanceWs24hrMiniTicker {
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


//  bookTicker
// ---------------------------------------------------------------------------------------------------

/**
 * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-book-ticker-streams Individual Symbol Book Ticker Streams }
 * {@link https://binance-docs.github.io/apidocs/futures/en/#individual-symbol-book-ticker-streams Individual Symbol Book Ticker Streams }
 */
export interface BinanceWsBookTickerRaw {
  e: 'bookTicker';
  u: number;
  E?: number;  // futures
  T?: number;  // futures
  s: string;
  b: string;
  B: string;
  a: string;
  A: string;
}

/**
 * {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-book-ticker-streams Individual Symbol Book Ticker Streams }
 * {@link https://binance-docs.github.io/apidocs/futures/en/#individual-symbol-book-ticker-streams Individual Symbol Book Ticker Streams }
 */
export interface BinanceWsBookTicker {
  eventType: 'bookTicker';
  eventTime?: number;  // futures
  transactionTime?: number;  // futures
  updateId: number;
  symbol: string;
  bidPrice: number;
  bidQty: number;
  askPrice: number;
  askQty: number;
}

/**
 * {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker Symbol Order Book Ticker}
 * {@link https://binance-docs.github.io/apidocs/futures/en/#individual-symbol-book-ticker-streams Individual Symbol Book Ticker Streams}
 */
export function parseBookTicker(data: BinanceWsBookTickerRaw): BinanceWsBookTicker {
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


//  kline
// ---------------------------------------------------------------------------------------------------

/**
 * {@link https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-streams Kline/Candlestick Streams}
 * {@link https://binance-docs.github.io/apidocs/futures/en/#kline-candlestick-streams Kline/Candlestick Streams}
 */
export interface BinanceWsKlineRaw {
  e: 'kline';
  E: number;
  s: string;
  k: {
    t: number;
    T: number;
    s: string;
    i: BinanceKlineInterval;
    f: number;
    L: number;
    o: string;
    c: string;
    h: string;
    l: string;
    v: string;
    n: number;
    x: boolean;
    q: string;
    V: string;
    Q: string;
    B: string;
  };
}

/**
 * {@link https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-streams Kline/Candlestick Streams}
 * {@link https://binance-docs.github.io/apidocs/futures/en/#kline-candlestick-streams Kline/Candlestick Streams}
 */
export interface BinanceWsKline {
  eventType: 'kline',
  eventTime: number,
  symbol: string,
  startTime: number,
  closeTime: number,
  interval: BinanceKlineInterval,
  firstTradeId: number,
  lastTradeId: number,
  open: number,
  close: number,
  high: number,
  low: number,
  volume: number,
  trades: number,
  final: false,
  quoteVolume: number,
  volumeActive: number,
  quoteVolumeActive: number,
  ignored: number
}

/**
 * {@link https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-streams Kline/Candlestick Streams}
 * {@link https://binance-docs.github.io/apidocs/futures/en/#kline-candlestick-streams Kline/Candlestick Streams}
 */
export function parseKline(data: BinanceWsKlineRaw): BinanceWsKline {
  return {
    eventType: 'kline',
    symbol: data.s,
    eventTime: data.E,
    startTime: data.k.t,
    closeTime: data.k.T,
    interval: data.k.i,
    firstTradeId: data.k.f,
    lastTradeId: data.k.L,
    open: +data.k.o,
    close: +data.k.c,
    high: +data.k.h,
    low: +data.k.l,
    volume: +data.k.v,
    trades: data.k.n,
    final: false,
    quoteVolume: +data.k.q,
    volumeActive: +data.k.V,
    quoteVolumeActive: +data.k.Q,
    ignored: +data.k.B,
  };
}
