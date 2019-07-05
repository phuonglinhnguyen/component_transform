"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../../../actions");
exports.default = (function (previousState, _a) {
    if (previousState === void 0) { previousState = 0; }
    var type = _a.type, payload = _a.payload;
    if (type === actions_1.CRUD_GET_ONE_SUCCESS) {
        return previousState === 0 ? 1 : previousState;
    }
    if (type === actions_1.CRUD_GET_LIST_SUCCESS) {
        return payload.total;
    }
    if (type === actions_1.CRUD_DELETE_OPTIMISTIC) {
        return previousState - 1;
    }
    if (type === actions_1.CRUD_DELETE_MANY_OPTIMISTIC) {
        return previousState - payload.ids.length;
    }
    return previousState;
});
