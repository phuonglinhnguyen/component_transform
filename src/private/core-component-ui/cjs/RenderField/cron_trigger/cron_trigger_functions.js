"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var constants = require("./cron_trigger_actions");
var react_redux_i18n_1 = require("react-redux-i18n");
exports.getTimeByCronValue = function (cronValue) {
    var timeCron = '';
    if (lodash_1.isEmpty(cronValue)) {
        return timeCron;
    }
    try {
        var value = cronValue.split(" ");
        if (value[1] === "*") { // seconds: ["0/30", "*", "*", "1/1", "*", "?", "*"]
            var secondsSplit = value[0].split("/")[1];
            var newSeconds = secondsSplit.length > 1 ? secondsSplit : "0" + secondsSplit;
            timeCron = newSeconds + " " + react_redux_i18n_1.I18n.t('cron_trigger.start_from_5');
        }
        else if (value[2] === "*") { // minutes: ["0", "0", "*", "1/1", "*", "?", "*"]
            var minutesSplit = value[1].split("/")[1];
            var newMinute = minutesSplit.length > 1 ? minutesSplit : "0" + minutesSplit;
            timeCron = newMinute + " " + react_redux_i18n_1.I18n.t('cron_trigger.start_from_4');
        }
        else {
            if (value[3] === "*") { // hourly
                var hourlySplit = value[2].split("/");
                if (hourlySplit[1]) { // ["0", "0", "0/23", "*", "*", "?", "*"]
                    var newHour = hourlySplit[1].length > 1 ? hourlySplit[1] : "0" + hourlySplit[1];
                    timeCron = react_redux_i18n_1.I18n.t('cron_trigger.start_from_1') + " " + newHour + " " + react_redux_i18n_1.I18n.t('cron_trigger.start_from_3');
                }
                else { // ["0", "30", "23", "*", "*", "?", "*"]
                    var newMinute = value[1].length > 1 ? value[1] : "0" + value[1];
                    var newHour = value[2].length > 1 ? value[2] : "0" + value[2];
                    timeCron = newHour + "h" + newMinute + " " + react_redux_i18n_1.I18n.t('cron_trigger.every_day');
                }
            }
            else if (value[3] !== "*" && value[3] !== "?") { // Dally type 2 // ["0", "45", "23", "1/1", "*", "?", "*"]
                var dallySplit = value[3].split("/");
                if (dallySplit[1]) { // ["0", "0", "12", "1/1", "*", "?", "*"]
                    var newMinute = value[1].length > 1 ? value[1] : "0" + value[1];
                    timeCron = react_redux_i18n_1.I18n.t('cron_trigger.start_from_1') + " " + dallySplit[1] + " " + react_redux_i18n_1.I18n.t('cron_trigger.start_from_2') + " " + value[2] + "h" + newMinute;
                }
            }
            else {
                if (value[3] === "?") { // Dally type 1: ["0", "20", "12", "?", "*", "MON-FRI", "*"]
                    if (value[5] === "MON-FRI") {
                        var newMinute = value[1].length > 1 ? value[1] : "0" + value[1];
                        var newHour = value[2].length > 1 ? value[2] : "0" + value[2];
                        timeCron = react_redux_i18n_1.I18n.t('cron_trigger.start_at') + " " + newHour + "h" + newMinute + " " + react_redux_i18n_1.I18n.t('cron_trigger.mon_fri');
                    }
                    else { // Weekly: ["0", "20", "12", "?", "*", "WED,THU,SAT", "*"] 
                        var weekly = value[5].split(",");
                        var weeklyCheck_1 = [];
                        var weeklyDefault_1 = constants.days;
                        weekly.map(function (item) {
                            var i = weeklyDefault_1.filter(function (i) { return i.val === item; });
                            if (i[0]) {
                                weeklyCheck_1.push(i[0]);
                            }
                        });
                        var dateTime_1 = [];
                        lodash_1.orderBy(weeklyCheck_1, 'key', 'asc').map(function (item) {
                            dateTime_1.push(react_redux_i18n_1.I18n.t("cron_trigger." + item.text));
                        });
                        var newMinute = value[1].length > 1 ? value[1] : "0" + value[1];
                        var newHour = value[2].length > 1 ? value[2] : "0" + value[2];
                        timeCron = react_redux_i18n_1.I18n.t('cron_trigger.start_at') + " " + newHour + "h" + newMinute + " " + react_redux_i18n_1.I18n.t('cron_trigger.in_day') + " " + dateTime_1.join(', ');
                    }
                }
            }
        }
        return timeCron;
    }
    catch (error) {
        return timeCron;
    }
};
exports.getActiveTabByCronValue = function (cronValue) {
    var activeTab = '';
    if (lodash_1.isEmpty(cronValue)) {
        return activeTab;
    }
    try {
        var value = cronValue.split(" ");
        if (value[1] === "*") { // seconds: ["0/30", "*", "*", "1/1", "*", "?", "*"]
            activeTab = constants.SECONDS_TAB;
        }
        else if (value[2] === "*") { // minutes: ["0", "0", "*", "1/1", "*", "?", "*"]
            activeTab = constants.MINUTES_TAB;
        }
        else {
            if (value[3] === "*") { // hourly
                activeTab = constants.HOURLY_TAB;
            }
            else if (value[3] !== "*" && value[3] !== "?") { // Dally type 2 // ["0", "45", "23", "1/1", "*", "?", "*"]
                activeTab = constants.DAILY_TAB;
            }
            else {
                if (value[3] === "?") { // Dally type 1: ["0", "20", "12", "?", "*", "MON-FRI", "*"]
                    if (value[5] === "MON-FRI") {
                        activeTab = constants.DAILY_TAB;
                    }
                    else { // Weekly: ["0", "20", "12", "?", "*", "WED,THU,SAT", "*"] 
                        activeTab = constants.WEEKLY_TAB;
                    }
                }
            }
        }
        return activeTab;
    }
    catch (error) {
        return activeTab;
    }
};
exports.getCronValueByState = function (newState) {
    var activeTab = newState.activeTab, seconds = newState.seconds, minutes = newState.minutes, hourly = newState.hourly, daily = newState.daily, weekly = newState.weekly;
    var cronValue = '';
    switch (activeTab) {
        case constants.SECONDS_TAB: {
            if (seconds.second && seconds.second.length > 0) {
                cronValue = '0/' + seconds.second + ' * * 1/1 * ? *';
            }
            break;
        }
        case constants.MINUTES_TAB: {
            if (minutes.minute && minutes.minute.length > 0) {
                cronValue = '0 0/' + minutes.minute + ' * 1/1 * ? *';
            }
            break;
        }
        case constants.HOURLY_TAB: {
            if (hourly.type === '1') {
                if (hourly.everyHour &&
                    hourly.everyHour.length > 0) {
                    cronValue = '0 0 0/' + hourly.everyHour + ' * * ? *';
                }
            }
            else {
                cronValue =
                    '0 ' +
                        hourly.minute +
                        ' ' +
                        hourly.hour +
                        ' * * ? *';
            }
            break;
        }
        case constants.DAILY_TAB: {
            if (daily.everyDay && daily.everyDay.length > 0) {
                if (daily.type === "1") {
                    cronValue =
                        '0 ' +
                            daily.minute +
                            ' ' +
                            daily.hour +
                            ' ? * MON-FRI *';
                }
                else {
                    cronValue =
                        '0 ' +
                            daily.minute +
                            ' ' +
                            daily.hour +
                            ' 1/' +
                            daily.everyDay +
                            ' * ? *';
                }
            }
            break;
        }
        case constants.WEEKLY_TAB: {
            var selectedDays_1 = '';
            if (weekly.days.length > 0) {
                weekly.days.map(function (day) { return (selectedDays_1 += day.val + ','); });
                if (selectedDays_1.length > 0) {
                    selectedDays_1 = selectedDays_1.substr(0, selectedDays_1.length - 1);
                }
                cronValue =
                    '0 ' +
                        weekly.minute +
                        ' ' +
                        weekly.hour +
                        ' ? * ' +
                        selectedDays_1 + ' *';
            }
            break;
        }
        default:
            break;
    }
    return cronValue;
};
exports.getStateByCronValue = function (cronValue, tabs) {
    var cronV = !lodash_1.isEmpty(cronValue) ? cronValue : '0/1 * * 1/1 * ? *';
    var newState = {
        value: 0,
        cronValue: cronV,
        cronTime: exports.getTimeByCronValue(cronV),
        activeTab: exports.getActiveTabByCronValue(cronV) !== '' ? exports.getActiveTabByCronValue(cronV) : constants.SECONDS_TAB,
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
    var value = newState.cronValue.split(" ");
    if (value[1] === "*") { // seconds: ["0/1", "*", "*", "1/1", "*", "?", "*"]
        var secondsSplit = value[0].split("/")[1];
        newState.activeTab = constants.SECONDS_TAB;
        newState.seconds = { second: secondsSplit, errorText: '' };
    }
    else if (value[2] === "*") { // minutes: ["0", "0", "*", "1/1", "*", "?", "*"]
        var minutesSplit = value[1].split("/")[1];
        newState.activeTab = constants.MINUTES_TAB;
        newState.minutes = { minute: minutesSplit, errorText: '' };
    }
    else {
        if (value[3] === "*") { // hourly
            var hourlySplit = value[2].split("/");
            if (hourlySplit[1]) { // ["0", "0", "0/23", "*", "*", "?", "*"]
                newState.activeTab = constants.HOURLY_TAB;
                newState.hourly = {
                    type: '1',
                    everyHour: hourlySplit[1],
                    hour: '12',
                    minute: '0',
                    errorText: ''
                };
            }
            else { // ["0", "30", "23", "*", "*", "?", "*"]
                newState.activeTab = constants.HOURLY_TAB;
                newState.hourly = {
                    type: '2',
                    everyHour: "1",
                    hour: value[2],
                    minute: value[1],
                    errorText: ''
                };
            }
        }
        else if (value[3] !== "*" && value[3] !== "?") { // Dally type 2 // ["0", "45", "23", "1/1", "*", "?", "*"]
            var dallySplit = value[3].split("/");
            if (dallySplit[1]) { // ["0", "0", "12", "1/1", "*", "?", "*"]
                newState.activeTab = constants.DAILY_TAB;
                newState.daily = {
                    type: '2',
                    everyDay: dallySplit[1],
                    hour: value[2],
                    minute: value[1],
                    errorText: ''
                };
            }
        }
        else {
            if (value[3] === "?") { // Dally type 1: ["0", "20", "12", "?", "*", "MON-FRI", "*"]
                if (value[5] === "MON-FRI") {
                    newState.activeTab = constants.DAILY_TAB;
                    newState.daily = {
                        type: '1',
                        everyDay: '1',
                        hour: value[2],
                        minute: value[1],
                        errorText: ''
                    };
                }
                else { // Weekly: ["0", "20", "12", "?", "*", "WED,THU,SAT", "*"] 
                    var weekly = value[5].split(",");
                    var weeklyCheck_2 = [];
                    var weeklyDefault_2 = constants.days;
                    weekly.map(function (item) {
                        var i = weeklyDefault_2.filter(function (i) { return i.val === item; });
                        if (i[0]) {
                            weeklyCheck_2.push(i[0]);
                        }
                    });
                    newState.activeTab = constants.WEEKLY_TAB;
                    newState.weekly = {
                        days: weeklyCheck_2,
                        hour: value[2],
                        minute: value[1],
                        errorText: ''
                    };
                }
            }
        }
    }
    for (var index = 0; index < tabs.length; index++) {
        var tab = tabs[index];
        if (tab === newState.activeTab) {
            newState['value'] = index;
            break;
        }
    }
    return newState;
};
