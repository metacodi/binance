/// <reference types="ws" />
/// <reference types="node" />
import WebSocket from 'isomorphic-ws';
import EventEmitter from 'events';
import { Subject, Subscription } from 'rxjs';
import { BinanceApi } from './binance-api';
import { BinanceMarketType, BinanceWebsocketOptions, WsConnectionState, WsStreamType, WsStreamFormat, BinanceWs24hrMiniTicker, WsUserStreamEmitterType, BinanceWsSpotBalanceUpdate, BinanceWsSpotAccountUpdate, BinanceWsFuturesAccountUpdate, BinanceWsBookTicker, BinanceWsSpotOrderUpdate, BinanceWsFuturesOrderUpdate, BinanceWsKline, BinanceKlineInterval } from ".";
export declare class BinanceWebsocket extends EventEmitter {
    protected options: BinanceWebsocketOptions;
    protected ws: WebSocket;
    protected api: BinanceApi;
    protected status: WsConnectionState;
    protected pingInterval?: Subscription;
    protected pongTimer?: Subscription;
    protected listenKey?: string;
    protected listenKeyTimer?: Subscription;
    protected emitters: {
        [WsStreamEmitterType: string]: Subject<any>;
    };
    constructor(options: BinanceWebsocketOptions);
    get market(): BinanceMarketType;
    get streamType(): WsStreamType;
    get streamFormat(): WsStreamFormat;
    get apiKey(): string;
    get apiSecret(): string;
    get isTest(): boolean;
    get reconnectPeriod(): number;
    get pingPeriod(): number;
    get pongPeriod(): number;
    get defaultOptions(): Partial<BinanceWebsocketOptions>;
    protected getApiClient(): BinanceApi;
    protected initialize(): Promise<void>;
    get baseUrl(): string;
    get url(): string;
    connect(): Promise<void>;
    reconnect(): void;
    close(): Promise<void>;
    destroy(): void;
    protected onWsOpen(event: WebSocket.Event): void;
    protected onWsClose(event: WebSocket.CloseEvent): void;
    protected onWsError(event: WebSocket.ErrorEvent): void;
    protected ping(): void;
    protected onWsPing(event: any): void;
    protected onWsPong(event: any): void;
    protected getUserDataListenKey(): Promise<void>;
    protected onWsMessage(event: WebSocket.MessageEvent): void;
    protected parseWsMessage(event: any): any;
    protected discoverEventType(data: any): string;
    private isBookTickerEventType;
    protected registerAccountSubscription(key: WsUserStreamEmitterType): Subject<any>;
    protected emitNextAccountEvent(key: string, event: any, parser: (data: any) => any): void;
    accountUpdate(): Subject<BinanceWsSpotAccountUpdate | BinanceWsFuturesAccountUpdate>;
    protected emitAccountUpdate(event: any): void;
    balanceUpdate(): Subject<BinanceWsSpotBalanceUpdate | BinanceWsFuturesAccountUpdate>;
    protected emitBalanceUpdate(event: any): void;
    orderUpdate(): Subject<BinanceWsSpotOrderUpdate | BinanceWsFuturesOrderUpdate>;
    protected emitOrderUpdate(event: any): void;
    protected registerMarketStreamSubscription(key: string): Subject<any>;
    protected emitNextMarketStreamEvent(key: string, event: any, parser: (data: any) => any): void;
    private subscriptionId;
    protected respawnMarketStreamSubscriptions(): void;
    protected isSubjectUnobserved(emitter: Subject<any>): boolean;
    protected subscribeMarketStream(params: string[]): void;
    protected unsubscribeMarketStream(params: string[]): void;
    miniTicker(symbol: string): Subject<BinanceWs24hrMiniTicker>;
    protected emitMiniTicker(event: any): void;
    bookTicker(symbol: string): Subject<BinanceWsBookTicker>;
    protected emitBookTicker(event: any): void;
    kline(symbol: string, interval: BinanceKlineInterval): Subject<BinanceWsKline>;
    protected emitKline(event: any): void;
    protected get wsId(): string;
}
//# sourceMappingURL=binance-websocket.d.ts.map