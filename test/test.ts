import { BinanceApiSpot } from '../src/binance-api-spot';
import { BinanceApiFutures } from '../src/binance-api-futures';
import { BinanceApiOptions, BinanceMarketType } from '../src/types/binance.types';
import { BinanceWebsocketOptions } from '../src/types/binance-websocket.types';
import { BinanceWebsocket } from '../src';
import { interval } from 'rxjs';

import { Resource, Terminal  } from '@metacodi/precode';
import * as fs from 'fs';

/**
 * ```bash
 * npx ts-node test/test.ts
 * ```
 */

const setTestKeys = (options: any, market?: BinanceMarketType) => {
  if (options.isTest) {
    switch (options.market || market) {
      case 'spot':
        // Spot test keys Jordi.
        options.apiKey = 'Km2NVvyj0nIvBS26keQkvCbRyZ01yzGyFweRWt8oJf9Rza00u1V5wYVVmEUSg130';
        options.apiSecret = 'n9QtgRInpJ1Z68hJkGWZ06LVxvTRdsojoOXCIth8IGtDtiNYNoKyNol0EELGhWN9';
        break;
  
      case 'usdm':
        // Futures test keys Jordi.
        options.apiKey = '';
        options.apiSecret = '';
        break;
    }
  }
  return options;
};

const testApi = async () => {
  try {
    
    console.log('---------------- API TEST ----------------------');
 
    const market: BinanceMarketType = 'spot';
    // const market: BinanceMarketType = 'usdm';

    const options: BinanceApiOptions = {
      // Binance keys Jordi.
      apiKey: '6mjeCol48kgmK5diGfy90GynOW43RCQcOl6pXsJIPHpwtQWob6LIsW1Vw5vGv5Ax',
      apiSecret: 'livWZ3R7HSkFQXmBoXF37o7RVxWRMQ2A1JfK4QzUu89srHEzknFaBhc51zw6xCqj',
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
      console.log('getAccountTradeList() =>', await api.getAccountTradeList({ symbol: 'BNBUSDT' }));

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

const testUserWs = async () => {
  try {

    console.log('---------------- User WebSocket TEST ----------------------');
 
    // const market: BinanceMarketType = 'spot';
    const market: BinanceMarketType = 'usdm';

    const userOptions: BinanceWebsocketOptions = {
      streamType: 'user',
      market: market,
      streamFormat: 'stream',
      // isTest: true,
      // Binance keys Jordi.
      // apiKey: '6mjeCol48kgmK5diGfy90GynOW43RCQcOl6pXsJIPHpwtQWob6LIsW1Vw5vGv5Ax',
      // apiSecret: 'livWZ3R7HSkFQXmBoXF37o7RVxWRMQ2A1JfK4QzUu89srHEzknFaBhc51zw6xCqj',
       // Binance keys Xavi.
       apiKey: 'eL6y9S0jkEqqkSnT1hwnNQ9ipn4yW4yLZIojcTLoCLQw8ETiqgGGkEOM6de7jtOx',
       apiSecret: '3uXfopHqLUAT4CTQ1rIL8B825NcfeVy4p5xCJZM67j23GRFV3UJcNF782IIHge0E',
    };

    const wsUser = new BinanceWebsocket(setTestKeys(userOptions));

    wsUser.balanceUpdate().subscribe(data => writeLog('exemple_8_balanceUpdate_', data));
    wsUser.orderUpdate().subscribe(data => writeLog('exemple_8_orderUpdate_', data));
    // wsUser.balanceUpdate().subscribe(data => console.log('wsUser.balanceUpdate =>', JSON.stringify(data, null, '  ')));
    // wsUser.accountUpdate().subscribe(data => console.log('wsUser.accountUpdate =>', JSON.stringify(data, null, '  ')));
    // wsUser.orderUpdate().subscribe(data => console.log('wsUser.orderUpdate =>', JSON.stringify(data, null, '  ')));

    // setTimeout(() => { console.log('Reconnecting...'); wsUser.reconnect(); }, 10000);
    
    // setTimeout(() => { console.log('Subscribing to miniTicker...'); wsUser.miniTicker('BNBUSDT'); }, 10000);
    
    // interval(10000).subscribe(() => { console.log('Reconnecting...'); wsUser.reconnect(); });
    
  } catch (error) {
    console.error('Websocket ERROR', error);
  }
};

const testMarketWs = async () => {
  try {

    console.log('---------------- Market WebSocket TEST ----------------------');
 
    const market: BinanceMarketType = 'spot';
    // const market: BinanceMarketType = 'usdm';

    const marketOptions: BinanceWebsocketOptions = {
      streamType: 'market',
      market: market,
      streamFormat: 'stream',
      // isTest: true,
    };
    
    const wsMarket = new BinanceWebsocket(marketOptions);

    const klineUSDT = wsMarket.kline('BNBUSDT', '1m').subscribe(data => console.log(data));
    const miniTickerUSDT = wsMarket.miniTicker('BNBUSDT').subscribe(data => console.log([data.eventType, data.symbol, data.close]));
    // const miniTickerEUR = wsMarket.miniTicker('BNBEUR').subscribe(data => console.log([data.eventType, data.symbol, data.close]));
    // const miniTickerUSDT = wsMarket.miniTicker('BNBUSDT').subscribe(data => console.log(data));
    // const miniTickerEUR = wsMarket.miniTicker('BNBEUR').subscribe(data => console.log(data));
    // const bookTickerUSDT = wsMarket.bookTicker('BNBUSDT').subscribe(data => console.log('bookTickerUSDT =>', data));
    
    // setTimeout(() => { console.log('Unsibscribe USDT miniTicker'); miniTickerUSDT.unsubscribe(); }, 10000);    
    // setTimeout(() => { console.log('Reconnecting...'); wsMarket.reconnect(); }, 10000);
    // setTimeout(() => { console.log('Subscribing to orderUpdate...'); wsMarket.orderUpdate(); }, 10000);

  } catch (error) {
    console.error('Websocket ERROR', error);
  }
};

const logFileName = 'exemple-8-75_leverage.ts';

function writeLog(variable: string, data: any) {
  const url = Resource.normalize(`./test/${logFileName}`);
  const value = JSON.stringify(data, null, ' ');
  console.log(value);
  fs.appendFileSync(url, `const ${variable} = ${value};\n\n`);
}
// testApi();
testUserWs();
// testMarketWs();

