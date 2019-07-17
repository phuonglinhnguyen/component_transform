import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';

import default_props from './cron_gen_util';

const styleLeft = {
  float: 'left',
  width: '20%'
};
const styleRight = {
  float: 'left',
  width: '80%'
};

export default class HourlyTab extends Component {
  render() {
    return (
      <div {...default_props.flex}>
        <div style={styleLeft}>
          <RadioButtonGroup
            onChange={this.props.handleRadioChange}
            name="type"
            defaultSelected="1"
          >
            <RadioButton value="1" label="Every" />
            <RadioButton {...default_props.hourly_radio} value="2" label="At" />
          </RadioButtonGroup>
        </div>
        <div style={styleRight}>
          <div {...default_props.flex_no_height}>
            <div {...default_props.daily.textfield_pr}>
              <TextField
                {...default_props.daily.textfield}
                name="everyHour"
                type="text"
                fullWidth={true}
                onChange={this.props.handleInputChange}
                value={this.props.hourly.everyHour}
              />
            </div>
            <div {...default_props.daily.label}>hours</div>
          </div>
          <div {...default_props.flex_no_height}>
            <SelectField
              {...default_props.daily.selectfield}
              name="hour"
              label="Hour"
              value={this.props.hourly.hour}
              onChange={this.props.handleSelectFieldHourChange}
              maxHeight={200}
            >
              {this.props.hours}
            </SelectField>
            <SelectField
              {...default_props.daily.selectfield}
              name="minute"
              label="Minute"
              value={this.props.hourly.minute}
              onChange={this.props.handleSelectFieldMinuteChange}
              maxHeight={200}
            >
              {this.props.minutes}
            </SelectField>
          </div>
        </div>
      </div>
    );
  }
}
