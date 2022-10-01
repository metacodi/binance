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
exports.BinanceExchange = void 0;
const rxjs_1 = require("rxjs");
const moment_1 = __importDefault(require("moment"));
const node_utils_1 = require("@metacodi/node-utils");
const abstract_exchange_1 = require("@metacodi/abstract-exchange");
const abstract_exchange_2 = require("@metacodi/abstract-exchange");
const binance_api_spot_1 = require("./binance-api-spot");
const binance_api_futures_1 = require("./binance-api-futures");
const binance_websocket_1 = require("./binance-websocket");
;
class BinanceExchange extends abstract_exchange_1.AbstractExchange {
    constructor(market) {
        super(market);
        this.market = market;
        this.exchange = 'binance';
        this.accountsWs = {};
        this.partials = {};
        this.acceptedBinanceSymbols = {
            BNBUSDT: 'BNB_USDT',
            BTCUSDT: 'BTC_USDT',
            ETCUSDT: 'ETC_USDT',
        };
    }
    getApiClient(account) {
        const market = this.binanceMarket(this.market);
        if (!this.api) {
            this.api = this.market === 'spot' ? new binance_api_spot_1.BinanceApiSpot() : new binance_api_futures_1.BinanceApiFutures();
        }
        if (!!account) {
            this.api.setCredentials(account.exchanges[this.exchange]);
        }
        return this.api;
    }
    retrieveExchangeInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.constructor.name + '.retrieveExchangeInfo()');
            const api = this.getApiClient();
            api.getExchangeInfo().then(response => {
                if (response === null || response === void 0 ? void 0 : response.symbols) {
                    this.processExchangeSymbols(response.symbols);
                }
                if (response === null || response === void 0 ? void 0 : response.rateLimits) {
                    this.processExchangeLimits(response.rateLimits);
                }
            }).catch(error => {
                console.error('getExchangeInfo error: ', error);
            });
        });
    }
    processExchangeSymbols(exchangeSymbols) {
        const firstTime = !this.symbols.length;
        for (const marketSymbol of exchangeSymbols) {
            const symbol = this.parseBinanceSymbol(marketSymbol.symbol);
            if (symbol) {
                const found = this.symbols.find(s => s.symbol === symbol);
                const ready = marketSymbol.status === 'TRADING';
                if (found) {
                    const changed = found.ready !== ready;
                    found.ready = ready;
                    if (changed) {
                        this.marketSymbolStatusChanged.next(found);
                    }
                }
                else {
                    const symbolExchange = this.parseBinanceSymbolExchangeInfo(marketSymbol);
                    this.symbols.push(symbolExchange);
                    this.marketSymbolStatusChanged.next(symbolExchange);
                }
            }
        }
        if (firstTime) {
            this.symbolsInitialized.next(this.symbols.map(s => s.symbol));
        }
    }
    processExchangeLimits(rateLimits) {
        const findLimit = (rateLimitType, limits) => {
            return limits.map(l => this.parseBinanceRateLimit(l))
                .filter(l => l.type === rateLimitType && moment_1.default.duration(1, l.unitOfTime).asSeconds() <= 60)
                .reduce((prev, cur) => (!prev || (cur.maxQuantity / cur.period < prev.maxQuantity / prev.period)) ? cur : prev);
        };
        const requests = findLimit('REQUEST_WEIGHT', rateLimits);
        const orders = findLimit('ORDERS', rateLimits);
        const limitChanged = (limitA, limitB) => !limitA || !limitB || limitA.maxQuantity !== limitB.maxQuantity || limitA.period !== limitB.period;
        if (requests && limitChanged(this.limitRequest, requests)) {
            this.limitRequest = requests;
            this.updateLimit(requests);
        }
        if (orders && limitChanged(this.limitOrders, orders)) {
            this.limitOrders = orders;
            this.ordersLimitsChanged.next(orders);
        }
    }
    parseBinanceRateLimit(data) {
        const { rateLimitType, intervalNum, limit } = data;
        const unitOfTime = data.interval.toLowerCase();
        const seconds = moment_1.default.duration(intervalNum, unitOfTime).asSeconds();
        const maxQuantity = Math.floor(data.limit / seconds);
        return { type: rateLimitType, maxQuantity, period: 1, unitOfTime };
    }
    getMarketWebsocket(symbol) {
        if (this.marketWs) {
            return this.marketWs;
        }
        this.marketWs = new binance_websocket_1.BinanceWebsocket({
            streamType: 'market',
            streamFormat: 'stream',
            market: this.binanceMarket(this.market, symbol),
        });
        return this.marketWs;
    }
    createMarketPriceSubject(symbol) {
        const ws = this.getMarketWebsocket(symbol);
        const subject = new rxjs_1.Subject();
        this.marketPriceSubjects[symbol] = subject;
        ws.miniTicker(this.binanceSymbol(symbol)).subscribe(data => subject.next(this.parseBinanceMiniTicker(data)));
        return subject;
    }
    getMarketPrice(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            this.countPeriod++;
            const api = this.getApiClient();
            return api.getSymbolPriceTicker({ symbol: this.binanceSymbol(symbol) }).then(data => this.parseBinancePriceTicker(data));
        });
    }
    getOrderBookTicker(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            this.countPeriod++;
            const api = this.getApiClient();
            return api.getSymbolOrderBookTicker({ symbol: this.binanceSymbol(symbol) }).then(data => this.parseBinanceOrderBookTicker(data));
        });
    }
    createMarketKlineSubject(symbol, interval) {
        const ws = this.getMarketWebsocket(symbol);
        const subject = new rxjs_1.Subject();
        this.marketKlineSubjects[`${symbol}_${interval}`] = subject;
        ws.kline(this.binanceSymbol(symbol), this.binanceInterval(interval)).subscribe(data => subject.next(this.parseBinanceKline(data)));
        return subject;
    }
    getAccountWebsocket(account, symbol) {
        const accountId = `${account.idreg}`;
        const stored = this.accountsWs[accountId];
        if (stored) {
            return stored;
        }
        const { apiKey, apiSecret } = account.exchanges[this.exchange];
        const created = new binance_websocket_1.BinanceWebsocket({
            streamType: 'user',
            streamFormat: 'stream',
            market: this.binanceMarket(this.market, symbol),
            apiKey, apiSecret,
        });
        this.accountsWs[accountId] = created;
        return created;
    }
    createAccountEventsSubject(account, symbol) {
        const ws = this.getAccountWebsocket(account, symbol);
        const subject = new rxjs_1.Subject();
        const accountId = `${account.idreg}`;
        this.accountEventsSubjects[accountId] = subject;
        this.retrieveAcountInfo(account).then(ready => subject.next({ type: 'accountReady', ready }));
        ws.accountUpdate().subscribe(balance => this.onAccountUpdate(account, balance));
        ws.orderUpdate().subscribe(order => this.onOrderUpdate(account, order));
        return subject;
    }
    retrieveAcountInfo(account) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.constructor.name + '.retrieveAcountInfo()');
            const api = this.getApiClient(account);
            const perms = yield api.getApiKeyPermissions();
            const info = yield api.getAccountInformation();
            const canTrade = !!(info === null || info === void 0 ? void 0 : info.canTrade) && !!(perms === null || perms === void 0 ? void 0 : perms.ipRestrict) && (this.market === 'spot' ? !!(perms === null || perms === void 0 ? void 0 : perms.enableSpotAndMarginTrading) : !!(perms === null || perms === void 0 ? void 0 : perms.enableFutures));
            if (!canTrade) {
                throw ({ message: `No es pot fer trading amb el compte '${account.idreg}' al mercat '${this.market}'.` });
            }
            const coins = yield api.getBalances();
            this.processInitialBalances(account, coins);
            const balances = account.markets[this.market].balances;
            const balanceReady = !!Object.keys(balances).length;
            if (!balanceReady) {
                throw new Error(`Error recuperant els balanços del compte '${account.idreg}' al mercat '${this.market}'.`);
            }
            return Promise.resolve(balanceReady && canTrade);
        });
    }
    processInitialBalances(account, coins) {
        const getBalanceCoin = (c) => this.market === 'spot' ? c.coin : c.asset;
        const parseBalance = (b) => this.market === 'spot' ? this.parseBinanceBalanceSpot(b) : this.parseBinanceBalanceFutures(b);
        coins.forEach(coinBalance => {
            const coin = abstract_exchange_2.acceptedCoins.find(c => c === getBalanceCoin(coinBalance));
            if (coin) {
                const balance = parseBalance(coinBalance);
                const balances = account.markets[this.market].balances;
                if (!balances[coin]) {
                    balances[coin] = balance;
                }
                ;
            }
        });
    }
    onAccountUpdate(account, balance) {
        var _a, _b, _c, _d, _e;
        const { market } = this;
        const accountId = `${account.idreg}`;
        const accountMarket = account.markets[this.market];
        const balances = [];
        if (market === 'spot') {
            const spot = balance;
            (_a = spot.balances) === null || _a === void 0 ? void 0 : _a.map(balance => {
                accountMarket.balances[balance.asset].balance = balance.free + balance.locked;
                accountMarket.balances[balance.asset].available = balance.free;
                accountMarket.balances[balance.asset].locked = balance.locked;
                balances.push(accountMarket.balances[balance.asset]);
            });
        }
        else if (market === 'futures') {
            const futures = balance;
            (_c = (_b = futures.updateData) === null || _b === void 0 ? void 0 : _b.updatedPositions) === null || _c === void 0 ? void 0 : _c.map(position => {
                accountMarket.averagePrices[position.symbol] = position.entryPrice;
            });
            (_e = (_d = futures.updateData) === null || _d === void 0 ? void 0 : _d.updatedBalances) === null || _e === void 0 ? void 0 : _e.map(balance => {
                accountMarket.balances[balance.asset].balance = balance.walletBalance;
                balances.push(accountMarket.balances[balance.asset]);
            });
        }
        this.accountEventsSubjects[accountId].next({ type: 'accountUpdate', market, balances });
    }
    getOrderTask(task) {
        const _super = Object.create(null, {
            processGetOrderTask: { get: () => super.processGetOrderTask }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { account } = task.data;
            const api = this.getApiClient();
            const { symbol, id } = Object.assign({}, task.data.order);
            api.getOrder({ symbol: this.binanceSymbol(symbol), origClientOrderId: id }).then(result => {
                const order = this.parseBinanceOrder(result);
                _super.processGetOrderTask.call(this, account, order);
            });
        });
    }
    postOrderTask(task) {
        const { account } = task.data;
        const { market } = this;
        const api = this.getApiClient();
        const copy = Object.assign({}, task.data.order);
        account.markets[this.market].orders.push(copy);
        const order = {
            side: this.binanceSide(copy.side),
            symbol: this.binanceSymbol(copy.symbol),
            type: market === 'spot' ? this.binanceSpotOrderType(copy.type) : this.binanceFuturesOrderType(copy.type),
            timeInForce: 'GTC',
            price: copy.price,
            quantity: copy.baseQuantity,
            newClientOrderId: copy.id,
        };
        if (market === 'futures' && copy.type === 'stop_market') {
            order.closePosition = 'true';
        }
        return api.postOrder(order);
    }
    cancelOrderTask(task) {
        const { account, order } = task.data;
        const api = this.getApiClient();
        const found = account.markets[this.market].orders.find(o => o.id === order.id);
        if (found) {
            found.status = 'cancel';
        }
        return api.cancelOrder({
            symbol: this.binanceSymbol(order.symbol),
            origClientOrderId: order.id,
        });
    }
    onOrderUpdate(account, orderUpdate) {
        const { exchange, market } = this;
        const order = orderUpdate.order || orderUpdate;
        switch (order.orderStatus) {
            case 'NEW':
            case 'FILLED':
            case 'PARTIALLY_FILLED':
            case 'CANCELED':
            case 'EXPIRED':
            case 'REJECTED':
                const event = this.parseBinanceOrderUpdate(orderUpdate);
                super.processOrderUpdate(account, event);
                break;
            case 'CANCELLING':
            case 'PENDING_CANCEL':
                break;
            default:
                const orderId = order.originalClientOrderId || order.clientOrderId;
                throw ({ message: `No s'ha implementat l'estat '${order.orderStatus}' d'ordre ${orderId} de Binance` });
        }
    }
    parseBinanceSymbol(symbol) {
        if (!this.acceptedBinanceSymbols.hasOwnProperty(symbol)) {
            throw ({ message: `No s'ha descrit el símbol '${symbol}' pel parser de Binance.` });
        }
        return this.acceptedBinanceSymbols[symbol];
    }
    binanceSymbol(symbol) {
        const found = Object.keys(this.acceptedBinanceSymbols).find(key => this.acceptedBinanceSymbols[key] === symbol);
        if (found) {
            return found;
        }
        throw ({ message: `No s'ha trobat el símbol '${symbol}' equivalent de Binance.` });
    }
    parseBinanceInterval(interval) {
        return interval;
    }
    binanceInterval(interval) {
        return interval;
    }
    parseBinanceMarket(market) {
        switch (market) {
            case 'spot': return 'spot';
            case 'usdm': return 'futures';
            case 'coinm': return 'futures';
            default: throw ({ message: `No s'ha implementat el parser de Binance del mercat '${market}'` });
        }
    }
    binanceMarket(market, baseAsset) {
        switch (market) {
            case 'spot': return 'spot';
            case 'futures': return !(baseAsset === null || baseAsset === void 0 ? void 0 : baseAsset.includes('USDT')) ? 'coinm' : 'usdm';
            default: throw ({ message: `No s'ha implementat el parser per Binance del mercat '${market}'` });
        }
    }
    parseBinanceSide(side) {
        switch (side) {
            case 'BUY': return 'buy';
            case 'SELL': return 'sell';
            default: throw ({ message: `No s'ha implementat el parser per Binance del side '${this.market}'` });
        }
    }
    binanceSide(side) {
        switch (side) {
            case 'buy': return 'BUY';
            case 'sell': return 'SELL';
            default: throw ({ message: `No s'ha implementat el parser per Binance del side '${side}'` });
        }
    }
    binanceSpotOrderType(type) {
        switch (type) {
            case 'limit': return 'LIMIT';
            case 'market': return 'MARKET';
            case 'stop': return 'STOP_LOSS_LIMIT';
            case 'stop_market': return 'STOP_LOSS_LIMIT';
            default: throw ({ message: `No s'ha implementat el get per Binance del type Spot '${type}'` });
        }
    }
    binanceFuturesOrderType(type) {
        switch (type) {
            case 'limit': return 'LIMIT';
            case 'market': return 'MARKET';
            case 'stop': return 'STOP';
            case 'stop_market': return 'STOP_MARKET';
            default: throw ({ message: `No s'ha implementat el get per Binance del type Futures '${type}'` });
        }
    }
    parseBinanceType(type) {
        if (this.market === 'spot') {
            switch (type) {
                case 'LIMIT':
                case 'LIMIT_MAKER':
                    return 'limit';
                case 'MARKET': return 'market';
                case 'STOP_LOSS': return 'stop';
                default: throw ({ message: `No s'ha implementat el parser per Binance del type Spot '${this.market}'` });
            }
        }
        else if (this.market === 'futures') {
            switch (type) {
                case 'LIMIT': return 'limit';
                case 'MARKET': return 'market';
                case 'STOP': return 'stop';
                case 'STOP_MARKET': return 'stop_market';
                default: throw ({ message: `No s'ha implementat el parser per Binance del type Futures '${this.market}'` });
            }
        }
    }
    parseBinanceStatus(status) {
        switch (status) {
            case 'NEW': return 'new';
            case 'FILLED': return 'filled';
            case 'PARTIALLY_FILLED': return 'partial';
            case 'CANCELED': return 'canceled';
            case 'EXPIRED': return 'expired';
            case 'REJECTED': return 'rejected';
            default: throw ({ message: `No s'ha implementat el parser per Binance del type Spot '${this.market}'` });
        }
    }
    parseBinanceSymbolExchangeInfo(marketSymbol) {
        if (marketSymbol.permissions) {
            const spot = marketSymbol;
            const result = {
                symbol: this.parseBinanceSymbol(spot.symbol),
                ready: true,
                quotePrecision: spot.quoteAssetPrecision,
                basePrecision: spot.baseAssetPrecision,
                quantityPrecision: spot.baseAssetPrecision,
                pricePrecision: 5,
            };
            return result;
        }
        else {
            const futures = marketSymbol;
            const result = {
                symbol: this.parseBinanceSymbol(futures.symbol),
                ready: true,
                quotePrecision: futures.quotePrecision,
                basePrecision: futures.baseAssetPrecision,
                quantityPrecision: futures.quantityPrecision,
                pricePrecision: futures.pricePrecision,
            };
            return result;
        }
    }
    parseBinanceMiniTicker(data) {
        return {
            symbol: this.parseBinanceSymbol(data.symbol),
            price: data.close,
            timestamp: (0, node_utils_1.timestamp)(data.eventTime),
            baseVolume: data.baseAssetVolume,
            quoteVolume: data.quoteAssetVolume,
        };
    }
    parseBinancePriceTicker(data) {
        if (Array.isArray(data)) {
            if (data.length) {
                data = data[0];
            }
            else {
                return undefined;
            }
        }
        return {
            symbol: this.parseBinanceSymbol(data.symbol),
            price: +data.price,
            timestamp: (0, node_utils_1.timestamp)(data.time),
        };
    }
    parseBinanceOrderBookTicker(data) {
        if (Array.isArray(data)) {
            if (data.length) {
                data = data[0];
            }
            else {
                return undefined;
            }
        }
        if (data.hasOwnProperty('time'))
            return {
                symbol: this.parseBinanceSymbol(data.symbol),
                bidPrice: +data.bidPrice,
                bidQty: +data.bidQty,
                askPrice: +data.askPrice,
                askQty: +data.askQty,
                timestamp: (0, node_utils_1.timestamp)(),
            };
    }
    parseBinanceKline(data) {
        return {
            symbol: this.parseBinanceSymbol(data.symbol),
            interval: this.parseBinanceInterval(data.interval),
            open: data.open,
            close: data.close,
            high: data.high,
            low: data.low,
            openTime: (0, node_utils_1.timestamp)(data.startTime),
            closeTime: (0, node_utils_1.timestamp)(data.closeTime),
            quoteVolume: data.quoteVolume,
        };
    }
    parseBinanceBalanceSpot(coinBalance) {
        const available = +(coinBalance === null || coinBalance === void 0 ? void 0 : coinBalance.free);
        const locked = +(coinBalance === null || coinBalance === void 0 ? void 0 : coinBalance.locked);
        const balance = available + locked;
        return { asset: coinBalance.coin, available, locked, balance };
    }
    parseBinanceBalanceFutures(coinBalance) {
        const available = +(coinBalance === null || coinBalance === void 0 ? void 0 : coinBalance.availableBalance);
        const balance = +(coinBalance === null || coinBalance === void 0 ? void 0 : coinBalance.balance);
        const locked = balance - available;
        return { asset: coinBalance.asset, available, locked, balance };
    }
    parseBinanceOrder(order) {
        if (order.orderListId) {
            const spot = order;
            const status = this.parseBinanceStatus(spot.status);
            return {
                id: spot.clientOrderId,
                exchangeId: spot.orderId,
                side: this.parseBinanceSide(spot.side),
                type: this.parseBinanceType(spot.type),
                status: status,
                symbol: this.parseBinanceSymbol(spot.symbol),
                baseQuantity: this.isExecutedStatus(status) ? +spot.executedQty : +spot.origQty,
                quoteQuantity: +spot.cummulativeQuoteQty,
                price: +spot.price,
                stopPrice: +spot.stopPrice,
                isOco: spot.orderListId > -1,
                posted: (0, node_utils_1.timestamp)(spot.time),
                executed: this.isExecutedStatus(status) ? (0, node_utils_1.timestamp)(spot.updateTime) : undefined,
                syncronized: false,
            };
        }
        else {
            const futures = order;
            const status = this.parseBinanceStatus(futures.status);
            return {
                id: futures.clientOrderId,
                exchangeId: futures.orderId,
                side: this.parseBinanceSide(futures.side),
                type: this.parseBinanceType(futures.type),
                status: status,
                symbol: this.parseBinanceSymbol(futures.symbol),
                baseQuantity: this.isExecutedStatus(status) ? +futures.executedQty : +futures.origQty,
                quoteQuantity: +futures.cumQuote,
                price: futures.avgPrice ? +futures.avgPrice : +futures.price,
                stopPrice: +futures.stopPrice,
                posted: (0, node_utils_1.timestamp)(futures.time),
                executed: this.isExecutedStatus(status) ? (0, node_utils_1.timestamp)(futures.updateTime) : undefined,
                syncronized: false,
            };
        }
    }
    parseBinanceOrderUpdate(orderUpdate) {
        const result = orderUpdate.order || orderUpdate;
        const status = this.parseBinanceStatus(result.orderStatus);
        if (result.originalClientOrderId) {
            const spot = result;
            const symbol = this.parseBinanceSymbol(spot.symbol);
            const order = {
                id: spot.originalClientOrderId,
                exchangeId: spot.orderId,
                side: this.parseBinanceSide(spot.side),
                type: this.parseBinanceType(spot.orderType),
                status, symbol,
                baseQuantity: this.isExecutedStatus(status) ? +spot.accumulatedQuantity : spot.quantity,
                quoteQuantity: +spot.cumulativeQuoteAssetTransactedQty,
                price: spot.lastTradePrice,
                posted: (0, node_utils_1.timestamp)(spot.orderCreationTime),
                executed: this.isExecutedStatus(status) ? (0, node_utils_1.timestamp)(spot.tradeTime) : undefined,
            };
            return { order, data: {
                    commission: spot.commission,
                    commissionAsset: spot.commissionAsset,
                } };
        }
        else {
            const futures = result;
            const symbol = this.parseBinanceSymbol(futures.symbol);
            const order = {
                id: futures.clientOrderId,
                exchangeId: futures.orderId,
                side: this.parseBinanceSide(futures.orderSide),
                type: this.parseBinanceType(futures.orderType),
                status, symbol,
                baseQuantity: this.isExecutedStatus(status) ? +futures.orderFilledAccumulatedQuantity : futures.originalQuantity,
                quoteQuantity: this.fixQuote(+futures.orderFilledAccumulatedQuantity * (futures.averagePrice ? +futures.averagePrice : +futures.lastFilledPrice), symbol),
                price: futures.averagePrice ? futures.averagePrice : futures.lastFilledPrice,
                profit: futures.realisedProfit,
            };
            const time = (0, node_utils_1.timestamp)(futures.orderTradeTime);
            if (this.isExecutedStatus(status)) {
                order.executed = time;
            }
            else {
                order.posted = time;
            }
            return { order, data: {
                    commission: futures.commissionAmount,
                    commissionAsset: futures.commissionAsset,
                } };
        }
    }
    fixBase(base, symbol) {
        const found = this.symbols.find(s => s.symbol === symbol);
        return +base.toFixed(found.basePrecision);
    }
    fixQuote(quote, symbol) {
        const found = this.symbols.find(s => s.symbol === symbol);
        return +quote.toFixed(found.quotePrecision);
    }
}
exports.BinanceExchange = BinanceExchange;
const accountXavi = {
    idreg: 1,
    nombre: 'Xavi',
    apellidos: 'Giral',
    telefono: '609868620',
    email: 'xgiral@gmail.com',
    password: 'a123456A',
    folder: 'xavi',
    exchanges: {
        binance: {
            apiKey: 'eL6y9S0jkEqqkSnT1hwnNQ9ipn4yW4yLZIojcTLoCLQw8ETiqgGGkEOM6de7jtOx',
            apiSecret: '3uXfopHqLUAT4CTQ1rIL8B825NcfeVy4p5xCJZM67j23GRFV3UJcNF782IIHge0E'
        }
    }
};
//# sourceMappingURL=binance-exchange.js.map