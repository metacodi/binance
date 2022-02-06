import { BinanceApi } from './binance-api';
import { BinanceApiOptions, BinanceFuturesSubdomain, BinanceMarketType } from './types/binance.types';
import { BinanceFuturesTradeListRequest, BinanceFuturesTradeList, BinanceFuturesAccountInformation, BinanceFuturesExchangeInfo, BinanceFuturesAccountBalance, BinanceFuturesSymbolPriceTickerRequest, BinanceFuturesSymbolPriceTicker, BinanceFuturesSymbolOrderBookTickerRequest, BinanceFuturesSymbolOrderBookTicker, BinanceFuturesGetAllOrdersRequest, BinanceFuturesGetOpenOrdersRequest, BinanceFuturesGetOrderRequest, BinanceFuturesOrder, BinanceFuturesPostOrderRequest, BinanceFuturesNewOrder, BinanceFuturesCancelOrderRequest, BinanceFuturesCancelAllSymbolOrdersRequest, BinanceFuturesCancelOrder } from './types/binance-futures.types';
export declare class BinanceApiFutures extends BinanceApi {
    market: BinanceMarketType;
    subdomain: BinanceFuturesSubdomain;
    constructor(options: BinanceApiOptions);
    baseUrl(): string;
    getUserDataListenKey(): Promise<{
        listenKey: string;
    }>;
    keepAliveUserDataListenKey(listenKey?: string): Promise<{}>;
    closeUserDataListenKey(listenKey?: string): Promise<{}>;
    getExchangeInfo(): Promise<BinanceFuturesExchangeInfo>;
    getBalances(): Promise<BinanceFuturesAccountBalance>;
    getAccountInformation(): Promise<BinanceFuturesAccountInformation>;
    getAccountTradeList(params: BinanceFuturesTradeListRequest): Promise<BinanceFuturesTradeList>;
    getSymbolPriceTicker(params?: BinanceFuturesSymbolPriceTickerRequest): Promise<BinanceFuturesSymbolPriceTicker | BinanceFuturesSymbolPriceTicker[]>;
    getSymbolOrderBookTicker(params?: BinanceFuturesSymbolOrderBookTickerRequest): Promise<BinanceFuturesSymbolOrderBookTicker | BinanceFuturesSymbolOrderBookTicker[]>;
    getAllOrders(params: BinanceFuturesGetAllOrdersRequest): Promise<BinanceFuturesOrder | BinanceFuturesOrder[]>;
    getOpenOrders(params: BinanceFuturesGetOpenOrdersRequest): Promise<BinanceFuturesOrder[]>;
    getOrder(params: BinanceFuturesGetOrderRequest): Promise<BinanceFuturesOrder>;
    postOrder(params: BinanceFuturesPostOrderRequest): Promise<BinanceFuturesNewOrder>;
    cancelOrder(params: BinanceFuturesCancelOrderRequest): Promise<BinanceFuturesCancelOrder>;
    cancelAllSymbolOrders(params: BinanceFuturesCancelAllSymbolOrdersRequest): Promise<BinanceFuturesCancelOrder>;
}
//# sourceMappingURL=binance-api-futures.d.ts.map