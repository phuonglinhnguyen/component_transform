"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var coreui_1 = require("@dgtx/coreui");
var ConstantRender = require("./action");
exports.getDataByType = function (input, dataItem, dataItemParent) {
    var value = input.value, level = input.level, fieldKey = input.fieldKey, fieldType = input.fieldType, fieldParent = input.fieldParent, fieldParent2 = input.fieldParent2, objectIndex = input.objectIndex;
    var datas = coreui_1.getDataObject(fieldParent + "." + fieldParent2, dataItem);
    if (level === '0') {
        dataItem["" + fieldKey]["" + ConstantRender.KEY_FIELD_VALUE] = value;
        if (fieldType === ConstantRender.KEY_FIELD_TYPE_CHECKBOX_LIST) {
            var ids_1 = [];
            value.filter(function (item) { return ids_1.push(item.id); });
            dataItemParent["" + fieldKey] = ids_1;
        }
        else {
            dataItemParent["" + fieldKey] = value;
        }
    }
    else if (level === '1') {
        dataItem["" + fieldParent]["" + fieldKey]["" + ConstantRender.KEY_FIELD_VALUE] = value;
        dataItemParent["" + fieldParent]["" + fieldKey] = value;
    }
    else if (level === '2') {
        if (!lodash_1.isArray(datas)) {
            dataItem["" + fieldParent]["" + fieldParent2]["" + fieldKey]["" + ConstantRender.KEY_FIELD_VALUE] = value;
            dataItemParent["" + fieldParent]["" + fieldParent2]["" + fieldKey] = value;
        }
    }
    else if (level === '3') {
        if (lodash_1.isArray(datas)) {
            dataItem["" + fieldParent]["" + fieldParent2]["" + objectIndex]["" + fieldKey]["" + ConstantRender.KEY_FIELD_VALUE] = value;
            dataItemParent["" + fieldParent]["" + fieldParent2]["" + objectIndex]["" + fieldKey] = value;
        }
    }
    return { dataModify: dataItem, dataItemParentModify: dataItemParent };
};
exports.convertDataforStructure = function (input) {
    var data = input.data, dataGeneral = input.dataGeneral, structure = input.structure;
    Object.keys(data).map(function (fieldKey) {
        if (!dataGeneral["" + fieldKey]) {
            return null;
        }
        var itemParent = data["" + fieldKey];
        if (typeof itemParent === "string" || typeof itemParent === "number" || typeof itemParent === "boolean") {
            dataGeneral["" + fieldKey][ConstantRender.KEY_FIELD_VALUE] = itemParent;
        }
        else if (lodash_1.isArray(itemParent)) {
            if (dataGeneral["" + fieldKey][ConstantRender.KEY_FIELD_TYPE] === ConstantRender.KEY_FIELD_TYPE_CHECKBOX_LIST) {
                var datas_1 = [];
                input["" + fieldKey].map(function (item) {
                    if (itemParent.filter(function (i) { return i === item.id; })[0]) {
                        datas_1.push(item);
                    }
                });
                dataGeneral["" + fieldKey][ConstantRender.KEY_FIELD_VALUE] = datas_1;
                dataGeneral["" + fieldKey][ConstantRender.KEY_FIELD_VALUES_LIST] = input["" + fieldKey];
            }
        }
        else if (typeof itemParent === "object") {
            Object.keys(itemParent).map(function (fieldKeyObject) {
                var itemObject = itemParent["" + fieldKeyObject];
                if (typeof itemObject === "string" || typeof itemObject === "number" || typeof itemObject === "boolean") {
                    dataGeneral["" + fieldKey]["" + fieldKeyObject][ConstantRender.KEY_FIELD_VALUE] = itemParent["" + fieldKeyObject];
                }
                else if (lodash_1.isArray(itemObject)) {
                    var lengthIO = itemObject.length;
                    var lengthDG = dataGeneral["" + fieldKey]["" + fieldKeyObject].length;
                    var indexData = 0;
                    for (var index = 0; index < structure["" + fieldKey].length; index++) {
                        var items = structure["" + fieldKey][index];
                        if (items["" + fieldKeyObject]) {
                            indexData = index;
                            break;
                        }
                    }
                    if (lengthIO < lengthDG) {
                        var i = lengthDG - lengthIO;
                        for (var index = lengthDG; index >= i; index--) {
                            dataGeneral["" + fieldKey]["" + fieldKeyObject].splice(index, 1);
                            structure["" + fieldKey]["" + indexData]["" + fieldKeyObject].splice(index, 1);
                        }
                    }
                    else if (lengthIO > lengthDG) {
                        var i = lengthIO - lengthDG;
                        var itemDG = lodash_1.cloneDeep(dataGeneral["" + fieldKey]["" + fieldKeyObject][0]);
                        var itemSt = lodash_1.cloneDeep(structure["" + fieldKey]["" + indexData]["" + fieldKeyObject][0][0]);
                        for (var index = 0; index < i; index++) {
                            dataGeneral["" + fieldKey]["" + fieldKeyObject].push(itemDG);
                            structure["" + fieldKey]["" + indexData]["" + fieldKeyObject][0].push(itemSt);
                        }
                    }
                    itemObject.map(function (items, indexItem) {
                        Object.keys(items).map(function (fieldKeyItem) {
                            dataGeneral["" + fieldKey]["" + fieldKeyObject]["" + indexItem]["" + fieldKeyItem]["" + ConstantRender.KEY_FIELD_VALUE] = items["" + fieldKeyItem];
                        });
                    });
                }
            });
        }
        return null;
    });
    return { dataGeneralU: dataGeneral, structureU: structure };
};
