"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constants_1 = require("../constants");
var fetch_1 = require("./fetch");
// import { b64DecodeUnicode, b64EncodeUnicode } from './encode'
var models_1 = require("../models");
var jws_1 = require("jws");
exports.AUTH_VERSION = 1;
function getOption(body) {
    return {
        method: "POST",
        headers: new Headers({
            "user-agent": constants_1.USER_AGENT,
            "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        }),
        body: body
    };
}
function doLogin(username, password) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var data, result, _a, access_token, refresh_token, user;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = new URLSearchParams();
                    data.append('client_id', 'elrond');
                    data.append('client_secret', 'HiEldrond');
                    data.append('grant_type', 'password');
                    data.append('username', username);
                    data.append('password', password);
                    return [4 /*yield*/, fetch_1.fetchJson(constants_1.getApiOauthURI() + "/token", getOption(data))];
                case 1:
                    result = _b.sent();
                    setToken(result.json);
                    _a = result.json, access_token = _a.access_token, refresh_token = _a.refresh_token, user = tslib_1.__rest(_a, ["access_token", "refresh_token"]);
                    return [2 /*return*/, {
                            access_token: access_token,
                            refresh_token: refresh_token,
                            user: user,
                            data: result.json
                        }];
            }
        });
    });
}
exports.doLogin = doLogin;
function refreshToken() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var data, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = new URLSearchParams();
                    data.append('client_id', 'elrond');
                    data.append('client_secret', 'HiEldrond');
                    data.append('grant_type', 'refresh_token');
                    data.append('refresh_token', getRefreshToken() || '');
                    return [4 /*yield*/, fetch_1.fetchJson(constants_1.getApiOauthURI() + "/token", getOption(data))];
                case 1:
                    result = _a.sent();
                    setToken(result.json);
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.refreshToken = refreshToken;
function clearToken() {
    localStorage.removeItem(constants_1.ACCESS_TOKEN_KEY);
    localStorage.removeItem(constants_1.REFRESH_TOKEN_KEY);
    localStorage.removeItem(constants_1.USER_METADATA_KEY);
    return true;
}
exports.clearToken = clearToken;
function setToken(data) {
    if (data) {
        // const { access_token, refresh_token } = data;
        localStorage.setItem(constants_1.ACCESS_TOKEN_KEY, data.access_token);
        localStorage.setItem(constants_1.REFRESH_TOKEN_KEY, data.refresh_token);
        // localStorage.setItem(USER_METADATA_KEY, b64EncodeUnicode(JSON.stringify(user)));
        return true;
    }
    return false;
}
// function getUserMetaData() {
//     const dataBase64 = localStorage.getItem(USER_METADATA_KEY);
//     if (dataBase64) {
//         const user = JSON.parse(b64DecodeUnicode(dataBase64));
//         return new CurrentUserEntity({
//             username: user.username,
//             displayName: user.displayName,
//             email: user.email,
//         })
//     }
//     return null;
// }
function getUserMetaData() {
    try {
        var token = getAccessToken() || '';
        var user = JSON.parse(jws_1.decode(token).payload);
        return new models_1.CurrentUserEntity({
            username: user.username,
            displayName: user.displayName,
            email: user.email,
        });
    }
    catch (error) {
        return null;
    }
}
exports.getUserMetaData = getUserMetaData;
function getAccessToken() {
    return localStorage.getItem(constants_1.ACCESS_TOKEN_KEY);
}
exports.getAccessToken = getAccessToken;
function getRefreshToken() {
    return localStorage.getItem(constants_1.ACCESS_TOKEN_KEY);
}
exports.getRefreshToken = getRefreshToken;
