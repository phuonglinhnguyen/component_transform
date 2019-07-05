interface PropsInitConfig {
    appName?: string;
    appVersion?: string;
    appURL?: string;
    apiURL?: string;
    uacURL?: string;
    oauthURI?: string;
}
export declare function initConfigApp(props: PropsInitConfig): void;
export declare function getAppName(): string;
export declare function getAppVersion(): string;
export declare function getAppURL(): string;
export declare function getApiURI(): string;
export declare function getApiUacURI(): string;
export declare function getApiOauthURI(): string;
export {};
