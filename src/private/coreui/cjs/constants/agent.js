"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';
exports.USER_AGENT = typeof navigator !== 'undefined' ? navigator.userAgent : exports.DEFAULT_USER_AGENT;
