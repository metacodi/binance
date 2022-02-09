
// ---------------------------------------------------------------------------------------------------
//  Api types
// ---------------------------------------------------------------------------------------------------

export interface BinanceApiOptions {
  /** Public user api key. */
  apiKey: string;
  /** Private user api key. */
  apiSecret: string;
  /** Indica si l'api està en mode test o en real. */
  isTest?: boolean,
  /** Override the max size of the request window (in ms). */
  recvWindow?: number;
}

/**
 * ```typescript
 * { params?: any, isPrivate?: boolean, baseUrlOverride?: string }
 * ```
 */
export interface BinanceApiResquestOptions {
  params?: any;
  isPublic?: boolean;
  baseUrlOverride?: string;
}

/** Subdominis per les API de binance. */
export type BinanceSpotSubdomain = 'api' | 'api1' | 'api2' | 'api3' | 'testnet';
export type BinanceFuturesSubdomain = 'fapi' | 'dapi' | 'testnet';
export type BinanceVanillaSubdomain = 'vapi';
export type BinanceSubdomain = BinanceSpotSubdomain | BinanceFuturesSubdomain | BinanceVanillaSubdomain;

export interface SignedRequestState {
  /** Request body as an object, as originally provided by caller. */
  requestBody: any;
  /** Params serialised into a query string, including timestamp and revvwindow. */
  serialisedParams: string | undefined;
  timestamp?: number;
  signature?: string;
  recvWindow?: number;
}


// ---------------------------------------------------------------------------------------------------
//  shared types
// ---------------------------------------------------------------------------------------------------

export type BinanceMarketType = 'spot' | 'usdm' | 'coinm' | 'margin' | 'voptions';

export type BinanceOrderSide = 'BUY' | 'SELL';

export type BinanceOrderType = 'LIMIT' | 'LIMIT_MAKER' | 'MARKET' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT' | 'TAKE_PROFIT' | 'TAKE_PROFIT_LIMIT';

export type BinanceOrderTimeInForce = 'GTC' | 'IOC' | 'FOK';

export type BinanceOrderStatus = 'NEW' | 'PARTIALLY_FILLED' | 'FILLED' | 'CANCELED' | 'CANCELLING' | 'PENDING_CANCEL' | 'REJECTED' | 'EXPIRED';

export type BinanceOrderExecutionType = 'NEW' | 'CANCELED' | 'REJECTED' | 'TRADE' | 'EXPIRED';

/**
 * `ACK` = confirmation of order acceptance (no placement/fill information)
 * 
 * `RESULT` = fill state
 * 
 * `FULL` = fill state + detail on fills and other detail
 */
export type BinanceOrderResponseType = 'ACK' | 'RESULT' | 'FULL';


export interface BinanceRateLimiter {
  rateLimitType: 'REQUEST_WEIGHT' | 'ORDERS' | 'RAW_REQUESTS';
  interval: 'SECOND' | 'MINUTE' | 'DAY';
  intervalNum: number;
  limit: number;
}


export interface BinanceSymbolPriceFilter {
  filterType: 'PRICE_FILTER';
  minPrice: string;
  maxPrice: string;
  tickSize: string;
}

export interface BinanceSymbolPercentPriceFilter {
  filterType: 'PERCENT_PRICE';
  multiplierUp: string;
  multiplierDown: string;
  avgPriceMins: number;
}

export interface BinanceSymbolLotSizeFilter {
  filterType: 'LOT_SIZE';
  minQty: string;
  maxQty: string;
  stepSize: string;
}

export interface BinanceSymbolMinNotionalFilter {
  filterType: 'MIN_NOTIONAL';
  minNotional: string;
  applyToMarket: boolean;
  avgPriceMins: number;
}

export interface BinanceSymbolIcebergPartsFilter {
  filterType: 'ICEBERG_PARTS';
  limit: number;
}

export interface BinanceSymbolMarketLotSizeFilter {
  filterType: 'MARKET_LOT_SIZE';
  minQty: string;
  maxQty: string;
  stepSize: string;
}

export interface BinanceSymbolMaxOrdersFilter {
  filterType: 'MAX_NUM_ORDERS';
  maxNumOrders: number;
}

export interface BinanceSymbolMaxAlgoOrdersFilter {
  filterType: 'MAX_NUM_ALGO_ORDERS';
  maxNumAlgoOrders: number;
}

export interface BinanceSymbolMaxIcebergOrdersFilter {
  filterType: 'MAX_NUM_ICEBERG_ORDERS';
  maxNumIcebergOrders: number;
}

export interface BinanceSymbolMaxPositionFilter {
  filterType: 'MAX_POSITION';
  maxPosition: string;
}

export type BinanceSymbolFilter = BinanceSymbolPriceFilter | BinanceSymbolPercentPriceFilter | BinanceSymbolLotSizeFilter
  | BinanceSymbolMinNotionalFilter | BinanceSymbolIcebergPartsFilter | BinanceSymbolMarketLotSizeFilter | BinanceSymbolMaxOrdersFilter
  | BinanceSymbolMaxAlgoOrdersFilter | BinanceSymbolMaxIcebergOrdersFilter | BinanceSymbolMaxPositionFilter
;


export interface BinanceExchangeMaxNumOrdersFilter {
  filterType: 'EXCHANGE_MAX_NUM_ORDERS';
  maxNumOrders: number;
}

export interface BinanceExchangeMaxAlgoOrdersFilter {
  filterType: 'EXCHANGE_MAX_ALGO_ORDERS';
  maxNumAlgoOrders: number;
}

export type BinanceExchangeFilter = BinanceExchangeMaxNumOrdersFilter | BinanceExchangeMaxAlgoOrdersFilter;



/** {@link https://binance-docs.github.io/apidocs/spot/en/#system-status-system System Status (System)} */
export interface SystemStatusResponse {
  status: 0 | 1;
  msg: 'normal' | 'system_maintenance';
}


/** {@link https://binance-docs.github.io/apidocs/spot/en/#get-api-key-permission-user_data Get API Key Permission (USER_DATA)} */
export interface BinanceApiPermissions {
  ipRestrict: boolean;
  createTime: number;
  enableWithdrawals: boolean;
  enableInternalTransfer: boolean;
  permitsUniversalTransfer: boolean;
  enableVanillaOptions: boolean;
  enableReading: boolean;
  enableFutures: boolean;
  enableMargin: boolean;
  enableSpotAndMarginTrading: boolean;
  tradingAuthorityExpirationTime: number;
}


/** {@link https://binance-docs.github.io/apidocs/spot/en/#funding-wallet-user_data Funding Wallet (USER_DATA)} */
export interface BinanceFundingWalletRequest {
  asset?: string;
  needBtcValuation?: boolean;
}

/** {@link https://binance-docs.github.io/apidocs/spot/en/#funding-wallet-user_data Funding Wallet (USER_DATA)} */
export interface BinanceFundingWallet {
  asset: string;
  free: string;
  locked: string;
  freeze: string;
  withdrawing: string;
  btcValuation: string;
}
