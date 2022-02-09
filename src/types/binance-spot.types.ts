import {
  BinanceMarketType,
  BinanceExchangeFilter,
  BinanceOrderType,
  BinanceRateLimiter,
  BinanceSymbolFilter,
  BinanceOrderSide,
  BinanceOrderStatus,
  BinanceOrderTimeInForce,
  BinanceOrderResponseType,
} from './binance.types';


/** Compatibilitat amb inferiors a versions ^4.0 */
type Uppercase<S extends string> = string;
/** Compatibilitat amb inferiors a versions ^4.0 */
type Lowercase<S extends string> = string;

// ---------------------------------------------------------------------------------------------------
//  getExchangeInfo
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/spot/en/#exchange-information Exchange Information} */
export interface BinanceSpotExchangeInfoRequest {
  symbol?: string;
  symbols?: string[];
}


/** {@link https://binance-docs.github.io/apidocs/spot/en/#exchange-information Exchange Information} */
export interface BinanceSpotExchangeInfo {
  timezone: string;
  serverTime: number;
  rateLimits: BinanceRateLimiter[];
  exchangeFilters: BinanceExchangeFilter[];
  symbols: BinanceSpotSymbolExchangeInfo[];
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#exchange-information Exchange Information} */
export interface BinanceSpotSymbolExchangeInfo {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quoteAssetPrecision: number;
  orderTypes: BinanceOrderType[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: BinanceSymbolFilter[];
  permissions: ('SPOT' | 'MARGIN')[];
}


// ---------------------------------------------------------------------------------------------------
//  getBalances
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/spot/en/#all-coins-39-information-user_data All Coins' Information (USER_DATA)} */
export interface BinanceSpotAccountBalance {
  coin: string;
  depositAllEnable: boolean;
  free: string;
  freeze: string;
  ipoable: string;
  isLegalMoney: boolean;
  locked: string;
  name: string;
  networkList: BinanceSpotCoinNetwork[];
  storage: string;
  trading: boolean;
  withdrawAllEnable: boolean;
  withdrawing: string;
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#all-coins-39-information-user_data All Coins' Information (USER_DATA)} */
export interface BinanceSpotCoinNetwork {
  addressRegex: string;
  coin: string;
  depositDesc: string;
  depositEnable: boolean;
  isDefault: boolean;
  memoRegex: string;
  minConfirm: number;
  name: string;
  network: string;
  resetAddressStatus: boolean;
  specialTips: string;
  unlockConfirm: number;
  withdrawDesc: string;
  withdrawEnable: boolean;
  withdrawFee: string;
  withdrawMin: string;
}


// ---------------------------------------------------------------------------------------------------
//  getAccountInformation
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/spot/en/#account-information-user_data Account Information (USER_DATA)} */
export interface BinanceSpotAccountInformation {
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  sellerCommission: number;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  updateTime: number;
  accountType: Uppercase<BinanceMarketType>;
  balances: BinanceSpotAssetInfo[];
  permissions: Uppercase<BinanceMarketType>[];
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#account-information-user_data Account Information (USER_DATA)} */
export interface BinanceSpotAssetInfo {
  asset: string;
  free: string;
  locked: string;
}


// ---------------------------------------------------------------------------------------------------
//  getAccountTradeList
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/spot/en/#account-trade-list-user_data Account Trade List (USER_DATA)} */
export interface BinanceSpotTradeListRequest {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  /** Results per page. Default 500; max 1000. */
  limit?: number;
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#account-trade-list-user_data Account Trade List (USER_DATA)} */
export interface BinanceSpotTradeList {
  symbol: string;
  id: number;
  orderId: number;
  orderListId: number;
  price: string;
  qty: string;
  quoteQty: string;
  commission: string;
  commissionAsset: string;
  time: number;
  isBuyer: boolean;
  isMaker: boolean;
  isBestMatch: boolean;
}


// ---------------------------------------------------------------------------------------------------
//  getSymbolPriceTicker
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/spot/en/#24hr-ticker-price-change-statistics Symbol Price Ticker} */
export interface BinanceSpotSymbolPriceTickerRequest {
  symbol?: string;
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#24hr-ticker-price-change-statistics Symbol Price Ticker} */
export interface BinanceSpotSymbolPriceTicker {
  symbol: string;
  price: string;
}


// ---------------------------------------------------------------------------------------------------
//  getSymbolOrderBookTicker
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker Symbol Order Book Ticker} */
export interface BinanceSpotSymbolOrderBookTickerRequest {
  symbol?: string;
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker Symbol Order Book Ticker} */
export interface BinanceSpotSymbolOrderBookTicker {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
}


// ---------------------------------------------------------------------------------------------------
//  getAllOrders . getOpenOrders . getOrder
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/spot/en/#all-orders-user_data All Orders (USER_DATA)} */
export interface BinanceSpotGetAllOrdersRequest {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  /** Results per page. Default 500; max 1000. */
  limit?: number;
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#current-open-orders-user_data Current Open Orders (USER_DATA)} */
export interface BinanceSpotGetOpenOrdersRequest {
  symbol: string;
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#query-order-user_data Query Order (USER_DATA)} */
export interface BinanceSpotGetOrderRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

/**
 * {@link https://binance-docs.github.io/apidocs/spot/en/#all-orders-user_data All Orders (USER_DATA)}
 * {@link https://binance-docs.github.io/apidocs/spot/en/#current-open-orders-user_data Current Open Orders (USER_DATA)}
 * {@link https://binance-docs.github.io/apidocs/spot/en/#query-order-user_data Query Order (USER_DATA)}
 */
 export interface BinanceSpotOrder {
  symbol: string;
  orderId: number;
  orderListId: number; // Unless OCO, the value will always be -1
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: BinanceOrderStatus;
  timeInForce: BinanceOrderTimeInForce;
  type: BinanceOrderType;
  side: BinanceOrderSide;
  stopPrice: string;
  icebergQty: string;
  time: number;
  updateTime: number;
  isWorking: boolean;
  origQuoteOrderQty: string;
}


// ---------------------------------------------------------------------------------------------------
//  postOrder
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/spot/en/#new-order-trade New Order (TRADE)} */
export interface BinanceSpotPostOrderRequest {
  symbol: string;
  side: BinanceOrderSide;
  type: BinanceOrderType;
  timeInForce?: BinanceOrderTimeInForce;
  quantity?: number;
  quoteOrderQty?: number;
  price?: number;
  newClientOrderId?: string;
  stopPrice?: number;
  icebergQty?: number;
  newOrderRespType?: BinanceOrderResponseType;
}

/**
 * `ACK` = confirmation of order acceptance (no placement/fill information)
 * 
 * `RESULT` = fill state
 * 
 * `FULL` = fill state + detail on fills and other detail
 */
export type BinanceSpotNewOrder = BinanceSpotNewOrderResponseACK | BinanceSpotNewOrderResponseResult | BinanceSpotNewOrderResponseFull;

/** {@link https://binance-docs.github.io/apidocs/spot/en/#new-order-trade New Order (TRADE)} */
export interface BinanceSpotNewOrderResponseACK {
  symbol: string;
  orderId: number;
  orderListId: number; // Unless OCO, the value will always be -1
  clientOrderId: string;
  transactTime: number;
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#new-order-trade New Order (TRADE)} */
export interface BinanceSpotNewOrderResponseResult {
  symbol: string;
  orderId: number;
  orderListId: number; // Unless OCO, the value will always be -1
  clientOrderId: string;
  transactTime: number;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: BinanceOrderStatus;
  timeInForce: BinanceOrderTimeInForce;
  type: BinanceOrderType;
  side: BinanceOrderSide;
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#new-order-trade New Order (TRADE)} */
export interface BinanceSpotNewOrderFill {
  price: string;
  qty: string;
  commission: string;
  commissionAsset: string;
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#new-order-trade New Order (TRADE)} */
export interface BinanceSpotNewOrderResponseFull {
  symbol: string;
  orderId: number;
  orderListId: number; // Unless OCO, the value will always be -1
  clientOrderId: string;
  transactTime: number;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: BinanceOrderStatus;
  timeInForce: BinanceOrderTimeInForce;
  type: BinanceOrderType;
  side: BinanceOrderSide;
  fills: BinanceSpotNewOrderFill[];
}


// ---------------------------------------------------------------------------------------------------
//  cancelOrder . cancelAllSymbolOrders
// ---------------------------------------------------------------------------------------------------

/** {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-order-trade Cancel Order (TRADE)} */
export interface BinanceSpotCancelOrderRequest {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  newClientOrderId?: string;
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-all-open-orders-on-a-symbol-trade Cancel all Open Orders on a Symbol (TRADE)} */
export interface BinanceSpotCancelAllSymbolOrdersRequest {
  symbol: string;
}

/**
 * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-order-trade Cancel Order (TRADE)}
 * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-all-open-orders-on-a-symbol-trade Cancel all Open Orders on a Symbol (TRADE)}
 */
export interface BinanceSpotCancelOrder {
  symbol: string;
  origClientOrderId: string;
  orderId: number;
  orderListId: number; // Unless part of an OCO, the value will always be -1.
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: BinanceOrderStatus;
  timeInForce?: BinanceOrderTimeInForce;
  side: BinanceOrderSide;
  type: BinanceOrderType;
}

