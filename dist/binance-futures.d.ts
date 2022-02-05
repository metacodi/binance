import { BinanceApi } from './binance-api';
import { BinanceApiOptions, BinanceFuturesSubdomain, BinanceMarketType } from './types/binance.types';
import { BinanceFuturesTradeListRequest, BinanceFuturesTradeList, BinanceFuturesAccountInformation, BinanceFuturesExchangeInfo, BinanceFuturesAccountBalance, BinanceFuturesSymbolPriceTickerRequest, BinanceFuturesSymbolPriceTicker, BinanceFuturesSymbolOrderBookTickerRequest, BinanceFuturesSymbolOrderBookTicker, BinanceFuturesGetAllOrdersRequest, BinanceFuturesOrder, BinanceFuturesGetOpenOrdersRequest, BinanceFuturesGetOrderRequest, BinanceFuturesPostOrderRequest, BinanceFuturesNewOrder, BinanceFuturesCancelOrderRequest, BinanceFuturesCancelAllSymbolOrdersRequest, BinanceFuturesCancelOrder } from './types/binance-futures.types';
export declare class BinanceFutures extends BinanceApi {
    market: BinanceMarketType;
    subdomain: BinanceFuturesSubdomain;
    constructor(options: BinanceApiOptions);
    baseUrl(): string;
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#exchange-information Exchange Information} */
    getExchangeInfo(): Promise<BinanceFuturesExchangeInfo>;
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#futures-account-balance-v2-user_data Futures Account Balance V2 (USER_DATA)} */
    getBalances(): Promise<BinanceFuturesAccountBalance>;
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#account-information-v2-user_data Account Information V2 (USER_DATA)} */
    getAccountInformation(): Promise<BinanceFuturesAccountInformation>;
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#account-trade-list-user_data Account Trade List (USER_DATA)} */
    getAccountTradeList(params: BinanceFuturesTradeListRequest): Promise<BinanceFuturesTradeList>;
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#24hr-ticker-price-change-statistics Symbol Price Ticker} */
    getSymbolPriceTicker(params?: BinanceFuturesSymbolPriceTickerRequest): Promise<BinanceFuturesSymbolPriceTicker | BinanceFuturesSymbolPriceTicker[]>;
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#symbol-order-book-ticker Symbol Order Book Ticker} */
    getSymbolOrderBookTicker(params?: BinanceFuturesSymbolOrderBookTickerRequest): Promise<BinanceFuturesSymbolOrderBookTicker | BinanceFuturesSymbolOrderBookTicker[]>;
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#all-orders-user_data All Orders (USER_DATA)} */
    getAllOrders(params: BinanceFuturesGetAllOrdersRequest): Promise<BinanceFuturesOrder | BinanceFuturesOrder[]>;
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#current-all-open-orders-user_data Current All Open Orders (USER_DATA)} */
    getOpenOrders(params: BinanceFuturesGetOpenOrdersRequest): Promise<BinanceFuturesOrder[]>;
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#query-order-user_data Query Order (USER_DATA)} */
    getOrder(params: BinanceFuturesGetOrderRequest): Promise<BinanceFuturesOrder>;
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#new-order-trade New Order (TRADE)} */
    postOrder(params: BinanceFuturesPostOrderRequest): Promise<BinanceFuturesNewOrder>;
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#cancel-order-trade Cancel Order (TRADE)} */
    cancelOrder(params: BinanceFuturesCancelOrderRequest): Promise<BinanceFuturesCancelOrder>;
    /** {@link https://binance-docs.github.io/apidocs/futures/en/#cancel-all-open-orders-trade Cancel All Open Orders (TRADE)} */
    cancelAllSymbolOrders(params: BinanceFuturesCancelAllSymbolOrdersRequest): Promise<BinanceFuturesCancelOrder>;
}
//# sourceMappingURL=binance-futures.d.ts.map