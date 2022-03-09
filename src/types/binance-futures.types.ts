import {
  BinanceExchangeFilter,
  BinanceOrderTimeInForce,
  BinanceRateLimiter,
  BinanceSymbolFilter,
  BinanceOrderType,
  BinanceOrderSide,
  BinanceOrderStatus,
  BinanceOrderResponseType,
  BinanceKlineInterval,
} from './binance.types';


export type BinancePositionSide = 'BOTH' | 'LONG' | 'SHORT';

export type BinanceContractType = 'PERPETUAL' | 'CURRENT_MONTH' | 'NEXT_MONTH' | 'CURRENT_QUARTER' | 'NEXT_QUARTER';

export type BinanceContractStatus = 'PENDING_TRADING' | 'TRADING' | 'PRE_DELIVERING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED' | 'PRE_SETTLE' | 'SETTLING' | 'CLOSE';

export type BinanceFuturesOrderType = 'LIMIT' | 'MARKET' | 'STOP' | 'STOP_MARKET' | 'TAKE_PROFIT' | 'TAKE_PROFIT_MARKET' | 'TRAILING_STOP_MARKET';

export type BinanceFuturesWorkingType = "MARK_PRICE" | "CONTRACT_PRICE";

export type BinanceMarginType = "ISOLATED" | "CROSSED";


// ---------------------------------------------------------------------------------------------------
//  getExchangeInfo
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/futures/en/#exchange-information Exchange Information} */
export interface BinanceFuturesExchangeInfo {
  exchangeFilters: BinanceExchangeFilter[];
  rateLimits: BinanceRateLimiter[];
  serverTime: number;
  assets: any[];
  symbols: BinanceFuturesSymbolExchangeInfo[];
  timezone: string;
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#exchange-information Exchange Information} */
export interface BinanceFuturesSymbolExchangeInfo {
  symbol: string;
  pair: string;
  contractType: BinanceContractType;
  deliveryDate: number;
  onboardDate: number;
  status: BinanceContractStatus;
  maintMarginPercent: string;
  requiredMarginPercent: string;
  baseAsset: string;
  quoteAsset: string;
  marginAsset: string;
  pricePrecision: number;
  quantityPrecision: number;
  baseAssetPrecision: number;
  quotePrecision: number;
  underlyingType: 'COIN' | 'INDEX'; // No other known values
  underlyingSubType: string[]; // DEFI / NFT / BSC / HOT / etc
  settlePlan: number;
  triggerProtect: string;
  filters: BinanceSymbolFilter[];
  OrderType: BinanceOrderType[];
  timeInForce: BinanceOrderTimeInForce[];
  liquidationFee: string;
  marketTakeBound: string;
}


// ---------------------------------------------------------------------------------------------------
//  getSymbolPriceTicker
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/futures/en/#24hr-ticker-price-change-statistics Symbol Price Ticker} */
export interface BinanceFuturesSymbolPriceTickerRequest {
  symbol?: string;
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#24hr-ticker-price-change-statistics Symbol Price Ticker} */
export interface BinanceFuturesSymbolPriceTicker {
  symbol: string;
  price: string;
  time: number;
}


// ---------------------------------------------------------------------------------------------------
//  getSymbolOrderBookTicker
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/futures/en/#symbol-order-book-ticker Symbol Order Book Ticker} */
export interface BinanceFuturesSymbolOrderBookTickerRequest {
  symbol?: string;
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#symbol-order-book-ticker Symbol Order Book Ticker} */
export interface BinanceFuturesSymbolOrderBookTicker {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  time: number;
}


// ---------------------------------------------------------------------------------------------------
//  getSymbolKlines
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/futures/en/#kline-candlestick-data Kline/Candlestick Data} */
export interface BinanceFuturesSymbolKlinesRequest {
  symbol: string;
  interval: BinanceKlineInterval;
  startTime?: number;
  endTime?: number;
  limit?: number;
}


// ---------------------------------------------------------------------------------------------------
//  getAccountInformation
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/futures/en/#account-information-v2-user_data Account Information V2 (USER_DATA)} */
export interface BinanceFuturesAccountInformation {
  feeTier: string;
  canTrade: boolean;
  canDeposit: boolean;
  canWithdraw: boolean;
  updateTime: string;
  totalInitialMargin: string;
  totalMaintMargin: string;
  totalWalletBalance: string;
  totalUnrealizedProfit: string;
  totalMarginBalance: string;
  totalPositionInitialMargin: string;
  totalOpenOrderInitialMargin: string;
  totalCrossWalletBalance: string;
  totalCrossUnPnl: string;
  availableBalance: string;
  maxWithdrawAmount: string;
  assets: BinanceFuturesAssetInfo[];
  positions: BinanceFuturesPosition[];
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#account-information-v2-user_data Account Information V2 (USER_DATA)} */
export interface BinanceFuturesAssetInfo {
  asset: string;
  walletBalance: string;
  unrealizedProfit: string;
  marginBalance: string;
  maintMargin: string;
  initialMargin: string;
  positionInitialMargin: string;
  openOrderInitialMargin: string;
  crossWalletBalance: string;
  crossUnPnl: string;
  availableBalance: string;
  maxWithdrawAmount: string;
  marginAvailable: boolean;
  updateTime: number;
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#account-information-v2-user_data Account Information V2 (USER_DATA)} */
export interface BinanceFuturesPosition {
  symbol: string;
  initialMargin: string;
  maintMargin: string;
  unrealizedProfit: string;
  positionInitialMargin: string;
  openOrderInitialMargin: string;
  leverage: string;
  isolated: boolean;
  entryPrice: string;
  maxNotional: string;
  bidNotional: string;
  askNotional: string;
  positionSide: BinancePositionSide;
  positionAmt: string;
  updateTime: number;
}


// ---------------------------------------------------------------------------------------------------
//  getBalances
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/futures/en/#futures-account-balance-v2-user_data Futures Account Balance V2 (USER_DATA)} */
export interface BinanceFuturesAccountBalance {
  accountAlias: string;
  asset: string;
  balance: string;
  crossWalletBalance: string;
  crossUnPnl: string;
  availableBalance: string;
  maxWithdrawAmount: string;
  marginAvailable: boolean;
  updateTime: number;
}


// ---------------------------------------------------------------------------------------------------
//  getSymbolLeverageBracket . changeSymbolLeverage
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/futures/en/#notional-and-leverage-brackets-user_data Notional and Leverage Brackets (USER_DATA)} */
export interface BinanceFuturesSymbolLeverageBracketRequest {
  symbol?: string;
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#notional-and-leverage-brackets-user_data Notional and Leverage Brackets (USER_DATA)} */
export interface BinanceFuturesSymbolLeverageBracket {
  symbol: string;
  brackets: {
    bracket: number;
    initialLeverage: number;
    notionalCap: number;
    notionalFloor: number;
    maintMarginRatio: number;
    cum: number;
  }[];
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#change-initial-leverage-trade Change Initial Leverage (TRADE)} */
export interface BinanceFuturesChangeSymbolLeverageRequest {
  symbol?: string;
  leverage: number;
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#change-initial-leverage-trade Change Initial Leverage (TRADE)} */
export interface BinanceFuturesChangeSymbolLeverageResponse {
  symbol?: string;
  leverage: number;
  maxNotionalValue: string,
}


// ---------------------------------------------------------------------------------------------------
//  getAllOrders . getOpenOrders . getOrder
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/futures/en/#all-orders-user_data All Orders (USER_DATA)} */
export interface BinanceFuturesGetAllOrdersRequest {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  /** Results per page. Default 500; max 1000. */
  limit?: number;
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#current-all-open-orders-user_data Current All Open Orders (USER_DATA)} */
export interface BinanceFuturesGetOpenOrdersRequest {
  symbol: string;
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#query-order-user_data Query Order (USER_DATA)} */
export interface BinanceFuturesGetOrderRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

/**
 * {@link https://binance-docs.github.io/apidocs/futures/en/#all-orders-user_data All Orders (USER_DATA)}
 * {@link https://binance-docs.github.io/apidocs/futures/en/#current-all-open-orders-user_data Current All Open Orders (USER_DATA)}
 * {@link https://binance-docs.github.io/apidocs/futures/en/#query-order-user_data Query Order (USER_DATA)}
 */
export interface BinanceFuturesOrder {
  avgPrice: string;
  clientOrderId: string;
  cumQuote: string;
  executedQty: string;
  orderId: number;
  origQty: string;
  origType: BinanceFuturesOrderType;
  price: string;
  reduceOnly: boolean;
  side: BinanceOrderSide;
  positionSide: BinancePositionSide;
  status: BinanceOrderStatus;
  stopPrice: string;
  closePosition: boolean;
  symbol: string;
  time: number;
  timeInForce: BinanceOrderTimeInForce;
  type: BinanceFuturesOrderType;
  activatePrice: string;
  priceRate: string;
  updateTime: number;
  workingType: BinanceFuturesWorkingType;
  priceProtect: boolean;
}


// ---------------------------------------------------------------------------------------------------
//  getAccountTradeList
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/futures/en/#account-trade-list-user_data Account Trade List (USER_DATA)} */
export interface BinanceFuturesTradeListRequest {
  symbol: string;
  fromId?: number;
  startTime?: number;
  endTime?: number;
  /** Results per page. Default 500; max 1000. */
  limit?: number;
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#account-trade-list-user_data Account Trade List (USER_DATA)} */
export interface BinanceFuturesTradeList {
  symbol: string;
  id: number;
  orderId: number;
  price: string;
  qty: string;
  quoteQty: string;
  commission: string;
  commissionAsset: string;
  realizedPnl: string;
  side: BinanceOrderSide;
  positionSide: BinancePositionSide;
  time: number;
  buyer: boolean;
  maker: boolean;
}


// ---------------------------------------------------------------------------------------------------
//  getPositionRisk
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/futures/en/#position-information-v2-user_data Position Information V2 (USER_DATA)} */
export interface BinanceFuturesPositionRiskRequest {
  symbol: string;
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#position-information-v2-user_data Position Information V2 (USER_DATA)} */
export interface BinanceFuturesPositionRisk {
  entryPrice: string;
  marginType: Lowercase<BinanceMarginType>;
  isAutoAddMargin: 'false' | 'true';
  isolatedMargin: string;
  leverage: string;
  liquidationPrice: string;
  markPrice: string;
  maxNotionalValue: string;
  positionAmt: string;
  symbol: string;
  unRealizedProfit: string;
  positionSide: BinancePositionSide;
  updateTime: number;
}


// ---------------------------------------------------------------------------------------------------
//  postOrder
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/futures/en/#new-order-trade New Order (TRADE)} */
export interface BinanceFuturesPostOrderRequest {
  symbol: string;
  side: BinanceOrderSide;
  positionSide: BinancePositionSide;
  type: BinanceOrderType;
  timeInForce?: BinanceOrderTimeInForce;
  quantity?: number;
  reduceOnly?: string;
  price?: number;
  newClientOrderId?: string;
  stopPrice?: number;
  closePosition?: string;
  activationPrice?: number;
  callbackRate?: number;
  workingType?: BinanceFuturesWorkingType;
  priceProtect?: string;
  newOrderRespType?: BinanceOrderResponseType;
}

export type BinanceFuturesNewOrder = BinanceFuturesNewOrderResponseResult;

/** {@link https://binance-docs.github.io/apidocs/futures/en/#new-order-trade New Order (TRADE)} */
export interface BinanceFuturesNewOrderResponseResult {
  clientOrderId: string;
  cumQty: string;
  cumQuote: string;
  executedQty: string;
  orderId: number;
  avgPrice: string;
  origQty: string;
  price: string;
  reduceOnly: boolean;
  side: BinanceOrderSide;
  positionSide: BinancePositionSide;
  status: BinanceOrderStatus;
  stopPrice: string;
  closePosition: boolean;
  symbol: string;
  timeInForce: BinanceOrderTimeInForce;
  type: BinanceFuturesOrderType;
  origType: BinanceFuturesOrderType;
  activatePrice: string;
  priceRate: string;
  updateTime: number;
  workingType: BinanceFuturesWorkingType;
  priceProtect: boolean;
}


// ---------------------------------------------------------------------------------------------------
//  cancelOrder . cancelAllSymbolOrders
// ---------------------------------------------------------------------------------------------------


/** {@link https://binance-docs.github.io/apidocs/futures/en/#cancel-order-trade Cancel Order (TRADE)} */
export interface BinanceFuturesCancelOrderRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

/** {@link https://binance-docs.github.io/apidocs/futures/en/#cancel-all-open-orders-trade Cancel All Open Orders (TRADE)} */
export interface BinanceFuturesCancelAllSymbolOrdersRequest {
  symbol: string;
}

/**
 * {@link https://binance-docs.github.io/apidocs/futures/en/#cancel-order-trade Cancel Order (TRADE)}
 * {@link https://binance-docs.github.io/apidocs/futures/en/#cancel-all-open-orders-trade Cancel All Open Orders (TRADE)}
 */
 export interface BinanceFuturesCancelOrder {
  clientOrderId: string;
  cumQty: string;
  cumQuote: string;
  executedQty: string;
  orderId: number;
  origQty: string;
  origType: BinanceFuturesOrderType;
  price: string;
  reduceOnly: boolean;
  side: BinanceOrderSide;
  positionSide: BinancePositionSide;
  status: BinanceOrderStatus;
  stopPrice: string;
  closePosition: boolean;
  symbol: string;
  timeInForce?: BinanceOrderTimeInForce;
  type: BinanceFuturesOrderType;
  activatePrice: string;
  priceRate: string;
  updateTime: number;
  workingType: BinanceFuturesWorkingType;
  priceProtect: boolean;
}

