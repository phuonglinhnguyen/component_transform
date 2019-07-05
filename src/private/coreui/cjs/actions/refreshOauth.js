"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var oauthAction_1 = require("./oauthAction");
var isRefreshIn = false;
var actionsIn = [];
exports.isRefresh = function () {
    return isRefreshIn;
};
var setRefresh = function (isRefresh) {
    isRefreshIn = isRefresh;
};
var addAction = function (action) {
    actionsIn = actionsIn.concat([action]);
};
var getActions = function () {
    return actionsIn;
};
var clearActions = function () {
    actionsIn = [];
};
exports.addAwaitRefresh = function (action) { return function (dispatch) {
    addAction(action);
    if (!exports.isRefresh()) {
        setRefresh(true);
        utils_1.refreshToken().then(function () {
            setRefresh(false);
            getActions().map(function (item) {
                dispatch(item);
            });
            clearActions();
        }).catch(function () {
            dispatch(oauthAction_1.userLogout());
        });
    }
}; };
