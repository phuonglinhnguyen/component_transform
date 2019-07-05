interface Options {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | string;
    body?: FormData | string;
    headers?: Headers;
}
export declare const fetchJson: (url: string, options?: Options, ignoreToken?: boolean) => Promise<{
    status: number;
    headers: Headers;
    body: string;
    json: any;
}>;
export declare const flattenObject: (value: any, path?: any[]) => any;
interface IResponse {
    status: number;
    headers: any;
    body: string;
    json?: any;
    data?: any;
}
export declare const convertHTTPResponse: (response: IResponse, meta: any) => IResponse;
export {};
