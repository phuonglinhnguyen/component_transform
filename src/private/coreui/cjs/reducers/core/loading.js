"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../actions");
exports.default = (function (previousState, _a) {
    if (previousState === void 0) { previousState = 0; }
    var type = _a.type;
    switch (type) {
        case actions_1.FETCH_START:
            return previousState + 1;
        case actions_1.FETCH_END:
        case actions_1.FETCH_ERROR:
        case actions_1.FETCH_CANCEL:
            return Math.max(previousState - 1, 0);
        default:
            return previousState;
    }
});
