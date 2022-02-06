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
const _1 = require(".");
class BinanceWebsocket extends events_1.default {
    constructor(options) {
        super();
        this.status = 'initial';
        this.emitters = {};
        this.open = new rxjs_1.Subject();
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
            streamFormat: 'raw',
            reconnectPeriod: 500,
            pingPeriod: 10000,
            pongPeriod: 7500,
        };
    }
    getApiClient() {
        const { apiKey, apiSecret, isTest, streamType } = this.options;
        return this.market === 'spot' ? new _1.BinanceApiSpot({ apiKey, apiSecret, isTest }) : new _1.BinanceApiFutures({ apiKey, apiSecret, isTest });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.api = this.getApiClient();
            if (this.streamType === 'user') {
                const response = yield this.api.getUserDataListenKey();
                this.listenKey = response.listenKey;
                console.log(this.wsId, 'listenKey: ', this.listenKey);
            }
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
        this.ws = new isomorphic_ws_1.default(this.url);
        console.log(this.wsId, 'connecting', this.url);
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
    }
    reconnect() {
        this.status = 'reconnecting';
        this.close();
        setTimeout(() => this.connect(), this.reconnectPeriod);
    }
    close() {
        if (this.status !== 'reconnecting') {
            this.status = 'closing';
        }
        if (this.pingInterval) {
            this.pingInterval.unsubscribe();
        }
        if (this.pongTimer) {
            this.pongTimer.unsubscribe();
        }
        this.ws.close();
        if (typeof this.ws.terminate === 'function') {
            this.ws.terminate();
        }
    }
    destroy() {
        Object.keys(this.emitters).map(WsStreamEmitterType => this.emitters[WsStreamEmitterType].complete());
        this.emitters = {};
    }
    onWsOpen(event) {
        if (this.status === 'reconnecting') {
            console.log(this.wsId, 'reconnected!');
            this.emit('reconnected', { event });
        }
        else {
            console.log(this.wsId, 'connected!');
            this.emit('open', { event });
        }
        this.status = 'connected';
        if (this.pingInterval) {
            this.pingInterval.unsubscribe();
        }
        this.pingInterval = (0, rxjs_1.interval)(this.pingPeriod).subscribe(() => this.ping());
        this.respawnMarketStreamSubscriptions();
    }
    onWsClose(event) {
        console.log(this.wsId, 'closed');
        if (this.status === 'reconnecting') {
            this.reconnect();
            this.emit('reconnecting', { event });
        }
        else {
            this.status = 'initial';
            this.emit('close', { event });
        }
    }
    onWsError(event) {
        console.error(this.wsId, (event === null || event === void 0 ? void 0 : event.error) || event);
    }
    ping() {
        console.log(this.wsId, `Sending ping...`);
        try {
            if (this.pongTimer) {
                this.pongTimer.unsubscribe();
            }
            this.pongTimer = (0, rxjs_1.timer)(this.pongPeriod).subscribe(() => {
                console.log(this.wsId, `Pong timeout - closing socket to reconnect`);
                this.reconnect();
            });
            this.ws.ping();
            this.ws.pong();
        }
        catch (error) {
            console.error(this.wsId, `Failed to send WS ping`);
        }
    }
    onWsPing(event) {
        console.log(this.wsId, 'Received ping, sending pong');
        this.ws.pong();
    }
    onWsPong(event) {
        console.log(this.wsId, 'Received pong, clearing timer');
        if (this.pongTimer) {
            this.pongTimer.unsubscribe();
        }
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
            case 'executionReport':
            case 'ORDER_TRADE_UPDATE': return this.emitOrderUpdate(data);
            case '24hrMiniTicker': return this.emitMiniTicker(data);
            case 'bookTicker': return this.emitBookTicker(data);
            default:
                console.log(data);
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
    accountUpdate() { return this.registerAccountSubscription('accountUpdate'); }
    emitAccountUpdate(event) { this.emitNextAccountEvent('accountUpdate', event, this.parseAccountUpdate); }
    parseAccountUpdate(data) {
        if (data.e === 'outboundAccountPosition') {
            return {
                eventType: 'outboundAccountPosition',
                eventTime: data.E,
                lastAccountUpdateTime: data.u,
                balances: data.B.map(b => ({
                    asset: b.a,
                    free: +b.f,
                    locked: +b.l,
                })),
            };
        }
        else if (data.e === 'ACCOUNT_UPDATE') {
            return {
                eventType: 'ACCOUNT_UPDATE',
                eventTime: data.E,
                transactionId: data.T,
                updateData: {
                    updateEventType: data.a.m,
                    updatedBalances: data.a.B.map(b => ({
                        asset: b.a,
                        balanceChange: +b.bc,
                        crossWalletBalance: +b.cw,
                        walletBalance: +b.wb,
                    })),
                    updatedPositions: data.a.P.map(p => ({
                        symbol: p.s,
                        marginAsset: undefined,
                        positionAmount: +p.pa,
                        entryPrice: +p.ep,
                        accumulatedRealisedPreFee: +p.cr,
                        unrealisedPnl: +p.up,
                        marginType: p.mt,
                        isolatedWalletAmount: +p.iw,
                        positionSide: p.ps,
                    })),
                },
            };
        }
    }
    balanceUpdate() { return this.registerAccountSubscription('balanceUpdate'); }
    emitBalanceUpdate(event) { this.emitNextAccountEvent('balanceUpdate', event, this.parseBalanceUpdate); }
    parseBalanceUpdate(data) {
        if (data.e === 'balanceUpdate') {
            return {
                eventType: 'balanceUpdate',
                eventTime: data.E,
                asset: data.a,
                balanceDelta: +data.d,
                clearTime: data.T,
            };
        }
        else if (data.e === 'ACCOUNT_UPDATE') {
            return {
                eventType: 'ACCOUNT_UPDATE',
                eventTime: data.E,
                transactionId: data.T,
                updateData: {
                    updateEventType: data.a.m,
                    updatedBalances: data.a.B.map(b => ({
                        asset: b.a,
                        balanceChange: +b.bc,
                        crossWalletBalance: +b.cw,
                        walletBalance: +b.wb,
                    })),
                    updatedPositions: data.a.P.map(p => ({
                        symbol: p.s,
                        marginAsset: undefined,
                        positionAmount: +p.pa,
                        entryPrice: +p.ep,
                        accumulatedRealisedPreFee: +p.cr,
                        unrealisedPnl: +p.up,
                        marginType: p.mt,
                        isolatedWalletAmount: +p.iw,
                        positionSide: p.ps,
                    })),
                },
            };
        }
    }
    orderUpdate() { return this.registerAccountSubscription('orderUpdate'); }
    emitOrderUpdate(event) { this.emitNextAccountEvent('orderUpdate', event, this.parseOrderUpdate); }
    parseOrderUpdate(data) {
        if (data.e === 'executionReport') {
            return {
                eventType: 'executionReport',
                eventTime: data.E,
                symbol: data.s,
                newClientOrderId: data.c,
                side: data.S,
                orderType: data.o,
                cancelType: data.f,
                quantity: +data.q,
                price: +data.p,
                stopPrice: +data.P,
                icebergQuantity: +data.F,
                orderListId: data.g,
                originalClientOrderId: data.C,
                executionType: data.x,
                orderStatus: data.X,
                rejectReason: data.r,
                orderId: data.i,
                lastTradeQuantity: +data.l,
                accumulatedQuantity: +data.z,
                lastTradePrice: +data.L,
                commission: +data.n,
                commissionAsset: data.N,
                tradeTime: data.T,
                tradeId: data.t,
                ignoreThis1: data.I,
                isOrderOnBook: data.w,
                isMaker: data.m,
                ignoreThis2: data.M,
                orderCreationTime: data.O,
                cumulativeQuoteAssetTransactedQty: +data.Z,
                lastQuoteAssetTransactedQty: +data.Y,
                orderQuoteQty: +data.Q,
            };
        }
        else if (data.e === 'ORDER_TRADE_UPDATE') {
            return {
                eventType: 'ORDER_TRADE_UPDATE',
                eventTime: data.E,
                transactionTime: data.T,
                order: {
                    symbol: data.o.s,
                    clientOrderId: data.o.c,
                    orderSide: data.o.S,
                    orderType: data.o.o,
                    orderTimeInForce: data.o.f,
                    originalQuantity: +data.o.q,
                    originalPrice: +data.o.p,
                    averagePrice: +data.o.ap,
                    stopPrice: +data.o.sp,
                    executionType: data.o.x,
                    orderStatus: data.o.X,
                    orderId: data.o.i,
                    lastFilledQuantity: +data.o.l,
                    orderFilledAccumulatedQuantity: +data.o.z,
                    lastFilledPrice: +data.o.L,
                    commissionAsset: data.o.N,
                    commissionAmount: +data.o.n,
                    orderTradeTime: +data.o.T,
                    tradeId: data.o.t,
                    bidsNotional: +data.o.b,
                    asksNotional: +data.o.a,
                    isMakerTrade: data.o.m,
                    isReduceOnly: data.o.R,
                    stopPriceWorkingType: data.o.wt,
                    originalOrderType: data.o.ot,
                    positionSide: data.o.ps,
                    isCloseAll: data.o.cp,
                    trailingStopActivationPrice: +data.o.AP,
                    trailingStopCallbackRate: +data.o.cr,
                    realisedProfit: +data.o.rp,
                }
            };
        }
    }
    subscribeMarketStream(params) {
        const id = ++this.subscriptionId;
        const data = { method: "SUBSCRIBE", id, params };
        console.log(this.wsId, 'subscribeMarketStream => ', data);
        this.ws.send(JSON.stringify(data), error => error ? this.onWsError(error) : undefined);
    }
    unsubscribeMarketStream(params) {
        const id = ++this.subscriptionId;
        const data = { method: "UNSUBSCRIBE", id, params };
        this.ws.send(JSON.stringify(data), error => error ? this.onWsError(error) : undefined);
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
    registerMarketStreamSubscription(key) {
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
    miniTicker(symbol) {
        const key = `${symbol.toLocaleLowerCase()}@miniTicker`;
        return this.registerMarketStreamSubscription(key);
    }
    emitMiniTicker(event) {
        const key = this.streamFormat === 'raw' ? `${event.s.toLowerCase()}@miniTicker` : event.stream;
        this.emitNextMarketStreamEvent(key, event, this.parseMiniTicker);
    }
    parseMiniTicker(data) {
        return {
            eventType: '24hrMiniTicker',
            eventTime: data.E,
            symbol: data.s,
            contractSymbol: data.ps,
            close: +data.c,
            open: +data.o,
            high: +data.h,
            low: +data.l,
            baseAssetVolume: +data.v,
            quoteAssetVolume: +data.q,
        };
    }
    bookTicker(symbol) {
        const key = `${symbol.toLocaleLowerCase()}@bookTicker`;
        return this.registerMarketStreamSubscription(key);
    }
    emitBookTicker(event) {
        const key = this.streamFormat === 'raw' ? `${event.s.toLowerCase()}@bookTicker` : event.stream;
        this.emitNextMarketStreamEvent(key, event, this.parseBookTicker);
    }
    parseBookTicker(data) {
        return {
            eventType: 'bookTicker',
            updateId: data.u,
            symbol: data.s,
            bidPrice: +data.b,
            bidQty: +data.B,
            askPrice: +data.a,
            askQty: +data.A,
        };
    }
    get wsId() { return `${this.market}-${this.streamType}-ws =>`; }
}
exports.BinanceWebsocket = BinanceWebsocket;
//# sourceMappingURL=binance-websocket.js.map