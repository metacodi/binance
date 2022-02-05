import { BinanceApi } from './binance-api';
import { BinanceApiOptions, BinanceMarketType, BinanceSpotSubdomain } from './types/binance.types';
import { BinanceSpotTradeListRequest, BinanceSpotTradeList, BinanceSpotAccountInformation, BinanceSpotExchangeInfoRequest, BinanceSpotExchangeInfo, BinanceSpotAccountBalance, BinanceSpotSymbolPriceTickerRequest, BinanceSpotSymbolPriceTicker, BinanceSpotSymbolOrderBookTickerRequest, BinanceSpotSymbolOrderBookTicker, BinanceSpotGetAllOrdersRequest, BinanceSpotOrder, BinanceSpotGetOrderRequest, BinanceSpotPostOrderRequest, BinanceSpotNewOrder, BinanceSpotCancelOrderRequest, BinanceSpotCancelOrder, BinanceSpotGetOpenOrdersRequest, BinanceSpotCancelAllSymbolOrdersRequest } from './types/binance-spot.types';
export declare class BinanceSpot extends BinanceApi {
    market: BinanceMarketType;
    subdomain: BinanceSpotSubdomain;
    constructor(options: BinanceApiOptions);
    baseUrl(): string;
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#exchange-information Exchange Information} */
    getExchangeInfo(params?: BinanceSpotExchangeInfoRequest): Promise<BinanceSpotExchangeInfo>;
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#all-coins-39-information-user_data All Coins' Information (USER_DATA)} */
    getBalances(): Promise<BinanceSpotAccountBalance[]>;
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#account-information-user_data Account Information (USER_DATA)} */
    getAccountInformation(): Promise<BinanceSpotAccountInformation>;
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#account-trade-list-user_data Account Trade List (USER_DATA)} */
    getAccountTradeList(params: BinanceSpotTradeListRequest): Promise<BinanceSpotTradeList>;
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#24hr-ticker-price-change-statistics Symbol Price Ticker} */
    getSymbolPriceTicker(params?: BinanceSpotSymbolPriceTickerRequest): Promise<BinanceSpotSymbolPriceTicker | BinanceSpotSymbolPriceTicker[]>;
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker Symbol Order Book Ticker} */
    getSymbolOrderBookTicker(params?: BinanceSpotSymbolOrderBookTickerRequest): Promise<BinanceSpotSymbolOrderBookTicker | BinanceSpotSymbolOrderBookTicker[]>;
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#all-orders-user_data All Orders (USER_DATA)} */
    getAllOrders(params: BinanceSpotGetAllOrdersRequest): Promise<BinanceSpotOrder | BinanceSpotOrder[]>;
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#current-open-orders-user_data Current Open Orders (USER_DATA)} */
    getOpenOrders(params: BinanceSpotGetOpenOrdersRequest): Promise<BinanceSpotOrder[]>;
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#query-order-user_data Query Order (USER_DATA)} */
    getOrder(params: BinanceSpotGetOrderRequest): Promise<BinanceSpotOrder>;
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#new-order-trade New Order (TRADE)} */
    postOrder(params: BinanceSpotPostOrderRequest): Promise<BinanceSpotNewOrder>;
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-order-trade Cancel Order (TRADE)} */
    cancelOrder(params: BinanceSpotCancelOrderRequest): Promise<BinanceSpotCancelOrder>;
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-all-open-orders-on-a-symbol-trade Cancel all Open Orders on a Symbol (TRADE)} */
    cancelAllSymbolOrders(params: BinanceSpotCancelAllSymbolOrdersRequest): Promise<BinanceSpotCancelOrder>;
}
//# sourceMappingURL=binance-spot.d.ts.map