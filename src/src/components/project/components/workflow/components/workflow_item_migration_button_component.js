import React from "react";

import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import { ToolbarGroup, ToolbarSeparator } from "material-ui/Toolbar";

class WorkflowItemMigrationButton extends React.Component {
  render() {
    const { action_validation, action_execute } = this.props;

    return (
      <ToolbarGroup>
        <FlatButton onClick={action_execute} label="Execute" />
        <ToolbarSeparator />
        <RaisedButton
          onClick={action_validation}
          label="Test"
          secondary={true}
        />
      </ToolbarGroup>
    );
  }
}

export default WorkflowItemMigrationButton;
