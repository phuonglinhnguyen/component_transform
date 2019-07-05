"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.HIDE_NOTIFICATION = '@DGS/HIDE_NOTIFICATION';
exports.SHOW_NOTIFICATION = '@DGS/SHOW_NOTIFICATION';
exports.showNotification = function (message, type, notificationOptions) {
    if (type === void 0) { type = 'info'; }
    return ({
        type: exports.SHOW_NOTIFICATION,
        payload: tslib_1.__assign({}, notificationOptions, { type: type,
            message: message }),
    });
};
exports.hideNotification = function (index) { return ({
    type: exports.HIDE_NOTIFICATION,
    payload: index
}); };
