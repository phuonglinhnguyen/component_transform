"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var actions_1 = require("../../../../actions");
var utils_1 = require("../../../../utils");
exports.addRecordIdsFactory = function (getFetchedAt) { return function (newRecordIds, oldRecordIds) {
    if (newRecordIds === void 0) { newRecordIds = []; }
    var newFetchedAt = getFetchedAt(newRecordIds, oldRecordIds.fetchedAt);
    var recordIds = lodash_1.uniq(oldRecordIds.filter(function (id) { return !!newFetchedAt[id]; }).concat(newRecordIds));
    Object.defineProperty(recordIds, 'fetchedAt', {
        value: newFetchedAt,
    }); // non enumerable by default
    return recordIds;
}; };
var addRecordIds = exports.addRecordIdsFactory(utils_1.getFetchedAt);
exports.default = (function (previousState, _a) {
    if (previousState === void 0) { previousState = []; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case actions_1.CRUD_GET_LIST_SUCCESS:
        case actions_1.CRUD_GET_COUNT_SUCCESS:
            return addRecordIds(Array.isArray(payload.json) ? payload.json.map(function (_a) {
                var id = _a.id;
                return id;
            }) : [], []);
        case actions_1.CRUD_GET_MANY_SUCCESS:
        case actions_1.CRUD_GET_MANY_REFERENCE_SUCCESS: {
            if (payload.json && Array.isArray(payload.json)) {
                return addRecordIds(payload.json
                    .map(function (_a) {
                    var id = _a.id;
                    return id;
                })
                    .filter(function (id) {
                    return previousState.indexOf(String(id)) !== -1;
                }), previousState);
            }
            return previousState;
        }
        case actions_1.CRUD_GET_ONE_SUCCESS:
        case actions_1.CRUD_CREATE_SUCCESS:
        case actions_1.CRUD_UPDATE_SUCCESS:
            {
                if (payload.json) {
                    return addRecordIds(Array.isArray(payload.json) ? payload.json.map(function (_a) {
                        var id = _a.id;
                        return id;
                    }) : [payload.json.id], previousState);
                }
                return previousState;
            }
        case actions_1.CRUD_DELETE_OPTIMISTIC: {
            var index = previousState
                .map(function (el) { return el === payload.id; }) // eslint-disable-line eqeqeq
                .indexOf(true);
            if (index === -1) {
                return previousState;
            }
            var newState = previousState.slice(0, index).concat(previousState.slice(index + 1));
            Object.defineProperty(newState, 'fetchedAt', {
                value: previousState.fetchedAt,
            });
            return newState;
        }
        case actions_1.CRUD_DELETE_MANY_OPTIMISTIC: {
            var newState = previousState.filter(function (el) { return !payload.ids.includes(el); });
            Object.defineProperty(newState, 'fetchedAt', {
                value: previousState.fetchedAt,
            });
            return newState;
        }
        default:
            return previousState;
    }
});
