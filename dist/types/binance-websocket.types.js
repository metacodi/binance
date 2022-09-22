"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBinanceWsKline = exports.parseBookTicker = exports.parseMiniTicker = exports.parseOrderUpdate = exports.parseAccountConfigUpdate = exports.parseMarginCall = exports.parseAccountUpdate = exports.parseBalanceUpdate = void 0;
function parseBalanceUpdate(data) {
    if (data.e === 'balanceUpdate') {
        return {
            eventType: 'balanceUpdate',
            eventTime: data.E,
            asset: data.a,
            balanceDelta: +data.d,
            clearTime: data.T,
        };
    }
    else if (data.e === 'ACCOUNT_UPDATE') {
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
                })),
                updatedPositions: data.a.P.map(p => ({
                    symbol: p.s,
                    marginAsset: undefined,
                    positionAmount: +p.pa,
                    entryPrice: +p.ep,
                    accumulatedRealisedPreFee: +p.cr,
                    unrealisedPnl: +p.up,
                    marginType: p.mt,
                    isolatedWalletAmount: +p.iw,
                    positionSide: p.ps,
                })),
            },
        };
    }
}
exports.parseBalanceUpdate = parseBalanceUpdate;
function parseAccountUpdate(data) {
    if (data.e === 'outboundAccountPosition') {
        return {
            eventType: 'outboundAccountPosition',
            eventTime: data.E,
            lastAccountUpdateTime: data.u,
            balances: data.B.map(b => ({
                asset: b.a,
                free: +b.f,
                locked: +b.l,
            })),
        };
    }
    else if (data.e === 'ACCOUNT_UPDATE') {
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
                })),
                updatedPositions: data.a.P.map(p => ({
                    symbol: p.s,
                    marginAsset: undefined,
                    positionAmount: +p.pa,
                    entryPrice: +p.ep,
                    accumulatedRealisedPreFee: +p.cr,
                    unrealisedPnl: +p.up,
                    marginType: p.mt,
                    isolatedWalletAmount: +p.iw,
                    positionSide: p.ps,
                })),
            },
        };
    }
}
exports.parseAccountUpdate = parseAccountUpdate;
function parseMarginCall(data) {
    var _a;
    return {
        eventType: 'MARGIN_CALL',
        eventTime: data.E,
        crossWalletBalance: +data.cw,
        positions: ((_a = data.p) === null || _a === void 0 ? void 0 : _a.map(p => ({
            symbol: p.s,
            positionSide: p.ps,
            positionAmount: +p.pa,
            marginType: p.mt,
            isolatedWalletAmount: +p.iw,
            markPrice: +p.mp,
            unrealisedPnl: +p.up,
            maintenanceMarginRequired: +p.mm,
        }))) || [],
    };
}
exports.parseMarginCall = parseMarginCall;
function parseAccountConfigUpdate(data) {
    const parsed = {
        eventType: 'ACCOUNT_CONFIG_UPDATE',
        eventTime: data.E,
        transactionTime: data.T,
    };
    if (data.ac) {
        parsed.assetConfiguration = {
            symbol: data.ac.s,
            leverage: data.ac.l,
        };
    }
    if (data.ac) {
        parsed.accountConfiguration = {
            isMultiAssetsMode: data.ai.j,
        };
    }
    return parsed;
}
exports.parseAccountConfigUpdate = parseAccountConfigUpdate;
function parseOrderUpdate(data) {
    if (data.e === 'executionReport') {
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
    }
    else if (data.e === 'ORDER_TRADE_UPDATE') {
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
exports.parseOrderUpdate = parseOrderUpdate;
function parseMiniTicker(data) {
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
exports.parseMiniTicker = parseMiniTicker;
function parseBookTicker(data) {
    return {
        eventType: 'bookTicker',
        updateId: data.u,
        symbol: data.s,
        bidPrice: +data.b,
        bidQty: +data.B,
        askPrice: +data.a,
        askQty: +data.A,
    };
}
exports.parseBookTicker = parseBookTicker;
function parseBinanceWsKline(data) {
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
exports.parseBinanceWsKline = parseBinanceWsKline;
//# sourceMappingURL=binance-websocket.types.js.map