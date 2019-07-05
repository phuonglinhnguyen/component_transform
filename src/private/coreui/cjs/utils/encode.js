"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
exports.b64DecodeUnicode = b64DecodeUnicode;
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
        return String.fromCharCode(("0x" + p1));
    }));
}
exports.b64EncodeUnicode = b64EncodeUnicode;
