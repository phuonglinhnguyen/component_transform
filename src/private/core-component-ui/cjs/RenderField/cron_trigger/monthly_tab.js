"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var TextField_1 = require("@material-ui/core/TextField");
var react_redux_i18n_1 = require("react-redux-i18n");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var FormControl_1 = require("@material-ui/core/FormControl");
var Select_1 = require("@material-ui/core/Select");
var cron_trigger_actions_1 = require("./cron_trigger_actions");
var Radio_1 = require("@material-ui/core/Radio");
var styles = function (theme) {
    return {
        root: {},
        container: {
            display: "flex",
            maxHeight: "48px",
            lineHeight: "48px",
        },
        item1: {
            width: theme.spacing.unit * 9,
            display: "flex",
        },
        item2: {
            margin: theme.spacing.unit,
        },
        item3: {
            margin: theme.spacing.unit,
            display: "flex",
        },
        item4: {
            margin: theme.spacing.unit,
            width: "100%",
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
        selectIndex: {
            width: "120px",
            marginRight: theme.spacing.unit,
        },
        selectDayOfWeek: {
            width: "120px",
        },
    };
};
function MonthlyTab(props) {
    var handleChange = function (type) { return function (event) {
        var _a = props.onChange, onChange = _a === void 0 ? function () { return null; } : _a;
        onChange(event, type);
    }; };
    var data = props.data, classes = props.classes;
    return (React.createElement("table", null,
        React.createElement("tr", null,
            React.createElement("td", null,
                React.createElement(Radio_1.default, { checked: data.type === '1', onChange: handleChange("1"), value: data.type, name: "radio-button-monthly-type-1" })),
            React.createElement("td", null,
                React.createElement("div", { className: classes.item1 }, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.monthly_day' }))),
            React.createElement("td", null,
                React.createElement("div", { className: classes.container },
                    React.createElement("div", { className: classes.item4 },
                        React.createElement(TextField_1.default, { id: "Monthly-day", placeholder: react_redux_i18n_1.I18n.t('cron_trigger.monthly_day'), value: data.day.day, onChange: handleChange("day.day"), type: "number", helperText: data.day.errorTextDay, error: data.day.errorTextDay.length > 0, fullWidth: true, disabled: data.type === '2' })))),
            React.createElement("td", null,
                React.createElement("div", null, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.monthly_of_every' }))),
            React.createElement("td", null,
                React.createElement("div", { className: classes.container },
                    React.createElement("div", { className: classes.item2 },
                        React.createElement(TextField_1.default, { id: "Monthly-everyMonth", placeholder: react_redux_i18n_1.I18n.t('cron_trigger.monthly_month'), value: data.day.everyMonth, onChange: handleChange("day.everyMonth"), type: "number", helperText: data.day.errorTextEveryMonth, error: data.day.errorTextEveryMonth.length > 0, fullWidth: true, disabled: data.type === '2' })),
                    React.createElement("div", null, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.monthly_month' }))))),
        React.createElement("tr", null,
            React.createElement("td", null,
                React.createElement(Radio_1.default, { checked: data.type === '2', onChange: handleChange("2"), value: data.type, name: "radio-button-monthly-type-2" })),
            React.createElement("td", null,
                React.createElement("div", { className: classes.item1 }, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.monthly_the' }))),
            React.createElement("td", null,
                React.createElement("div", { className: classes.item3 },
                    React.createElement(FormControl_1.default, { className: classes.selectIndex },
                        React.createElement(Select_1.default, { value: data.dayIndex.index, onChange: handleChange("dayIndex.index"), disabled: data.type === '1' }, cron_trigger_actions_1.dayIndex.map(function (item) {
                            return React.createElement(MenuItem_1.default, { key: "dayIndex-index-" + item, value: item.val }, React.createElement(react_redux_i18n_1.Translate, { value: "cron_trigger." + item.text }));
                        }))),
                    React.createElement(FormControl_1.default, { className: classes.selectDayOfWeek },
                        React.createElement(Select_1.default, { value: data.dayIndex.dayOfWeek, onChange: handleChange("dayIndex.dayOfWeek"), disabled: data.type === '1' }, cron_trigger_actions_1.days.map(function (item) {
                            return React.createElement(MenuItem_1.default, { key: "dayIndex-days-" + item, value: item.val }, React.createElement(react_redux_i18n_1.Translate, { value: "cron_trigger." + item.text }));
                        }))))),
            React.createElement("td", null,
                React.createElement("div", null, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.monthly_of_every' }))),
            React.createElement("td", null,
                React.createElement("div", { className: classes.container },
                    React.createElement("div", { className: classes.item2 },
                        React.createElement(TextField_1.default, { id: "Monthly-everyMonth", placeholder: react_redux_i18n_1.I18n.t('cron_trigger.monthly_month'), value: data.dayIndex.everyMonth, onChange: handleChange("dayIndex.everyMonth"), type: "number", helperText: data.dayIndex.errorText, error: data.dayIndex.errorText.length > 0, fullWidth: true, disabled: data.type === '1' })),
                    React.createElement("div", null, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.monthly_month' }))))),
        React.createElement("tr", null,
            React.createElement("td", null, ''),
            React.createElement("td", null,
                React.createElement("div", { style: { display: "flex" } }, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.starts_time' }))),
            React.createElement("td", { colSpan: 3 },
                React.createElement("div", { className: classes.item3 },
                    React.createElement(FormControl_1.default, { className: classes.selectHour },
                        React.createElement(Select_1.default, { value: data.hour, onChange: handleChange("hour"), name: react_redux_i18n_1.I18n.t('cron_trigger.hour') }, cron_trigger_actions_1.hours.map(function (item) {
                            return React.createElement(MenuItem_1.default, { key: "item-hour-" + item, value: item }, item);
                        }))),
                    React.createElement("div", { className: classes.text }, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.hour' })),
                    React.createElement(FormControl_1.default, { className: classes.selectMinute },
                        React.createElement(Select_1.default, { value: data.minute, onChange: handleChange("minute"), name: react_redux_i18n_1.I18n.t('cron_trigger.hour') }, cron_trigger_actions_1.minutes.map(function (item) {
                            return React.createElement(MenuItem_1.default, { key: "item-minutes-" + item, value: item }, item);
                        }))),
                    React.createElement("div", { className: classes.text }, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.minute' })))))));
}
exports.default = styles_1.withStyles(styles, { withTheme: true })(MonthlyTab);
