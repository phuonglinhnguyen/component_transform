/// <reference types="react" />
import { IRouteFunc } from '../models/route';
export declare const renderRouter: (routes: IRouteFunc[] | undefined, pages: any) => JSX.Element[];
export declare const renderRouterRoot: ({ routeProvider, pages, rootLayout, dispatch }: any) => any;
