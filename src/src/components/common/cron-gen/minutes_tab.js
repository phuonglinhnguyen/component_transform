import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import default_props from './cron_gen_util';
export default class MinutesTab extends Component {
  render() {
    return (
      <div {...default_props.flex}>
        <div {...default_props.minutes_label}>Every</div>
        <div {...default_props.minutes_textfield}>
          <TextField
            name="minute"
            type="text"
            fullWidth={true}
            onChange={this.props.handleInputChange}
           
            value={this.props.minutes.minute}
          />
        </div>
        <div {...default_props.minutes_label}>minutes</div>
      </div>
    );
  }
}
