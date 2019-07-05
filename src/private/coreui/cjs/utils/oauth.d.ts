import { CurrentUserEntity } from '../models';
export declare const AUTH_VERSION = 1;
declare function doLogin(username: string, password: string): Promise<{
    access_token: any;
    refresh_token: any;
    user: any;
    data: any;
}>;
declare function refreshToken(): Promise<{
    status: number;
    headers: Headers;
    body: string;
    json: any;
}>;
declare function clearToken(): boolean;
declare function getUserMetaData(): CurrentUserEntity | null;
declare function getAccessToken(): string | null;
declare function getRefreshToken(): string | null;
export { getAccessToken, getRefreshToken, getUserMetaData, refreshToken, clearToken, doLogin, };
