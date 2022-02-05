import { BinanceSpot } from '../src/binance-spot';
import { BinanceFutures } from '../src/binance-futures';
import { BinanceApiOptions, BinanceMarketType } from '../src/types/binance.types';

const main = async () => {

  try {
    
    console.log('---------------- TEST ----------------------');
 
    const market: BinanceMarketType = 'spot';
    // const market: any = 'futures';

    const options: BinanceApiOptions = {
      // Binance keys Jordi.
      apiKey: '6mjeCol48kgmK5diGfy90GynOW43RCQcOl6pXsJIPHpwtQWob6LIsW1Vw5vGv5Ax',
      apiSecret: 'livWZ3R7HSkFQXmBoXF37o7RVxWRMQ2A1JfK4QzUu89srHEzknFaBhc51zw6xCqj',
      // isTest: true,
    };

    if (options.isTest) {
      if (market === 'spot') {
        // Spot test keys Jordi.
        options.apiKey = 'Km2NVvyj0nIvBS26keQkvCbRyZ01yzGyFweRWt8oJf9Rza00u1V5wYVVmEUSg130';
        options.apiSecret = 'n9QtgRInpJ1Z68hJkGWZ06LVxvTRdsojoOXCIth8IGtDtiNYNoKyNol0EELGhWN9';

      } else if (market === 'futures') {
        // Futures test keys Jordi.
        options.apiKey = '';
        options.apiSecret = '';
      }
    }

    const api = market === 'spot' ? new BinanceSpot(options) : new BinanceFutures(options);
    
    // NOTA: Les funcions troncals que passen per l'api d'spot no funcionen per testnet.
    // console.log('getSystemStatus() =>', await api.getSystemStatus());
    // console.log('getApiKeyPermissions() =>', await api.getApiKeyPermissions());
    // console.log('getFundingWallet() =>', await api.getFundingWallet());
    // console.log('getFundingWallet() =>', await api.getFundingWallet({ asset: 'EUR' }));

    if (api instanceof BinanceSpot) {

      // console.log('getExchangeInfo() =>', await api.getExchangeInfo({ symbol: 'BNBEUR' }));
      // console.log('getExchangeInfo() =>', await api.getExchangeInfo({ symbols: ['BNBEUR', 'BNBUSDT'] }));
      // console.log('getBalances() =>', await api.getBalances());
      // console.log('getAccountInformation() =>', await api.getAccountInformation());
      // console.log('getAccountTradeList() =>', await api.getAccountTradeList({ symbol: 'BNBUSDT' }));
      // console.log('getSymbolPriceTicker() =>', await api.getSymbolPriceTicker());
      // console.log('getSymbolPriceTicker() =>', await api.getSymbolPriceTicker({ symbol: 'BNBUSDT'}));
      // console.log('getSymbolOrderBookTicker() =>', await api.getSymbolOrderBookTicker());
      // console.log('getSymbolOrderBookTicker() =>', await api.getSymbolOrderBookTicker({ symbol: 'BNBUSDT'}));
      // console.log('getAllOrders() =>', await api.getAllOrders({ symbol: 'BNBEUR'}));
      // console.log('getOpenOrders() =>', await api.getOpenOrders({ symbol: 'BNBEUR' }));
      // console.log('getOrder() =>', await api.getOrder({ symbol: 'BNBEUR', orderId: 379881536 }));
      // console.log('postOrder() =>', await api.postOrder({
      //   symbol: 'BNBUSDT',
      //   side: 'BUY',
      //   type: 'LIMIT',
      //   newClientOrderId: 'prova-limit-bnb',
      //   // quantity: 0.00001, // Filter failure: (minQty) LOT_SIZE = {"minQty": "0.00100000", "maxQty":"9222449.00000000", "stepSize": "0.00100000"}
      //   // quantity: 0.001,   // Filter failure: MIN_NOTIONAL = {"minNotional": "10.00000000", "applyToMarket": true, "avgPriceMins": 5}; notional_value = price * quantity;
      //   quantity: 0.1,
      //   // price: 0.01,       // Filter failure: (minPrice) PRICE_FILTER = { "minPrice": "0.10000000", "maxPrice": "10000.00000000", "tickSize": "0.10000000" }
      //   // price: 300.001,    // Filter failure: (tickSize) PRICE_FILTER = { "minPrice": "0.10000000", "maxPrice": "10000.00000000", "tickSize": "0.10000000" }
      //   price: 300.0,
      //   timeInForce: 'GTC',
      //   // newOrderRespType: 'FULL',
      //   newOrderRespType: 'RESULT',
      // }));
      
    } else if (api instanceof BinanceFutures) {
      
      // console.log('getExchangeInfo() =>', await api.getExchangeInfo());
      // console.log('getBalances() =>', await api.getBalances());
      // console.log('getAccountInformation() =>', await api.getAccountInformation());
      // console.log('getAccountTradeList() =>', await api.getAccountTradeList({ symbol: 'BNBUSDT' }));
      // console.log('getSymbolPriceTicker() =>', await api.getSymbolPriceTicker());
      // console.log('getSymbolPriceTicker() =>', await api.getSymbolPriceTicker({ symbol: 'BNBUSDT'}));
      // console.log('getSymbolOrderBookTicker() =>', await api.getSymbolOrderBookTicker());
      // console.log('getSymbolOrderBookTicker() =>', await api.getSymbolOrderBookTicker({ symbol: 'BNBUSDT'}));
      // console.log('getAllOrders() =>', await api.getAllOrders({ symbol: 'BNBUSDT'}));
    }


  } catch (error) {
    console.error('API ERROR', error);
  }
  
};

main();

