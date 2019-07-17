import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import SelectField from 'material-ui/SelectField';
import default_props from './cron_gen_util';

export default class DailyTab extends Component {
  render() {
    return (
      <div {...default_props.tab}>
        <div>
          <div {...default_props.flex_no_height}>
            <div {...default_props.daily.label}>Every</div>
            <div {...default_props.daily.textfield_pr}>
              <TextField
                name="everyDay"
                type="text"
                {...default_props.daily.textfield}
                fullWidth={true}
                onChange={this.props.handleInputChange}
                value={this.props.daily.everyDay}
              />
            </div>
            <div {...default_props.daily.label}>days</div>
          </div>
        </div>
        <div {...default_props.flex_no_height}>
          <div {...default_props.daily.label_selectfield}>At</div>
          <SelectField
            {...default_props.daily.selectfield}
            name="hour"
            label="Hour"
            value={this.props.daily.hour}
            onChange={this.props.handleSelectFieldHourChange}
            maxHeight={200}
          >
            {this.props.hours}
          </SelectField>
          <SelectField
            {...default_props.daily.selectfield}
            name="minute"
            label="Minute"
            value={this.props.daily.minute}
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
