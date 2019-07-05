"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
var connected_react_router_1 = require("connected-react-router");
exports.USER_LOGIN = '@DGS/OAUTH/USER_LOGIN';
exports.USER_INIT = '@DGS/OAUTH/USER_INIT';
exports.USER_LOGIN_LOADING = '@DGS/OAUTH/USER_LOGIN_LOADING';
exports.USER_LOGIN_FAILURE = '@DGS/OAUTH/USER_LOGIN_FAILURE';
exports.USER_LOGIN_SUCCESS = '@DGS/OAUTH/USER_LOGIN_SUCCESS';
exports.USER_LOGOUT = '@DGS/OAUTH/USER_LOGOUT';
exports.setUserCurrent = function (user) { return ({
    type: exports.USER_INIT,
    payload: user
}); };
exports.userLogin = function (user, pathName, redirectTo) { return function (dispatch) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var responseData, error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dispatch({ type: exports.USER_LOGIN_LOADING, pathName: pathName });
                return [4 /*yield*/, utils_1.doLogin(user.username.toLowerCase(), user.password)];
            case 1:
                responseData = _a.sent();
                dispatch({ type: exports.USER_LOGIN_SUCCESS, payload: responseData.data });
                dispatch(connected_react_router_1.push(redirectTo));
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                dispatch({ type: exports.USER_LOGIN_FAILURE, payload: error_1 });
                return [2 /*return*/, error_1];
            case 3: return [2 /*return*/];
        }
    });
}); }; };
exports.userLogout = function (redirectTo) { return function (dispatch) {
    utils_1.clearToken();
    dispatch({ type: exports.USER_LOGOUT });
    if (redirectTo) {
        dispatch(connected_react_router_1.push(redirectTo));
    }
    else {
        utils_1.redirectApp('/signin');
    }
}; };
