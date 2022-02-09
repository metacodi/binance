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
exports.BinanceApi = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = require("crypto");
class BinanceApi {
    constructor(options) {
        this.options = Object.assign(Object.assign({}, this.defaultOptions), options);
    }
    get apiKey() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.apiKey; }
    get apiSecret() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.apiSecret; }
    get isTest() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.isTest; }
    get recvWindow() { var _a; return (_a = this.options) === null || _a === void 0 ? void 0 : _a.recvWindow; }
    get defaultOptions() {
        return {
            isTest: false,
            recvWindow: 5000,
        };
    }
    setCredentials(data) {
        this.options.apiKey = data.apiKey;
        this.options.apiSecret = data.apiSecret;
    }
    get(endpoint, options) { return this.request('GET', endpoint, options); }
    post(endpoint, options) { return this.request('POST', endpoint, options); }
    put(endpoint, options) { return this.request('PUT', endpoint, options); }
    delete(endpoint, options) { return this.request('DELETE', endpoint, options); }
    request(method, endpoint, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options) {
                options = {};
            }
            const isPublic = options.isPublic === undefined ? false : options.isPublic;
            const params = options.params === undefined ? undefined : options.params;
            const headers = options.headers === undefined ? undefined : options.headers;
            const { apiSecret, recvWindow } = this;
            const baseUrl = options.baseUrlOverride || this.baseUrl();
            const config = {
                method,
                url: 'https://' + [baseUrl, endpoint].join('/'),
                headers: Object.assign({
                    'X-MBX-APIKEY': this.apiKey,
                }, options.headers),
                timeout: 1000 * 60 * 5,
            };
            if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
                config.headers['content-type'] = 'application/x-www-form-urlencoded';
            }
            const timestamp = Date.now();
            const { serialisedParams, signature, requestBody } = yield this.getRequestSignature(params, apiSecret, recvWindow, timestamp);
            if (!isPublic) {
                const concat = config.url.includes('?') ? (config.url.endsWith('?') ? '' : '&') : '?';
                const query = [serialisedParams, 'signature=' + signature].join('&');
                config.url += concat + query;
            }
            else if (method === 'GET' || method === 'DELETE') {
                config.params = params;
            }
            else {
                config.data = this.serialiseParams(requestBody, { encodeValues: true, strictValidation: false });
            }
            return axios_1.default(config).then(response => {
                if (response.status !== 200) {
                    throw response;
                }
                return response.data;
            }).catch(e => this.parseException(e, config.url));
        });
    }
    getRequestSignature(data, apiSecret, recvWindow, timestamp, strictValidation) {
        return __awaiter(this, void 0, void 0, function* () {
            recvWindow = (data === null || data === void 0 ? void 0 : data.recvWindow) || recvWindow;
            if (apiSecret) {
                const requestParams = Object.assign(Object.assign({}, data), { timestamp, recvWindow });
                const serialisedParams = this.serialiseParams(requestParams, { strictValidation, encodeValues: true });
                const signature = yield this.signMessage(serialisedParams, apiSecret);
                requestParams.signature = signature;
                return { requestBody: Object.assign({}, data), serialisedParams, timestamp, signature, recvWindow };
            }
            else {
                return { requestBody: data, serialisedParams: undefined };
            }
        });
    }
    serialiseParams(params = {}, options) {
        if (!options) {
            options = {};
        }
        const strictValidation = options.strictValidation === undefined ? false : options.strictValidation;
        const encodeValues = options.encodeValues === undefined ? true : options.encodeValues;
        return Object.keys(params).map(key => {
            const value = params[key];
            if (strictValidation && value === undefined) {
                throw new Error('Failed to sign API request due to undefined parameter');
            }
            const encodedValue = encodeValues ? encodeURIComponent(value) : value;
            return `${key}=${encodedValue}`;
        }).join('&');
    }
    ;
    signMessage(message, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof crypto_1.createHmac === 'function') {
                return crypto_1.createHmac('sha256', secret).update(message).digest('hex');
            }
            const encoder = new TextEncoder();
            const keyData = encoder.encode(secret);
            const algorithm = { name: 'HMAC', hash: { name: 'SHA-256' } };
            const extractable = false;
            const keyUsages = ['sign'];
            const key = yield window.crypto.subtle.importKey('raw', keyData, algorithm, extractable, keyUsages);
            const signature = yield window.crypto.subtle.sign('HMAC', key, encoder.encode(message));
            return Array.prototype.map.call(new Uint8Array(signature), x => ('00' + x.toString(16)).slice(-2)).join('');
        });
    }
    ;
    parseException(e, url) {
        var _a, _b;
        const { response, request, message } = e;
        if (!response) {
            throw request ? e : message;
        }
        throw {
            code: (_a = response.data) === null || _a === void 0 ? void 0 : _a.code,
            message: (_b = response.data) === null || _b === void 0 ? void 0 : _b.msg,
            body: response.data,
            headers: response.headers,
            requestUrl: url,
            requestBody: request.body,
            requestOptions: Object.assign({}, this.options),
        };
    }
    getSystemStatus() {
        return this.get('sapi/v1/system/status', { isPublic: true, baseUrlOverride: 'api.binance.com' });
    }
    getApiKeyPermissions(headers) {
        return this.get('sapi/v1/account/apiRestrictions', { baseUrlOverride: 'api.binance.com', headers });
    }
    getFundingWallet(params) {
        return this.post('sapi/v1/asset/get-funding-asset', { params, baseUrlOverride: 'api.binance.com' });
    }
}
exports.BinanceApi = BinanceApi;
//# sourceMappingURL=binance-api.js.map