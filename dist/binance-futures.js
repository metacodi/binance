"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceFutures = void 0;
const binance_api_1 = require("./binance-api");
class BinanceFutures extends binance_api_1.BinanceApi {
    constructor(options) {
        super(options);
        this.market = 'futures';
        this.subdomain = 'fapi';
    }
    baseUrl() { return this.isTest ? 'testnet.binancefuture.com' : `${this.subdomain}.binance.com`; }
    // ---------------------------------------------------------------------------------------------------
    //  entities
    // ---------------------------------------------------------------------------------------------------
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#exchange-information Exchange Information} */
    getExchangeInfo() {
        return this.get('fapi/v1/exchangeInfo', { isPublic: true });
    }
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#futures-account-balance-v2-user_data Futures Account Balance V2 (USER_DATA)} */
    getBalances() {
        return this.get('fapi/v2/balance');
    }
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#account-information-v2-user_data Account Information V2 (USER_DATA)} */
    getAccountInformation() {
        return this.get('fapi/v2/account');
    }
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#account-trade-list-user_data Account Trade List (USER_DATA)} */
    getAccountTradeList(params) {
        return this.get('fapi/v1/userTrades', { params });
    }
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#24hr-ticker-price-change-statistics Symbol Price Ticker} */
    getSymbolPriceTicker(params) {
        return this.get('fapi/v1/ticker/price', { isPublic: true, params });
    }
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#symbol-order-book-ticker Symbol Order Book Ticker} */
    getSymbolOrderBookTicker(params) {
        return this.get('fapi/v1/ticker/bookTicker', { isPublic: true, params });
    }
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#all-orders-user_data All Orders (USER_DATA)} */
    getAllOrders(params) {
        return this.get('fapi/v1/allOrders', { params });
    }
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#current-all-open-orders-user_data Current All Open Orders (USER_DATA)} */
    getOpenOrders(params) {
        return this.get('fapi/v1/openOrders', { params });
    }
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#query-order-user_data Query Order (USER_DATA)} */
    getOrder(params) {
        return this.get('fapi/v1/order', { params });
    }
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#new-order-trade New Order (TRADE)} */
    postOrder(params) {
        return this.post('fapi/v1/order', { params });
    }
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#cancel-order-trade Cancel Order (TRADE)} */
    cancelOrder(params) {
        return this.delete('fapi/v1/order', { params });
    }
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#cancel-all-open-orders-trade Cancel All Open Orders (TRADE)} */
    cancelAllSymbolOrders(params) {
        return this.delete('fapi/v1/allOpenOrders', { params });
    }
}
exports.BinanceFutures = BinanceFutures;
//# sourceMappingURL=binance-futures.js.map