"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_i18n_1 = require("react-redux-i18n");
var history_1 = require("history");
var connected_react_router_1 = require("connected-react-router");
var createStore_1 = require("../createStore");
var react_redux_1 = require("react-redux");
var react_router_1 = require("react-router");
var renderRouter_1 = require("./renderRouter");
var getI18n = function (dataI18) {
    if (dataI18 === void 0) { dataI18 = {}; }
    var data = { 'vi': '' };
    Object.keys(dataI18).forEach(function (lang) {
        data[lang] = dataI18[lang];
    });
    return react_redux_i18n_1.loadTranslations(data);
};
var historyApp;
exports.getHistoryApp = function () {
    return historyApp;
};
exports.CoreAdmin = function (props) {
    var appURL = props.appURL, i18n = props.i18n, pages = props.pages, reducers = props.reducers, compose = props.compose, _a = props.middlewares, middlewares = _a === void 0 ? [] : _a, middlewaresDev = props.middlewaresDev, dataProvider = props.dataProvider, routeProvider = props.routeProvider, rootLayout = props.rootLayout;
    historyApp = history_1.createBrowserHistory({ basename: appURL });
    var i18nSupported = getI18n(i18n);
    var middlewaresIn = middlewares.concat([connected_react_router_1.routerMiddleware(historyApp)]);
    var store = createStore_1.default({
        reducers: reducers,
        middlewares: middlewaresIn,
        dataProvider: dataProvider,
        compose: compose,
        middlewaresDev: middlewaresDev,
    }, historyApp);
    react_redux_i18n_1.syncTranslationWithStore(store);
    store.dispatch(i18nSupported);
    return (React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(connected_react_router_1.ConnectedRouter, { history: historyApp },
            React.createElement(react_router_1.Switch, null, renderRouter_1.renderRouterRoot({ routeProvider: routeProvider, pages: pages, rootLayout: rootLayout, dispatch: store.dispatch })))));
};
