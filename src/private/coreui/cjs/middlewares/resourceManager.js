"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var actions_1 = require("../actions");
var ManagerResources = /** @class */ (function () {
    function ManagerResources() {
        var _this = this;
        this.awaitRemove = {};
        this.resources = {};
        this.add = function (resources, guid) {
            resources.forEach(function (name) {
                _this.resources[name] = _this.resources[name] || {};
                _this.resources[name][guid] = 1;
            });
        };
        this.remove = function (props) {
            var ctx = _this;
            delete ctx.resources[props.name][props.guid];
            if (props.func && Object.keys(ctx.resources[props.name]).length === 0) {
                _this.awaitRemove[props.name] =
                    setTimeout(function () {
                        props.func();
                        delete ctx.awaitRemove[props.name];
                    }, props.time);
            }
        };
        this.clearRemove = function (name) {
            if (_this.awaitRemove[name]) {
                clearTimeout(_this.awaitRemove[name]);
                delete _this.awaitRemove[name];
            }
        };
    }
    return ManagerResources;
}());
exports.createResourceMangement = function (timeOutDefault) {
    if (timeOutDefault === void 0) { timeOutDefault = 3000; }
    var manger = new ManagerResources();
    return function (_a) {
        var dispatch = _a.dispatch, getState = _a.getState;
        return function (next) {
            return function (action) {
                if (action.type.includes(actions_1.CORE_RESOURCE)) {
                    var state = utils_1.getDataObject("core.resources", getState()) || {};
                    var resources_1 = Object.keys(state);
                    if (action.type === actions_1.REGISTER_RESOURCE) {
                        var newPayload_1 = [];
                        action.payload.forEach(function (res) {
                            if (!resources_1.includes(res.name)) {
                                newPayload_1.push(res);
                            }
                            else {
                                manger.clearRemove(res.name);
                                if (res.refresh) {
                                    newPayload_1.push(res);
                                }
                            }
                        });
                        manger.add(action.payload.map(function (item) { return item.name; }), action.guid);
                        if (newPayload_1.length) {
                            return next({ type: action.type, payload: newPayload_1 });
                        }
                    }
                    else {
                        var newPayload_2 = [];
                        action.payload.forEach(function (res) {
                            var name = res.name, flush = res.flush, unregisterDuration = res.unregisterDuration;
                            if (flush) {
                                manger.remove({ guid: action.guid, name: res.name });
                                newPayload_2.push(res.name);
                            }
                            else {
                                manger.remove({
                                    guid: action.guid,
                                    name: name, time: unregisterDuration || timeOutDefault, func: function () {
                                        dispatch({ type: actions_1.UNREGISTER_RESOURCE, payload: [{ name: name, flush: true }] });
                                    }
                                });
                            }
                        });
                        if (newPayload_2.length) {
                            return next({ type: action.type, payload: newPayload_2 });
                        }
                    }
                }
                else {
                    return next(action);
                }
            };
        };
    };
};
exports.default = exports.createResourceMangement();
