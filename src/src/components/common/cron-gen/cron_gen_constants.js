import React from 'react';
import MenuItem from 'material-ui/MenuItem';

export const hours = [];
for (let i = 0; i < 24; i++) {
  hours.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
}

export const minutes = [];
for (let i = 0; i < 60; i++) {
  minutes.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
}

export const days = [
  { key: 1, text: 'Monday', val: 'MON' },
  { key: 2, text: 'Tuesday', val: 'TUE' },
  { key: 3, text: 'Wednesday', val: 'WED' },
  { key: 4, text: 'Thursday', val: 'THU' },
  { key: 5, text: 'Friday', val: 'FRI' },
  { key: 6, text: 'Saturday', val: 'SAT' },
  { key: 0, text: 'Sunday', val: 'SUN' }
];

export const dayIndex = [
  { text: 'First', val: 1 },
  { text: 'Second', val: 2 },
  { text: 'Third', val: 3 },
  { text: 'Fourth', val: 4 }
];

export const MINUTES_TAB = 'MINUTES';
export const HOURLY_TAB = 'HOURLY';
export const DAILY_TAB = 'DAILY';
export const WEEKLY_TAB = 'WEEKLY';
export const MONTHLY_TAB = 'MONTHLY';
