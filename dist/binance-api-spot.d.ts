import { BinanceApi } from './binance-api';
import { BinanceApiOptions, BinanceMarketType, BinanceSpotSubdomain } from './types/binance.types';
import { BinanceSpotTradeListRequest, BinanceSpotTradeList, BinanceSpotAccountInformation, BinanceSpotExchangeInfoRequest, BinanceSpotExchangeInfo, BinanceSpotAccountBalance, BinanceSpotSymbolPriceTickerRequest, BinanceSpotSymbolPriceTicker, BinanceSpotSymbolOrderBookTickerRequest, BinanceSpotSymbolOrderBookTicker, BinanceSpotGetAllOrdersRequest, BinanceSpotGetOpenOrdersRequest, BinanceSpotGetOrderRequest, BinanceSpotOrder, BinanceSpotPostOrderRequest, BinanceSpotNewOrder, BinanceSpotCancelOrderRequest, BinanceSpotCancelAllSymbolOrdersRequest, BinanceSpotCancelOrder, BinanceSpotSymbolKlinesRequest } from './types/binance-spot.types';
export declare class BinanceApiSpot extends BinanceApi {
    market: BinanceMarketType;
    subdomain: BinanceSpotSubdomain;
    constructor(options?: BinanceApiOptions);
    baseUrl(): string;
    getExchangeInfo(params?: BinanceSpotExchangeInfoRequest): Promise<BinanceSpotExchangeInfo>;
    getSymbolPriceTicker(params?: BinanceSpotSymbolPriceTickerRequest): Promise<BinanceSpotSymbolPriceTicker | BinanceSpotSymbolPriceTicker[]>;
    getSymbolOrderBookTicker(params?: BinanceSpotSymbolOrderBookTickerRequest): Promise<BinanceSpotSymbolOrderBookTicker | BinanceSpotSymbolOrderBookTicker[]>;
    getSymbolKlines(params?: BinanceSpotSymbolKlinesRequest): Promise<any[]>;
    getUserDataListenKey(): Promise<{
        listenKey: string;
    }>;
    keepAliveUserDataListenKey(listenKey?: string): Promise<{}>;
    closeUserDataListenKey(listenKey?: string): Promise<{}>;
    getAccountInformation(): Promise<BinanceSpotAccountInformation>;
    getBalances(): Promise<BinanceSpotAccountBalance[]>;
    getAllOrders(params: BinanceSpotGetAllOrdersRequest): Promise<BinanceSpotOrder | BinanceSpotOrder[]>;
    getOpenOrders(params: BinanceSpotGetOpenOrdersRequest): Promise<BinanceSpotOrder[]>;
    getOrder(params: BinanceSpotGetOrderRequest): Promise<BinanceSpotOrder>;
    getAccountTradeList(params: BinanceSpotTradeListRequest): Promise<BinanceSpotTradeList>;
    postOrder(params: BinanceSpotPostOrderRequest): Promise<BinanceSpotNewOrder>;
    cancelOrder(params: BinanceSpotCancelOrderRequest): Promise<BinanceSpotCancelOrder>;
    cancelAllSymbolOrders(params: BinanceSpotCancelAllSymbolOrdersRequest): Promise<BinanceSpotCancelOrder>;
}
//# sourceMappingURL=binance-api-spot.d.ts.map