"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HttpError_1 = require("./HttpError");
var utils_1 = require("../utils");
exports.fetchJson = function (url, options, ignoreToken) {
    if (options === void 0) { options = { method: 'GET' }; }
    if (ignoreToken === void 0) { ignoreToken = false; }
    return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var requestHeaders, token, requestInit, response, textIn, json;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestHeaders = options.headers ||
                        new Headers({
                            Accept: 'application/json',
                        });
                    if (!requestHeaders.has('Content-Type') &&
                        !(options && options.body && options.body instanceof FormData)) {
                        requestHeaders.set('Content-Type', 'application/json');
                    }
                    token = utils_1.getAccessToken();
                    if (token && !ignoreToken) {
                        requestHeaders.set('Authorization', "Bearer " + token);
                    }
                    requestInit = tslib_1.__assign({}, options, { body: options.body, headers: requestHeaders, method: options.method });
                    return [4 /*yield*/, fetch(url, requestInit)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 2:
                    textIn = _a.sent();
                    try {
                        json = JSON.parse(textIn);
                    }
                    catch (e) {
                        // not json, no big deal
                    }
                    if (response.status < 200 || response.status >= 300) {
                        throw new HttpError_1.HttpError((json && json.message) || response.statusText, response.status, json);
                    }
                    return [2 /*return*/, {
                            status: response.status,
                            headers: response.headers,
                            body: textIn,
                            json: json
                        }];
            }
        });
    });
};
var isValidObject = function (value) {
    if (!value) {
        return false;
    }
    var isArray = Array.isArray(value);
    var isBuffer = Buffer && Buffer.isBuffer(value);
    var isObject = Object.prototype.toString.call(value) === '[object Object]';
    var hasKeys = !!Object.keys(value).length;
    return !isArray && !isBuffer && isObject && hasKeys;
};
exports.flattenObject = function (value, path) {
    var _a;
    if (path === void 0) { path = []; }
    if (isValidObject(value)) {
        return Object.assign.apply(Object, [{}].concat(Object.keys(value).map(function (key) {
            return exports.flattenObject(value[key], path.concat([key]));
        })));
    }
    else {
        return path.length ? (_a = {}, _a[path.join('.')] = value, _a) : value;
    }
};
exports.convertHTTPResponse = function (response, meta) {
    var headers = response.headers, json = response.json, body = response.body, status = response.status;
    var data = json;
    if (json) {
        if (Array.isArray(json) && json.length > 0) {
            if (!json[0].id) {
                if (typeof json[0] !== 'object') {
                    data = json.map(function (item, id) { return ({ id: id, item: item }); });
                }
                else {
                    if (meta.keyId) {
                        data = json.map(function (item) { return (tslib_1.__assign({ id: item[meta.keyId] }, item)); });
                    }
                    else {
                        data = json.map(function (item, id) { return (tslib_1.__assign({ id: id }, item)); });
                    }
                }
            }
            else if (meta.keyId) {
                data = json.map(function (item) { return (tslib_1.__assign({}, item, { id: item[meta.keyId], _id: item.id })); });
            }
        }
    }
    return {
        status: status,
        headers: headers,
        data: data,
        json: data,
        body: body,
    };
};
