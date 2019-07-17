// @flow strict

import * as React from 'react';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import IconButton from "material-ui/IconButton";
import SettingField from './setting_field_list'
type Props = {||};

class FieldSetting extends React.Component<Props> {
   state = { open: false }
   render() {
      const { field, fields, changeSettingField, sections } = this.props;
      return (
         <React.Fragment>
            <IconButton
               style={{ position: "absolute", display: "block", top: 0, right: 35 }}
               onClick={_ => this.setState({ open: true })}
            >
               <ActionSettings />
            </IconButton>
            {this.state.open && <SettingField changeSettingField={changeSettingField} onClose={_ => this.setState({ open: false })} open={this.state.open} {...{ field, fields, sections }} /> || ''}
         </React.Fragment>
      );
   }
}

export default FieldSetting;