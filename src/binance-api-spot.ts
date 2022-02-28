import { BinanceApi } from './binance-api';
import { BinanceApiOptions, BinanceApiResquestOptions, BinanceMarketType, BinanceSpotSubdomain } from './types/binance.types';
import { BinanceSpotTradeListRequest,
  BinanceSpotTradeList,
  BinanceSpotAccountInformation,
  BinanceSpotExchangeInfoRequest,
  BinanceSpotExchangeInfo,
  BinanceSpotAccountBalance,
  BinanceSpotSymbolPriceTickerRequest,
  BinanceSpotSymbolPriceTicker,
  BinanceSpotSymbolOrderBookTickerRequest,
  BinanceSpotSymbolOrderBookTicker,
  BinanceSpotGetAllOrdersRequest,
  BinanceSpotGetOpenOrdersRequest,
  BinanceSpotGetOrderRequest,
  BinanceSpotOrder,
  BinanceSpotPostOrderRequest,
  BinanceSpotNewOrder,
  BinanceSpotCancelOrderRequest,
  BinanceSpotCancelAllSymbolOrdersRequest,
  BinanceSpotCancelOrder,
  BinanceSpotSymbolKlinesRequest,
} from './types/binance-spot.types';


export class BinanceApiSpot extends BinanceApi {

  market: BinanceMarketType = 'spot';

  subdomain: BinanceSpotSubdomain = 'api';

  constructor(
    options?: BinanceApiOptions,
  ) {
    super(options);
  }

  baseUrl(): string { return this.isTest ? 'testnet.binance.vision' : `${this.subdomain}.binance.com`; }


  // ---------------------------------------------------------------------------------------------------
  //  entities
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-spot Create a ListenKey (USER_STREAM)} */
  getUserDataListenKey(): Promise<{ listenKey: string }> {
    return this.post('api/v3/userDataStream', { createSignature: false });
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-spot Ping/Keep-alive a ListenKey (USER_STREAM)} */
  keepAliveUserDataListenKey(listenKey?: string): Promise<{}> {
    return this.put(`api/v3/userDataStream?listenKey=${listenKey}`, { createSignature: false });
  }
  
  /** {@link https://binance-docs.github.io/apidocs/spot/en/#listen-key-spot Close a ListenKey (USER_STREAM)} */
  closeUserDataListenKey(listenKey?: string): Promise<{}> {
    return this.delete(`api/v3/userDataStream?listenKey=${listenKey}`, { createSignature: false });
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#exchange-information Exchange Information} */
  getExchangeInfo(params?: BinanceSpotExchangeInfoRequest): Promise<BinanceSpotExchangeInfo> {
    if (params?.symbols) { params.symbols = JSON.stringify(params.symbols) as any; }
    return this.get('api/v3/exchangeInfo', { params, isPublic: true, baseUrlOverride: 'api.binance.com' });
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#all-coins-39-information-user_data All Coins' Information (USER_DATA)} */
  getBalances(): Promise<BinanceSpotAccountBalance[]> {
    return this.get('sapi/v1/capital/config/getall');
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#account-information-user_data Account Information (USER_DATA)} */
  getAccountInformation(): Promise<BinanceSpotAccountInformation> {
    return this.get('api/v3/account');
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#account-trade-list-user_data Account Trade List (USER_DATA)} */
  getAccountTradeList(params: BinanceSpotTradeListRequest): Promise<BinanceSpotTradeList> {
    return this.get('api/v3/myTrades', { params });
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-price-ticker Symbol Price Ticker} */
  getSymbolPriceTicker(params?: BinanceSpotSymbolPriceTickerRequest): Promise<BinanceSpotSymbolPriceTicker | BinanceSpotSymbolPriceTicker[]> {
    return this.get('api/v3/ticker/price', { isPublic: true, params });
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker Symbol Order Book Ticker} */
  getSymbolOrderBookTicker(params?: BinanceSpotSymbolOrderBookTickerRequest): Promise<BinanceSpotSymbolOrderBookTicker | BinanceSpotSymbolOrderBookTicker[]> {
    return this.get('api/v3/ticker/bookTicker', { isPublic: true, params });
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data Kline/Candlestick Data} */
  getSymbolKlines(params?: BinanceSpotSymbolKlinesRequest): Promise<any[]> { // Promise<BinanceSpotSymbolKline | BinanceSpotSymbolKline[]> {
    return this.get('api/v3/klines', { isPublic: true, params });
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#all-orders-user_data All Orders (USER_DATA)} */
  getAllOrders(params: BinanceSpotGetAllOrdersRequest): Promise<BinanceSpotOrder | BinanceSpotOrder[]> {
    return this.get('api/v3/allOrders', { params });
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#current-open-orders-user_data Current Open Orders (USER_DATA)} */
  getOpenOrders(params: BinanceSpotGetOpenOrdersRequest): Promise<BinanceSpotOrder[]> {
    return this.get('api/v3/openOrders', { params });
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#query-order-user_data Query Order (USER_DATA)} */
  getOrder(params: BinanceSpotGetOrderRequest): Promise<BinanceSpotOrder> {
    return this.get('api/v3/order', { params });
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#new-order-trade New Order (TRADE)} */
  postOrder(params: BinanceSpotPostOrderRequest): Promise<BinanceSpotNewOrder> {
    return this.post('api/v3/order', { params });
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-order-trade Cancel Order (TRADE)} */
  cancelOrder(params: BinanceSpotCancelOrderRequest): Promise<BinanceSpotCancelOrder> {
    return this.delete('api/v3/order', { params });
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-all-open-orders-on-a-symbol-trade Cancel all Open Orders on a Symbol (TRADE)} */
  cancelAllSymbolOrders(params: BinanceSpotCancelAllSymbolOrdersRequest): Promise<BinanceSpotCancelOrder> {
    return this.delete('api/v3/openOrders', { params });
  }

}
