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
var classnames_1 = require("classnames");
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
        item1: {
            width: "50px",
            display: "flex",
        },
        item2: {
            margin: theme.spacing.unit,
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
        cronTime: {
            lineHeight: "48px",
        },
        padding: {
            paddingLeft: theme.spacing.unit * 2,
        }
    };
};
function DailyTab(props) {
    var handleChange = function (type) { return function (event) {
        var _a = props.onChange, onChange = _a === void 0 ? function () { return null; } : _a;
        onChange(event, type);
    }; };
    var data = props.data, classes = props.classes, cronTime = props.cronTime;
    return (React.createElement("div", { className: classes.root },
        React.createElement("div", { style: { display: 'flex', flexDirection: 'row' } },
            React.createElement("div", { className: classes.container },
                React.createElement("div", null,
                    React.createElement(Radio_1.default, { checked: data.type === '1', onChange: handleChange("1"), value: data.type, name: "radio-button-daily-type-1", color: "secondary" })),
                React.createElement("div", { style: { display: "flex" } }, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.every_week_day' }))),
            React.createElement("div", { className: classnames_1.default(classes.container, classes.padding) },
                React.createElement("div", null,
                    React.createElement(Radio_1.default, { checked: data.type === '2', onChange: handleChange("2"), value: data.type, name: "radio-button-daily-type-2", color: "secondary" })),
                React.createElement("div", { className: classes.item1 }, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.every' })),
                React.createElement("div", { className: classes.item2 },
                    React.createElement(TextField_1.default, { id: "fieldLabel", placeholder: react_redux_i18n_1.I18n.t('cron_trigger.day'), value: data.everyDay, onChange: handleChange("everyDay"), type: "number", helperText: data.errorText, error: data.errorText.length > 0, fullWidth: true, disabled: data.type === '1' })),
                React.createElement("div", null, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.day' })))),
        React.createElement("div", { style: { display: 'flex', flexDirection: 'row' } },
            React.createElement("div", { className: classes.container },
                React.createElement("div", { style: { display: "flex", marginLeft: "12px" } }, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.starts_time' })),
                React.createElement("div", { className: classes.item3 },
                    React.createElement(FormControl_1.default, { className: classes.selectHour },
                        React.createElement(Select_1.default, { value: data.hour, onChange: handleChange("hour"), name: react_redux_i18n_1.I18n.t('cron_trigger.hour') }, cron_trigger_actions_1.hours.map(function (item) {
                            return React.createElement(MenuItem_1.default, { key: "item-hour-" + item, value: item }, item);
                        }))),
                    React.createElement("div", { className: classes.text }, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.hour' })),
                    React.createElement(FormControl_1.default, { className: classes.selectMinute },
                        React.createElement(Select_1.default, { value: data.minute, onChange: handleChange("minute"), name: react_redux_i18n_1.I18n.t('cron_trigger.minute') }, cron_trigger_actions_1.minutes.map(function (item) {
                            return React.createElement(MenuItem_1.default, { key: "item-minutes-" + item, value: item }, item);
                        }))),
                    React.createElement("div", { className: classes.text }, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.minute' })))),
            React.createElement("div", { className: classes.cronTime },
                React.createElement("div", null, cronTime.length > 0 && "(" + cronTime + ")")))));
}
exports.default = styles_1.withStyles(styles, { withTheme: true })(DailyTab);
