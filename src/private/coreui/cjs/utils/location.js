"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var history_1 = require("history");
exports.RootHistory = history_1.createBrowserHistory();
exports.redirect = function (path) {
    if (window) {
        var sub = path.indexOf('/') === 0 ? '' : '/';
        window.location.replace(window.location.origin + sub + path);
        return true;
    }
    return false;
};
exports.redirectApp = function (path) {
    if (window) {
        var sub = path.indexOf('/') === 0 ? '' : '/';
        var nextPath = window.location.origin + sub + (path && path !== '/' ? path + "/" : '');
        if (window.location.href !== nextPath) {
            window.location.replace(nextPath);
        }
        return true;
    }
    return false;
};
