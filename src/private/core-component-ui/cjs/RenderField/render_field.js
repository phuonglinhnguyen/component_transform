"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var contants = require("./action");
var coreui_1 = require("@dgtx/coreui");
var keyCode_1 = require("../utils/keyCode");
var classnames_1 = require("classnames");
var react_redux_i18n_1 = require("react-redux-i18n");
var TextField_1 = require("@material-ui/core/TextField");
var styles_1 = require("@material-ui/core/styles");
var lodash_1 = require("lodash");
var InputLabel_1 = require("@material-ui/core/InputLabel");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var FormHelperText_1 = require("@material-ui/core/FormHelperText");
var FormControl_1 = require("@material-ui/core/FormControl");
var Select_1 = require("@material-ui/core/Select");
var Switch_1 = require("@material-ui/core/Switch");
var FormControlLabel_1 = require("@material-ui/core/FormControlLabel");
var Checkbox_1 = require("@material-ui/core/Checkbox");
var cron_trigger_1 = require("./cron_trigger");
var lodash_2 = require("lodash");
var Chip_1 = require("@material-ui/core/Chip");
var Typography_1 = require("@material-ui/core/Typography");
var InputBase_1 = require("@material-ui/core/InputBase");
var styles = function (theme) {
    return {
        margin: {
            margin: theme.spacing.unit,
        },
        booleanField: {
            margin: theme.spacing.unit + "px " + theme.spacing.unit + "px " + theme.spacing.unit + "px 0px",
            maxWidth: "calc(100% - " + theme.spacing.unit * 2 + "px)",
            width: "calc(100%- " + theme.spacing.unit * 2 + "px)",
            maxHeight: "calc(100% - " + theme.spacing.unit * 2 + "px)",
        },
        textField: {
            maxWidth: "calc(100% - " + theme.spacing.unit * 2 + "px)",
            width: "calc(100vw - " + theme.spacing.unit * 2 + "px)",
            maxHeight: "calc(100% - " + theme.spacing.unit * 2 + "px)",
        },
        formControl: {
            marginTop: theme.spacing.unit * 2.5,
            marginLeft: theme.spacing.unit,
            maxWidth: "calc(100% - " + theme.spacing.unit * 2 + "px)",
            width: "calc(100vw - " + theme.spacing.unit * 2 + "px)",
            maxHeight: "calc(100% - " + theme.spacing.unit * 2.5 + "px)",
            height: "calc(100% - " + theme.spacing.unit * 2.5 + "px)",
        },
        checkBoxList: {
            display: "flex",
        },
        checkListItem: {
            display: "flex",
            lineHeight: "48px",
            maxHeight: "48px"
        },
        checkboxListError: {
            color: theme.palette.error["main"],
            position: "absolute",
            bottom: "3px",
            left: "16px",
            fontWeight: '300',
        },
        checkboxListRoot: {
            height: "104px",
            boxShadow: theme.overrides.shadowsHover_1,
            margin: theme.spacing.unit,
            maxWidth: "calc(100% - " + theme.spacing.unit * 2 + "px)",
            width: "calc(100vw - " + theme.spacing.unit * 2 + "px)",
            maxHeight: "calc(100% - " + theme.spacing.unit * 2 + "px)",
            position: "relative",
        },
        checkboxListLabel: {
            padding: theme.spacing.unit
        },
        checkListItemAll: {
            paddingLeft: theme.spacing.unit * 2
        },
    };
};
var RenderField = /** @class */ (function (_super) {
    tslib_1.__extends(RenderField, _super);
    function RenderField(props) {
        var _this = _super.call(this, props) || this;
        _this.componentWillMount = function () {
            var inputCurrent = coreui_1.getDataObject("input", _this.state);
            if (lodash_2.isEmpty(inputCurrent)) {
                _this.setState({ input: _this.props.input });
            }
        };
        _this.componentWillReceiveProps = function (nextProps) {
            var input = nextProps.input;
            var inputCurrent = coreui_1.getDataObject("input", _this.state);
            if (!lodash_2.isEmpty(input) && !lodash_2.isEqual(input, inputCurrent)) {
                _this.setState({ input: input });
            }
        };
        _this.handleChange = function (fieldKey, level, fieldType, fieldParent, fieldParent2, item, objectIndex) { return function (event) {
            var inputNew = tslib_1.__assign({}, _this.state);
            var value = coreui_1.getDataObject("target.value", event);
            switch (fieldType) {
                case contants.KEY_FIELD_TYPE_NUMBER_INT: {
                    try {
                        inputNew["input"].fieldValue = parseInt(value, 10);
                    }
                    catch (error) {
                        console.log(error);
                    }
                    break;
                }
                case contants.KEY_FIELD_TYPE_NUMBER_FLOAT: {
                    try {
                        inputNew["input"].fieldValue = parseFloat(value);
                    }
                    catch (error) {
                        console.log(error);
                    }
                    break;
                }
                case contants.KEY_FIELD_TYPE_COMBOBOX:
                case contants.KEY_FIELD_TYPE_TEXT:
                    inputNew["input"].fieldValue = value;
                    break;
                case contants.KEY_FIELD_TYPE_BOOLEAN:
                    inputNew["input"].fieldValue = value === "true" ? false : true;
                    break;
                case contants.KEY_FIELD_TYPE_CHECKBOX_LIST: {
                    if (item === 'all') {
                        if (inputNew["input"].fieldValue.length === inputNew["input"].fieldListCBBorCKL.length) {
                            inputNew["input"].fieldValue = [];
                        }
                        else {
                            inputNew["input"].fieldValue = inputNew["input"].fieldListCBBorCKL;
                        }
                    }
                    else {
                        var ids = [];
                        if (lodash_2.isArray(inputNew["input"].fieldValue)) {
                            if (inputNew["input"].fieldValue.filter(function (i) { return i.id === item.id; })[0]) {
                                ids = inputNew["input"].fieldValue.filter(function (i) { return i.id !== item.id; });
                                inputNew["input"].fieldValue = ids;
                            }
                            else {
                                inputNew["input"].fieldValue.push(item);
                            }
                        }
                    }
                    break;
                }
                case contants.KEY_FIELD_TYPE_CRON_TRIGGER:
                    break;
                default:
                    break;
            }
            _this.setState({ input: inputNew["input"] });
            var input = {
                value: inputNew["input"].fieldValue,
                level: level,
                fieldKey: fieldKey,
                fieldType: fieldType,
                fieldParent: fieldParent,
                fieldParent2: fieldParent2,
                objectIndex: objectIndex,
            };
            _this.handleChangeDebounce(input);
        }; };
        _this.handleChangeDebounce = function (input) {
            var _a = _this.props.onChange, onChange = _a === void 0 ? function () { return null; } : _a;
            onChange(input);
        };
        _this.handleKeyDown = function (fieldKey, level, fieldType, fieldParent, fieldParent2, item, objectIndex) { return function (event) {
            try {
                var value = keyCode_1.keycode(event).toLowerCase();
                if (lodash_2.isEmpty(value)) {
                    var input = {
                        key_code: value,
                        level: level,
                        fieldType: fieldType,
                        fieldKey: fieldKey,
                        fieldParent: fieldParent,
                        fieldParent2: fieldParent2
                    };
                    _this.handleKeyDownDebounce(input);
                }
            }
            catch (error) {
                console.log(error);
            }
        }; };
        _this.handleKeyDownDebounce = function (input) {
            var _a = _this.props.onKeyDown, onKeyDown = _a === void 0 ? function () { return null; } : _a;
            onKeyDown(input);
        };
        _this.handleBlur = function (fieldKey, level, fieldType, fieldParent, fieldParent2, item, objectIndex) { return function (event) {
            var value = coreui_1.getDataObject("target.value", event);
            if (lodash_2.isEmpty(value)) {
                var input = {
                    value: value,
                    level: level,
                    fieldKey: fieldKey,
                    fieldType: fieldType,
                    fieldParent: fieldParent,
                    fieldParent2: fieldParent2
                };
                _this.handleBlurDebounce(input);
            }
        }; };
        _this.handleBlurDebounce = function (input) {
            var _a = _this.props.onBlur, onBlur = _a === void 0 ? function () { return null; } : _a;
            onBlur(input);
        };
        _this.handleChangeCronTrigger = function (cronValue) {
            var inputNew = tslib_1.__assign({}, _this.state);
            inputNew["input"].fieldValue = cronValue;
            _this.setState({ input: inputNew["input"] });
            var level = coreui_1.getDataObject("input.level", _this.state) || '';
            var fieldKey = coreui_1.getDataObject("input.fieldKey", _this.state) || '';
            var fieldParent = coreui_1.getDataObject("input.fieldParent", _this.state) || '';
            var fieldParent2 = coreui_1.getDataObject("input.fieldParent2", _this.state) || '';
            var fieldType = coreui_1.getDataObject("input.fieldType", _this.state) || '';
            var objectIndex = coreui_1.getDataObject("input.objectIndex", _this.state);
            var inputChange = {
                value: inputNew["input"].fieldValue,
                level: level,
                fieldKey: fieldKey,
                fieldType: fieldType,
                fieldParent: fieldParent,
                fieldParent2: fieldParent2,
                objectIndex: objectIndex
            };
            _this.handleChangeDebounce(inputChange);
        };
        _this.handleClickItemCheckBoxList = function (item, open, field) { return function () {
            var _a = _this.props.onClickItemCheckBoxList, onClickItemCheckBoxList = _a === void 0 ? function () { return null; } : _a;
            onClickItemCheckBoxList(item, open, field);
        }; };
        _this.handleChangeDebounce = lodash_1.debounce(_this.handleChangeDebounce, 150);
        _this.handleKeyDownDebounce = lodash_1.debounce(_this.handleKeyDownDebounce, 150);
        _this.state = {
            input: null,
        };
        return _this;
    }
    RenderField.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, styleCustom = _a.styleCustom;
        var input = coreui_1.getDataObject("input", this.state);
        if (lodash_2.isEmpty(input)) {
            return "";
        }
        else {
            var fieldAutoRender = coreui_1.getDataObject("input.fieldAutoRender", this.state) || false;
            if (!fieldAutoRender) {
                return "";
            }
            var fieldType = coreui_1.getDataObject("input.fieldType", this.state) || '';
            var fieldKey_1 = coreui_1.getDataObject("input.fieldKey", this.state) || '';
            var fieldValue = coreui_1.getDataObject("input.fieldValue", this.state);
            var fieldError = coreui_1.getDataObject("input.fieldError", this.state) || "";
            var fieldListCBBorCKL = coreui_1.getDataObject("input.fieldListCBBorCKL", this.state) || [];
            var fieldLabelForTranslate = coreui_1.getDataObject("input.fieldLabelForTranslate", this.state) || '';
            var fieldAutoFocus = coreui_1.getDataObject("input.fieldAutoFocus", this.state) || false;
            var fieldParent_1 = coreui_1.getDataObject("input.fieldParent", this.state) || '';
            var fieldParent2_1 = coreui_1.getDataObject("input.fieldParent2", this.state) || '';
            var level_1 = coreui_1.getDataObject("input.level", this.state) || '';
            var keyTranslate = coreui_1.getDataObject("input.keyTranslate", this.state) || '';
            var objectIndex_1 = coreui_1.getDataObject("input.objectIndex", this.state);
            var tabCronTrigger = coreui_1.getDataObject("input.tabCronTrigger", this.state) || '';
            var viewCronValue = coreui_1.getDataObject("input.viewCronValue", this.state) || '';
            var styleC = styleCustom;
            switch (fieldType) {
                case contants.KEY_FIELD_TYPE_TEXT: {
                    return (React.createElement(TextField_1.default, { id: fieldKey_1, className: classnames_1.default.apply(void 0, [classes.margin, classes.textField].concat(styleC)), label: React.createElement(react_redux_i18n_1.Translate, { value: fieldLabelForTranslate }), value: fieldValue, onChange: this.handleChange(fieldKey_1, level_1, contants.KEY_FIELD_TYPE_TEXT, fieldParent_1, fieldParent2_1, null, objectIndex_1), onKeyDown: this.handleKeyDown(fieldKey_1, level_1, contants.KEY_FIELD_TYPE_TEXT, fieldParent_1, fieldParent2_1, null, objectIndex_1), onBlur: this.handleBlur(fieldKey_1, level_1, contants.KEY_FIELD_TYPE_TEXT, fieldParent_1, fieldParent2_1, null, objectIndex_1), autoFocus: fieldAutoFocus, helperText: fieldError, error: (fieldError.length > 0 && true) || false, type: "text" }));
                }
                case contants.KEY_FIELD_TYPE_CHECKBOX_LIST: {
                    var ids_1 = [];
                    if (lodash_2.isArray(fieldValue)) {
                        ids_1 = fieldValue.map(function (item) { return item.id; });
                    }
                    return (React.createElement("div", { className: classes.checkboxListRoot },
                        React.createElement("div", { className: classes.checkboxListLabel },
                            React.createElement(Typography_1.default, { variant: "caption", gutterBottom: true },
                                React.createElement(react_redux_i18n_1.Translate, { value: fieldLabelForTranslate }))),
                        React.createElement("div", { className: classnames_1.default(classes.checkBoxList, styleC) },
                            React.createElement("div", { key: fieldKey_1 + " - CheckList - all", className: classes.checkListItem },
                                React.createElement("div", { className: classes.checkListItemAll },
                                    React.createElement(Chip_1.default, { onClick: this.handleChange(fieldKey_1, level_1, contants.KEY_FIELD_TYPE_CHECKBOX_LIST, fieldParent_1, fieldParent2_1, "all", objectIndex_1), label: React.createElement(react_redux_i18n_1.Translate, { value: keyTranslate + ".all" }), color: fieldListCBBorCKL.filter(function (item) { return !ids_1.includes(item.id); }).length === 0 ? "secondary" : "inherit" }))),
                            fieldListCBBorCKL.map(function (item, index) {
                                return (React.createElement("div", { key: fieldKey_1 + " - CheckList - " + index, className: classes.checkListItem },
                                    React.createElement("div", null,
                                        React.createElement(Checkbox_1.default, { checked: ids_1.includes(item.id), onChange: _this.handleChange(fieldKey_1, level_1, contants.KEY_FIELD_TYPE_CHECKBOX_LIST, fieldParent_1, fieldParent2_1, item, objectIndex_1), color: "secondary" })),
                                    React.createElement("div", null,
                                        React.createElement(Chip_1.default, { label: item.name, onClick: _this.handleClickItemCheckBoxList(item, true, _this.state), color: ids_1.includes(item.id) ? "secondary" : "inherit" }))));
                            })),
                        React.createElement("div", null,
                            React.createElement(Typography_1.default, { variant: "caption", gutterBottom: true, className: classes.checkboxListError }, fieldError))));
                }
                case contants.KEY_FIELD_TYPE_BOOLEAN: {
                    return (React.createElement(FormControlLabel_1.default, { className: classnames_1.default(classes.booleanField, styleC), control: React.createElement(Switch_1.default, { checked: fieldValue, onChange: this.handleChange(fieldKey_1, level_1, contants.KEY_FIELD_TYPE_BOOLEAN, fieldParent_1, fieldParent2_1, null, objectIndex_1), value: fieldValue, color: "secondary" }), label: React.createElement(react_redux_i18n_1.Translate, { value: fieldLabelForTranslate }) }));
                }
                case contants.KEY_FIELD_TYPE_COMBOBOX: {
                    return (React.createElement(FormControl_1.default, { className: classnames_1.default(classes.formControl, styleC), error: (fieldError.length > 0 && true) || false },
                        React.createElement(InputLabel_1.default, null, React.createElement(react_redux_i18n_1.Translate, { value: fieldLabelForTranslate })),
                        React.createElement(Select_1.default, { value: fieldValue, onChange: this.handleChange(fieldKey_1, level_1, contants.KEY_FIELD_TYPE_COMBOBOX, fieldParent_1, fieldParent2_1, null, objectIndex_1) }, fieldListCBBorCKL.map(function (item, index) {
                            return (React.createElement(MenuItem_1.default, { key: fieldKey_1 + "-SelectBox-" + index, value: item.id }, item.name));
                        })),
                        React.createElement(FormHelperText_1.default, { id: "component-error-text" }, fieldError)));
                }
                case contants.KEY_FIELD_TYPE_NUMBER_FLOAT:
                case contants.KEY_FIELD_TYPE_NUMBER_INT: {
                    return (React.createElement(TextField_1.default, { id: fieldKey_1, className: classnames_1.default(classes.margin, classes.textField, styleC), label: React.createElement(react_redux_i18n_1.Translate, { value: fieldLabelForTranslate }), value: fieldValue, onChange: this.handleChange(fieldKey_1, level_1, fieldType, fieldParent_1, fieldParent2_1, null, objectIndex_1), onKeyDown: this.handleKeyDown(fieldKey_1, level_1, fieldType, fieldParent_1, fieldParent2_1, null, objectIndex_1), onBlur: this.handleBlur(fieldKey_1, level_1, fieldType, fieldParent_1, fieldParent2_1, null, objectIndex_1), autoFocus: fieldAutoFocus, helperText: fieldError, error: (fieldError.length > 0 && true) || false, type: "number" }));
                }
                case contants.KEY_FIELD_TYPE_CRON_TRIGGER: {
                    return (React.createElement("div", { className: classnames_1.default(classes.margin, classes.textField, styleC) },
                        React.createElement("div", null,
                            React.createElement(Typography_1.default, { variant: "caption", gutterBottom: true },
                                React.createElement(react_redux_i18n_1.Translate, { value: fieldLabelForTranslate }))),
                        React.createElement(cron_trigger_1.CronTriggerQuartz, { cronValue: fieldValue, erroText: fieldError, onChange: this.handleChangeCronTrigger, className: styleC, viewCronValue: viewCronValue, tabs: tabCronTrigger })));
                }
                case contants.KEY_FIELD_TYPE_LABEL: {
                    return (React.createElement("div", { style: { display: "flex" } },
                        React.createElement("div", null,
                            React.createElement(InputBase_1.default, { className: classes.margin, defaultValue: react_redux_i18n_1.I18n.t(fieldLabelForTranslate) })),
                        React.createElement("div", null,
                            React.createElement(InputBase_1.default, { className: classes.margin, defaultValue: fieldValue }))));
                }
                default:
                    break;
            }
            return "";
        }
    };
    return RenderField;
}(React.Component));
exports.default = styles_1.withStyles(styles, { withTheme: true })(RenderField);
