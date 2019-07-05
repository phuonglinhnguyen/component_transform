"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var react_redux_i18n_1 = require("react-redux-i18n");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var FormControl_1 = require("@material-ui/core/FormControl");
var Select_1 = require("@material-ui/core/Select");
var cron_trigger_actions_1 = require("./cron_trigger_actions");
var Checkbox_1 = require("@material-ui/core/Checkbox");
var cron_trigger_actions_2 = require("./cron_trigger_actions");
var styles = function (theme) {
    return {
        root: {
            display: "flex",
            flexDirection: 'column',
        },
        container: {
            display: "flex",
            maxHeight: "48px",
            lineHeight: "48px",
        },
        item3: {
            margin: theme.spacing.unit,
            display: "flex",
        },
        text: {
            margin: theme.spacing.unit,
            alignItems: "center",
            display: "flex",
        },
        selectHour: {
            width: "73px",
        },
        selectMinute: {
            width: "73px",
        },
        checkBoxList: {
            display: "flex",
        },
        checkListItem: {
            display: "flex",
            lineHeight: "48px",
            maxHeight: "48px"
        },
        errorText: {
            color: "red",
            display: "flex", marginLeft: "12px"
        },
        cronTime: {
            // padding: theme.spacing.unit * 2,
            lineHeight: "48px",
        }
    };
};
function WeeklyTab(props) {
    var handleChange = function (type, item) { return function (event) {
        var _a = props.onChange, onChange = _a === void 0 ? function () { return null; } : _a;
        onChange(event, type, item);
    }; };
    var data = props.data, classes = props.classes, cronTime = props.cronTime;
    var ids = data.days.map(function (item) { return item.key; });
    return (React.createElement("div", { className: classes.root },
        React.createElement("div", { className: classes.checkBoxList },
            React.createElement("div", { key: "weekly-CheckList-all", className: classes.checkListItem },
                React.createElement("div", null,
                    React.createElement(Checkbox_1.default, { checked: cron_trigger_actions_2.days.filter(function (item) { return !ids.includes(item.key); }).length === 0, onChange: handleChange("all", []), color: "secondary" })),
                React.createElement("div", null, React.createElement(react_redux_i18n_1.Translate, { value: "cron_trigger.all" }))),
            cron_trigger_actions_2.days.map(function (item, index) {
                return (React.createElement("div", { key: "weekly-CheckList- " + index, className: classes.checkListItem },
                    React.createElement("div", null,
                        React.createElement(Checkbox_1.default, { checked: ids.includes(item.key), onChange: handleChange("itemChecked", item), color: "secondary" })),
                    React.createElement("div", null, React.createElement(react_redux_i18n_1.Translate, { value: "cron_trigger." + item.text }))));
            })),
        React.createElement("div", { style: { display: 'flex', flexDirection: 'row' } },
            React.createElement("div", { className: classes.container },
                React.createElement("div", { style: { display: "flex", marginLeft: "12px" } }, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.starts_time' })),
                React.createElement("div", { className: classes.item3 },
                    React.createElement(FormControl_1.default, { className: classes.selectHour },
                        React.createElement(Select_1.default, { value: data.hour, onChange: handleChange("hour", []), name: react_redux_i18n_1.I18n.t('cron_trigger.hour') }, cron_trigger_actions_1.hours.map(function (item) {
                            return React.createElement(MenuItem_1.default, { key: "item-hour-" + item, value: item }, item);
                        }))),
                    React.createElement("div", { className: classes.text }, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.hour' })),
                    React.createElement(FormControl_1.default, { className: classes.selectMinute },
                        React.createElement(Select_1.default, { value: data.minute, onChange: handleChange("minute", []), name: react_redux_i18n_1.I18n.t('cron_trigger.hour') }, cron_trigger_actions_1.minutes.map(function (item) {
                            return React.createElement(MenuItem_1.default, { key: "item-minutes-" + item, value: item }, item);
                        }))),
                    React.createElement("div", { className: classes.text }, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.minute' })))),
            React.createElement("div", { className: classes.errorText }, data.errorText),
            React.createElement("div", { className: classes.cronTime },
                React.createElement("div", null, cronTime.length > 0 && "(" + cronTime + ")")))));
}
exports.default = styles_1.withStyles(styles, { withTheme: true })(WeeklyTab);
