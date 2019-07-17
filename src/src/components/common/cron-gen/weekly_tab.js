import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import * as constants from './cron_gen_constants';
import default_props from './cron_gen_util';

export default class WeeklyTab extends Component {
  render() {
    const handleDaysChecked = this.props.handleDaysChecked;

    const daysSelectField = constants.days.map(function(result) {
      return (
        <Checkbox
          onCheck={handleDaysChecked}
          key={result.key}
          label={result.text}
          value={result.val}
        />
      );
    });
    const daysLeft = [],
      daysRight = [];
    daysSelectField.forEach(function(element) {
      if (daysLeft.length >= 4) {
        daysRight.push(element);
      } else {
        daysLeft.push(element);
      }
    }, this);
    return (
      <div {...default_props.tab}>
        <div {...default_props.flex_no_height}>
          <div {...default_props.weekly.lr}>
            {daysLeft}
          </div>
          <div {...default_props.weekly.lr}>
            {daysRight}
          </div>
        </div>

        <div {...default_props.flex_no_height}>
          <div {...default_props.daily.label_selectfield}>At</div>

          <SelectField
            {...default_props.daily.selectfield}
            name="hour"
            label="Hour"
            value={this.props.weekly.hour}
            onChange={this.props.handleSelectFieldHourChange}
            maxHeight={200}
          >
            {this.props.hours}
          </SelectField>

          <SelectField
            {...default_props.daily.selectfield}
            name="minute"
            label="Minute"
            value={this.props.weekly.minute}
            onChange={this.props.handleSelectFieldMinuteChange}
            maxHeight={200}
          >
            {this.props.minutes}
          </SelectField>
        </div>
      </div>
    );
  }
}
