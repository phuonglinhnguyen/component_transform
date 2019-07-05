"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FETCH = '@DGS/FETCH';
exports.FETCH_START = '@DGS/FETCH_START';
exports.FETCH_END = '@DGS/FETCH_END';
exports.FETCH_ERROR = '@DGS/FETCH_ERROR';
exports.FETCH_CANCEL = '@DGS/FETCH_CANCEL';
exports.fetchStart = function () { return ({
    type: exports.FETCH_START,
}); };
exports.fetchEnd = function () { return ({
    type: exports.FETCH_END,
}); };
exports.fetchError = function () { return ({
    type: exports.FETCH_ERROR,
}); };
exports.fetchCancel = function () { return ({
    type: exports.FETCH_CANCEL,
}); };
