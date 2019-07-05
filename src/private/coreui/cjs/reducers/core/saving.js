"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connected_react_router_1 = require("connected-react-router");
var actions_1 = require("../../actions");
exports.default = (function (previousState, _a) {
    if (previousState === void 0) { previousState = false; }
    var type = _a.type, meta = _a.meta;
    switch (type) {
        case actions_1.CRUD_CREATE:
        case actions_1.CRUD_UPDATE:
            return {
                redirect: meta.onSuccess && meta.onSuccess.redirectTo,
            };
        case connected_react_router_1.LOCATION_CHANGE:
        case actions_1.CRUD_CREATE_SUCCESS:
        case actions_1.CRUD_CREATE_FAILURE:
        case actions_1.CRUD_UPDATE_SUCCESS:
        case actions_1.CRUD_UPDATE_FAILURE:
            return false;
        default:
            return previousState;
    }
});
