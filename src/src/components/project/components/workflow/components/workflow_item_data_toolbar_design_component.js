import React from "react";

import { ToolbarGroup, ToolbarSeparator } from "material-ui/Toolbar";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";

import { Translate } from "react-redux-i18n";

import WorkflowItemDataTypeComponent from "./workflow_item_data_toolbar_type_component";

class WorkflowItemDataButton extends React.Component {
  render() {
    const {
      modeler,
      project,
      is_create,
      is_publish,
      workflow_type,
      background4Color,

      action_saveWorkflow,
      action_changeType,
      action_openConfirm
    } = this.props;

    return (
      <ToolbarGroup>
        <WorkflowItemDataTypeComponent
          modeler={modeler}
          project={project}
          workflow_type={workflow_type}
          background4Color={background4Color}
          action_changeType={action_changeType}
        />
        <ToolbarSeparator />
        {!is_publish && (
          <RaisedButton
            label={
              <Translate
                value={
                  is_create
                    ? "commons.actions.save_and_create"
                    : "commons.actions.save"
                }
              />
            }
            primary={true}
            onClick={action_saveWorkflow}
          />
        )}
        {!is_create &&
          !is_publish && (
            <FlatButton
              label={<Translate value={"common.actions.publish"} />}
              onClick={() =>
                action_openConfirm(
                  "publish",
                  "projects.workflow.confirm_publish"
                )
              }
            />
          )}
        {!is_create &&
          is_publish && (
            <RaisedButton
              secondary={true}
              label={<Translate value={"common.actions.publish"} />}
              onClick={() =>
                action_openConfirm(
                  "publish",
                  "projects.workflow.confirm_publish"
                )
              }
            />
          )}
        {!is_create &&
          !is_publish && (
            <FlatButton
              label={<Translate value={"commons.actions.delete"} />}
              onClick={() =>
                action_openConfirm("delete", "commons.messages.confirm_delete")
              }
            />
          )}
      </ToolbarGroup>
    );
  }
}

export default WorkflowItemDataButton;
