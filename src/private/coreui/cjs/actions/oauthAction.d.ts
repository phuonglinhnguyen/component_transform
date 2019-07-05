export declare const USER_LOGIN = "@DGS/OAUTH/USER_LOGIN";
export declare const USER_INIT = "@DGS/OAUTH/USER_INIT";
export declare const USER_LOGIN_LOADING = "@DGS/OAUTH/USER_LOGIN_LOADING";
export declare const USER_LOGIN_FAILURE = "@DGS/OAUTH/USER_LOGIN_FAILURE";
export declare const USER_LOGIN_SUCCESS = "@DGS/OAUTH/USER_LOGIN_SUCCESS";
export declare const USER_LOGOUT = "@DGS/OAUTH/USER_LOGOUT";
export interface DataAuthActionResult {
    type: string;
    payload: object;
    meta: object;
}
export declare const setUserCurrent: (user: any) => {
    type: string;
    payload: any;
};
export declare const userLogin: (user: any, pathName: string, redirectTo: string) => (dispatch: any) => Promise<any>;
export declare const userLogout: (redirectTo?: string | undefined) => (dispatch: any) => void;
