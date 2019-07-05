"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../../../actions");
var initialState = [];
exports.default = (function (previousState, action) {
    if (previousState === void 0) { previousState = initialState; }
    switch (action.type) {
        case actions_1.SET_LIST_SELECTED_IDS:
            return action.payload;
        case actions_1.TOGGLE_LIST_ITEM: {
            var index = previousState.indexOf(action.payload);
            if (index > -1) {
                return previousState.slice(0, index).concat(previousState.slice(index + 1));
            }
            else {
                return previousState.concat([action.payload]);
            }
        }
        default:
            return action.meta && action.meta.unselectAll
                ? initialState
                : previousState;
    }
});
