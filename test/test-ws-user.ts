import * as fs from 'fs';

import { BinanceMarketType } from '../src/types/binance.types';
import { BinanceWebsocketOptions } from '../src/types/binance-websocket.types';
import { BinanceWebsocket } from '../src';

import { Resource, Terminal  } from '@metacodi/precode';
import { apiKeys, setTestKeys } from './api-keys';

/**
 * ```bash
 * npx ts-node test/test-ws-user.ts
 * ```
 */

/** Archivo donde se escribirá la salida. */
const logFileName = 'results/exemple-10-75_leverage.ts';

/** Escribe en el archivo `logFileName`. */
function writeLog(variable: string, data: any) {
  const url = Resource.normalize(`./test/${logFileName}`);
  const value = JSON.stringify(data, null, ' ');
  console.log(value);
  fs.appendFileSync(url, `const ${variable} = ${value};\n\n`);
}

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
      ...apiKeys,
    };

    const wsUser = new BinanceWebsocket(setTestKeys(userOptions));

    wsUser.balanceUpdate().subscribe(data => writeLog('exemple_10_balanceUpdate_', data));
    wsUser.orderUpdate().subscribe(data => writeLog('exemple_10_orderUpdate_', data));
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

testUserWs();
