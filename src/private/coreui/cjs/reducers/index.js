"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var redux_1 = require("redux");
var connected_react_router_1 = require("connected-react-router");
var react_redux_i18n_1 = require("react-redux-i18n");
var currentUserReducer_1 = require("./currentUserReducer");
var core_1 = require("./core");
exports.default = (function (customReducers, history) {
    return redux_1.combineReducers(tslib_1.__assign({ i18n: react_redux_i18n_1.i18nReducer, user: currentUserReducer_1.default, router: connected_react_router_1.connectRouter(history), core: core_1.default }, customReducers));
});
