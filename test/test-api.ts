import * as fs from 'fs';

import { BinanceApiSpot } from '../src/binance-api-spot';
import { BinanceApiFutures } from '../src/binance-api-futures';
import { BinanceApiOptions, BinanceKlineInterval, BinanceMarketType } from '../src/types/binance.types';

import { apiKeys, setTestKeys } from './api-keys';
import { Resource } from '@metacodi/precode';

/**
 * ```bash
 * npx ts-node test/test-api.ts
 * ```
 */


/** Archivo donde se escribirá la salida. */
const logFileName = 'results/klines-1m.json';

/** Escribe en el archivo `logFileName`. */
function writeLog(variable: string, data: any) {
  const url = Resource.normalize(`./test/${logFileName}`);
  const value = JSON.stringify(data, null, ' ');
  console.log(value);
  fs.appendFileSync(url, `const ${variable} = ${value};\n\n`);
}

const testApi = async () => {
  try {
    
    console.log('---------------- API TEST ----------------------');
 
    // const market: BinanceMarketType = 'spot';
    const market: BinanceMarketType = 'usdm';

    const options: BinanceApiOptions = {
      ...apiKeys,
      // isTest: true,
    };

    if (options.isTest) { setTestKeys(options, market); }

    const api = (market as any) === 'spot' ? new BinanceApiSpot(options) : new BinanceApiFutures(options);
    
    // NOTA: Les funcions troncals que passen per l'api d'spot no funcionen per testnet.
    // console.log('getSystemStatus() =>', await api.getSystemStatus());
    // console.log('getApiKeyPermissions() =>', await api.getApiKeyPermissions());
    // console.log('getFundingWallet() =>', await api.getFundingWallet());
    // console.log('getFundingWallet() =>', await api.getFundingWallet({ asset: 'EUR' }));

    if (api instanceof BinanceApiSpot) {

      // console.log('getUserDataListenKey() =>', await api.getUserDataListenKey());
      // console.log('keepAliveUserDataListenKey() =>', await api.keepAliveUserDataListenKey('CAcCcyIJwicrA6deJKprBWNZY81QFwNiYn9WsDvky2uflOKS89VkbITvbWht'));
      // console.log('closeUserDataListenKey() =>', await api.closeUserDataListenKey());

      console.log('getExchangeInfo() =>', JSON.stringify(await api.getExchangeInfo({ symbol: 'BNBUSDT' })));
      // console.log('getExchangeInfo() =>', await api.getExchangeInfo({ symbols: ['BNBEUR', 'BNBUSDT'] }));

      // console.log('getBalances() =>', await api.getBalances());
      // console.log('getAccountInformation() =>', await api.getAccountInformation());
      // console.log('getAccountTradeList() =>', await api.getAccountTradeList({ symbol: 'BNBUSDT' }));

      // console.log('getSymbolPriceTicker() =>', await api.getSymbolPriceTicker());
      // console.log('getSymbolPriceTicker() =>', await api.getSymbolPriceTicker({ symbol: 'BNBUSDT'}));
      // console.log('getSymbolOrderBookTicker() =>', await api.getSymbolOrderBookTicker());
      // console.log('getSymbolOrderBookTicker() =>', await api.getSymbolOrderBookTicker({ symbol: 'BNBUSDT'}));

      // console.log('getAllOrders() =>', await api.getAllOrders({ symbol: 'BNBUSDT'}));
      // console.log('getOpenOrders() =>', await api.getOpenOrders({ symbol: 'BNBEUR' }));
      // console.log('getOrder() =>', await api.getOrder({ symbol: 'BNBEUR', orderId: 379881536 }));
      console.log('postOrder() =>', await api.postOrder({
        symbol: 'BNBUSDT',
        side: 'BUY',
        type: 'LIMIT',
        newClientOrderId: 'prova-limit-bnb',
        // quantity: 0.00001, // Filter failure: (minQty) LOT_SIZE = {"minQty": "0.00100000", "maxQty":"9222449.00000000", "stepSize": "0.00100000"}
        // quantity: 0.001,   // Filter failure: MIN_NOTIONAL = {"minNotional": "10.00000000", "applyToMarket": true, "avgPriceMins": 5}; notional_value = price * quantity;
        quantity: 0.1,
        // price: 0.01,       // Filter failure: (minPrice) PRICE_FILTER = { "minPrice": "0.10000000", "maxPrice": "10000.00000000", "tickSize": "0.10000000" }
        // price: 300.001,    // Filter failure: (tickSize) PRICE_FILTER = { "minPrice": "0.10000000", "maxPrice": "10000.00000000", "tickSize": "0.10000000" }
        price: 300.0,
        timeInForce: 'GTC',
        // newOrderRespType: 'FULL',
        newOrderRespType: 'RESULT',
      }));
      
    } else if (api instanceof BinanceApiFutures) {
      
      // console.log('getUserDataListenKey() =>', await api.getUserDataListenKey());
      // console.log('keepAliveUserDataListenKey() =>', await api.keepAliveUserDataListenKey());
      // console.log('closeUserDataListenKey() =>', await api.closeUserDataListenKey());

      // console.log('getExchangeInfo() =>', await api.getExchangeInfo());

      // console.log('getBalances() =>', await api.getBalances());
      // console.log('getAccountInformation() =>', await api.getAccountInformation());
      // console.log('getAccountTradeList() =>', await api.getAccountTradeList({ symbol: 'BNBUSDT' }));
      const interval: BinanceKlineInterval = '1m';
      const params = {
        symbol: 'BTCUSDT',
        interval,
        startTime: 1663439700000,
        endTime: 1663470600000,
        limit: 1500,
      };
      writeLog('kline', await api.getSymbolKlines(params));

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

testApi();
