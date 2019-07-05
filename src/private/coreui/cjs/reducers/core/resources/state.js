"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getInitialState = function () {
    var initialState = {
        fetching: false,
        success: false,
        failure: false,
    };
    return initialState;
};
exports.default = (function (previousState, _a) {
    if (previousState === void 0) { previousState = getInitialState(); }
    var type = _a.type;
    if (type.includes('LOADING')) {
        return {
            fetching: true,
            success: false,
            failure: false,
        };
    }
    else if (type.includes('SUCCESS')) {
        return {
            fetching: false,
            success: true,
            failure: false,
        };
    }
    else if (type.includes('FAILURE')) {
        return {
            fetching: false,
            success: false,
            failure: false,
        };
    }
    else {
        return previousState;
    }
});
