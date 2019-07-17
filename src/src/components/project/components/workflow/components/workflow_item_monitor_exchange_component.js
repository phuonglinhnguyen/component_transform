import React from "react";

import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import CloseIcon from "material-ui/svg-icons/navigation/close";

import Draggable from "react-draggable";

import { Translate } from "react-redux-i18n";

class WorkflowMonitorExchange extends React.PureComponent {
  execute() {
    const modeler = this.props.modeler;
    this.props.action_execute(instances => {
      modeler.showInstances(modeler.viewer, instances, modeler.styles);
    });
  }

  render() {
    const {
      modeler,
      primary1Color,
      error_text_type,
      source_tasks,
      target_tasks,
      source_activity,
      target_activity,
      show_exchange,
      action_hideExchange,
      action_changeSourceActivity,
      action_changeTargetActivity
    } = this.props;
    if (!show_exchange) {
      return null;
    }
    return (
      <Draggable bounds="parent" handle="span">
        <Paper
          className="no-cursor workflow-table"
          style={{
            position: "absolute",
            width: 600,
            height: 322,
            bottom: 0,
            left: "calc(50% - 300px)",
            zIndex: 2
          }}
        >
          <span style={{ cursor: "pointer" }} className="cursor">
            <Toolbar>
              <ToolbarGroup>
                <ToolbarTitle
                  text={<Translate value="projects.workflow.exchange" />}
                />
              </ToolbarGroup>
              <ToolbarGroup lastChild={true}>
                <IconButton
                  tooltip={<Translate value="commons.action.close" />}
                  onClick={action_hideExchange}
                >
                  <CloseIcon />
                </IconButton>
              </ToolbarGroup>
            </Toolbar>
          </span>

          <div style={{ padding: 10 }}>
            <SelectField
              style={{ marginBottom: 26 }}
              value={source_activity}
              floatingLabelFixed={true}
              floatingLabelText={
                <Translate dangerousHTML value="projects.workflow.source" />
              }
              onChange={(event, index, value) => {
                const tasks = modeler.getTargetTasks(
                  modeler.viewer.get("elementRegistry").get(value)
                );
                modeler.focusElement(value);
                action_changeSourceActivity(value, tasks);
              }}
              errorText={
                error_text_type &&
                !source_activity && <Translate value={error_text_type} />
              }
              fullWidth={true}
            >
              <MenuItem key={-1} value={null} primaryText={""} />

              {source_tasks.map((v, i) => {
                if (!v.instances) {
                  return null;
                }
                return (
                  <MenuItem
                    key={i}
                    value={v.id}
                    primaryText={v.name || v.id}
                    rightIcon={
                      <div
                        style={{ fontSize: 32, top: 0 }}
                        className={`entry ${v.icon}`}
                      />
                    }
                    leftIcon={
                      <div
                        style={{
                          top: 0,
                          color: primary1Color,
                          fontWeight: 500
                        }}
                      >
                        {v.instances}
                      </div>
                    }
                  />
                );
              })}
            </SelectField>

            <SelectField
              style={{ marginBottom: 38 }}
              value={target_activity}
              floatingLabelFixed={true}
              floatingLabelText={
                <Translate dangerousHTML value="projects.workflow.target" />
              }
              onChange={(event, index, value) => {
                action_changeTargetActivity(value);
              }}
              errorText={
                error_text_type &&
                !target_activity && <Translate value={error_text_type} />
              }
              fullWidth={true}
            >
              {target_tasks &&
                target_tasks.map((v, i) => (
                  <MenuItem
                    key={i}
                    value={v.id}
                    primaryText={v.name || v.id}
                    rightIcon={
                      <div
                        style={{ fontSize: 32, top: 0 }}
                        className={`entry ${v.icon}`}
                      />
                    }
                  />
                ))}
            </SelectField>

            <RaisedButton
              label={<Translate value={"projects.workflow.exchange"} />}
              fullWidth={true}
              primary={true}
              onClick={this.execute.bind(this)}
            />
          </div>
        </Paper>
      </Draggable>
    );
  }
}

export default WorkflowMonitorExchange;
