import * as React from 'react';
import { History } from 'history';
interface Pages {
    [key: string]: React.ComponentType<any>;
}
export interface IAppProps {
    appURL: string;
    pages: Pages;
    dataProvider: any;
    routeProvider: any;
    i18n?: object;
    reducers: object;
    compose?: any;
    middlewares: any[];
    middlewaresDev: any[];
    rootLayout: React.ComponentType;
    [key: string]: any;
}
export declare const getHistoryApp: () => History<any>;
export declare const CoreAdmin: React.StatelessComponent<IAppProps>;
export {};
