"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var actions_1 = require("../../../actions");
var data_1 = require("./data");
var list_1 = require("./list");
var state_1 = require("./state");
var initialState = {};
exports.default = (function (previousState, action) {
    if (previousState === void 0) { previousState = initialState; }
    if (action.type === actions_1.REGISTER_RESOURCE) {
        var newState_1 = tslib_1.__assign({}, previousState);
        action.payload.forEach(function (element) {
            var _a, _b;
            if (typeof element.reducer === 'function') {
                var resourceState = {
                    props: element,
                    data: element.reducer(undefined, action),
                };
                newState_1 = tslib_1.__assign({}, newState_1, (_a = {}, _a[element.name] = resourceState, _a));
            }
            else {
                var resourceState = {
                    props: element,
                    data: data_1.default(undefined, action),
                    list: list_1.default(undefined, action),
                    state: state_1.default(undefined, action),
                };
                newState_1 = tslib_1.__assign({}, newState_1, (_b = {}, _b[element.name] = resourceState, _b));
            }
        });
        return newState_1;
    }
    if (action.type === actions_1.UNREGISTER_RESOURCE) {
        var newState_2 = Object.keys(previousState).reduce(function (acc, key) {
            var _a;
            if (action.payload.includes(key)) {
                return acc;
            }
            return tslib_1.__assign({}, acc, (_a = {}, _a[key] = previousState[key], _a));
        }, {});
        return newState_2;
    }
    if (!action.meta || !action.meta.resource) {
        return previousState;
    }
    var resources = Object.keys(previousState);
    var newState = resources.reduce(function (acc, resource) {
        var _a;
        return (tslib_1.__assign({}, acc, (_a = {}, _a[resource] = action.meta.resource === resource
            ? (previousState[resource].props.reducer ?
                {
                    props: previousState[resource].props,
                    data: previousState[resource].props.reducer(previousState[resource].data, action),
                } : {
                props: previousState[resource].props,
                data: data_1.default(previousState[resource].data, action),
                list: list_1.default(previousState[resource].list, action),
                state: state_1.default(previousState[resource].state, action),
            })
            : previousState[resource], _a)));
    }, {});
    return newState;
});
