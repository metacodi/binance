"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const node_utils_1 = require("@metacodi/node-utils");
const acceptedBinanceSymbols = {
    BNBUSDT: 'BNB_USDT',
    BTCUSDT: 'BTC_USDT',
    ETCUSDT: 'ETC_USDT',
};
const parseBinanceSymbol = (symbol) => {
    if (!acceptedBinanceSymbols.hasOwnProperty(symbol)) {
        throw ({ message: `No s'ha descrit el símbol '${symbol}' pel parser de Binance.` });
    }
    return acceptedBinanceSymbols[symbol];
};
const binanceSymbol = (symbol) => {
    const found = Object.keys(acceptedBinanceSymbols).find(key => acceptedBinanceSymbols[key] === symbol);
    if (found) {
        return found;
    }
    throw ({ message: `No s'ha trobat el símbol '${symbol}' equivalent de Binance.` });
};
const parseBinanceInterval = (interval) => {
    return interval;
};
const binanceInterval = (interval) => {
    return interval;
};
const parseBinanceMarket = (market) => {
    switch (market) {
        case 'spot': return 'spot';
        case 'usdm': return 'futures';
        case 'coinm': return 'futures';
        default: throw ({ message: `No s'ha implementat el parser de Binance del mercat '${market}'` });
    }
};
const binanceMarket = (market, baseAsset) => {
    switch (market) {
        case 'spot': return 'spot';
        case 'futures': return !(baseAsset === null || baseAsset === void 0 ? void 0 : baseAsset.includes('USDT')) ? 'coinm' : 'usdm';
        default: throw ({ message: `No s'ha implementat el parser per Binance del mercat '${market}'` });
    }
};
const parseBinanceSide = (side) => {
    switch (side) {
        case 'BUY': return 'buy';
        case 'SELL': return 'sell';
        default: throw ({ message: `No s'ha implementat el parser per Binance del side '${side}'` });
    }
};
const binanceSide = (side) => {
    switch (side) {
        case 'buy': return 'BUY';
        case 'sell': return 'SELL';
        default: throw ({ message: `No s'ha implementat el parser per Binance del side '${side}'` });
    }
};
const binanceSpotOrderType = (type) => {
    switch (type) {
        case 'limit': return 'LIMIT';
        case 'market': return 'MARKET';
        case 'stop': return 'STOP_LOSS_LIMIT';
        case 'stop_market': return 'STOP_LOSS_LIMIT';
        default: throw ({ message: `No s'ha implementat el get per Binance del type Spot '${type}'` });
    }
};
const binanceFuturesOrderType = (type) => {
    switch (type) {
        case 'limit': return 'LIMIT';
        case 'market': return 'MARKET';
        case 'stop': return 'STOP';
        case 'stop_market': return 'STOP_MARKET';
        default: throw ({ message: `No s'ha implementat el get per Binance del type Futures '${type}'` });
    }
};
const parseBinanceType = (type, market) => {
    if (market === 'spot') {
        switch (type) {
            case 'LIMIT':
            case 'LIMIT_MAKER':
                return 'limit';
            case 'MARKET': return 'market';
            case 'STOP_LOSS': return 'stop';
            default: throw ({ message: `No s'ha implementat el parser per Binance del type Spot '${type}'` });
        }
    }
    else if (market === 'futures') {
        switch (type) {
            case 'LIMIT': return 'limit';
            case 'MARKET': return 'market';
            case 'STOP': return 'stop';
            case 'STOP_MARKET': return 'stop_market';
            default: throw ({ message: `No s'ha implementat el parser per Binance del type Futures '${type}'` });
        }
    }
};
const parseBinanceStatus = (status) => {
    switch (status) {
        case 'NEW': return 'new';
        case 'FILLED': return 'filled';
        case 'PARTIALLY_FILLED': return 'partial';
        case 'CANCELED': return 'canceled';
        case 'EXPIRED': return 'expired';
        case 'REJECTED': return 'rejected';
        default: throw ({ message: `No s'ha implementat el parser per Binance del type Spot '${status}'` });
    }
};
const parseBinanceSymbolExchangeInfo = (marketSymbol) => {
    if (marketSymbol.permissions) {
        const spot = marketSymbol;
        const result = {
            symbol: parseBinanceSymbol(spot.symbol),
            ready: true,
            quotePrecision: spot.quoteAssetPrecision,
            basePrecision: spot.baseAssetPrecision,
            quantityPrecision: spot.baseAssetPrecision,
            pricePrecision: 5,
        };
        return result;
    }
    else {
        const futures = marketSymbol;
        const result = {
            symbol: parseBinanceSymbol(futures.symbol),
            ready: true,
            quotePrecision: futures.quotePrecision,
            basePrecision: futures.baseAssetPrecision,
            quantityPrecision: futures.quantityPrecision,
            pricePrecision: futures.pricePrecision,
        };
        return result;
    }
};
const parseBinanceMiniTicker = (data) => {
    return {
        symbol: parseBinanceSymbol(data.symbol),
        price: data.close,
        timestamp: (0, node_utils_1.timestamp)(data.eventTime),
        baseVolume: data.baseAssetVolume,
        quoteVolume: data.quoteAssetVolume,
    };
};
const parseBinancePriceTicker = (data) => {
    if (Array.isArray(data)) {
        if (data.length) {
            data = data[0];
        }
        else {
            return undefined;
        }
    }
    return {
        symbol: parseBinanceSymbol(data.symbol),
        price: +data.price,
        timestamp: (0, node_utils_1.timestamp)(data.time),
    };
};
const parseBinanceOrderBookTicker = (data) => {
    if (Array.isArray(data)) {
        if (data.length) {
            data = data[0];
        }
        else {
            return undefined;
        }
    }
    if (data.hasOwnProperty('time'))
        return {
            symbol: parseBinanceSymbol(data.symbol),
            bidPrice: +data.bidPrice,
            bidQty: +data.bidQty,
            askPrice: +data.askPrice,
            askQty: +data.askQty,
            timestamp: (0, node_utils_1.timestamp)(),
        };
};
const parseBinanceKline = (data) => {
    return {
        symbol: parseBinanceSymbol(data.symbol),
        interval: parseBinanceInterval(data.interval),
        open: data.open,
        close: data.close,
        high: data.high,
        low: data.low,
        openTime: (0, node_utils_1.timestamp)(data.startTime),
        closeTime: (0, node_utils_1.timestamp)(data.closeTime),
        quoteVolume: data.quoteVolume,
    };
};
const parseBinanceBalanceSpot = (coinBalance) => {
    const available = +(coinBalance === null || coinBalance === void 0 ? void 0 : coinBalance.free);
    const locked = +(coinBalance === null || coinBalance === void 0 ? void 0 : coinBalance.locked);
    const balance = available + locked;
    return { asset: coinBalance.coin, available, locked, balance };
};
const parseBinanceBalanceFutures = (coinBalance) => {
    const available = +(coinBalance === null || coinBalance === void 0 ? void 0 : coinBalance.availableBalance);
    const balance = +(coinBalance === null || coinBalance === void 0 ? void 0 : coinBalance.balance);
    const locked = balance - available;
    return { asset: coinBalance.asset, available, locked, balance };
};
const parseBinanceOrder = (order, market) => {
    if (order.orderListId) {
        const spot = order;
        const status = parseBinanceStatus(spot.status);
        return {
            id: spot.clientOrderId,
            exchangeId: spot.orderId,
            side: parseBinanceSide(spot.side),
            type: parseBinanceType(spot.type, market),
            status: status,
            symbol: parseBinanceSymbol(spot.symbol),
            baseQuantity: isExecutedStatus(status) ? +spot.executedQty : +spot.origQty,
            quoteQuantity: +spot.cummulativeQuoteQty,
            price: +spot.price,
            stopPrice: +spot.stopPrice,
            isOco: spot.orderListId > -1,
            posted: (0, node_utils_1.timestamp)(spot.time),
            executed: isExecutedStatus(status) ? (0, node_utils_1.timestamp)(spot.updateTime) : undefined,
            syncronized: false,
        };
    }
    else {
        const futures = order;
        const status = parseBinanceStatus(futures.status);
        return {
            id: futures.clientOrderId,
            exchangeId: futures.orderId,
            side: parseBinanceSide(futures.side),
            type: parseBinanceType(futures.type, market),
            status: status,
            symbol: parseBinanceSymbol(futures.symbol),
            baseQuantity: isExecutedStatus(status) ? +futures.executedQty : +futures.origQty,
            quoteQuantity: +futures.cumQuote,
            price: futures.avgPrice ? +futures.avgPrice : +futures.price,
            stopPrice: +futures.stopPrice,
            posted: (0, node_utils_1.timestamp)(futures.time),
            executed: isExecutedStatus(status) ? (0, node_utils_1.timestamp)(futures.updateTime) : undefined,
            syncronized: false,
        };
    }
};
const parseBinanceOrderUpdate = (orderUpdate, market) => {
    const result = orderUpdate.order || orderUpdate;
    const status = parseBinanceStatus(result.orderStatus);
    if (result.originalClientOrderId) {
        const spot = result;
        const symbol = parseBinanceSymbol(spot.symbol);
        const order = {
            id: spot.originalClientOrderId,
            exchangeId: spot.orderId,
            side: parseBinanceSide(spot.side),
            type: parseBinanceType(spot.orderType, market),
            status, symbol,
            baseQuantity: isExecutedStatus(status) ? +spot.accumulatedQuantity : spot.quantity,
            quoteQuantity: +spot.cumulativeQuoteAssetTransactedQty,
            price: spot.lastTradePrice,
            posted: (0, node_utils_1.timestamp)(spot.orderCreationTime),
            executed: isExecutedStatus(status) ? (0, node_utils_1.timestamp)(spot.tradeTime) : undefined,
        };
        return { order, data: {
                commission: spot.commission,
                commissionAsset: spot.commissionAsset,
            } };
    }
    else {
        const futures = result;
        const symbol = parseBinanceSymbol(futures.symbol);
        const order = {
            id: futures.clientOrderId,
            exchangeId: futures.orderId,
            side: parseBinanceSide(futures.orderSide),
            type: parseBinanceType(futures.orderType, market),
            status, symbol,
            baseQuantity: isExecutedStatus(status) ? +futures.orderFilledAccumulatedQuantity : futures.originalQuantity,
            quoteQuantity: +futures.orderFilledAccumulatedQuantity * (futures.averagePrice ? +futures.averagePrice : +futures.lastFilledPrice),
            price: futures.averagePrice ? futures.averagePrice : futures.lastFilledPrice,
            profit: futures.realisedProfit,
        };
        const time = (0, node_utils_1.timestamp)(futures.orderTradeTime);
        if (isExecutedStatus(status)) {
            order.executed = time;
        }
        else {
            order.posted = time;
        }
        return { order, data: {
                commission: futures.commissionAmount,
                commissionAsset: futures.commissionAsset,
            } };
    }
};
const parseBinanceRateLimit = (data) => {
    const { rateLimitType, intervalNum, limit } = data;
    const unitOfTime = data.interval.toLowerCase();
    const seconds = moment_1.default.duration(intervalNum, unitOfTime).asSeconds();
    const maxQuantity = Math.floor(data.limit / seconds);
    return { type: rateLimitType, maxQuantity, period: 1, unitOfTime };
};
const isExecutedStatus = (status) => { return status === 'new' || status === 'expired'; };
//# sourceMappingURL=binance-parsers.js.map