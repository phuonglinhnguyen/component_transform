"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var TextField_1 = require("@material-ui/core/TextField");
var react_redux_i18n_1 = require("react-redux-i18n");
var styles = function (theme) {
    return {
        root: {
            display: "flex",
            flexDirection: 'row',
        },
        container: {
            display: "flex",
            paddingLeft: theme.spacing.unit * 2,
            lineHeight: "48px",
        },
        item: {
            margin: theme.spacing.unit,
        },
        cronTime: {
            paddingLeft: theme.spacing.unit * 2,
            lineHeight: "48px",
        }
    };
};
function MinutesTab(props) {
    var handleChange = function (type) { return function (event) {
        var _a = props.onChange, onChange = _a === void 0 ? function () { return null; } : _a;
        onChange(event, type);
    }; };
    var data = props.data, classes = props.classes, cronTime = props.cronTime;
    return (React.createElement("div", { className: classes.root },
        React.createElement("div", { className: classes.container },
            React.createElement("div", null, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.every' })),
            React.createElement("div", { className: classes.item },
                React.createElement(TextField_1.default, { id: "Minute", placeholder: react_redux_i18n_1.I18n.t('cron_trigger.minute'), value: data.minute, onChange: handleChange("minute"), type: "number", helperText: data.errorText, error: data.errorText.length > 0, fullWidth: true })),
            React.createElement("div", null, React.createElement(react_redux_i18n_1.Translate, { value: 'cron_trigger.minute' }))),
        React.createElement("div", { className: classes.cronTime },
            React.createElement("div", null, cronTime.length > 0 && "(" + cronTime + ")"))));
}
exports.default = styles_1.withStyles(styles, { withTheme: true })(MinutesTab);
