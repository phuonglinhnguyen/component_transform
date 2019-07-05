"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.days = [
    { key: 1, text: 'Monday', val: 'MON' },
    { key: 2, text: 'Tuesday', val: 'TUE' },
    { key: 3, text: 'Wednesday', val: 'WED' },
    { key: 4, text: 'Thursday', val: 'THU' },
    { key: 5, text: 'Friday', val: 'FRI' },
    { key: 6, text: 'Saturday', val: 'SAT' },
    { key: 0, text: 'Sunday', val: 'SUN' }
];
exports.dayIndex = [
    { text: 'First', val: 1 },
    { text: 'Second', val: 2 },
    { text: 'Third', val: 3 },
    { text: 'Fourth', val: 4 }
];
exports.SECONDS_TAB = 'seconds';
exports.MINUTES_TAB = 'minutes';
exports.HOURLY_TAB = 'hourly';
exports.DAILY_TAB = 'daily';
exports.WEEKLY_TAB = 'weekly';
exports.MONTHLY_TAB = 'monthly';
exports.TABS = ['seconds', 'minutes', 'hourly', 'daily', 'weekly', 'monthly'];
exports.hours = [];
for (var i = 0; i < 24; i++) {
    exports.hours.push(i.toString());
}
exports.minutes = [];
for (var i = 0; i < 60; i++) {
    exports.minutes.push(i.toString());
}
