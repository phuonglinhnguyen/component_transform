"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
var lodash_1 = require("lodash");
exports.default = (function (previousState, _a) {
    if (previousState === void 0) { previousState = []; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case actions_1.SHOW_NOTIFICATION:
            if (previousState.findIndex(function (item) { return lodash_1.isEqual(payload, item); }) > -1) {
                return previousState;
            }
            return previousState.concat(payload);
        case actions_1.HIDE_NOTIFICATION:
            if (payload) {
                var next = previousState.slice();
                next.splice(payload, 1);
                return next;
            }
            return previousState.slice(1);
        default:
            return previousState;
    }
});
