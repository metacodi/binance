"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceApiSpot = void 0;
const moment_1 = __importDefault(require("moment"));
const binance_api_1 = require("./binance-api");
class BinanceApiSpot extends binance_api_1.BinanceApi {
    constructor(options) {
        super(options);
        this.market = 'spot';
        this.subdomain = 'api';
    }
    baseUrl() { return this.isTest ? 'testnet.binance.vision' : `${this.subdomain}.binance.com`; }
    getExchangeInfo(params) {
        if (params === null || params === void 0 ? void 0 : params.symbols) {
            params.symbols = JSON.stringify(params.symbols);
        }
        return this.get('api/v3/exchangeInfo', { params, isPublic: true, baseUrlOverride: 'api.binance.com' });
    }
    parseBinanceRateLimit(data) {
        const { rateLimitType, intervalNum, limit } = data;
        const unitOfTime = data.interval.toLowerCase();
        const seconds = moment_1.default.duration(intervalNum, unitOfTime).asSeconds();
        const maxQuantity = Math.floor(data.limit / seconds);
        return { type: rateLimitType, maxQuantity, period: 1, unitOfTime };
    }
    getSymbolPriceTicker(params) {
        return this.get('api/v3/ticker/price', { isPublic: true, params });
    }
    getSymbolOrderBookTicker(params) {
        return this.get('api/v3/ticker/bookTicker', { isPublic: true, params });
    }
    getSymbolKlines(params) {
        return this.get('api/v3/klines', { isPublic: true, params });
    }
    getUserDataListenKey() {
        return this.post('api/v3/userDataStream', { createSignature: false });
    }
    keepAliveUserDataListenKey(listenKey) {
        return this.put(`api/v3/userDataStream?listenKey=${listenKey}`, { createSignature: false });
    }
    closeUserDataListenKey(listenKey) {
        return this.delete(`api/v3/userDataStream?listenKey=${listenKey}`, { createSignature: false });
    }
    getAccountInformation() {
        return this.get('api/v3/account');
    }
    getBalances() {
        return this.get('sapi/v1/capital/config/getall');
    }
    getAllOrders(params) {
        return this.get('api/v3/allOrders', { params });
    }
    getOpenOrders(params) {
        return this.get('api/v3/openOrders', { params });
    }
    getOrder(params) {
        return this.get('api/v3/order', { params });
    }
    getAccountTradeList(params) {
        return this.get('api/v3/myTrades', { params });
    }
    postOrder(params) {
        return this.post('api/v3/order', { params });
    }
    cancelOrder(params) {
        return this.delete('api/v3/order', { params });
    }
    cancelAllSymbolOrders(params) {
        return this.delete('api/v3/openOrders', { params });
    }
}
exports.BinanceApiSpot = BinanceApiSpot;
//# sourceMappingURL=binance-api-spot.js.map