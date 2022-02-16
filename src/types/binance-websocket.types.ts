import { Subject, Subscription } from 'rxjs';
import WebSocket from 'isomorphic-ws';

import { BinanceFuturesOrderType, BinanceFuturesWorkingType, BinanceMarketType, BinanceOrderExecutionType, BinanceOrderSide, BinanceOrderStatus, BinanceOrderTimeInForce, BinanceOrderType, BinancePositionSide } from '..';


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

// ---------------------------------------------------------------------------------------------------
//  accountUpdate - SPOT
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

// ---------------------------------------------------------------------------------------------------
//  accountUpdate - USDM
// ---------------------------------------------------------------------------------------------------

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


// ---------------------------------------------------------------------------------------------------
//  orderUpdate - SPOT
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


// ---------------------------------------------------------------------------------------------------
//  orderUpdate - USDM
// ---------------------------------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------------------------------
//  MARKET STREAMS
// ---------------------------------------------------------------------------------------------------

//  minTicker
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-mini-ticker-stream Individual Symbol Mini Ticker Stream} */
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

/** {@link https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-mini-ticker-stream Individual Symbol Mini Ticker Stream} */
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

//  bookTicker
// ---------------------------------------------------------------------------------------------------

export interface BinanceWsBookTickerRaw {
  e: 'bookTicker';
  u: number;
  s: string;
  b: string;
  B: string;
  a: string;
  A: string;
}

export interface BinanceWsBookTicker {
  eventType: 'bookTicker';
  updateId: number;
  symbol: string;
  bidPrice: number;
  bidQty: number;
  askPrice: number;
  askQty: number;
}