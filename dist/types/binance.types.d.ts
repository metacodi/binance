export interface BinanceApiOptions {
    apiKey: string;
    apiSecret: string;
    isTest?: boolean;
    recvWindow?: number;
}
export interface BinanceApiResquestOptions {
    params?: any;
    headers?: {
        [key: string]: string | number;
    };
    isPublic?: boolean;
    createSignature?: boolean;
    baseUrlOverride?: string;
}
export declare type BinanceSpotSubdomain = 'api' | 'api1' | 'api2' | 'api3' | 'testnet';
export declare type BinanceFuturesSubdomain = 'fapi' | 'dapi' | 'testnet';
export declare type BinanceVanillaSubdomain = 'vapi';
export declare type BinanceSubdomain = BinanceSpotSubdomain | BinanceFuturesSubdomain | BinanceVanillaSubdomain;
export interface SignedRequestState {
    requestBody: any;
    serialisedParams: string | undefined;
    timestamp?: number;
    signature?: string;
    recvWindow?: number;
}
export declare type BinanceMarketType = 'spot' | 'usdm' | 'coinm' | 'margin' | 'voptions';
export declare type BinanceOrderSide = 'BUY' | 'SELL';
export declare type BinanceOrderType = 'LIMIT' | 'LIMIT_MAKER' | 'MARKET' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT' | 'TAKE_PROFIT' | 'TAKE_PROFIT_LIMIT';
export declare type BinanceOrderTimeInForce = 'GTC' | 'IOC' | 'FOK';
export declare type BinanceOrderStatus = 'NEW' | 'PARTIALLY_FILLED' | 'FILLED' | 'CANCELED' | 'CANCELLING' | 'PENDING_CANCEL' | 'REJECTED' | 'EXPIRED';
export declare type BinanceOrderExecutionType = 'NEW' | 'CANCELED' | 'REJECTED' | 'TRADE' | 'EXPIRED';
export declare type BinanceOrderResponseType = 'ACK' | 'RESULT' | 'FULL';
export declare type BinanceKlineInterval = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M';
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
export declare type BinanceSymbolFilter = BinanceSymbolPriceFilter | BinanceSymbolPercentPriceFilter | BinanceSymbolLotSizeFilter | BinanceSymbolMinNotionalFilter | BinanceSymbolIcebergPartsFilter | BinanceSymbolMarketLotSizeFilter | BinanceSymbolMaxOrdersFilter | BinanceSymbolMaxAlgoOrdersFilter | BinanceSymbolMaxIcebergOrdersFilter | BinanceSymbolMaxPositionFilter;
export interface BinanceExchangeMaxNumOrdersFilter {
    filterType: 'EXCHANGE_MAX_NUM_ORDERS';
    maxNumOrders: number;
}
export interface BinanceExchangeMaxAlgoOrdersFilter {
    filterType: 'EXCHANGE_MAX_ALGO_ORDERS';
    maxNumAlgoOrders: number;
}
export declare type BinanceExchangeFilter = BinanceExchangeMaxNumOrdersFilter | BinanceExchangeMaxAlgoOrdersFilter;
export interface SystemStatusResponse {
    status: 0 | 1;
    msg: 'normal' | 'system_maintenance';
}
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
export interface BinanceFundingWalletRequest {
    asset?: string;
    needBtcValuation?: boolean;
}
export interface BinanceFundingWallet {
    asset: string;
    free: string;
    locked: string;
    freeze: string;
    withdrawing: string;
    btcValuation: string;
}
//# sourceMappingURL=binance.types.d.ts.map