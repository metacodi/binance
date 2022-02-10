"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceApiSpot = void 0;
const binance_api_1 = require("./binance-api");
class BinanceApiSpot extends binance_api_1.BinanceApi {
    constructor(options) {
        super(options);
        this.market = 'spot';
        this.subdomain = 'api';
    }
    baseUrl() { return this.isTest ? 'testnet.binance.vision' : `${this.subdomain}.binance.com`; }
    getUserDataListenKey() {
        return this.post('api/v3/userDataStream', { isPublic: true });
    }
    keepAliveUserDataListenKey(listenKey) {
        return this.put(`api/v3/userDataStream?listenKey=${listenKey}`, { isPublic: true });
    }
    closeUserDataListenKey(listenKey) {
        return this.delete(`api/v3/userDataStream?listenKey=${listenKey}`, { isPublic: true });
    }
    getExchangeInfo(params) {
        if (params === null || params === void 0 ? void 0 : params.symbols) {
            params.symbols = JSON.stringify(params.symbols);
        }
        return this.get('api/v3/exchangeInfo', { params, isPublic: true, baseUrlOverride: 'api.binance.com' });
    }
    getBalances() {
        return this.get('sapi/v1/capital/config/getall');
    }
    getAccountInformation() {
        return this.get('api/v3/account');
    }
    getAccountTradeList(params) {
        return this.get('api/v3/myTrades', { params });
    }
    getSymbolPriceTicker(params, headers) {
        return this.get('api/v3/ticker/price', { isPublic: true, params, headers });
    }
    getSymbolOrderBookTicker(params) {
        return this.get('api/v3/ticker/bookTicker', { isPublic: true, params });
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