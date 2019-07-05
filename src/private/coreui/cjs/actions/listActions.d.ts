export declare const CRUD_CHANGE_LIST_PARAMS = "@DGS/CRUD_CHANGE_LIST_PARAMS";
export declare const SET_LIST_SELECTED_IDS = "@DGS/SET_LIST_SELECTED_IDS";
export declare const TOGGLE_LIST_ITEM = "@DGS/TOGGLE_LIST_ITEM";
export declare const changeListParams: (resource: string, params: any) => {
    type: string;
    payload: any;
    meta: {
        resource: string;
    };
};
export declare const setListSelectedIds: (resource: string, ids: any[]) => {
    type: string;
    payload: any[];
    meta: {
        resource: string;
    };
};
export declare const toggleListItem: (resource: string, id: any) => {
    type: string;
    payload: any;
    meta: {
        resource: string;
    };
};
