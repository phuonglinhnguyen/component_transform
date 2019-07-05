export declare const CORE_RESOURCE = "@DGS/CORE_RESOURCE";
export declare const REGISTER_RESOURCE = "@DGS/CORE_RESOURCE/REGISTER";
export declare const UNREGISTER_RESOURCE = "@DGS/CORE_RESOURCE/UNREGISTER";
export interface Resource {
    name: string;
    reducer?: any;
    refresh?: boolean;
    flush?: boolean;
    unregisterDuration?: number;
}
export declare const registerResource: (resources: string, guid: string) => {
    type: string;
    payload: string;
    guid: string;
};
export declare const unregisterResource: (resourceNames: string[], guid: string) => {
    type: string;
    payload: string[];
    guid: string;
};
