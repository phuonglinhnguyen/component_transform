import { Middleware } from "redux";
import { History } from 'history';
export interface PropsStore {
    dataProvider: any;
    middlewares: Middleware[];
    middlewaresDev: Middleware[];
    reducers?: object;
    compose?: any;
}
declare const _default: (props: any, history: History<any>) => import("redux").Store<{}, import("redux").AnyAction>;
export default _default;
