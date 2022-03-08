import { BinanceApi } from './binance-api';
import { BinanceApiOptions, BinanceFuturesSubdomain, BinanceMarketType } from './types/binance.types';
import { BinanceFuturesTradeListRequest, BinanceFuturesTradeList, BinanceFuturesAccountInformation, BinanceFuturesExchangeInfo, BinanceFuturesAccountBalance, BinanceFuturesSymbolPriceTickerRequest, BinanceFuturesSymbolPriceTicker, BinanceFuturesSymbolOrderBookTickerRequest, BinanceFuturesSymbolOrderBookTicker, BinanceFuturesGetAllOrdersRequest, BinanceFuturesGetOpenOrdersRequest, BinanceFuturesGetOrderRequest, BinanceFuturesOrder, BinanceFuturesPostOrderRequest, BinanceFuturesNewOrder, BinanceFuturesCancelOrderRequest, BinanceFuturesCancelAllSymbolOrdersRequest, BinanceFuturesCancelOrder, BinanceFuturesSymbolKlinesRequest, BinanceFuturesSymbolLeverageBracket, BinanceFuturesSymbolLeverageBracketRequest, BinanceFuturesChangeSymbolLeverageRequest, BinanceFuturesChangeSymbolLeverageResponse, BinanceFuturesPositionRisk, BinanceFuturesPositionRiskRequest } from './types/binance-futures.types';
export declare class BinanceApiFutures extends BinanceApi {
    market: BinanceMarketType;
    subdomain: BinanceFuturesSubdomain;
    constructor(options?: BinanceApiOptions);
    baseUrl(): string;
    getExchangeInfo(): Promise<BinanceFuturesExchangeInfo>;
    getSymbolPriceTicker(params?: BinanceFuturesSymbolPriceTickerRequest): Promise<BinanceFuturesSymbolPriceTicker | BinanceFuturesSymbolPriceTicker[]>;
    getSymbolOrderBookTicker(params?: BinanceFuturesSymbolOrderBookTickerRequest): Promise<BinanceFuturesSymbolOrderBookTicker | BinanceFuturesSymbolOrderBookTicker[]>;
    getSymbolKlines(params?: BinanceFuturesSymbolKlinesRequest): Promise<any[]>;
    getUserDataListenKey(): Promise<{
        listenKey: string;
    }>;
    keepAliveUserDataListenKey(listenKey?: string): Promise<{}>;
    closeUserDataListenKey(listenKey?: string): Promise<{}>;
    getAccountInformation(): Promise<BinanceFuturesAccountInformation>;
    getBalances(): Promise<BinanceFuturesAccountBalance[]>;
    getSymbolLeverageBracket(params?: BinanceFuturesSymbolLeverageBracketRequest): Promise<BinanceFuturesSymbolLeverageBracket | BinanceFuturesSymbolLeverageBracket[]>;
    changeSymbolLeverage(params?: BinanceFuturesChangeSymbolLeverageRequest): Promise<BinanceFuturesChangeSymbolLeverageResponse>;
    getAllOrders(params: BinanceFuturesGetAllOrdersRequest): Promise<BinanceFuturesOrder | BinanceFuturesOrder[]>;
    getOpenOrders(params: BinanceFuturesGetOpenOrdersRequest): Promise<BinanceFuturesOrder[]>;
    getOrder(params: BinanceFuturesGetOrderRequest): Promise<BinanceFuturesOrder>;
    getAccountTradeList(params: BinanceFuturesTradeListRequest): Promise<BinanceFuturesTradeList>;
    getPositionRisk(params: BinanceFuturesPositionRiskRequest): Promise<BinanceFuturesPositionRisk>;
    postOrder(params: BinanceFuturesPostOrderRequest): Promise<BinanceFuturesNewOrder>;
    cancelOrder(params: BinanceFuturesCancelOrderRequest): Promise<BinanceFuturesCancelOrder>;
    cancelAllSymbolOrders(params: BinanceFuturesCancelAllSymbolOrdersRequest): Promise<BinanceFuturesCancelOrder>;
}
//# sourceMappingURL=binance-api-futures.d.ts.map