import * as React from 'react';
import { RouteComponentProps } from 'react-router';
export interface IRouteFunc {
    name?: string;
    path: string;
    exact?: boolean;
    layoutName?: string;
    layout?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    subRoutes?: IRouteFunc[];
}
export declare class RouteFunc implements IRouteFunc {
    name?: string;
    layoutName?: string;
    path: string;
    exact?: boolean;
    layout?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    subRoutes?: IRouteFunc[];
    constructor(props: IRouteFunc | any);
}
