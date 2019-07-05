"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.SET_SORT = 'SET_SORT';
exports.SORT_ASC = 'ASC';
exports.SORT_DESC = 'DESC';
exports.SET_PAGE = 'SET_PAGE';
exports.SET_FILTER = 'SET_FILTER';
var oppositeOrder = function (direction) {
    return direction === exports.SORT_DESC ? exports.SORT_ASC : exports.SORT_DESC;
};
exports.default = (function (previousState, _a) {
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case exports.SET_SORT:
            if (payload === previousState.sort) {
                return tslib_1.__assign({}, previousState, { order: oppositeOrder(previousState.order), page: 1 });
            }
            return tslib_1.__assign({}, previousState, { sort: payload, order: exports.SORT_ASC, page: 1 });
        case exports.SET_PAGE:
            return tslib_1.__assign({}, previousState, { page: payload });
        case exports.SET_FILTER: {
            return tslib_1.__assign({}, previousState, { page: 1, filter: payload });
        }
        default:
            return previousState;
    }
});
