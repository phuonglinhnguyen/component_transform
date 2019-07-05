"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var ids_1 = require("./ids");
var params_1 = require("./params");
var selectedIds_1 = require("./selectedIds");
exports.default = redux_1.combineReducers({
    ids: ids_1.default,
    params: params_1.default,
    selectedIds: selectedIds_1.default,
});
