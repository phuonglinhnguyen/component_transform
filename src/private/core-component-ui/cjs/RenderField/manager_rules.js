"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_i18n_1 = require("react-redux-i18n");
var lodash_1 = require("lodash");
var coreui_1 = require("@dgtx/coreui");
var ConstantRender = require("./action");
var FunctionRender = require("./render_structures");
exports.checkRulesAllField = function (dataItem, structures, keyTranslate) {
    var check = false;
    Object.keys(structures).map(function (fieldKey) {
        var _a;
        var input = {
            fieldKey: fieldKey,
            structures: structures,
            dataGeneral: dataItem,
            keyTranslate: keyTranslate,
        };
        var outPut = FunctionRender.getItemByStructure(input);
        if (lodash_1.isArray(outPut)) {
            return (outPut.map(function (item) {
                return (item.data.map(function (item2) {
                    var _a;
                    if (item["level"] === "3") {
                        return (item2.map(function (item3) {
                            var _a;
                            var input = (_a = {},
                                _a[ConstantRender.KEY_FIELD_RULES] = item3.fieldRules,
                                _a[ConstantRender.KEY_FIELD_MAX_LENGTH] = item3.fieldMaxLength,
                                _a[ConstantRender.KEY_FIELD_COMPARE] = item3.fieldCompare,
                                _a[ConstantRender.KEY_FIELD_VALUE] = item3.fieldValue,
                                _a.fieldKey = item3.fieldKey,
                                _a.fieldParent = item.fieldParent,
                                _a.fieldParent2 = item.fieldParent2,
                                _a.objectIndex = item3.objectIndex,
                                _a[ConstantRender.KEY_FIELD_TYPE] = item3.fieldType,
                                _a.level = item.level,
                                _a.keyTranslate = item.keyTranslate,
                                _a);
                            var itemChecked = exports.checkRulesOneField(input, dataItem);
                            if (!lodash_1.isEmpty(itemChecked["" + ConstantRender.KEY_FIELD_ERROR])) {
                                dataItem = exports.modifyItemThreeLevel(input, dataItem, itemChecked);
                                check = true;
                            }
                            // console.log('=============== level 3 ============');
                        }));
                    }
                    else {
                        var input_1 = (_a = {},
                            _a[ConstantRender.KEY_FIELD_RULES] = item2.fieldRules,
                            _a[ConstantRender.KEY_FIELD_MAX_LENGTH] = item2.fieldMaxLength,
                            _a[ConstantRender.KEY_FIELD_COMPARE] = item2.fieldCompare,
                            _a[ConstantRender.KEY_FIELD_VALUE] = item2.fieldValue,
                            _a.keyTranslate = item.keyTranslate,
                            _a.fieldParent = item.fieldParent,
                            _a.fieldParent2 = item.fieldParent2,
                            _a.objectIndex = item2.objectIndex,
                            _a[ConstantRender.KEY_FIELD_TYPE] = item2.fieldType,
                            _a.level = item.level,
                            _a.fieldKey = item2.fieldKey,
                            _a);
                        var itemChecked = exports.checkRulesOneField(input_1, dataItem);
                        if (!lodash_1.isEmpty(itemChecked["" + ConstantRender.KEY_FIELD_ERROR])) {
                            dataItem = exports.modifyItemThreeLevel(input_1, dataItem, itemChecked);
                            check = true;
                        }
                    }
                }));
            }));
        }
        else {
            var inputOneField = (_a = {},
                _a[ConstantRender.KEY_FIELD_RULES] = outPut.data.fieldRules,
                _a[ConstantRender.KEY_FIELD_MAX_LENGTH] = outPut.data.fieldMaxLength,
                _a[ConstantRender.KEY_FIELD_COMPARE] = outPut.data.fieldCompare,
                _a[ConstantRender.KEY_FIELD_VALUE] = outPut.data.fieldValue,
                _a.fieldKey = outPut.data.fieldKey,
                _a.keyTranslate = outPut.keyTranslate,
                _a.objectIndex = outPut.data.objectIndex,
                _a[ConstantRender.KEY_FIELD_TYPE] = outPut.data.fieldType,
                _a.level = outPut.level,
                _a);
            // console.log('=============== level 0 ============');
            var itemChecked = exports.checkRulesOneField(inputOneField, dataItem);
            if (!lodash_1.isEmpty(itemChecked["" + ConstantRender.KEY_FIELD_ERROR])) {
                dataItem = exports.modifyItemThreeLevel(input, dataItem, itemChecked);
                check = true;
            }
        }
        return null;
    });
    return { data: dataItem, check: check };
};
exports.getItemThreeLevel = function (input, dataItem) {
    var fieldKey = input.fieldKey, fieldParent = input.fieldParent, fieldParent2 = input.fieldParent2, objectIndex = input.objectIndex;
    var value1 = coreui_1.getDataObject([fieldKey], dataItem);
    if (value1) {
        return { data: value1, index: 0 };
    }
    var value2 = coreui_1.getDataObject([fieldParent, fieldKey], dataItem);
    if (value2) {
        return { data: value2, index: 1 };
    }
    var value3 = coreui_1.getDataObject([fieldParent, fieldParent2, fieldKey], dataItem);
    if (value3) {
        return { data: value3, index: 2 };
    }
    return { data: coreui_1.getDataObject([fieldParent, fieldParent2, objectIndex, fieldKey], dataItem), index: 3 };
};
exports.modifyItemThreeLevel = function (input, dataItem, item) {
    var fieldKey = input.fieldKey, fieldParent = input.fieldParent, fieldParent2 = input.fieldParent2, objectIndex = input.objectIndex;
    var index = exports.getItemThreeLevel(input, dataItem).index;
    delete item.fieldKey;
    delete item.fieldParent;
    delete item.fieldParent2;
    delete item.keyTranslate;
    delete item.objectIndex;
    var errorItem = item["" + ConstantRender.KEY_FIELD_ERROR];
    switch (index) {
        case 0:
            dataItem["" + fieldKey]["" + ConstantRender.KEY_FIELD_ERROR] = errorItem;
            break;
        case 1:
            dataItem["" + fieldParent]["" + fieldKey]["" + ConstantRender.KEY_FIELD_ERROR] = errorItem;
            break;
        case 2:
            dataItem["" + fieldParent]["" + fieldParent2]["" + fieldKey]["" + ConstantRender.KEY_FIELD_ERROR] = errorItem;
            break;
        case 3:
            dataItem["" + fieldParent]["" + fieldParent2]["" + objectIndex]["" + fieldKey]["" + ConstantRender.KEY_FIELD_ERROR] = errorItem;
            break;
        default:
            break;
    }
    return dataItem;
};
exports.checkRulesOneField = function (input, dataItem) {
    var type = coreui_1.getDataObject("" + ConstantRender.KEY_FIELD_TYPE, input);
    var rules = coreui_1.getDataObject("" + ConstantRender.KEY_FIELD_RULES, input) || [];
    var value = coreui_1.getDataObject("" + ConstantRender.KEY_FIELD_VALUE, input) || "";
    var fieldCompare = coreui_1.getDataObject("" + ConstantRender.KEY_FIELD_COMPARE, input) || "";
    var maxLength = coreui_1.getDataObject("" + ConstantRender.KEY_FIELD_MAX_LENGTH, input) || 0;
    var valueCompare = coreui_1.getDataObject("" + fieldCompare, dataItem) || "";
    var data = dataItem;
    switch (type) {
        case ConstantRender.KEY_FIELD_TYPE_TEXT:
        case ConstantRender.KEY_FIELD_TYPE_NUMBER_INT:
        case ConstantRender.KEY_FIELD_TYPE_NUMBER_FLOAT:
        case ConstantRender.KEY_FIELD_TYPE_PASSWORD:
        case ConstantRender.KEY_FIELD_TYPE_CHECKBOX_LIST:
        case ConstantRender.KEY_FIELD_TYPE_COMBOBOX:
        case ConstantRender.KEY_FIELD_TYPE_CRON_TRIGGER:
            var inputNext = {
                rules: rules,
                value: value,
                valueCompare: valueCompare,
                maxLength: maxLength
            };
            var checked = checkRules(inputNext);
            delete input.dataItem;
            data = getValueError(checked, input);
            break;
        default:
            break;
    }
    return data;
};
var getValueError = function (checked, item) {
    if (checked.check) {
        item[ConstantRender.KEY_FIELD_ERROR] = "";
    }
    else {
        item[ConstantRender.KEY_FIELD_ERROR] = react_redux_i18n_1.I18n.t("rule_field." + checked.type);
    }
    return item;
};
var checkRules = function (input) {
    var rules = input.rules, value = input.value, valueCompare = input.valueCompare, maxLength = input.maxLength;
    var data = {
        check: true,
        type: ''
    };
    if (lodash_1.isArray(rules)) {
        loopBreak: for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var item = rules_1[_i];
            if (item) {
                switch (item) {
                    case ConstantRender.KEY_FIELD_RULE_EMPTY: {
                        data.check = validateEmpty(value);
                        data.type = item;
                        break;
                    }
                    case ConstantRender.KEY_FIELD_RULE_NUMBER: {
                        var validateNumberRs = validateNumber(value);
                        data.check = validateNumberRs;
                        data.type = item;
                        break;
                    }
                    case ConstantRender.KEY_FIELD_RULE_EMAIL: {
                        data.check = validateEmail(value);
                        data.type = item;
                        break;
                    }
                    case ConstantRender.KEY_FIELD_RULE_PHONE_NUMBER: {
                        data.check = validatePhoneNumber(value);
                        data.type = item;
                        break;
                    }
                    case ConstantRender.KEY_FIELD_RULE_COMPARE: {
                        data.check = lodash_1.isEqual(value, valueCompare);
                        data.type = item;
                        break;
                    }
                    case ConstantRender.KEY_FIELD_RULE_SIZE_LENGTH: {
                        data.check = validateSizeLength(value, maxLength);
                        data.type = item;
                        break;
                    }
                    case ConstantRender.KEY_FIELD_RULE_CHARACTERS: {
                        data.check = validateCharacters(value);
                        data.type = item;
                        break;
                    }
                    case ConstantRender.KEY_FIELD_RULE_CHARACTERS_UTF8: {
                        data.check = validateCharactersUTF8(value);
                        data.type = item;
                        break;
                    }
                    case ConstantRender.KEY_FIELD_RULE_18_PLUS: {
                        data.check = validate18Plus(value);
                        data.type = item;
                        break;
                    }
                    default:
                        data.check = true;
                        data.type = "";
                }
            }
            if (data.check === false) {
                break loopBreak;
            }
        }
    }
    return data;
};
function validateEmpty(value) {
    if (lodash_1.isArray(value)) {
        return value.length > 0 ? true : false;
    }
    if (typeof value === 'boolean') {
        return true;
    }
    if (typeof value === 'string') {
        return ConstantRender.REGEX_EMPTY.test(value.trim());
    }
    return true;
}
function validateNumber(value) {
    try {
        parseInt(value, 10);
        return true;
    }
    catch (error) {
        return false;
    }
}
function validateSizeLength(value, length) {
    var v = (value || '').trim();
    if (v.length <= length) {
        return true;
    }
    return false;
}
function validateEmail(value) {
    var v = (value || '').trim();
    return ConstantRender.REGEX_EMAIL.test(v);
}
function validatePhoneNumber(value) {
    var v = (value || '').trim();
    return ConstantRender.REGEX_PHONE.test(v);
}
function validateCharacters(value) {
    var v = (value || '').trim();
    return ConstantRender.REGEX_CHARACTERS.test(v);
}
function validateCharactersUTF8(value) {
    var v = (value || '').trim();
    return ConstantRender.REGEX_CHARACTERS_UTF8.test(v);
}
function validate18Plus(value) {
    var v = (value || '').trim();
    if (v.split("-")) {
        var toDay = getToday().split("-")[0];
        var valueIndex = v.split("-")[0];
        try {
            if ((parseInt(toDay, 10) - parseInt(valueIndex, 10)) >= 15) {
                return true;
            }
        }
        catch (error) {
            return false;
        }
    }
    return false;
}
var getToday = function () {
    var today = new Date();
    // let today = new Date().format('m-d-Y h:i:s');
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
};
