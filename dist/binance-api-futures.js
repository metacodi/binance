"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceApiFutures = void 0;
const binance_api_1 = require("./binance-api");
class BinanceApiFutures extends binance_api_1.BinanceApi {
    constructor(options) {
        super(options);
        this.market = 'usdm';
        this.subdomain = 'fapi';
    }
    baseUrl() { return this.isTest ? 'testnet.binancefuture.com' : `${this.subdomain}.binance.com`; }
    getUserDataListenKey() {
        return this.post('fapi/v1/listenKey', { createSignature: false });
    }
    keepAliveUserDataListenKey(listenKey) {
        return this.put('fapi/v1/listenKey', { createSignature: false });
    }
    closeUserDataListenKey(listenKey) {
        return this.delete('fapi/v1/listenKey', { createSignature: false });
    }
    getExchangeInfo() {
        return this.get('fapi/v1/exchangeInfo', { isPublic: true });
    }
    getBalances() {
        return this.get('fapi/v2/balance');
    }
    getAccountInformation() {
        return this.get('fapi/v2/account');
    }
    getAccountTradeList(params) {
        return this.get('fapi/v1/userTrades', { params });
    }
    getSymbolPriceTicker(params) {
        return this.get('fapi/v1/ticker/price', { isPublic: true, params });
    }
    getSymbolOrderBookTicker(params) {
        return this.get('fapi/v1/ticker/bookTicker', { isPublic: true, params });
    }
    getAllOrders(params) {
        return this.get('fapi/v1/allOrders', { params });
    }
    getOpenOrders(params) {
        return this.get('fapi/v1/openOrders', { params });
    }
    getOrder(params) {
        return this.get('fapi/v1/order', { params });
    }
    postOrder(params) {
        return this.post('fapi/v1/order', { params });
    }
    cancelOrder(params) {
        return this.delete('fapi/v1/order', { params });
    }
    cancelAllSymbolOrders(params) {
        return this.delete('fapi/v1/allOpenOrders', { params });
    }
}
exports.BinanceApiFutures = BinanceApiFutures;
//# sourceMappingURL=binance-api-futures.js.map