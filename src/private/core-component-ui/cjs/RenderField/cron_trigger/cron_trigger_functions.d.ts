export declare const getTimeByCronValue: (cronValue: any) => any;
export declare const getActiveTabByCronValue: (cronValue: any) => any;
export declare const getCronValueByState: (newState: any) => string;
export declare const getStateByCronValue: (cronValue: any, tabs: any) => {
    value: number;
    cronValue: any;
    cronTime: any;
    activeTab: any;
    seconds: {
        second: string;
        errorText: string;
    };
    minutes: {
        minute: string;
        errorText: string;
    };
    hourly: {
        type: string;
        everyHour: string;
        hour: string;
        minute: string;
        errorText: string;
    };
    daily: {
        type: string;
        everyDay: string;
        hour: string;
        minute: string;
        errorText: string;
    };
    weekly: {
        days: {
            key: number;
            text: string;
            val: string;
        }[];
        hour: string;
        minute: string;
        errorText: string;
    };
    monthly: {
        type: string;
        day: {
            day: string;
            everyMonth: string;
            errorTextDay: string;
            errorTextEveryMonth: string;
        };
        dayIndex: {
            index: number;
            dayOfWeek: string;
            everyMonth: string;
            errorText: string;
        };
        hour: string;
        minute: string;
    };
};
