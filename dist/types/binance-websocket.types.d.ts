import { BinanceFuturesOrderType, BinanceFuturesWorkingType, BinanceKlineInterval, BinanceMarketType, BinanceOrderExecutionType, BinanceOrderSide, BinanceOrderStatus, BinanceOrderTimeInForce, BinanceOrderType, BinancePositionSide } from '..';
import { BinanceMarginType } from './binance-futures.types';
export declare type WsConnectionState = 'initial' | 'connecting' | 'connected' | 'reconnecting' | 'closing';
export declare type WsStreamType = 'user' | 'market';
export declare type WsStreamFormat = 'raw' | 'stream';
export declare type WsUserStreamEmitterType = 'accountUpdate' | 'balanceUpdate' | 'marginCall' | 'accountConfigUpdate' | 'orderUpdate';
export declare type WsMarketStreamEmitterType = 'symbolMiniTicker' | 'symbolTicker';
export declare type WsStreamEmitterType = WsUserStreamEmitterType | WsMarketStreamEmitterType;
export interface BinanceWebsocketOptions {
    market: BinanceMarketType;
    streamType: WsStreamType;
    streamFormat?: WsStreamFormat;
    apiKey?: string;
    apiSecret?: string;
    isTest?: boolean;
    reconnectPeriod?: number;
    pingPeriod?: number;
    pongPeriod?: number;
}
interface BinanceWsSpotBalanceUpdateRaw {
    e: 'balanceUpdate';
    E: number;
    a: string;
    d: string;
    T: number;
}
export interface BinanceWsSpotBalanceUpdate {
    eventType: 'balanceUpdate';
    eventTime: number;
    asset: string;
    balanceDelta: number;
    clearTime: number;
}
export declare function parseBalanceUpdate(data: BinanceWsSpotBalanceUpdateRaw | BinanceWsFuturesAccountUpdateRaw): BinanceWsSpotBalanceUpdate | BinanceWsFuturesAccountUpdate;
interface BinanceWsSpotAccountUpdateRaw {
    e: 'outboundAccountPosition';
    E: number;
    u: number;
    B: {
        a: string;
        f: string;
        l: string;
    }[];
}
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
declare type BinanceAccountUpdateEventType = "DEPOSIT" | "WITHDRAW" | "ORDER" | "FUNDING_FEE" | "WITHDRAW_REJECT" | "ADJUSTMENT" | "INSURANCE_CLEAR" | "ADMIN_DEPOSIT" | "ADMIN_WITHDRAW" | "MARGIN_TRANSFER" | "MARGIN_TYPE_CHANGE" | "ASSET_TRANSFER" | "OPTIONS_PREMIUM_FEE" | "OPTIONS_SETTLE_PROFIT" | "AUTO_EXCHANGE";
interface BinanceWsFuturesAccountUpdateRaw {
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
export interface BinanceWsFuturesAccountUpdate {
    eventType: 'ACCOUNT_UPDATE';
    eventTime: number;
    transactionId: number;
    updateData: {
        updateEventType: BinanceAccountUpdateEventType;
        updatedBalances: {
            asset: string;
            balanceChange: number;
            crossWalletBalance: number;
            walletBalance: number;
        }[];
        updatedPositions: {
            symbol: string;
            marginAsset?: string;
            positionAmount: number;
            entryPrice: number;
            accumulatedRealisedPreFee: number;
            unrealisedPnl: number;
            marginType: 'cross' | 'isolated';
            isolatedWalletAmount: number;
            positionSide: BinancePositionSide;
        }[];
    };
}
export declare function parseAccountUpdate(data: BinanceWsSpotAccountUpdateRaw | BinanceWsFuturesAccountUpdateRaw): BinanceWsSpotAccountUpdate | BinanceWsFuturesAccountUpdate;
interface BinanceWsFuturesMarginCallRaw {
    e: 'MARGIN_CALL';
    E: number;
    cw: string;
    p: {
        s: string;
        ps: BinancePositionSide;
        pa: string;
        mt: BinanceMarginType;
        iw: string;
        mp: string;
        up: string;
        mm: string;
    }[];
}
export interface BinanceWsFuturesMarginCall {
    eventType: 'MARGIN_CALL';
    eventTime: number;
    crossWalletBalance: number;
    positions: {
        symbol: string;
        positionSide: BinancePositionSide;
        positionAmount: number;
        marginType: BinanceMarginType;
        isolatedWalletAmount: number;
        markPrice: number;
        unrealisedPnl: number;
        maintenanceMarginRequired: number;
    }[];
}
export declare function parseMarginCall(data: BinanceWsFuturesMarginCallRaw): BinanceWsFuturesMarginCall;
interface BinanceWsFuturesAccountConfigUpdateRaw {
    e: 'ACCOUNT_CONFIG_UPDATE';
    E: number;
    T: number;
    ac?: {
        s: string;
        l: number;
    };
    ai?: {
        j: boolean;
    };
}
export interface BinanceWsFuturesAccountConfigUpdate {
    eventType: 'ACCOUNT_CONFIG_UPDATE';
    eventTime: number;
    transactionTime: number;
    assetConfiguration?: {
        symbol: string;
        leverage: number;
    };
    accountConfiguration?: {
        isMultiAssetsMode: boolean;
    };
}
export declare function parseAccountConfigUpdate(data: BinanceWsFuturesAccountConfigUpdateRaw): BinanceWsFuturesAccountConfigUpdate;
interface BinanceWsSpotOrderUpdateRaw {
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
interface BinanceWsFuturesOrderUpdateRaw {
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
export declare function parseOrderUpdate(data: BinanceWsSpotOrderUpdateRaw | BinanceWsFuturesOrderUpdateRaw): BinanceWsSpotOrderUpdate | BinanceWsFuturesOrderUpdate;
interface BinanceWs24hrMiniTickerRaw {
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
export interface BinanceWs24hrMiniTicker {
    eventType: '24hrMiniTicker';
    eventTime: number;
    symbol: string;
    contractSymbol?: string;
    close: number;
    open: number;
    high: number;
    low: number;
    baseAssetVolume: number;
    quoteAssetVolume: number;
}
export declare function parseMiniTicker(data: BinanceWs24hrMiniTickerRaw): BinanceWs24hrMiniTicker;
interface BinanceWsBookTickerRaw {
    e: 'bookTicker';
    u: number;
    E?: number;
    T?: number;
    s: string;
    b: string;
    B: string;
    a: string;
    A: string;
}
export interface BinanceWsBookTicker {
    eventType: 'bookTicker';
    eventTime?: number;
    transactionTime?: number;
    updateId: number;
    symbol: string;
    bidPrice: number;
    bidQty: number;
    askPrice: number;
    askQty: number;
}
export declare function parseBookTicker(data: BinanceWsBookTickerRaw): BinanceWsBookTicker;
interface BinanceWsKlineRaw {
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
export interface BinanceWsKline {
    eventType: 'kline';
    eventTime: number;
    symbol: string;
    startTime: number;
    closeTime: number;
    interval: BinanceKlineInterval;
    firstTradeId: number;
    lastTradeId: number;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    trades: number;
    final: false;
    quoteVolume: number;
    volumeActive: number;
    quoteVolumeActive: number;
    ignored: number;
}
export declare function parseKline(data: BinanceWsKlineRaw): BinanceWsKline;
export {};
//# sourceMappingURL=binance-websocket.types.d.ts.map