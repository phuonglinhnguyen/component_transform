"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../../../actions");
var defaultState = {
    sort: null,
    order: null,
    page: 1,
    perPage: null,
    filter: {},
};
exports.default = (function (previousState, _a) {
    if (previousState === void 0) { previousState = defaultState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case actions_1.CRUD_CHANGE_LIST_PARAMS:
            return payload;
        default:
            return previousState;
    }
});
