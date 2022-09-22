import * as fs from 'fs';

import { BinanceApiSpot } from '../src/binance-api-spot';
import { BinanceApiFutures } from '../src/binance-api-futures';
import { BinanceApiOptions, BinanceMarketType } from '../src/types/binance.types';
import { BinanceWebsocketOptions } from '../src/types/binance-websocket.types';
import { BinanceWebsocket } from '../src';

import { Resource, Terminal  } from '@metacodi/precode';
import { apiKeys, setTestKeys } from './api-keys';

/**
 * ```bash
 * npx ts-node test/test-ws-market.ts
 * ```
 */

/** Archivo donde se escribirá la salida. */
const logFileName = 'results/exemple-kline-01.ts';

/** Escribe en el archivo `logFileName`. */
function writeLog(variable: string, data: any) {
  const url = Resource.normalize(`./test/${logFileName}`);
  const value = JSON.stringify(data, null, ' ');
  console.log(value);
  fs.appendFileSync(url, `const ${variable} = ${value};\n\n`);
}

const testMarketWs = async () => {
  try {

    console.log('---------------- Market WebSocket TEST ----------------------');
 
    // const market: BinanceMarketType = 'spot';
    const market: BinanceMarketType = 'usdm';

    const marketOptions: BinanceWebsocketOptions = {
      streamType: 'market',
      market: market,
      streamFormat: 'stream',
      // streamFormat: 'raw',
      // isTest: true,
    };
    
    const wsMarket = new BinanceWebsocket(marketOptions);

    // const klineUSDT = wsMarket.kline('BTCUSDT', '1m').subscribe(data => writeLog('exemple_01', data));
    const klineUSDT = wsMarket.kline('BTCUSDT', '1m').subscribe(data => console.log(data));
    // const miniTickerUSDT = wsMarket.miniTicker('BTCUSDT').subscribe(data => console.log([data.eventType, data.symbol, data.close]));
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

testMarketWs();
