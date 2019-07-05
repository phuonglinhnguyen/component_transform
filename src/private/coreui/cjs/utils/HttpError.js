"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HttpError = /** @class */ (function (_super) {
    tslib_1.__extends(HttpError, _super);
    function HttpError(message, status, body) {
        if (body === void 0) { body = null; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.status = status;
        _this.body = body;
        _this.name = _this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(_this, _this.constructor);
        }
        else {
            _this.stack = new Error(message).stack;
        }
        return _this;
    }
    return HttpError;
}(Error));
exports.HttpError = HttpError;
