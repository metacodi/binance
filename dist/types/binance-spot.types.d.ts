import { BinanceMarketType, BinanceExchangeFilter, BinanceOrderType, BinanceRateLimiter, BinanceSymbolFilter, BinanceOrderSide, BinanceOrderStatus, BinanceOrderTimeInForce, BinanceOrderResponseType } from './binance.types';
export interface BinanceSpotExchangeInfoRequest {
    symbol?: string;
    symbols?: string[];
}
export interface BinanceSpotExchangeInfo {
    timezone: string;
    serverTime: number;
    rateLimits: BinanceRateLimiter[];
    exchangeFilters: BinanceExchangeFilter[];
    symbols: BinanceSpotSymbolExchangeInfo[];
}
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
export interface BinanceSpotAssetInfo {
    asset: string;
    free: string;
    locked: string;
}
export interface BinanceSpotTradeListRequest {
    symbol: string;
    orderId?: number;
    startTime?: number;
    endTime?: number;
    limit?: number;
}
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
export interface BinanceSpotSymbolPriceTickerRequest {
    symbol?: string;
}
export interface BinanceSpotSymbolPriceTicker {
    symbol: string;
    price: string;
}
export interface BinanceSpotSymbolOrderBookTickerRequest {
    symbol?: string;
}
export interface BinanceSpotSymbolOrderBookTicker {
    symbol: string;
    bidPrice: string;
    bidQty: string;
    askPrice: string;
    askQty: string;
}
export interface BinanceSpotGetAllOrdersRequest {
    symbol: string;
    orderId?: number;
    startTime?: number;
    endTime?: number;
    limit?: number;
}
export interface BinanceSpotGetOpenOrdersRequest {
    symbol: string;
}
export interface BinanceSpotGetOrderRequest {
    symbol: string;
    orderId?: number;
    origClientOrderId?: string;
}
export interface BinanceSpotOrder {
    symbol: string;
    orderId: number;
    orderListId: number;
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
export declare type BinanceSpotNewOrder = BinanceSpotNewOrderResponseACK | BinanceSpotNewOrderResponseResult | BinanceSpotNewOrderResponseFull;
export interface BinanceSpotNewOrderResponseACK {
    symbol: string;
    orderId: number;
    orderListId: number;
    clientOrderId: string;
    transactTime: number;
}
export interface BinanceSpotNewOrderResponseResult {
    symbol: string;
    orderId: number;
    orderListId: number;
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
export interface BinanceSpotNewOrderFill {
    price: string;
    qty: string;
    commission: string;
    commissionAsset: string;
}
export interface BinanceSpotNewOrderResponseFull {
    symbol: string;
    orderId: number;
    orderListId: number;
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
export interface BinanceSpotCancelOrderRequest {
    symbol: string;
    orderId?: number;
    origClientOrderId?: string;
    newClientOrderId?: string;
}
export interface BinanceSpotCancelAllSymbolOrdersRequest {
    symbol: string;
}
export interface BinanceSpotCancelOrder {
    symbol: string;
    origClientOrderId: string;
    orderId: number;
    orderListId: number;
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
//# sourceMappingURL=binance-spot.types.d.ts.map