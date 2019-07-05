"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var constant = require("./action");
exports.getItemByStructure = function (input) {
    var fieldKey = input.fieldKey, _a = input.structures, structures = _a === void 0 ? {} : _a, _b = input.dataGeneral, dataGeneral = _b === void 0 ? {} : _b, keyTranslate = input.keyTranslate;
    var data = {};
    var datas = [];
    if (!lodash_1.isArray(structures[fieldKey])) {
        if (typeof structures[fieldKey] === "string") {
            var inputIParamsString = {
                fieldKey: fieldKey,
                dataGeneral: dataGeneral,
                keyTranslate: keyTranslate
            };
            data = exports.getDataByString(inputIParamsString);
        }
    }
    else {
        if (lodash_1.isArray(structures[fieldKey])) {
            var fieldParent = fieldKey;
            for (var _i = 0, _c = structures[fieldKey]; _i < _c.length; _i++) {
                var item = _c[_i];
                if (!lodash_1.isArray(item)) {
                    var inputObject = {
                        item: item,
                        dataGeneral: dataGeneral,
                        keyTranslate: keyTranslate,
                        fieldParent: fieldParent,
                    };
                    datas.push(exports.getDataByObject(inputObject));
                }
            }
        }
    }
    if (!lodash_1.isEmpty(datas)) {
        return datas;
    }
    return data;
};
exports.getDataByString = function (input) {
    var fieldKey = input.fieldKey, dataGeneral = input.dataGeneral, keyTranslate = input.keyTranslate;
    return {
        level: "0",
        keyTranslate: keyTranslate,
        data: {
            fieldKey: fieldKey,
            fieldValue: dataGeneral["" + fieldKey]["" + constant.KEY_FIELD_VALUE],
            fieldError: dataGeneral["" + fieldKey]["" + constant.KEY_FIELD_ERROR],
            fieldAutoRender: dataGeneral["" + fieldKey]["" + constant.KEY_FIELD_AUTO_RENDER],
            fieldType: dataGeneral["" + fieldKey]["" + constant.KEY_FIELD_TYPE],
            fieldListCBBorCKL: dataGeneral["" + fieldKey]["" + constant.KEY_FIELD_VALUES_LIST],
            fieldLabelForTranslate: keyTranslate + "." + fieldKey,
            fieldAutoFocus: dataGeneral["" + fieldKey]["" + constant.KEY_FIELD_AUTO_FOCUS],
            fieldRules: dataGeneral["" + fieldKey]["" + constant.KEY_FIELD_RULES],
            fieldMaxLength: dataGeneral["" + fieldKey]["" + constant.KEY_FIELD_MAX_LENGTH],
            fieldCompare: dataGeneral["" + fieldKey]["" + constant.KEY_FIELD_COMPARE],
            tabCronTrigger: dataGeneral["" + fieldKey]["" + constant.KEY_FIELD_LIST_CRON_TRIGGER],
            viewCronValue: dataGeneral["" + fieldKey]["" + constant.KEY_FIELD_VIEW_CRON_VALUE],
        }
    };
};
exports.getDataByObject = function (input) {
    var item = input.item, dataGeneral = input.dataGeneral, keyTranslate = input.keyTranslate, fieldParent = input.fieldParent;
    var data = [];
    var datas = {};
    Object.keys(item).map(function (fieldKey) {
        if (!lodash_1.isArray(item[fieldKey]) && typeof item[fieldKey] === "string") {
            var itemData = {
                fieldKey: fieldKey,
                fieldValue: dataGeneral["" + fieldParent]["" + fieldKey]["" + constant.KEY_FIELD_VALUE],
                fieldError: dataGeneral["" + fieldParent]["" + fieldKey]["" + constant.KEY_FIELD_ERROR],
                fieldAutoRender: dataGeneral["" + fieldParent]["" + fieldKey]["" + constant.KEY_FIELD_AUTO_RENDER],
                fieldType: dataGeneral["" + fieldParent]["" + fieldKey]["" + constant.KEY_FIELD_TYPE],
                fieldListCBBorCKL: dataGeneral["" + fieldParent]["" + fieldKey]["" + constant.KEY_FIELD_VALUES_LIST],
                fieldLabelForTranslate: keyTranslate + "." + fieldKey,
                fieldAutoFocus: dataGeneral["" + fieldParent]["" + fieldKey]["" + constant.KEY_FIELD_AUTO_FOCUS],
                fieldRules: dataGeneral["" + fieldParent]["" + fieldKey]["" + constant.KEY_FIELD_RULES],
                fieldMaxLength: dataGeneral["" + fieldParent]["" + fieldKey]["" + constant.KEY_FIELD_MAX_LENGTH],
                fieldCompare: dataGeneral["" + fieldParent]["" + fieldKey]["" + constant.KEY_FIELD_COMPARE],
                tabCronTrigger: dataGeneral["" + fieldParent]["" + fieldKey]["" + constant.KEY_FIELD_LIST_CRON_TRIGGER],
                viewCronValue: dataGeneral["" + fieldParent]["" + fieldKey]["" + constant.KEY_FIELD_VIEW_CRON_VALUE],
            };
            data.push(itemData);
        }
        else {
            if (lodash_1.isArray(item[fieldKey])) {
                var inputArray = {
                    items: item[fieldKey],
                    dataGeneral: dataGeneral,
                    keyTranslate: keyTranslate,
                    fieldParent: fieldParent,
                    fieldParent2: fieldKey,
                };
                datas = exports.getDataByArray(inputArray);
            }
            else {
                Object.keys(item[fieldKey]).map(function (fieldKey2) {
                    var itemData = {
                        fieldKey: fieldKey2,
                        fieldValue: dataGeneral["" + fieldParent]["" + fieldKey]["" + fieldKey2]["" + constant.KEY_FIELD_VALUE],
                        fieldError: dataGeneral["" + fieldParent]["" + fieldKey]["" + fieldKey2]["" + constant.KEY_FIELD_ERROR],
                        fieldAutoRender: dataGeneral["" + fieldParent]["" + fieldKey]["" + fieldKey2]["" + constant.KEY_FIELD_AUTO_RENDER],
                        fieldType: dataGeneral["" + fieldParent]["" + fieldKey]["" + fieldKey2]["" + constant.KEY_FIELD_TYPE],
                        fieldListCBBorCKL: dataGeneral["" + fieldParent]["" + fieldKey]["" + fieldKey2]["" + constant.KEY_FIELD_VALUES_LIST],
                        fieldLabelForTranslate: keyTranslate + "." + fieldKey2,
                        fieldAutoFocus: dataGeneral["" + fieldParent]["" + fieldKey]["" + fieldKey2]["" + constant.KEY_FIELD_AUTO_FOCUS],
                        fieldRules: dataGeneral["" + fieldParent]["" + fieldKey]["" + fieldKey2]["" + constant.KEY_FIELD_RULES],
                        fieldMaxLength: dataGeneral["" + fieldParent]["" + fieldKey]["" + fieldKey2]["" + constant.KEY_FIELD_MAX_LENGTH],
                        fieldCompare: dataGeneral["" + fieldParent]["" + fieldKey]["" + fieldKey2]["" + constant.KEY_FIELD_COMPARE],
                        tabCronTrigger: dataGeneral["" + fieldParent]["" + fieldKey]["" + fieldKey2]["" + constant.KEY_FIELD_LIST_CRON_TRIGGER],
                        viewCronValue: dataGeneral["" + fieldParent]["" + fieldKey]["" + fieldKey2]["" + constant.KEY_FIELD_VIEW_CRON_VALUE],
                        objectIndex: null
                    };
                    data.push(itemData);
                });
                datas = {
                    level: "2",
                    fieldParent: fieldParent,
                    fieldParent2: fieldKey,
                    keyTranslate: keyTranslate,
                    data: data
                };
            }
        }
        return null;
    });
    if (!lodash_1.isEmpty(data) && lodash_1.isEmpty(datas)) {
        return {
            level: "1",
            fieldParent: fieldParent,
            keyTranslate: keyTranslate,
            data: data
        };
    }
    return datas;
};
exports.getDataByArray = function (input) {
    var items = input.items, dataGeneral = input.dataGeneral, keyTranslate = input.keyTranslate, fieldParent = input.fieldParent, fieldParent2 = input.fieldParent2;
    var datas = [];
    var _loop_1 = function (indexItem) {
        var item = items[0][indexItem];
        if (!lodash_1.isArray(item)) {
            var data_1 = [];
            Object.keys(item).map(function (fieldKey) {
                var itemData = {
                    fieldKey: fieldKey,
                    fieldValue: dataGeneral["" + fieldParent]["" + fieldParent2]["" + indexItem]["" + fieldKey]["" + constant.KEY_FIELD_VALUE],
                    fieldError: dataGeneral["" + fieldParent]["" + fieldParent2]["" + indexItem]["" + fieldKey]["" + constant.KEY_FIELD_ERROR],
                    fieldAutoRender: dataGeneral["" + fieldParent]["" + fieldParent2]["" + indexItem]["" + fieldKey]["" + constant.KEY_FIELD_AUTO_RENDER],
                    fieldType: dataGeneral["" + fieldParent]["" + fieldParent2]["" + indexItem]["" + fieldKey]["" + constant.KEY_FIELD_TYPE],
                    fieldListCBBorCKL: dataGeneral["" + fieldParent]["" + fieldParent2]["" + indexItem]["" + fieldKey]["" + constant.KEY_FIELD_VALUES_LIST],
                    fieldAutoFocus: dataGeneral["" + fieldParent]["" + fieldParent2]["" + indexItem]["" + fieldKey]["" + constant.KEY_FIELD_AUTO_FOCUS],
                    fieldLabelForTranslate: keyTranslate + "." + fieldKey,
                    fieldRules: dataGeneral["" + fieldParent]["" + fieldParent2]["" + indexItem]["" + fieldKey]["" + constant.KEY_FIELD_RULES],
                    fieldMaxLength: dataGeneral["" + fieldParent]["" + fieldParent2]["" + indexItem]["" + fieldKey]["" + constant.KEY_FIELD_MAX_LENGTH],
                    fieldCompare: dataGeneral["" + fieldParent]["" + fieldParent2]["" + indexItem]["" + fieldKey]["" + constant.KEY_FIELD_COMPARE],
                    tabCronTrigger: dataGeneral["" + fieldParent]["" + fieldParent2]["" + indexItem]["" + fieldKey]["" + constant.KEY_FIELD_LIST_CRON_TRIGGER],
                    viewCronValue: dataGeneral["" + fieldParent]["" + fieldParent2]["" + indexItem]["" + fieldKey]["" + constant.KEY_FIELD_VIEW_CRON_VALUE],
                    objectIndex: indexItem
                };
                data_1.push(itemData);
            });
            if (!lodash_1.isEmpty(data_1)) {
                datas.push(data_1);
            }
        }
    };
    for (var indexItem = 0; indexItem < items[0].length; indexItem++) {
        _loop_1(indexItem);
    }
    return {
        level: "3",
        fieldParent: fieldParent,
        fieldParent2: fieldParent2,
        keyTranslate: keyTranslate,
        data: datas
    };
};
