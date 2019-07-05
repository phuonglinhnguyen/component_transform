"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var constants_1 = require("../constants");
exports.getApps = function () {
    return utils_1.fetchJson(constants_1.getApiUacURI() + "/apps", { method: 'GET' });
};
