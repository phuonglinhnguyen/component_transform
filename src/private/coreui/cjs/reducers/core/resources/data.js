"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var actions_1 = require("../../../actions");
var utils_1 = require("../../../utils");
exports.addRecordsFactory = function (getFetchedAt) { return function (newRecords, oldRecords) {
    if (newRecords === void 0) { newRecords = []; }
    var newFetchedAt = getFetchedAt(newRecords.map(function (_a) {
        var id = _a.id;
        return id;
    }), oldRecords.fetchedAt);
    var newRecordsById = newRecords.reduce(function (acc, record) {
        var _a;
        return (tslib_1.__assign({}, acc, (_a = {}, _a[record.id] = record, _a)));
    }, {});
    var records = Object.keys(newFetchedAt).reduce(function (acc, id) {
        var _a;
        return (tslib_1.__assign({}, acc, (_a = {}, _a[id] = newRecordsById[id] || oldRecords[id], _a)));
    }, {});
    Object.defineProperty(records, 'fetchedAt', {
        value: newFetchedAt,
    }); // non enumerable by default
    return records;
}; };
var addRecords = exports.addRecordsFactory(utils_1.getFetchedAt);
exports.getRecord = function (state, id) { return state[id]; };
var getInitialState = function () {
    var initialState = {};
    Object.defineProperty(initialState, 'fetchedAt', { value: {} });
    return initialState;
};
exports.default = (function (previousState, _a) {
    if (previousState === void 0) { previousState = getInitialState(); }
    var type = _a.type, payload = _a.payload, meta = _a.meta;
    if (!meta || !meta.fetchResponse || meta.fetchStatus !== actions_1.FETCH_END) {
        return previousState;
    }
    var json = payload.json ? (Array.isArray(payload.json) ? payload.json : [payload.json]) : [];
    switch (meta.fetchResponse) {
        case actions_1.GET_LIST:
        case actions_1.GET_MANY:
        case actions_1.GET_MANY_REFERENCE:
        case actions_1.GET_COUNT:
            if (meta.refresh) {
                return addRecords(json, getInitialState());
            }
            else {
                return addRecords(json, previousState);
            }
        case actions_1.GET_ONE:
        case actions_1.UPDATE:
        case actions_1.CREATE:
            return addRecords(json, previousState);
        default:
            return previousState;
    }
});
