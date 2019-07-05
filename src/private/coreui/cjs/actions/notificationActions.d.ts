export declare const HIDE_NOTIFICATION = "@DGS/HIDE_NOTIFICATION";
export declare const SHOW_NOTIFICATION = "@DGS/SHOW_NOTIFICATION";
export declare const showNotification: (message: any, type: string | undefined, notificationOptions: any) => {
    type: string;
    payload: any;
};
export declare const hideNotification: (index: number) => {
    type: string;
    payload: number;
};
