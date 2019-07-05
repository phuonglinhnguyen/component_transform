export declare const FETCH = "@DGS/FETCH";
export declare const FETCH_START = "@DGS/FETCH_START";
export declare const FETCH_END = "@DGS/FETCH_END";
export declare const FETCH_ERROR = "@DGS/FETCH_ERROR";
export declare const FETCH_CANCEL = "@DGS/FETCH_CANCEL";
export declare const fetchStart: () => {
    type: string;
};
export declare const fetchEnd: () => {
    type: string;
};
export declare const fetchError: () => {
    type: string;
};
export declare const fetchCancel: () => {
    type: string;
};
