/// <reference types="ws" />
/// <reference types="node" />
import WebSocket from 'isomorphic-ws';
import EventEmitter from 'events';
import { Subject, Subscription } from 'rxjs';
import { BinanceApi } from './binance-api';
import { BinanceMarketType, BinanceKlineInterval } from "./types/binance.types";
import { BinanceWebsocketOptions, WsConnectionState, WsStreamType, WsStreamFormat, WsUserStreamEmitterType, BinanceWs24hrMiniTicker, BinanceWsSpotBalanceUpdate, BinanceWsSpotAccountUpdate, BinanceWsFuturesAccountUpdate, BinanceWsSpotOrderUpdate, BinanceWsFuturesOrderUpdate, BinanceWsBookTicker, BinanceWsFuturesAccountConfigUpdate, BinanceWsFuturesMarginCall, BinanceWsKline } from './types/binance-websocket.types';
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
    get pingInterval(): number;
    get pingTimeout(): number;
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
    accountUpdate(): Subject<BinanceWsSpotAccountUpdate | BinanceWsFuturesAccountUpdate>;
    balanceUpdate(): Subject<BinanceWsSpotBalanceUpdate | BinanceWsFuturesAccountUpdate>;
    marginCall(): Subject<BinanceWsFuturesMarginCall>;
    accountConfigUpdate(): Subject<BinanceWsFuturesAccountConfigUpdate>;
    orderUpdate(): Subject<BinanceWsSpotOrderUpdate | BinanceWsFuturesOrderUpdate>;
    protected emitAccountUpdate(event: any): void;
    protected emitBalanceUpdate(event: any): void;
    protected emitMarginCall(event: any): void;
    protected emitAccountConfigUpdate(event: any): void;
    protected emitOrderUpdate(event: any): void;
    protected registerAccountSubscription(key: WsUserStreamEmitterType): Subject<any>;
    protected emitNextAccountEvent(key: string, event: any, parser: (data: any) => any): void;
    miniTicker(symbol: string): Subject<BinanceWs24hrMiniTicker>;
    bookTicker(symbol: string): Subject<BinanceWsBookTicker>;
    kline(symbol: string, interval: BinanceKlineInterval): Subject<BinanceWsKline>;
    protected emitMiniTicker(event: any): void;
    protected emitBookTicker(event: any): void;
    protected emitKline(event: any): void;
    protected registerMarketStreamSubscription(key: string): Subject<any>;
    protected emitNextMarketStreamEvent(key: string, event: any, parser: (data: any) => any): void;
    private subscriptionId;
    protected respawnMarketStreamSubscriptions(): void;
    protected isSubjectUnobserved(emitter: Subject<any>): boolean;
    protected subscribeMarketStream(params: string[]): void;
    protected unsubscribeMarketStream(params: string[]): void;
    protected get wsId(): string;
}
//# sourceMappingURL=binance-websocket.d.ts.map