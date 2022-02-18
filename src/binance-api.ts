import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { createHmac } from 'crypto';

import { BinanceApiOptions,
  BinanceApiPermissions,
  BinanceApiResquestOptions,
  BinanceFundingWallet,
  BinanceFundingWalletRequest,
  BinanceMarketType,
  BinanceSubdomain,
  SignedRequestState,
  SystemStatusResponse,
} from "./types/binance.types";


export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS';

export abstract class BinanceApi {

  /** Indica el tipus de mercat. */
  abstract market: BinanceMarketType;
  /** Aquest subdomini es sobrescriu quan s'utilitzen subdominis alternatius pel mateix market. Si el market és `spot`, aquest valor pot valdre `spot`, `spot1`, `spot2`... */
  abstract subdomain: BinanceSubdomain;
  /** Retorna la url base amb el protocol i el subdomini. */
  abstract baseUrl(): string;

  /** Opcions de configuració. */
  protected options: BinanceApiOptions;

  constructor(
    options?: BinanceApiOptions,
  ) {
    this.options = { ...this.defaultOptions, ...options };
  }


  // ---------------------------------------------------------------------------------------------------
  //  options
  // ---------------------------------------------------------------------------------------------------

  get apiKey(): string { return this.options?.apiKey; }
  
  get apiSecret(): string { return this.options?.apiSecret; }
  
  get isTest(): boolean { return this.options?.isTest; }
  
  get recvWindow(): number { return this.options?.recvWindow; }

  get defaultOptions(): Partial<BinanceApiOptions> {
    return {
      isTest: false,
      recvWindow: 5000,
    }
  }

  public setCredentials(data: { apiKey: string; apiSecret: string; }): void {
    this.options.apiKey = data.apiKey;
    this.options.apiSecret = data.apiSecret;
  }


  // ---------------------------------------------------------------------------------------------------
  //  request helpers
  // ---------------------------------------------------------------------------------------------------

  public get(endpoint: string, options?: BinanceApiResquestOptions): Promise<any> { return this.request('GET', endpoint, options); }

  public post(endpoint: string, options?: BinanceApiResquestOptions): Promise<any> { return this.request('POST', endpoint, options); }

  public put(endpoint: string, options?: BinanceApiResquestOptions): Promise<any> { return this.request('PUT', endpoint, options); }

  public delete(endpoint: string, options?: BinanceApiResquestOptions): Promise<any> { return this.request('DELETE', endpoint, options); }


  // ---------------------------------------------------------------------------------------------------
  //  request
  // ---------------------------------------------------------------------------------------------------

  async request(method: HttpMethod, endpoint: string, options?: BinanceApiResquestOptions): Promise<any> {
    if (!options) { options = {}; }
    const createSignature = options.createSignature === undefined ? true : options.createSignature;
    const isPublic = options.isPublic === undefined ? false : options.isPublic;
    const params = options.params === undefined ? undefined : options.params;
    const headers = options.headers === undefined ? undefined : options.headers;

    const { apiSecret, recvWindow } = this;

    const baseUrl = options.baseUrlOverride || this.baseUrl();

    const config: AxiosRequestConfig<any> = {
      method,
      url: 'https://' + [baseUrl, endpoint].join('/'),
      headers: { ...options.headers as any },
      timeout: 1000 * 60 * 5, // 5 min.
    };

    if (!isPublic) { config.headers['X-MBX-APIKEY'] = this.apiKey; }

    /**
     * Els mètodes POST, PUT i DELETE han d'enviar el seu body en format `x-www-form-urlencoded`.
     * {@link https://binance-docs.github.io/apidocs/spot/en/#general-api-information General Information on Endpoints}
     */
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') { config.headers['content-type'] = 'application/x-www-form-urlencoded'; }

    const timestamp = Date.now();

    // Handles serialisation of params into query string (url?key1=value1&key2=value2), handles encoding of values, adds timestamp and signature to request.
    const { serialisedParams, signature, requestBody } = await this.getRequestSignature(params, apiSecret, recvWindow, timestamp);
    
    if (!isPublic && createSignature) {
      const concat = config.url.includes('?') ? (config.url.endsWith('?') ? '' : '&') : '?';
      const query = [serialisedParams, 'signature=' + signature].join('&');
      config.url += concat + query;
    } else if (method === 'GET' || method === 'DELETE') {
      config.params = params;
    } else {
      config.data = this.serialiseParams(requestBody, { encodeValues: true, strictValidation: false });
    }
    
    // console.log(config);

    return axios(config).then(response => {
      // console.log(config.url, response);
      if (response.status !== 200) { throw response; }
      return response.data;
    }).catch(e => this.parseException(e, config.url));
  }
  
  protected async getRequestSignature(data: any, apiSecret?: string, recvWindow?: number, timestamp?: number, strictValidation?: boolean): Promise<SignedRequestState> {
    // Optional, set to 5000 by default. Increase if timestamp/recvWindow errors are seen.
    recvWindow = data?.recvWindow || recvWindow;
    if (apiSecret) {
      const requestParams = { ...data, timestamp, recvWindow };
      const serialisedParams = this.serialiseParams(requestParams, { strictValidation, encodeValues: true });
      const signature = await this.signMessage(serialisedParams, apiSecret);
      requestParams.signature = signature;
      return { requestBody: { ...data }, serialisedParams, timestamp, signature, recvWindow };
    } else {
      return { requestBody: data, serialisedParams: undefined };
    }
  }

  protected serialiseParams(params: { [key: string]: any } = {}, options?: { encodeValues?: boolean, strictValidation?: boolean }): string {
    if (!options) { options = {}; }
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
  };

  protected async signMessage(message: string, secret: string): Promise<string> {
    // Si és possible, fem servir la funció de crypto.
    if (typeof createHmac === 'function') {
      return createHmac('sha256', secret).update(message).digest('hex');
    }
    // Si no s'ha pogut importar la funció en entorn browser, li donem suport.
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const algorithm = {name: 'HMAC', hash: {name: 'SHA-256'}};
    const extractable = false;
    const keyUsages: KeyUsage[] = ['sign'];
    const key = await window.crypto.subtle.importKey('raw', keyData, algorithm, extractable, keyUsages);
    const signature = await window.crypto.subtle.sign('HMAC', key, encoder.encode(message));
    return Array.prototype.map.call(new Uint8Array(signature), x => ('00' + x.toString(16)).slice(-2)).join('');
  };

  protected parseException(e: AxiosError, url: string): unknown {
    const { response, request, message } = e;
    // Si no hem rebut una resposta...
    if (!response) { throw request ? e : message; }
    throw {
      code: response.data?.code,
      message: response.data?.msg,
      body: response.data,
      headers: response.headers,
      requestUrl: url,
      requestBody: request.body,
      requestOptions: { ...this.options },
    };
  }


  // ---------------------------------------------------------------------------------------------------
  //  entities
  // ---------------------------------------------------------------------------------------------------
  
  abstract getUserDataListenKey(): Promise<{ listenKey: string }>;
  
  abstract keepAliveUserDataListenKey(listenKey?: string): Promise<{}>;

  abstract closeUserDataListenKey(listenKey?: string): Promise<{}>;


  // ---------------------------------------------------------------------------------------------------
  //  shared entities
  // ---------------------------------------------------------------------------------------------------
  
  /** {@link https://binance-docs.github.io/apidocs/spot/en/#system-status-system System Status (System)} */
  getSystemStatus(): Promise<SystemStatusResponse> {
    return this.get('sapi/v1/system/status', { isPublic: true, baseUrlOverride: 'api.binance.com' });
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#get-api-key-permission-user_data Get API Key Permission (USER_DATA)} */
  getApiKeyPermissions(headers?: BinanceApiResquestOptions['headers']): Promise<BinanceApiPermissions> {
    return this.get('sapi/v1/account/apiRestrictions', { baseUrlOverride: 'api.binance.com', headers });
  }

  /** {@link https://binance-docs.github.io/apidocs/spot/en/#funding-wallet-user_data Funding Wallet (USER_DATA)} */
  getFundingWallet(params?: BinanceFundingWalletRequest): Promise<BinanceFundingWallet> {
    return this.post('sapi/v1/asset/get-funding-asset', { params, baseUrlOverride: 'api.binance.com' });
  }

}
