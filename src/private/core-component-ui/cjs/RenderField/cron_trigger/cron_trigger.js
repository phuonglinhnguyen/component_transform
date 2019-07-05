"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var react_redux_i18n_1 = require("react-redux-i18n");
var react_swipeable_views_1 = require("react-swipeable-views");
var AppBar_1 = require("@material-ui/core/AppBar");
var Tabs_1 = require("@material-ui/core/Tabs");
var Tab_1 = require("@material-ui/core/Tab");
var Typography_1 = require("@material-ui/core/Typography");
var constants = require("./cron_trigger_actions");
var seconds_tab_1 = require("./seconds_tab");
var minutes_tab_1 = require("./minutes_tab");
var hourly_tab_1 = require("./hourly_tab");
var daily_tab_1 = require("./daily_tab");
var weekly_tab_1 = require("./weekly_tab");
var monthly_tab_1 = require("./monthly_tab");
var cron_trigger_actions_1 = require("./cron_trigger_actions");
var lodash_1 = require("lodash");
var classnames_1 = require("classnames");
var cron_trigger_functions_1 = require("./cron_trigger_functions");
var coreui_1 = require("@dgtx/coreui");
var styles = function (theme) {
    return {
        root: {
            minWidth: theme.spacing.unit * 100 + "px",
        },
        tab: {
            // boxShadow: theme.overrides.shadowsHover_1,
            boxShadow: '0px 3px 5px 0px rgba(0, 0, 0,0.3)',
        },
        tabButton: {
            padding: "0px"
        }
    };
};
function TabContainer(_a) {
    var children = _a.children, dir = _a.dir;
    return (React.createElement(Typography_1.default, { component: "div", dir: dir, style: { padding: 8, flexShrink: 'unset' } }, children));
}
var CronTriggerQuartz = /** @class */ (function (_super) {
    tslib_1.__extends(CronTriggerQuartz, _super);
    function CronTriggerQuartz() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: 0,
            cronValue: '',
            cronTime: '',
            tabs: [],
            activeTab: '',
            seconds: { second: '30', errorText: '' },
            minutes: { minute: '1', errorText: '' },
            hourly: {
                type: '1',
                everyHour: '1',
                hour: '12',
                minute: '0',
                errorText: ''
            },
            daily: {
                type: '1',
                everyDay: '1',
                hour: '12',
                minute: '0',
                errorText: ''
            },
            weekly: {
                days: [{ key: 1, text: 'Monday', val: 'MON' }],
                hour: '12',
                minute: '0',
                errorText: ''
            },
            monthly: {
                type: '1',
                day: { day: '1', everyMonth: '1', errorTextDay: '', errorTextEveryMonth: '' },
                dayIndex: { index: 1, dayOfWeek: 'MON', everyMonth: '1', errorText: '' },
                hour: '12',
                minute: '0',
            }
        };
        _this.handleChangeTabs = function (event, value) {
            var newState = lodash_1.cloneDeep(tslib_1.__assign({}, _this.state));
            var tabs = _this.state.tabs;
            var activeTab = tabs[value];
            if (!lodash_1.isEmpty(activeTab)) {
                newState.value = value;
                newState.activeTab = tabs[value];
                _this.handleChange(null, null, null, newState);
            }
        };
        _this.handleChange = function (event, type, item, currentState) {
            var _a = _this.props.onChange, onChange = _a === void 0 ? function () { return null; } : _a;
            var newState = {};
            if (currentState) {
                newState = currentState;
            }
            else {
                newState = lodash_1.cloneDeep(tslib_1.__assign({}, _this.state));
                var _b = _this.state, activeTab = _b.activeTab, seconds = _b.seconds, minutes = _b.minutes, hourly = _b.hourly, daily = _b.daily, weekly = _b.weekly, monthly = _b.monthly;
                var newSeconds = seconds;
                var newMinutes = minutes;
                var newHourly = hourly;
                var newDaily = daily;
                var newWeekly = weekly;
                var newMonthly = monthly;
                var value = event.target.value;
                switch (activeTab) {
                    case constants.SECONDS_TAB: {
                        if (value.toString().length > 10) {
                            newSeconds.errorText = react_redux_i18n_1.I18n.t('cron_trigger.error_length_seconds');
                        }
                        else {
                            if (value.length === 0) {
                                newSeconds.second = value;
                                newSeconds.errorText = react_redux_i18n_1.I18n.t('cron_trigger.error_empty');
                            }
                            else {
                                newSeconds.second = value;
                                newSeconds.errorText = '';
                            }
                        }
                        newState.seconds = tslib_1.__assign({}, newSeconds);
                        break;
                    }
                    case constants.MINUTES_TAB: {
                        if (value.toString().length > 10) {
                            newMinutes.errorText = react_redux_i18n_1.I18n.t('cron_trigger.error_length_minutes');
                        }
                        else {
                            if (value.length === 0) {
                                newMinutes.minute = value;
                                newMinutes.errorText = react_redux_i18n_1.I18n.t('cron_trigger.error_empty');
                            }
                            else {
                                newMinutes.minute = value;
                                newMinutes.errorText = '';
                            }
                        }
                        // this.setState({ minute: newMinutes })
                        newState.minutes = tslib_1.__assign({}, newMinutes);
                        break;
                    }
                    case constants.HOURLY_TAB: {
                        switch (type) {
                            case "everyHour":
                                if (value.toString().length > 10) {
                                    newHourly.errorText = react_redux_i18n_1.I18n.t('cron_trigger.error_length_minutes');
                                }
                                else {
                                    if (value.length === 0) {
                                        newHourly.everyHour = value;
                                        newHourly.errorText = react_redux_i18n_1.I18n.t('cron_trigger.error_empty');
                                    }
                                    else {
                                        newHourly.everyHour = value;
                                        newHourly.errorText = '';
                                    }
                                }
                                break;
                            case "hour":
                                newHourly.hour = value;
                                break;
                            case "minute":
                                newHourly.minute = value;
                                break;
                            case "1":
                            case "2":
                                newHourly.type = type;
                                break;
                            default:
                                break;
                        }
                        // this.setState({ hourly: newHourly })
                        newState.hourly = tslib_1.__assign({}, newHourly);
                        break;
                    }
                    case constants.DAILY_TAB: {
                        switch (type) {
                            case "everyDay":
                                if (value.toString().length > 4) {
                                    newDaily.errorText = react_redux_i18n_1.I18n.t('cron_trigger.error_length_day');
                                }
                                else {
                                    if (value.length === 0) {
                                        newDaily.everyDay = value;
                                        newDaily.errorText = react_redux_i18n_1.I18n.t('cron_trigger.error_empty');
                                    }
                                    else {
                                        newDaily.everyDay = value;
                                        newDaily.errorText = '';
                                    }
                                }
                                break;
                            case "hour":
                                newDaily.hour = value;
                                break;
                            case "minute":
                                newDaily.minute = value;
                                break;
                            case "1":
                            case "2":
                                newDaily.type = type;
                                break;
                            default:
                                break;
                        }
                        // this.setState({ daily: newDaily })
                        newState.daily = tslib_1.__assign({}, newDaily);
                        break;
                    }
                    case constants.WEEKLY_TAB: {
                        switch (type) {
                            case "itemChecked":
                                if (newWeekly.days.filter(function (i) { return i.key === item.key; })[0]) {
                                    newWeekly.days = newWeekly.days.filter(function (i) { return i.key !== item.key; });
                                    if (newWeekly.days.length <= 0) {
                                        newWeekly.errorText = react_redux_i18n_1.I18n.t('cron_trigger.error_length_weekly');
                                        // newWeekly.errorText = '';
                                    }
                                }
                                else {
                                    newWeekly.days.push(item);
                                    newWeekly.errorText = '';
                                }
                                break;
                            case "all":
                                if (newWeekly.days.length <= 0 || newWeekly.days.length !== cron_trigger_actions_1.days.length) {
                                    newWeekly.days = cron_trigger_actions_1.days;
                                    newWeekly.errorText = '';
                                }
                                else {
                                    newWeekly.days = [];
                                    newWeekly.errorText = react_redux_i18n_1.I18n.t('cron_trigger.error_length_weekly');
                                    newWeekly.errorText = '';
                                }
                                break;
                            case "hour":
                                newWeekly.hour = value;
                                break;
                            case "minute":
                                newWeekly.minute = value;
                            default:
                                break;
                        }
                        // this.setState({ weekly: newWeekly })
                        newState.weekly = tslib_1.__assign({}, newWeekly);
                        break;
                    }
                    case constants.MONTHLY_TAB: {
                        var typeItem = type.split(".");
                        if (typeItem[0] === "day") {
                            switch (typeItem[1]) {
                                case "day":
                                    if (value.length > 2) {
                                        newMonthly.day.errorTextDay = react_redux_i18n_1.I18n.t('cron_trigger.error_length_day_monthly');
                                    }
                                    else {
                                        if (value.length === 0) {
                                            newMonthly.day.day = value;
                                            newMonthly.day.errorTextDay = react_redux_i18n_1.I18n.t('cron_trigger.error_empty');
                                        }
                                        else {
                                            newMonthly.day.day = value;
                                            newMonthly.day.errorTextDay = '';
                                        }
                                    }
                                    break;
                                case "everyMonth":
                                    if (value.length > 2) {
                                        newMonthly.day.errorTextEveryMonth = react_redux_i18n_1.I18n.t('cron_trigger.error_length_day_monthly');
                                    }
                                    else {
                                        if (value.length === 0) {
                                            newMonthly.day.everyMonth = value;
                                            newMonthly.day.errorTextEveryMonth = react_redux_i18n_1.I18n.t('cron_trigger.error_empty');
                                        }
                                        else {
                                            newMonthly.day.everyMonth = value;
                                            newMonthly.day.errorTextEveryMonth = '';
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                        else if (typeItem[0] === "dayIndex") {
                            switch (typeItem[1]) {
                                case "index":
                                    newMonthly.dayIndex.index = value;
                                    break;
                                case "dayOfWeek":
                                    newMonthly.dayIndex.dayOfWeek = value;
                                    break;
                                case "everyMonth":
                                    if (value.length > 2) {
                                        newMonthly.dayIndex.errorText = react_redux_i18n_1.I18n.t('cron_trigger.error_length_day_monthly');
                                    }
                                    else {
                                        if (value.length === 0) {
                                            newMonthly.dayIndex.everyMonth = value;
                                            newMonthly.day.errorText = react_redux_i18n_1.I18n.t('cron_trigger.error_empty');
                                        }
                                        else {
                                            newMonthly.dayIndex.everyMonth = value;
                                            newMonthly.dayIndex.errorText = '';
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                        else {
                            switch (type) {
                                case "hour":
                                    newMonthly.hour = value;
                                    break;
                                case "minute":
                                    newMonthly.minute = value;
                                    break;
                                case "1":
                                case "2":
                                    newMonthly.type = type;
                                    break;
                                default:
                                    break;
                            }
                        }
                        // this.setState({ monthly: newMonthly })
                        newState.monthly = tslib_1.__assign({}, newMonthly);
                        break;
                    }
                    default:
                        break;
                }
            }
            newState.cronValue = cron_trigger_functions_1.getCronValueByState(newState);
            newState.cronTime = cron_trigger_functions_1.getTimeByCronValue(newState.cronValue);
            if (!lodash_1.isEmpty(newState.cronValue)) {
                onChange(newState.cronValue);
            }
            _this.setState(tslib_1.__assign({}, newState));
        };
        _this.componentWillMount = function () {
            var _a = _this.props.onChange, onChange = _a === void 0 ? function () { return null; } : _a;
            var checkTabs = [];
            _this.props.tabs.map(function (tab) {
                if (cron_trigger_actions_1.TABS.includes(tab)) {
                    checkTabs.push(tab);
                }
            });
            if (checkTabs.length === _this.props.tabs.length) {
                var newState = cron_trigger_functions_1.getStateByCronValue(_this.props.cronValue, checkTabs);
                newState['tabs'] = _this.props.tabs;
                newState['activeTab'] = _this.props.tabs[0];
                _this.setState(tslib_1.__assign({}, newState));
                onChange(newState.cronValue);
            }
        };
        _this.componentWillReceiveProps = function (nextProps) {
            if (!lodash_1.isEqual(nextProps.cronValue, _this.state.cronValue)) {
                var newState = cron_trigger_functions_1.getStateByCronValue(nextProps.cronValue, _this.props.tabs);
                _this.setState(tslib_1.__assign({}, newState));
            }
        };
        return _this;
    }
    CronTriggerQuartz.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, theme = _a.theme, className = _a.className, _b = _a.viewCronValue, viewCronValue = _b === void 0 ? false : _b;
        var _c = this.state, cronValue = _c.cronValue, cronTime = _c.cronTime, tabs = _c.tabs;
        var styleC = className || {};
        if (!lodash_1.isEmpty(this.props.tabs)) {
            return (React.createElement("div", { className: classnames_1.default(classes.root, styleC) },
                React.createElement(AppBar_1.default, { position: "static", color: "default", className: classes.tabButton },
                    React.createElement(Tabs_1.default, { value: this.state.value, onChange: this.handleChangeTabs, indicatorColor: "primary", textColor: "primary", fullWidth: true, disabled: true }, tabs.map(function (tab, index) {
                        return React.createElement(Tab_1.default, { key: "tab-" + index, value: index, label: React.createElement(react_redux_i18n_1.Translate, { value: tab }) });
                    }))),
                React.createElement(react_swipeable_views_1.default, { axis: theme.direction === 'rtl' ? 'x-reverse' : 'x', index: this.state.value, className: classes.tab }, tabs.map(function (tab) {
                    return (renderTabs({
                        data: coreui_1.getDataObject("" + tab, _this.state),
                        onChange: _this.handleChange,
                        cronTime: cronTime,
                        dir: theme.direction,
                        tab: tab
                    }));
                })),
                viewCronValue ?
                    React.createElement(Typography_1.default, { component: "h5", gutterBottom: true, style: { padding: "8px" } }, react_redux_i18n_1.I18n.t('cron_trigger.cronValue') + ": ",
                        cronValue)
                    : ""));
        }
        else {
            return React.createElement("div", null, react_redux_i18n_1.I18n.t('cron_trigger.error_tabs'));
        }
    };
    return CronTriggerQuartz;
}(React.Component));
exports.default = styles_1.withStyles(styles, { withTheme: true })(CronTriggerQuartz);
var renderTabs = function (input) {
    var data = input.data, onChange = input.onChange, cronTime = input.cronTime, dir = input.dir, tab = input.tab;
    switch (tab) {
        case constants.SECONDS_TAB: {
            return React.createElement(TabContainer, { dir: dir },
                React.createElement(seconds_tab_1.default, { data: data, onChange: onChange, cronTime: cronTime }));
        }
        case constants.MINUTES_TAB: {
            return React.createElement(TabContainer, { dir: dir },
                React.createElement(minutes_tab_1.default, { data: data, onChange: onChange, cronTime: cronTime }));
        }
        case constants.HOURLY_TAB: {
            return React.createElement(TabContainer, { dir: dir },
                React.createElement(hourly_tab_1.default, { data: data, onChange: onChange, cronTime: cronTime }));
        }
        case constants.DAILY_TAB: {
            return React.createElement(TabContainer, { dir: dir },
                React.createElement(daily_tab_1.default, { data: data, onChange: onChange, cronTime: cronTime }));
        }
        case constants.WEEKLY_TAB: {
            return React.createElement(TabContainer, { dir: dir },
                React.createElement(weekly_tab_1.default, { data: data, onChange: onChange, cronTime: cronTime }));
        }
        case constants.MONTHLY_TAB: {
            return React.createElement(TabContainer, { dir: dir },
                React.createElement(monthly_tab_1.default, { data: data, onChange: onChange, cronTime: cronTime }));
        }
        default:
            return '';
    }
};
