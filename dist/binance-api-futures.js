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
    getExchangeInfo() {
        return this.get('fapi/v1/exchangeInfo', { isPublic: true });
    }
    getSymbolPriceTicker(params) {
        return this.get('fapi/v1/ticker/price', { isPublic: true, params });
    }
    getSymbolOrderBookTicker(params) {
        return this.get('fapi/v1/ticker/bookTicker', { isPublic: true, params });
    }
    getSymbolKlines(params) {
        return this.get('fapi/v1/klines', { isPublic: true, params });
    }
    getUserDataListenKey() {
        return this.post('fapi/v1/listenKey', { createSignature: false });
    }
    keepAliveUserDataListenKey() {
        return this.put('fapi/v1/listenKey', { createSignature: false });
    }
    closeUserDataListenKey() {
        return this.delete('fapi/v1/listenKey', { createSignature: false });
    }
    getAccountInformation() {
        return this.get('fapi/v2/account');
    }
    getBalances() {
        return this.get('fapi/v2/balance');
    }
    getSymbolLeverageBracket(params) {
        return this.get('fapi/v1/leverageBracket', { params });
    }
    changeSymbolLeverage(params) {
        return this.post('fapi/v1/leverage', { params });
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
    getAccountTradeList(params) {
        return this.get('fapi/v1/userTrades', { params });
    }
    getPositionRisk(params) {
        return this.get('fapi/v2/positionRisk ', { params });
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