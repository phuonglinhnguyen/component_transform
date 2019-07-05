"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var loading_1 = require("./loading");
var notifications_1 = require("./notifications");
var saving_1 = require("./saving");
var resources_1 = require("./resources");
exports.default = redux_1.combineReducers({
    loading: loading_1.default,
    notifications: notifications_1.default,
    resources: resources_1.default,
    saving: saving_1.default,
});
