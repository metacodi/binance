import { BinanceApi } from './binance-api';
import { BinanceApiOptions, BinanceFuturesSubdomain, BinanceMarketType } from './types/binance.types';
import {
  BinanceFuturesTradeListRequest,
  BinanceFuturesTradeList,
  BinanceFuturesAccountInformation,
  BinanceFuturesExchangeInfo,
  BinanceFuturesAccountBalance,
  BinanceFuturesSymbolPriceTickerRequest,
  BinanceFuturesSymbolPriceTicker,
  BinanceFuturesSymbolOrderBookTickerRequest,
  BinanceFuturesSymbolOrderBookTicker,
  BinanceFuturesGetAllOrdersRequest,
  BinanceFuturesGetOpenOrdersRequest,
  BinanceFuturesGetOrderRequest,
  BinanceFuturesOrder,
  BinanceFuturesPostOrderRequest,
  BinanceFuturesNewOrder,
  BinanceFuturesCancelOrderRequest,
  BinanceFuturesCancelAllSymbolOrdersRequest,
  BinanceFuturesCancelOrder,
  BinanceFuturesSymbolKlinesRequest,
  BinanceFuturesSymbolLeverageBracket,
  BinanceFuturesSymbolLeverageBracketRequest,
  BinanceFuturesChangeSymbolLeverageRequest,
  BinanceFuturesChangeSymbolLeverageResponse,
  BinanceFuturesPositionRisk,
  BinanceFuturesPositionRiskRequest,
} from './types/binance-futures.types';


export class BinanceApiFutures extends BinanceApi {

  market: BinanceMarketType = 'usdm';
  
  subdomain: BinanceFuturesSubdomain = 'fapi';

  constructor(
    options?: BinanceApiOptions,
  ) {
    super(options);
  }

  baseUrl(): string { return this.isTest ? 'testnet.binancefuture.com' : `${this.subdomain}.binance.com`; }

  
  // ---------------------------------------------------------------------------------------------------
  //  Market STREAM
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://binance-docs.github.io/apidocs/futures/en/#exchange-information Exchange Information} */
  getExchangeInfo(): Promise<BinanceFuturesExchangeInfo> {
    return this.get('fapi/v1/exchangeInfo', { isPublic: true });
  }

  /** {@link https://binance-docs.github.io/apidocs/futures/en/#symbol-price-ticker Symbol Price Ticker} */
  getSymbolPriceTicker(params?: BinanceFuturesSymbolPriceTickerRequest): Promise<BinanceFuturesSymbolPriceTicker | BinanceFuturesSymbolPriceTicker[]> {
    return this.get('fapi/v1/ticker/price', { isPublic: true, params });
  }
  
  /** {@link https://binance-docs.github.io/apidocs/futures/en/#symbol-order-book-ticker Symbol Order Book Ticker} */
  getSymbolOrderBookTicker(params?: BinanceFuturesSymbolOrderBookTickerRequest): Promise<BinanceFuturesSymbolOrderBookTicker | BinanceFuturesSymbolOrderBookTicker[]> {
    return this.get('fapi/v1/ticker/bookTicker', { isPublic: true, params });
  }

  /** {@link https://binance-docs.github.io/apidocs/futures/en/#kline-candlestick-data Kline/Candlestick Data} */
  getSymbolKlines(params?: BinanceFuturesSymbolKlinesRequest): Promise<any[]> { // Promise<BinanceFuturesSymbolKline | BinanceFuturesSymbolKline[]> {
    return this.get('fapi/v1/klines', { isPublic: true, params });
  }


  // ---------------------------------------------------------------------------------------------------
  //  Account STREAMS
  // ---------------------------------------------------------------------------------------------------

  //  Listen Key
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://binance-docs.github.io/apidocs/futures/en/#start-user-data-stream-user_stream Start User Data Stream (USER_STREAM)} */
  getUserDataListenKey(): Promise<{ listenKey: string }> {
    return this.post('fapi/v1/listenKey', { createSignature: false });
  }
  
  /** {@link https://binance-docs.github.io/apidocs/futures/en/#keepalive-user-data-stream-user_stream Keepalive User Data Stream (USER_STREAM)} */
  keepAliveUserDataListenKey(): Promise<{}> {
    return this.put('fapi/v1/listenKey', { createSignature: false });
  }
  
  /** {@link https://binance-docs.github.io/apidocs/futures/en/#close-user-data-stream-user_stream Close User Data Stream (USER_STREAM)} */
  closeUserDataListenKey(): Promise<{}> {
    return this.delete('fapi/v1/listenKey', { createSignature: false });
  }

  //  Account Information . Balances
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://binance-docs.github.io/apidocs/futures/en/#account-information-v2-user_data Account Information V2 (USER_DATA)} */
  getAccountInformation(): Promise<BinanceFuturesAccountInformation> {
    return this.get('fapi/v2/account');
  }

  /** {@link https://binance-docs.github.io/apidocs/futures/en/#futures-account-balance-v2-user_data Futures Account Balance V2 (USER_DATA)} */
  getBalances(): Promise<BinanceFuturesAccountBalance[]> {
    return this.get('fapi/v2/balance');
  }

  //  Leverage (futures only)
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://binance-docs.github.io/apidocs/futures/en/#notional-and-leverage-brackets-user_data Notional and Leverage Brackets (USER_DATA)} */
  getSymbolLeverageBracket(params?: BinanceFuturesSymbolLeverageBracketRequest): Promise<BinanceFuturesSymbolLeverageBracket | BinanceFuturesSymbolLeverageBracket[]> {
    return this.get('fapi/v1/leverageBracket', { params });
  }
  
  /** {@link https://binance-docs.github.io/apidocs/futures/en/#change-initial-leverage-trade Change Initial Leverage (TRADE)} */
  changeSymbolLeverage(params?: BinanceFuturesChangeSymbolLeverageRequest): Promise<BinanceFuturesChangeSymbolLeverageResponse> {
    return this.post('fapi/v1/leverage', { params });
  }
  
  //  Account Orders
  // ---------------------------------------------------------------------------------------------------
  
  /** {@link https://binance-docs.github.io/apidocs/futures/en/#all-orders-user_data All Orders (USER_DATA)} */
  getAllOrders(params: BinanceFuturesGetAllOrdersRequest): Promise<BinanceFuturesOrder | BinanceFuturesOrder[]> {
    return this.get('fapi/v1/allOrders', { params });
  }

  /** {@link https://binance-docs.github.io/apidocs/futures/en/#current-all-open-orders-user_data Current All Open Orders (USER_DATA)} */
  getOpenOrders(params: BinanceFuturesGetOpenOrdersRequest): Promise<BinanceFuturesOrder[]> {
    return this.get('fapi/v1/openOrders', { params });
  }

  /** {@link https://binance-docs.github.io/apidocs/futures/en/#query-order-user_data Query Order (USER_DATA)} */
  getOrder(params: BinanceFuturesGetOrderRequest): Promise<BinanceFuturesOrder> {
    return this.get('fapi/v1/order', { params });
  }

  /** {@link https://binance-docs.github.io/apidocs/futures/en/#account-trade-list-user_data Account Trade List (USER_DATA)} */
  getAccountTradeList(params: BinanceFuturesTradeListRequest): Promise<BinanceFuturesTradeList> {
    return this.get('fapi/v1/userTrades', { params });
  }

  //  Position Risk (futures only)
  // ---------------------------------------------------------------------------------------------------
  
  /** {@link https://binance-docs.github.io/apidocs/futures/en/#position-information-v2-user_data Position Information V2 (USER_DATA)} */
  getPositionRisk(params: BinanceFuturesPositionRiskRequest): Promise<BinanceFuturesPositionRisk> {
    return this.get('fapi/v2/positionRisk ', { params });
  }
  
  //  Trade Orders
  // ---------------------------------------------------------------------------------------------------

  /** {@link https://binance-docs.github.io/apidocs/futures/en/#new-order-trade New Order (TRADE)} */
  postOrder(params: BinanceFuturesPostOrderRequest): Promise<BinanceFuturesNewOrder> {
    return this.post('fapi/v1/order', { params });
  }

  /** {@link https://binance-docs.github.io/apidocs/futures/en/#cancel-order-trade Cancel Order (TRADE)} */
  cancelOrder(params: BinanceFuturesCancelOrderRequest): Promise<BinanceFuturesCancelOrder> {
    return this.delete('fapi/v1/order', { params });
  }

  /** {@link https://binance-docs.github.io/apidocs/futures/en/#cancel-all-open-orders-trade Cancel All Open Orders (TRADE)} */
  cancelAllSymbolOrders(params: BinanceFuturesCancelAllSymbolOrdersRequest): Promise<BinanceFuturesCancelOrder> {
    return this.delete('fapi/v1/allOpenOrders', { params });
  }

}
