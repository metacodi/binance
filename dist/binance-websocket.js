"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceWebsocket = void 0;
const isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
const events_1 = __importDefault(require("events"));
const rxjs_1 = require("rxjs");
const binance_api_spot_1 = require("./binance-api-spot");
const binance_api_futures_1 = require("./binance-api-futures");
const binance_websocket_types_1 = require("./types/binance-websocket.types");
class BinanceWebsocket extends events_1.default {
    constructor(options) {
        super();
        this.status = 'initial';
        this.emitters = {};
        this.subscriptionId = 0;
        this.options = Object.assign(Object.assign({}, this.defaultOptions), options);
        this.initialize();
    }
    get market() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.market; }
    get streamType() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.streamType; }
    get streamFormat() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.streamFormat; }
    get apiKey() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.apiKey; }
    get apiSecret() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.apiSecret; }
    get isTest() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.isTest; }
    get reconnectPeriod() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.reconnectPeriod; }
    get pingPeriod() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.pingPeriod; }
    get pongPeriod() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.pongPeriod; }
    get defaultOptions() {
        return {
            isTest: false,
            streamFormat: 'stream',
            reconnectPeriod: 5 * 1000,
            pingPeriod: 2 * 60 * 1000,
            pongPeriod: 6 * 60 * 1000,
        };
    }
    getApiClient() {
        const { apiKey, apiSecret, isTest } = this.options;
        return this.market === 'spot' ? new binance_api_spot_1.BinanceApiSpot({ apiKey, apiSecret, isTest }) : new binance_api_futures_1.BinanceApiFutures({ apiKey, apiSecret, isTest });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.api = this.getApiClient();
            this.connect();
        });
    }
    get baseUrl() {
        switch (this.market) {
            case 'spot': return this.isTest ? `wss://testnet.binance.vision` : `wss://stream.binance.com:9443`;
            case 'usdm': return this.isTest ? `wss://stream.binancefuture.com` : `wss://fstream.binance.com`;
            case 'coinm': return this.isTest ? `wss://dstream.binancefuture.com` : `wss://dstream.binance.com`;
            case 'margin': return this.isTest ? `wss://testnet.binance.vision` : `wss://stream.binance.com:9443`;
            case 'voptions': return this.isTest ? `wss://testnetws.binanceops.vision` : `wss://vstream.binance.com`;
        }
    }
    get url() {
        const format = this.streamFormat === 'raw' ? 'ws' : 'stream';
        const listenKey = this.streamType === 'user' ? (format === 'ws' ? `/${this.listenKey}` : `?streams=${this.listenKey}`) : '';
        return `${this.baseUrl}/${format}${listenKey}`;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.streamType === 'user') {
                yield this.getUserDataListenKey();
            }
            this.ws = new isomorphic_ws_1.default(this.url);
            console.log(this.wsId, '=> connecting', this.url);
            this.ws.onopen = event => this.onWsOpen(event);
            this.ws.onerror = event => this.onWsError(event);
            this.ws.onclose = event => this.onWsClose(event);
            this.ws.onmessage = event => this.onWsMessage(event);
            if (typeof this.ws.on === 'function') {
                this.ws.on('ping', event => this.onWsPing(event));
                this.ws.on('pong', event => this.onWsPong(event));
            }
            this.ws.onping = (event) => this.onWsPing(event);
            this.ws.onpong = (event) => this.onWsPong(event);
        });
    }
    reconnect() {
        if (this.status === 'reconnecting') {
            return;
        }
        this.status = 'reconnecting';
        this.close();
        setTimeout(() => this.connect(), this.reconnectPeriod);
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.status !== 'reconnecting') {
                    this.status = 'closing';
                }
                if (this.pingInterval) {
                    this.pingInterval.unsubscribe();
                }
                if (this.pongTimer) {
                    this.pongTimer.unsubscribe();
                }
                if (this.listenKeyTimer) {
                    this.listenKeyTimer.unsubscribe();
                }
                if (this.streamType === 'user') {
                    yield this.api.closeUserDataListenKey(this.listenKey);
                }
                this.ws.close();
                if (typeof this.ws.terminate === 'function') {
                    this.ws.terminate();
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    destroy() {
        Object.keys(this.emitters).map(WsStreamEmitterType => this.emitters[WsStreamEmitterType].complete());
        this.emitters = {};
    }
    onWsOpen(event) {
        if (this.status === 'reconnecting') {
            console.log(this.wsId, '=> reconnected!');
            this.emit('reconnected', { event });
        }
        else {
            console.log(this.wsId, '=> connected!');
            this.emit('open', { event });
        }
        this.status = 'connected';
        if (this.pingInterval) {
            this.pingInterval.unsubscribe();
        }
        this.pingInterval = rxjs_1.interval(this.pingPeriod).subscribe(() => this.ping());
        this.respawnMarketStreamSubscriptions();
    }
    onWsClose(event) {
        console.log(this.wsId, '=> closed');
        if (this.status !== 'closing') {
            this.reconnect();
            this.emit('reconnecting', { event });
        }
        else {
            this.status = 'initial';
            this.emit('close', { event });
        }
    }
    onWsError(event) {
        console.error(`${this.wsId} =>`, (event === null || event === void 0 ? void 0 : event.error) || event);
    }
    ping() {
        console.log(this.wsId, `=> Sending ping...`);
        try {
            if (this.pongTimer) {
                this.pongTimer.unsubscribe();
            }
            if (typeof this.ws.ping === 'function') {
                this.pongTimer = rxjs_1.timer(this.pongPeriod).subscribe(() => {
                    console.log(this.wsId, `=> Pong timeout - closing socket to reconnect`);
                    this.reconnect();
                });
                this.ws.ping();
            }
            else {
            }
        }
        catch (error) {
            console.error(this.wsId, `=> Failed to send WS ping`, error);
        }
    }
    onWsPing(event) {
        try {
            console.log(this.wsId, '=> Received ping, sending pong');
            if (typeof this.ws.pong === 'function') {
                this.ws.pong();
            }
            else {
            }
        }
        catch (error) {
            console.error(this.wsId, `=> Failed to send WS pong`, error);
        }
    }
    onWsPong(event) {
        console.log(this.wsId, '=> Received pong, clearing timer');
        if (this.pongTimer) {
            this.pongTimer.unsubscribe();
        }
    }
    getUserDataListenKey() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.listenKeyTimer) {
                    this.listenKeyTimer.unsubscribe();
                }
                const response = yield this.api.getUserDataListenKey();
                this.listenKey = response.listenKey;
                console.log(this.wsId, '=> listenKey: ', this.listenKey);
                this.listenKeyTimer = rxjs_1.timer(30 * 60 * 1000).subscribe(() => this.api.keepAliveUserDataListenKey(this.listenKey));
                return Promise.resolve();
            }
            catch (error) {
                console.error(error);
                return Promise.reject();
            }
        });
    }
    onWsMessage(event) {
        const data = this.parseWsMessage(event);
        this.emit('message', data);
        switch (this.discoverEventType(data)) {
            case 'balanceUpdate': return this.emitBalanceUpdate(data);
            case 'outboundAccountPosition': return this.emitAccountUpdate(data);
            case 'ACCOUNT_UPDATE':
                this.emitBalanceUpdate(data);
                this.emitAccountUpdate(data);
                break;
            case 'MARGIN_CALL': return this.emitMarginCall(data);
            case 'ACCOUNT_CONFIG_UPDATE': return this.emitAccountConfigUpdate(data);
            case 'executionReport':
            case 'ORDER_TRADE_UPDATE': return this.emitOrderUpdate(data);
            case 'listenKeyExpired':
                if (this.status !== 'closing' && this.status !== 'initial') {
                    this.reconnect();
                }
                break;
            case '24hrMiniTicker': return this.emitMiniTicker(data);
            case 'bookTicker': return this.emitBookTicker(data);
            case 'kline': return this.emitKline(data);
            default:
                console.log(data);
                console.log(JSON.stringify(data));
        }
    }
    parseWsMessage(event) {
        if (typeof event === 'string') {
            const parsedEvent = JSON.parse(event);
            if (parsedEvent.data) {
                return this.parseWsMessage(parsedEvent.data);
            }
        }
        return (event === null || event === void 0 ? void 0 : event.data) ? JSON.parse(event.data) : event;
    }
    discoverEventType(data) {
        var _a;
        const obj = Array.isArray(data) ? (data.length ? data[0] : undefined) : data;
        if (this.streamFormat === 'raw') {
            if (!(obj === null || obj === void 0 ? void 0 : obj.e)) {
                if (this.isBookTickerEventType(obj)) {
                    obj.e = 'bookTicker';
                }
            }
            return obj === null || obj === void 0 ? void 0 : obj.e;
        }
        else {
            if (!((_a = obj.data) === null || _a === void 0 ? void 0 : _a.e) && obj.stream && obj.stream.includes('@')) {
                const eventType = obj.stream.split('@')[1];
                obj.data.e = eventType;
            }
            return obj.data ? obj.data.e : undefined;
        }
    }
    isBookTickerEventType(data) {
        if (!data) {
            return false;
        }
        if (typeof data !== 'object') {
            return false;
        }
        const match = ['u', 's', 'b', 'B', 'a', 'A'];
        const keys = Object.keys(data);
        return keys.length === match.length && keys.every(key => match.includes(key));
    }
    registerAccountSubscription(key) {
        if (this.streamType === 'market') {
            throw (`No es pot subscriure a '${key}' perquè aquest websocket (${this.wsId}) està connectat un stream de mercat.`);
        }
        const stored = this.emitters[key];
        if (stored) {
            return stored;
        }
        const created = new rxjs_1.Subject();
        this.emitters[key] = created;
        return created;
    }
    emitNextAccountEvent(key, event, parser) {
        const data = this.streamFormat === 'raw' ? event : event.data;
        const stored = this.emitters[key];
        if (!this.isSubjectUnobserved(stored)) {
            stored.next(parser(data));
        }
    }
    accountUpdate() {
        return this.registerAccountSubscription('accountUpdate');
    }
    emitAccountUpdate(event) { this.emitNextAccountEvent('accountUpdate', event, binance_websocket_types_1.parseAccountUpdate); }
    balanceUpdate() {
        return this.registerAccountSubscription('balanceUpdate');
    }
    emitBalanceUpdate(event) { this.emitNextAccountEvent('balanceUpdate', event, binance_websocket_types_1.parseBalanceUpdate); }
    marginCall() {
        return this.registerAccountSubscription('marginCall');
    }
    emitMarginCall(event) { this.emitNextAccountEvent('marginCall', event, binance_websocket_types_1.parseMarginCall); }
    accountConfigUpdate() {
        return this.registerAccountSubscription('accountConfigUpdate');
    }
    emitAccountConfigUpdate(event) { this.emitNextAccountEvent('accountConfigUpdate', event, binance_websocket_types_1.parseAccountConfigUpdate); }
    orderUpdate() {
        return this.registerAccountSubscription('orderUpdate');
    }
    emitOrderUpdate(event) { this.emitNextAccountEvent('orderUpdate', event, binance_websocket_types_1.parseOrderUpdate); }
    registerMarketStreamSubscription(key) {
        if (this.streamType === 'user') {
            throw (`No es pot subscriure a '${key}' perquè aquest websocket (${this.wsId}) està connectat a un strem d'usuari.`);
        }
        const stored = this.emitters[key];
        if (stored) {
            return stored;
        }
        const created = new rxjs_1.Subject();
        this.emitters[key] = created;
        if (this.status === 'connected') {
            this.subscribeMarketStream([key]);
        }
        return created;
    }
    emitNextMarketStreamEvent(key, event, parser) {
        const data = this.streamFormat === 'raw' ? event : event.data;
        const stored = this.emitters[key];
        if (this.isSubjectUnobserved(stored)) {
            this.unsubscribeMarketStream([key]);
            if (stored) {
                stored.complete();
            }
            delete this.emitters[key];
        }
        else {
            stored.next(parser(data));
        }
    }
    respawnMarketStreamSubscriptions() {
        const params = [];
        Object.keys(this.emitters).map(key => {
            const stored = this.emitters[key];
            if (this.isSubjectUnobserved(stored)) {
                if (stored) {
                    stored.complete();
                }
                delete this.emitters[key];
            }
            else if (key.includes('@')) {
                params.push(key);
            }
        });
        if (params.length) {
            this.subscribeMarketStream(params);
        }
    }
    isSubjectUnobserved(emitter) {
        var _a;
        return !emitter || emitter.closed || !((_a = emitter.observers) === null || _a === void 0 ? void 0 : _a.length);
    }
    subscribeMarketStream(params) {
        const id = ++this.subscriptionId;
        const data = { method: "SUBSCRIBE", id, params };
        console.log(this.wsId, '=> subscribeMarketStream => ', data);
        this.ws.send(JSON.stringify(data), error => error ? this.onWsError(error) : undefined);
    }
    unsubscribeMarketStream(params) {
        const id = ++this.subscriptionId;
        const data = { method: "UNSUBSCRIBE", id, params };
        this.ws.send(JSON.stringify(data), error => error ? this.onWsError(error) : undefined);
    }
    miniTicker(symbol) {
        const key = `${symbol.toLocaleLowerCase()}@miniTicker`;
        return this.registerMarketStreamSubscription(key);
    }
    emitMiniTicker(event) {
        const key = this.streamFormat === 'raw' ? `${event.s.toLowerCase()}@miniTicker` : event.stream;
        this.emitNextMarketStreamEvent(key, event, binance_websocket_types_1.parseMiniTicker);
    }
    bookTicker(symbol) {
        const key = `${symbol.toLocaleLowerCase()}@bookTicker`;
        return this.registerMarketStreamSubscription(key);
    }
    emitBookTicker(event) {
        const key = this.streamFormat === 'raw' ? `${event.s.toLowerCase()}@bookTicker` : event.stream;
        this.emitNextMarketStreamEvent(key, event, binance_websocket_types_1.parseBookTicker);
    }
    kline(symbol, interval) {
        const key = `${symbol.toLocaleLowerCase()}@kline_${interval}`;
        return this.registerMarketStreamSubscription(key);
    }
    emitKline(event) {
        const key = this.streamFormat === 'raw' ? `${event.s.toLowerCase()}@kline_${event.k.i}` : event.stream;
        this.emitNextMarketStreamEvent(key, event, binance_websocket_types_1.parseKline);
    }
    get wsId() { return `${this.market}-${this.streamType}-ws`; }
}
exports.BinanceWebsocket = BinanceWebsocket;
//# sourceMappingURL=binance-websocket.js.map