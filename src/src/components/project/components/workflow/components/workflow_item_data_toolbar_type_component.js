import React from "react";

import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import { Translate } from "react-redux-i18n";

const items = [
  <MenuItem key={0} value="START" primaryText="Start" />,
  <MenuItem key={1} value="QC" primaryText="QC" />,
  <MenuItem key={2} value="EXPORT" primaryText="Export" />,
  <MenuItem key={3} value="UPLOAD" primaryText="Upload" />
];

class WorkflowItemDataButton extends React.PureComponent {
  handleChange(event, index, value) {
    this.props.action_changeType(value);
  }

  render() {
    const { workflow_type, background4Color } = this.props;

    return (
      <SelectField
        style={{ height: 66, width: 220 }}
        underlineStyle={
          workflow_type && {
            borderBottom: `1px solid ${background4Color}`
          }
        }
        value={workflow_type}
        floatingLabelFixed={true}
        floatingLabelText={
          <Translate dangerousHTML value="projects.workflow.type" />
        }
        onChange={this.handleChange.bind(this)}
        errorText={!workflow_type && <Translate value=" " />}
        fullWidth={true}
      >
        {items}
      </SelectField>
    );
  }
}

export default WorkflowItemDataButton;
