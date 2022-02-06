import WebSocket from 'isomorphic-ws';
import { EventEmitter } from 'events';
import { Subject, interval, timer, Subscription } from 'rxjs';

import { BinanceApi } from '../src/binance-api';
import { BinanceApiOptions, BinanceApiFutures, BinanceMarketType, BinanceApiSpot, BinanceWebsocketOptions, WsStreamType, WsConnectionState } from "../src";


export interface WsContext {
  /** Indica si l'stream és d'usuari o de mercat. */
  streamType: WsStreamType;
  /** Market associat. */
  market: BinanceMarketType;
  /** Indica si és mode test. */
  isTest: boolean;
  /** Per streams relacionats amb symbols, ex: tickers. */
  symbol?: string
  /** Indica el nom de l'stream on connectar. */
  endpoint: string;
  /** Clau associada amb l'stream d'usuari. */
  listenKey?: string;
  /** Emisors de missatges. */
  emitters: { [WsStreamEmitterType: string]: Subject<any> };
  /** Referència a la instància del WebSocket. */
  ws: WebSocket;
  /** Estat de la connexió. */
  status: WsConnectionState;
  /** Subscripció al interval que envia un ping al servidor per mantenir viva la connexió.  */
  ping?: Subscription;
  /** Subscriptor al timer que controla la resposta del servidor. */
  pong?: Subscription;
}

export class BinanceBadWebsocket extends EventEmitter {
  
  /** Opcions de configuració. */
  protected options: BinanceWebsocketOptions;
  /** Referències als clients API. */
  protected apis: { [market: string]: BinanceApi } = {};
  /** Referències als websockets instanciats. */
  protected websockets: { [key: string]: WsContext } = {};

  constructor(
    options: BinanceWebsocketOptions,
  ) {
    super();
    this.options = { ...this.defaultOptions, ...options };
  }


  // ---------------------------------------------------------------------------------------------------
  //  options
  // ---------------------------------------------------------------------------------------------------

  get apiKey(): string { return this.options?.apiKey; }
  
  get apiSecret(): string { return this.options?.apiSecret; }

  get reconnectPeriod(): number { return this.options?.reconnectPeriod; }

  get pingPeriod(): number { return this.options?.pingPeriod; }

  get pongPeriod(): number { return this.options?.pongPeriod; }

  get defaultOptions(): Partial<BinanceWebsocketOptions> {
    return {
      reconnectPeriod: 500,
      pingPeriod: 10000,
      pongPeriod: 7500,
    }
  }


  // ---------------------------------------------------------------------------------------------------
  //  connect . terminate
  // ---------------------------------------------------------------------------------------------------

  public connect(url: string, key: string, context: Partial<WsContext>, options?: { forceNewConnection?: boolean }): WsContext {
    if (!options) { options = {}; }
    const forceNewConnection = options.forceNewConnection === undefined ? false : !!options.forceNewConnection;
    // // Comprovem si ja existeix un.
    // const stored = this.websockets[key];
    // if (stored) {
    //   if (stored.ws.readyState === stored.ws.OPEN && !forceNewConnection) {
    //     console.log(`connect(): Returning existing open WS connection`, { url, key });
    //     return stored;
    //   } else {
    //     try { this.terminate(key); } catch (error) { console.warn(`connect(): Error terminating existing WS connection`, { url, key, error }); }
    //   }
    // }
    // Nova instància.
    const ws = new WebSocket(url);
    context.ws = ws;
    context.status = 'initial';
    context.emitters = {};
    this.websockets[key] = context as WsContext;
    // Listeners.
    ws.onopen = event => this.onWsOpen(event, key, url);
    ws.onerror = event => this.onWsError(event, key, ws);
    ws.onclose = event => this.onWsClose(event, key, ws, url);
    ws.onmessage = event => this.onWsMessage(event, key);
    // ping . pong
    if (typeof ws.on === 'function') {
      ws.on('ping', event => this.onWsPing(event, key, ws));
      ws.on('pong', event => this.onWsPong(event, key));
    }
    // Not sure these work in the browser, the traditional event listeners are required for ping/pong frames in node
    (ws as any).onping = (event: WebSocket.Event) => this.onWsPing(event, key, ws);
    (ws as any).onpong = (event: WebSocket.Event) => this.onWsPong(event, key);
    return context as WsContext;
  }

  private terminate(key: string) {
    const stored = this.websockets[key];
    if (!stored) { return; }
    if (stored.ping) { stored.ping.unsubscribe(); }
    if (stored.pong) { stored.pong.unsubscribe(); }
    stored.ws.close();
    // #168: ws.terminate() undefined in browsers.
    if (typeof stored.ws.terminate === 'function') { stored.ws.terminate(); }
    Object.keys(stored.emitters).map(WsStreamEmitterType => stored.emitters[WsStreamEmitterType].complete());
    stored.emitters = {};
  }


  // ---------------------------------------------------------------------------------------------------
  //  open . close . error
  // ---------------------------------------------------------------------------------------------------

  private onWsOpen(event: WebSocket.Event, key: string, url: string) {
    const stored = this.websockets[key];
    if (stored.status === 'reconnecting') {
      console.info('Websocket reconnected', { url, key });
      this.emit('reconnected', { key, event });
    } else {
      console.info('Websocket connected', { url, key });
      this.emit('open', { key, event });
    }
    stored.status = 'connected';
    if (stored.ping) { stored.ping.unsubscribe(); }
    stored.ping = interval(this.pingPeriod).subscribe(() => this.ping(key));
  }

  private onWsClose(event: WebSocket.CloseEvent, key: string, ws: WebSocket, url: string) {
    const stored = this.websockets[key];

  }

  private onWsError(event: WebSocket.ErrorEvent, key: string, ws: WebSocket) {
    const stored = this.websockets[key];

  }


  // ---------------------------------------------------------------------------------------------------
  //  ping . pong
  // ---------------------------------------------------------------------------------------------------

  private ping(key: string) {
    console.log(`Sending ping`, { key });
    const stored = this.websockets[key];
    try {
      if (!stored) { throw new Error(`No active websocket connection exists for '${key}'.`); }

      if (stored.pong) { stored.pong.unsubscribe(); }
      stored.pong = timer(this.pongPeriod).subscribe(() => this.pongTimeout(key));

      // Binance allows unsolicited pongs, so we send both (though we expect a pong in response to our ping if the connection is still alive).
      stored.ws.ping();
      stored.ws.pong();
      
    } catch (error) {
      console.error(`Failed to send WS ping`, { key });      
    }
  }

  private onWsPing(event: any, key: string, ws: WebSocket) {
    console.log('Received ping, sending pong frame', { key, event });
    ws.pong();
  }

  private onWsPong(event: any, key: string) {
    const stored = this.websockets[key];
    console.log('Received pong, clearing pong timer', { key, event });
    if (stored.pong) { stored.pong.unsubscribe(); }
  }

  private pongTimeout(key: string) {
    const stored = this.websockets[key];
    if (!stored) { return; }
    console.info(`Pong timeout - closing socket to reconnect`, { key });
    stored.status = 'reconnecting';
    this.terminate(key);
  }


  // ---------------------------------------------------------------------------------------------------
  //  message event
  // ---------------------------------------------------------------------------------------------------

  private onWsMessage(event: WebSocket.MessageEvent, key: string) {
    const stored = this.websockets[key];

  }


  // ---------------------------------------------------------------------------------------------------
  //  api client
  // ---------------------------------------------------------------------------------------------------

  private getApiClient(market: BinanceMarketType, isTest: boolean): BinanceApi {
    const { apiKey, apiSecret } = this;
    const config: BinanceApiOptions = { apiKey, apiSecret, isTest };
    const existing = this.apis[market];
    if (existing) { return existing; }
    return market === 'spot' ? new BinanceApiSpot(config) : new BinanceApiFutures(config);
  }

  // ---------------------------------------------------------------------------------------------------
  //  subscriptions
  // ---------------------------------------------------------------------------------------------------

  // public async subscribeUserDataStream(context: Pick<WsContext, 'market' | 'isTest'>, options?: { forceNewConnection?: boolean, isReconnecting?: boolean }): Promise<Subject<any>> {
  //   if (!options) { options = {}; }
  //   const forceNewConnection = options.forceNewConnection === undefined ? false : options.forceNewConnection;
  //   const isReconnecting = options.isReconnecting === undefined ? false : options.isReconnecting;
  //   // Obtenim una clau del servidor.
  //   const { market, isTest } = context;
  //   const { listenKey } = await this.getApiClient(market, isTest).getUserDataListenKey();
  //   // Construim una clau inequívoca.
  //   const key = [market, 'userData', listenKey].join('_');
    
  //   const stored = this.websockets[key];
  //   if (stored) {
  //     const isConnecting = stored.status === 'connecting' || stored.status === 'reconnecting';
  //     if (!forceNewConnection && isConnecting) {
  //       console.log('Existing spot user data connection in progress for listen key. Avoiding duplicate', { key });
  //       return stored.emitter;
  //       // return Promise.resolve(stored);
  //     }
  //   }

  //   const url = '';
  //   const created = this.connect(url, key, context);
  //   return Promise.resolve(created.emitter);
  // }

  // public async subscribeSymbolMini24hrTicker(context: Pick<WsContext, 'market' | 'symbol'>): Promise<Subject<any>> {

  //   return Promise.resolve(created.emitter);
  // }

  private generateContextKey(...args: any[]): string { return args.join('_'); }
}
