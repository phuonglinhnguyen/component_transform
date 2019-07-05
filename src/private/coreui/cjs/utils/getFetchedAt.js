"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var lodash_1 = require("lodash");
var defaultCacheDuration = 10 * 60 * 1000; // ten minutes
exports.getFetchedAt = function (newRecordIds, oldRecordFetchedAt, now, cacheDuration) {
    if (newRecordIds === void 0) { newRecordIds = []; }
    if (oldRecordFetchedAt === void 0) { oldRecordFetchedAt = {}; }
    if (now === void 0) { now = new Date(); }
    if (cacheDuration === void 0) { cacheDuration = defaultCacheDuration; }
    // prepare new records and timestamp them
    var newFetchedAt = newRecordIds.reduce(function (prev, recordId) {
        var _a;
        return (tslib_1.__assign({}, prev, (_a = {}, _a[recordId] = now, _a)));
    }, {});
    // remove outdated entry
    var latestValidDate = new Date();
    latestValidDate.setTime(latestValidDate.getTime() - cacheDuration);
    var stillValidFetchedAt = lodash_1.pickBy(oldRecordFetchedAt, function (date) { return date > latestValidDate; });
    return tslib_1.__assign({}, stillValidFetchedAt, newFetchedAt);
};
