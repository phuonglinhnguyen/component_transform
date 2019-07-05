"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var models_1 = require("../models");
var oauthAction_1 = require("../actions/oauthAction");
var CurrentUserState = /** @class */ (function () {
    function CurrentUserState(props) {
        this.user = new models_1.CurrentUserEntity(props),
            this.isInited = false;
        this.isChecking = false;
        this.isAuthenticated = false;
        this.isRefreshing = false;
    }
    return CurrentUserState;
}());
exports.default = (function (state, action) {
    if (state === void 0) { state = new CurrentUserState(); }
    switch (action.type) {
        case oauthAction_1.USER_INIT:
            return tslib_1.__assign({}, state, { isInited: true, isAuthenticated: true, user: action.payload });
        case oauthAction_1.USER_LOGIN_SUCCESS:
            return tslib_1.__assign({}, state, { user: action.payload });
        case oauthAction_1.USER_LOGOUT:
            return new models_1.CurrentUserEntity();
        default:
            return state;
    }
});
