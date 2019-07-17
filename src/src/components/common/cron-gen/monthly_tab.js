import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as constants from './cron_gen_constants';

const styleLeft = {
  float: 'left',
  width: '5%'
};
const styleRight = {
  float: 'left',
  width: '90%'
};
const styleInline = {
  display: 'flex',
  marginTop: '10px'
};

const minutes = [];
for (let i = 0; i < 24; i++) {
  minutes.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
}
export default class WeeklyTab extends Component {
  render() {
    const indexSelectField = constants.dayIndex.map(function(result) {
      return (
        <MenuItem
          value={result.val}
          key={result.val}
          primaryText={`${result.text}`}
        />
      );
    });
    const daySelectField = constants.days.map(function(result) {
      return (
        <MenuItem
          value={result.val}
          key={result.key}
          primaryText={`${result.text}`}
        />
      );
    });
    return (
      <div style={{ minHeight: '200px' }}>
        <div style={styleLeft}>
          <RadioButtonGroup
            onChange={this.props.handleRadioChange}
            name="type"
            defaultSelected="1"
          >
            <RadioButton value="1" />
            <RadioButton style={{ marginTop: '30px' }} value="2" />
          </RadioButtonGroup>
        </div>
        <div style={styleRight}>
          <div style={styleInline}>
            <div className="w-10">Day</div>
            <div className="w-10">
              {' '}<TextField
                style={{ marginTop: '-20px' }}
                name="day.day"
                type="text"
                fullWidth={true}
                onChange={this.props.handleInputChange}
                value={this.props.monthly.day.day}
              />
            </div>
            <div className="w-15">of every</div>
            <div className="w-10">
              <TextField
                style={{ marginTop: '-20px' }}
                name="day.everyMonth"
                type="text"
                fullWidth={true}
                onChange={this.props.handleInputChange}
                value={this.props.monthly.day.everyMonth}
              />
            </div>
            <div className="w-10">month(s)</div>
          </div>
          <div style={styleInline}>
            <div>
              <SelectField
                style={{ marginTop: '-15px', width: '100%' }}
                name="index"
                value={this.props.monthly.dayIndex.index}
                onChange={this.props.handleSelectFieldIndexChange}
                maxHeight={200}
              >
                {indexSelectField}
              </SelectField>
            </div>
            <div>
              {' '}<SelectField
                style={{ marginTop: '-15px', width: '100%' }}
                name="dayOfWeek"
                value={this.props.monthly.dayIndex.dayOfWeek}
                onChange={this.props.handleSelectFieldDayChange}
                maxHeight={200}
              >
                {daySelectField}
              </SelectField>
            </div>
            <div className="w-15">of every</div>
            <div className="w-10">
              <TextField
                style={{ marginTop: '-20px' }}
                name="dayIndex.everyMonth"
                type="text"
                fullWidth={true}
                onChange={this.props.handleInputChange}
                value={this.props.monthly.dayIndex.everyMonth}
              />
            </div>
            <div className="w-10">month(s)</div>
          </div>
        </div>
      </div>
    );
  }
}
