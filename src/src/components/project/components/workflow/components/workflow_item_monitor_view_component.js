import React from "react";

import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import CloseIcon from "material-ui/svg-icons/navigation/close";
import TableX from "../../../../common/table-x/components/table";

import Draggable from "react-draggable";
import WorkflowMonitorViewButtonCompoenent from "./workflow_item_monitor_view_buttons_component";

import { I18n, Translate } from "react-redux-i18n";
import Moment from "moment";

class WorkflowMonitorView extends React.Component {
  state = {
    open: false,
    columns: [
      {
        name: "created",
        title: I18n.t("projects.workflow.create_date"),
        sort: true,
        render: data => {
          return Moment(data.created).format("YYYY/MM/DD HH:mm");
        }
      },
      {
        name: "assignee",
        title: I18n.t("projects.workflow.assignee"),
        sort: true
      }
    ]
  };

  renderActions() {
    const { task, tasks, modeler } = this.props;

    return (
      <WorkflowMonitorViewButtonCompoenent
        action_moveTo={value => {
          this.props.action_moveTo(
            this.refs.table.getSelectedData(),
            value,
            instances => {
              modeler.showInstances(modeler.viewer, instances, modeler.styles);
            }
          );
        }}
        task={task}
        tasks={tasks}
      />
    );
  }

  render() {
    const {
      muiTheme,
      task,
      show_instances,
      datas,
      action_hideViewInstances
    } = this.props;
    if (!show_instances || !task) {
      return null;
    }
    const { columns } = this.state;
    return (
      <Draggable bounds="parent" handle="span">
        <Paper
          className="no-cursor workflow-table"
          style={{
            position: "absolute",
            width: 1000,
            left: "calc(50% - 500px)",
            bottom: 0,
            zIndex: 2
          }}
        >
          <span style={{ cursor: "pointer" }} className="cursor">
            <Toolbar>
              <ToolbarGroup>
                <ToolbarTitle text={task.name} />
              </ToolbarGroup>
              <ToolbarGroup lastChild={true}>
                <IconButton
                  tooltip={<Translate value="commons.action.close" />}
                  onClick={action_hideViewInstances}
                >
                  <CloseIcon />
                </IconButton>
              </ToolbarGroup>
            </Toolbar>
          </span>

          <TableX
            muiTheme={muiTheme}
            columns={columns}
            datas={datas}
            paging={true}
            ref="table"
            search_keys={["assignee"]}
            multiSelectable={true}
            pagingPosition={"bottom"}
            searchHintText={"Search"}
            selectable={true}
            tableActions={this.renderActions.bind(this)}
            tableStyle={{ bodyStyle: { maxHeight: "350px" } }}
          />
        </Paper>
      </Draggable>
    );
  }
}

export default WorkflowMonitorView;
