"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceSpot = void 0;
const binance_api_1 = require("./binance-api");
class BinanceSpot extends binance_api_1.BinanceApi {
    constructor(options) {
        super(options);
        this.market = 'spot';
        this.subdomain = 'api';
    }
    baseUrl() { return this.isTest ? 'testnet.binance.vision' : `${this.subdomain}.binance.com`; }
    // ---------------------------------------------------------------------------------------------------
    //  entities
    // ---------------------------------------------------------------------------------------------------
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#exchange-information Exchange Information} */
    getExchangeInfo(params) {
        if (params === null || params === void 0 ? void 0 : params.symbols) {
            params.symbols = JSON.stringify(params.symbols);
        }
        return this.get('api/v3/exchangeInfo', { params, isPublic: true, baseUrlOverride: 'api.binance.com' });
    }
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#all-coins-39-information-user_data All Coins' Information (USER_DATA)} */
    getBalances() {
        return this.get('sapi/v1/capital/config/getall');
    }
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#account-information-user_data Account Information (USER_DATA)} */
    getAccountInformation() {
        return this.get('api/v3/account');
    }
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#account-trade-list-user_data Account Trade List (USER_DATA)} */
    getAccountTradeList(params) {
        return this.get('api/v3/myTrades', { params });
    }
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#24hr-ticker-price-change-statistics Symbol Price Ticker} */
    getSymbolPriceTicker(params) {
        return this.get('api/v3/ticker/price', { isPublic: true, params });
    }
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker Symbol Order Book Ticker} */
    getSymbolOrderBookTicker(params) {
        return this.get('api/v3/ticker/bookTicker', { isPublic: true, params });
    }
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#all-orders-user_data All Orders (USER_DATA)} */
    getAllOrders(params) {
        return this.get('api/v3/allOrders', { params });
    }
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#current-open-orders-user_data Current Open Orders (USER_DATA)} */
    getOpenOrders(params) {
        return this.get('api/v3/openOrders', { params });
    }
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#query-order-user_data Query Order (USER_DATA)} */
    getOrder(params) {
        return this.get('api/v3/order', { params });
    }
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#new-order-trade New Order (TRADE)} */
    postOrder(params) {
        return this.post('api/v3/order', { params });
    }
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-order-trade Cancel Order (TRADE)} */
    cancelOrder(params) {
        return this.delete('api/v3/order', { params });
    }
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-all-open-orders-on-a-symbol-trade Cancel all Open Orders on a Symbol (TRADE)} */
    cancelAllSymbolOrders(params) {
        return this.delete('api/v3/openOrders', { params });
    }
}
exports.BinanceSpot = BinanceSpot;
//# sourceMappingURL=binance-spot.js.map