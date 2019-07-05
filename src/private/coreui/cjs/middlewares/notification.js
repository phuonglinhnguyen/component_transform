"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notificationActions_1 = require("../actions/notificationActions");
exports.default = (function (_a) {
    var dispatch = _a.dispatch, getState = _a.getState;
    return function (next) { return function (action) {
        if (action.meta) {
            var error = action.error, _a = action.meta, notification = _a.notification, optimistic = _a.optimistic;
            if (notification) {
                var body = notification.body, level = notification.level, _b = notification.messageArgs, messageArgs = _b === void 0 ? {} : _b;
                if (error) {
                    dispatch(notificationActions_1.showNotification(typeof error === 'string' ? error : error.message || body, level || 'warning', {
                        messageArgs: messageArgs,
                        undoable: false,
                    }));
                }
                else {
                    dispatch(notificationActions_1.showNotification(body, level || 'info', {
                        messageArgs: messageArgs,
                        undoable: optimistic,
                    }));
                }
            }
        }
        return next(action);
    }; };
});
