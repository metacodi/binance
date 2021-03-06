import { AxiosError } from "axios";
import { BinanceApiOptions, BinanceApiPermissions, BinanceApiResquestOptions, BinanceFundingWallet, BinanceFundingWalletRequest, BinanceMarketType, BinanceSubdomain, SignedRequestState, SystemStatusResponse } from "./types/binance.types";
export declare type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS';
export declare abstract class BinanceApi {
    abstract market: BinanceMarketType;
    abstract subdomain: BinanceSubdomain;
    abstract baseUrl(): string;
    protected options: BinanceApiOptions;
    constructor(options?: BinanceApiOptions);
    get apiKey(): string;
    get apiSecret(): string;
    get isTest(): boolean;
    get recvWindow(): number;
    get defaultOptions(): Partial<BinanceApiOptions>;
    setCredentials(data: {
        apiKey: string;
        apiSecret: string;
    }): void;
    get(endpoint: string, options?: BinanceApiResquestOptions): Promise<any>;
    post(endpoint: string, options?: BinanceApiResquestOptions): Promise<any>;
    put(endpoint: string, options?: BinanceApiResquestOptions): Promise<any>;
    delete(endpoint: string, options?: BinanceApiResquestOptions): Promise<any>;
    request(method: HttpMethod, endpoint: string, options?: BinanceApiResquestOptions): Promise<any>;
    protected getRequestSignature(data: any, apiSecret?: string, recvWindow?: number, timestamp?: number, strictValidation?: boolean): Promise<SignedRequestState>;
    protected serialiseParams(params?: {
        [key: string]: any;
    }, options?: {
        encodeValues?: boolean;
        strictValidation?: boolean;
    }): string;
    protected signMessage(message: string, secret: string): Promise<string>;
    protected parseException(e: AxiosError, url: string): unknown;
    abstract getUserDataListenKey(): Promise<{
        listenKey: string;
    }>;
    abstract keepAliveUserDataListenKey(listenKey?: string): Promise<{}>;
    abstract closeUserDataListenKey(listenKey?: string): Promise<{}>;
    getSystemStatus(): Promise<SystemStatusResponse>;
    getApiKeyPermissions(headers?: BinanceApiResquestOptions['headers']): Promise<BinanceApiPermissions>;
    getFundingWallet(params?: BinanceFundingWalletRequest): Promise<BinanceFundingWallet>;
}
//# sourceMappingURL=binance-api.d.ts.map