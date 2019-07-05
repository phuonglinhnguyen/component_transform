"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_i18n_1 = require("react-redux-i18n");
var react_router_1 = require("react-router");
var CoreRouter_1 = require("./CoreRouter");
var creatRouteRender = function (item) { return function (props) {
    return React.createElement(item.component, tslib_1.__assign({}, props, { subRoutes: item.subRoutes }));
}; };
exports.renderRouter = function (routes, pages) {
    if (routes === void 0) { routes = []; }
    return routes.map(function (item, key) {
        if (item.subRoutes) {
            return React.createElement(react_router_1.Route, { exact: item.exact, key: key, path: item.path, render: creatRouteRender(item) });
        }
        else if (!item.path) {
            return React.createElement(react_router_1.Route, { key: key, component: item.component });
        }
        return React.createElement(react_router_1.Route, { exact: item.exact, key: key, path: item.path, component: item.component });
    });
};
var creatRouteRenderR = function (rootLayout, routeProvider, pages) { return function (props) {
    return React.createElement(CoreRouter_1.default, tslib_1.__assign({ rootLayout: rootLayout, routeProvider: routeProvider, pages: pages }, props));
}; };
exports.renderRouterRoot = function (_a) {
    var routeProvider = _a.routeProvider, pages = _a.pages, rootLayout = _a.rootLayout, dispatch = _a.dispatch;
    dispatch(react_redux_i18n_1.setLocale('en'));
    var routes = routeProvider('public');
    routes.push({ path: '/' });
    return routes.map(function (item, key) {
        if (item.subRoutes) {
            return React.createElement(react_router_1.Route, { exact: item.exact, key: key, path: item.path, render: creatRouteRender(item) });
        }
        else if (!item.path) {
            return React.createElement(react_router_1.Route, { component: item.component });
        }
        else if (!item.component) {
            return React.createElement(react_router_1.Route, { path: '/', key: 'r', render: creatRouteRenderR(rootLayout, routeProvider, pages) });
        }
        return React.createElement(react_router_1.Route, { exact: item.exact, key: key, path: item.path, component: item.component });
    });
};
