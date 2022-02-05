import { AxiosError } from "axios";
import { BinanceApiOptions, BinanceApiPermissions, BinanceApiResquestOptions, BinanceFundingWallet, BinanceFundingWalletRequest, BinanceMarketType, BinanceSubdomain, SignedRequestState, SystemStatusResponse } from "./types/binance.types";
declare type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS';
export declare abstract class BinanceApi {
    /** Indica el tipus de mercat. */
    abstract market: BinanceMarketType;
    /** Aquest subdomini es sobrescriu quan s'utilitzen subdominis alternatius pel mateix market. Si el market és `spot`, aquest valor pot valdre `spot`, `spot1`, `spot2`... */
    abstract subdomain: BinanceSubdomain;
    /** Retorna la url base amb el protocol i el subdomini. */
    abstract baseUrl(): string;
    /** Opcions de configuració. */
    protected options: BinanceApiOptions;
    constructor(options: BinanceApiOptions);
    get apiKey(): string;
    get apiSecret(): string;
    get isTest(): boolean;
    get recvWindow(): number;
    get defaultOptions(): Partial<BinanceApiOptions>;
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
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#system-status-system System Status (System)} */
    getSystemStatus(): Promise<SystemStatusResponse>;
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#get-api-key-permission-user_data Get API Key Permission (USER_DATA)} */
    getApiKeyPermissions(): Promise<BinanceApiPermissions>;
    /** {@link https://binance-docs.github.io/apidocs/spot/en/#funding-wallet-user_data Funding Wallet (USER_DATA)} */
    getFundingWallet(params?: BinanceFundingWalletRequest): Promise<BinanceFundingWallet>;
}
export {};
//# sourceMappingURL=binance-api.d.ts.map