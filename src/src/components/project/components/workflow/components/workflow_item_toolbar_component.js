import React from "react";

import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import FlatButton from "material-ui/FlatButton";

import { Translate } from "react-redux-i18n";

import WorkflowItemDataActionComponent from "./workflow_item_data_toolbar_action_component";

class WorkflowItemDataButton extends React.Component {
  render() {
    const { is_calling, action_type } = this.props;

    if (is_calling) {
      return (
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <FlatButton
              fullWidth={true}
              label={<Translate value={action_type} />}
            />
          </ToolbarGroup>
        </Toolbar>
      );
    }

    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <WorkflowItemDataActionComponent {...this.props} />
        </ToolbarGroup>
        {this.props.children}
      </Toolbar>
    );
  }
}

export default WorkflowItemDataButton;
