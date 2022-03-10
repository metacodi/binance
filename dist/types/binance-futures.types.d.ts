import { BinanceExchangeFilter, BinanceOrderTimeInForce, BinanceRateLimiter, BinanceSymbolFilter, BinanceOrderType, BinanceOrderSide, BinanceOrderStatus, BinanceOrderResponseType, BinanceKlineInterval } from './binance.types';
export declare type BinancePositionSide = 'BOTH' | 'LONG' | 'SHORT';
export declare type BinanceContractType = 'PERPETUAL' | 'CURRENT_MONTH' | 'NEXT_MONTH' | 'CURRENT_QUARTER' | 'NEXT_QUARTER';
export declare type BinanceContractStatus = 'PENDING_TRADING' | 'TRADING' | 'PRE_DELIVERING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED' | 'PRE_SETTLE' | 'SETTLING' | 'CLOSE';
export declare type BinanceFuturesOrderType = 'LIMIT' | 'MARKET' | 'STOP' | 'STOP_MARKET' | 'TAKE_PROFIT' | 'TAKE_PROFIT_MARKET' | 'TRAILING_STOP_MARKET';
export declare type BinanceFuturesWorkingType = "MARK_PRICE" | "CONTRACT_PRICE";
export declare type BinanceMarginType = "ISOLATED" | "CROSSED";
export interface BinanceFuturesExchangeInfo {
    exchangeFilters: BinanceExchangeFilter[];
    rateLimits: BinanceRateLimiter[];
    serverTime: number;
    assets: any[];
    symbols: BinanceFuturesSymbolExchangeInfo[];
    timezone: string;
}
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
    underlyingType: 'COIN' | 'INDEX';
    underlyingSubType: string[];
    settlePlan: number;
    triggerProtect: string;
    filters: BinanceSymbolFilter[];
    OrderType: BinanceOrderType[];
    timeInForce: BinanceOrderTimeInForce[];
    liquidationFee: string;
    marketTakeBound: string;
}
export interface BinanceFuturesSymbolPriceTickerRequest {
    symbol?: string;
}
export interface BinanceFuturesSymbolPriceTicker {
    symbol: string;
    price: string;
    time: number;
}
export interface BinanceFuturesSymbolOrderBookTickerRequest {
    symbol?: string;
}
export interface BinanceFuturesSymbolOrderBookTicker {
    symbol: string;
    bidPrice: string;
    bidQty: string;
    askPrice: string;
    askQty: string;
    time: number;
}
export interface BinanceFuturesSymbolKlinesRequest {
    symbol: string;
    interval: BinanceKlineInterval;
    startTime?: number;
    endTime?: number;
    limit?: number;
}
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
export interface BinanceFuturesSymbolLeverageBracketRequest {
    symbol?: string;
}
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
export interface BinanceFuturesChangeSymbolLeverageRequest {
    symbol?: string;
    leverage: number;
}
export interface BinanceFuturesChangeSymbolLeverageResponse {
    symbol?: string;
    leverage: number;
    maxNotionalValue: string;
}
export interface BinanceFuturesGetAllOrdersRequest {
    symbol: string;
    orderId?: number;
    startTime?: number;
    endTime?: number;
    limit?: number;
}
export interface BinanceFuturesGetOpenOrdersRequest {
    symbol: string;
}
export interface BinanceFuturesGetOrderRequest {
    symbol: string;
    orderId?: number;
    origClientOrderId?: string;
}
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
export interface BinanceFuturesTradeListRequest {
    symbol: string;
    fromId?: number;
    startTime?: number;
    endTime?: number;
    limit?: number;
}
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
export interface BinanceFuturesPositionRiskRequest {
    symbol: string;
}
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
export declare type BinanceFuturesNewOrder = BinanceFuturesNewOrderResponseResult;
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
export interface BinanceFuturesCancelOrderRequest {
    symbol: string;
    orderId?: number;
    origClientOrderId?: string;
}
export interface BinanceFuturesCancelAllSymbolOrdersRequest {
    symbol: string;
}
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
//# sourceMappingURL=binance-futures.types.d.ts.map