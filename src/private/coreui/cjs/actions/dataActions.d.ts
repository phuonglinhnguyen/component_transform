export declare const CRUD_GET_LIST = "@DGS/API/CRUD/GET_LIST";
export declare const CRUD_GET_LIST_LOADING = "@DGS/API/CRUD/GET_LIST/LOADING";
export declare const CRUD_GET_LIST_FAILURE = "@DGS/API/CRUD/GET_LIST/FAILURE";
export declare const CRUD_GET_LIST_SUCCESS = "@DGS/API/CRUD/GET_LIST/SUCCESS";
export declare const CRUD_GET_ONE = "@DGS/API/CRUD/GET_ONE";
export declare const CRUD_GET_ONE_LOADING = "@DGS/API/CRUD/GET_ONE/LOADING";
export declare const CRUD_GET_ONE_FAILURE = "@DGS/API/CRUD/GET_ONE/FAILURE";
export declare const CRUD_GET_ONE_SUCCESS = "@DGS/API/CRUD/GET_ONE/SUCCESS";
export declare const CRUD_GET_MANY = "@DGS/API/CRUD/GET_MANY";
export declare const CRUD_GET_MANY_LOADING = "@DGS/API/CRUD/GET_MANY/LOADING";
export declare const CRUD_GET_MANY_FAILURE = "@DGS/API/CRUD/GET_MANY/FAILURE";
export declare const CRUD_GET_MANY_SUCCESS = "@DGS/API/CRUD/GET_MANY/SUCCESS";
export declare const CRUD_GET_COUNT = "@DGS/API/CRUD/GET_COUNT";
export declare const CRUD_GET_COUNT_LOADING = "@DGS/API/CRUD/GET_COUNT/LOADING";
export declare const CRUD_GET_COUNT_FAILURE = "@DGS/API/CRUD/GET_COUNT/FAILURE";
export declare const CRUD_GET_COUNT_SUCCESS = "@DGS/API/CRUD/GET_COUNT/SUCCESS";
export declare const CRUD_GET_MANY_REFERENCE = "@DGS/API/CRUD/GET_MANY_REFERENCE";
export declare const CRUD_GET_MANY_REFERENCE_LOADING = "@DGS/API/CRUD/GET_MANY_REFERENCE/LOADING";
export declare const CRUD_GET_MANY_REFERENCE_FAILURE = "@DGS/API/CRUD/GET_MANY_REFERENCE/FAILURE";
export declare const CRUD_GET_MANY_REFERENCE_SUCCESS = "@DGS/API/CRUD/GET_MANY_REFERENCE/SUCCESS";
export declare const CRUD_CREATE = "@DGS/API/CRUD/CREATE";
export declare const CRUD_CREATE_LOADING = "@DGS/API/CRUD/CREATE/LOADING";
export declare const CRUD_CREATE_FAILURE = "@DGS/API/CRUD/CREATE/FAILURE";
export declare const CRUD_CREATE_SUCCESS = "@DGS/API/CRUD/CREATE/SUCCESS";
export declare const CRUD_UPDATE = "@DGS/API/CRUD/UPDATE";
export declare const CRUD_UPDATE_LOADING = "@DGS/API/CRUD/UPDATE/LOADING";
export declare const CRUD_UPDATE_FAILURE = "@DGS/API/CRUD/UPDATE/FAILURE";
export declare const CRUD_UPDATE_SUCCESS = "@DGS/API/CRUD/UPDATE/SUCCESS";
export declare const CRUD_UPDATE_OPTIMISTIC = "@DGS/API/CRUD/UPDATE/OPTIMISTIC";
export declare const CRUD_UPDATE_MANY = "@DGS/API/CRUD/UPDATE/MANY";
export declare const CRUD_UPDATE_MANY_LOADING = "@DGS/API/CRUD/UPDATE/MANY/LOADING";
export declare const CRUD_UPDATE_MANY_FAILURE = "@DGS/API/CRUD/UPDATE/MANY/FAILURE";
export declare const CRUD_UPDATE_MANY_SUCCESS = "@DGS/API/CRUD/UPDATE/MANY/SUCCESS";
export declare const CRUD_UPDATE_MANY_OPTIMISTIC = "@DGS/API/CRUD/UPDATE/MANY/OPTIMISTIC";
export declare const CRUD_DELETE = "@DGS/API/CRUD/DELETE";
export declare const CRUD_DELETE_LOADING = "@DGS/API/CRUD/DELETE/LOADING";
export declare const CRUD_DELETE_FAILURE = "@DGS/API/CRUD/DELETE/FAILURE";
export declare const CRUD_DELETE_SUCCESS = "@DGS/API/CRUD/DELETE/SUCCESS";
export declare const CRUD_DELETE_OPTIMISTIC = "@DGS/API/CRUD/DELETE/OPTIMISTIC";
export declare const CRUD_DELETE_MANY = "@DGS/API/CRUD/DELETE/MANY";
export declare const CRUD_DELETE_MANY_LOADING = "@DGS/API/CRUD/DELETE/MANY/LOADING";
export declare const CRUD_DELETE_MANY_FAILURE = "@DGS/API/CRUD/DELETE/MANY/FAILURE";
export declare const CRUD_DELETE_MANY_SUCCESS = "@DGS/API/CRUD/DELETE/MANY/SUCCESS";
export declare const CRUD_DELETE_MANY_OPTIMISTIC = "@DGS/API/CRUD/DELETE/MANY/OPTIMISTIC";
export declare type NotificationLevelType = 'error' | 'warning' | 'info' | 'important';
export interface NotificationType {
    body?: string | any;
    level?: NotificationLevelType;
    messageArgs?: object | any;
}
export interface MetaDataFetchType {
    resource?: string;
    fetch?: string;
    keyId?: string;
    onFailure?: OnFailureType | ((getState: any) => OnFailureType);
    onSuccess?: OnSuccessType | ((getState: any) => OnSuccessType);
    refresh?: boolean;
    cancelPrevious?: boolean;
}
export interface DataActionResult {
    type: string;
    payload: object;
    meta: MetaDataFetchType;
}
export interface OnFailureType {
    notification: NotificationType;
}
export interface OnSuccessType {
    notification?: NotificationType;
    getResult?: ((getState: any) => object);
    basePath?: string;
    redirectTo?: 'edit' | 'show' | string;
    unselectAll?: boolean;
}
export interface DataFetchOptions {
    keyId?: string;
    onFailure?: OnFailureType | any;
    onSuccess?: OnSuccessType | any;
    refresh?: boolean;
    redirectTo?: 'edit' | 'show' | string;
}
export declare const crudGetList: (resource: string, params: any, options: any) => DataActionResult;
export declare const crudGetMany: (resource: string, params: object, options: DataFetchOptions) => DataActionResult;
export declare const crudGetCount: (resource: string, params: object, options: DataFetchOptions) => DataActionResult;
export declare const crudGetOne: (resource: string, params: object, options: DataFetchOptions) => DataActionResult;
export declare const crudCreate: (resource: string, params: object, options?: DataFetchOptions) => {
    type: string;
    payload: object;
    meta: {
        resource: string;
        fetch: string;
        keyId: string | undefined;
        onSuccess: any;
        onFailure: any;
    };
};
export declare const crudUpdate: (resource: string, params: object, options: DataFetchOptions) => DataActionResult;
export declare const crudDelete: (resource: string, params: object, options: DataFetchOptions) => DataActionResult;
