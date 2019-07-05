export declare class HttpError extends Error {
    message: any;
    status: number;
    body: any;
    name: string;
    constructor(message: any, status: number, body?: null);
}
