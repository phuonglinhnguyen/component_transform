import React from "react";

import CanvasComponent from "../../../../common/bpmn";
import WorkflowMonitorViewComponent from "./workflow_item_monitor_view_component";
import WorkflowMonitorExchangeComponent from "./workflow_item_monitor_exchange_component";

import Modeler from "../../../../common/bpmn/libs/modeler";

class WorkflowMonitor extends React.Component {
  componentDidMount() {
    const { project, workflow, primary1Color, accent1Color, actions } = this.props;
    
    let modeler = new Modeler({
      type: "modeler",
      project_id: project.id,
      project_name: project.name,
      canvas_id: "#js-canvas",
      xml: workflow.data.xml,
      workflow_type: workflow.data.type,
      instances: workflow.instances,
      primary1Color,
      accent1Color,
      actions: {
        showViewInstances: element => {
          const tasks = modeler.getTargetTasks(element, workflow.tasks);
          actions.showViewInstances(element.id, tasks);
        },
        showModification: element => {
          const tasks = modeler.getTargetTasks(element, workflow.tasks);
          actions.showExchange(element.id, tasks);
        }
      }
    });

    actions.setCanvas(modeler);
    this.modeler = modeler;
  }

  openConfig(task_type, element) {
    this.props.actions.openConfig(task_type, element);
  }

  onZoom(is_zoom_out) {
    this.modeler.onZoom(is_zoom_out);
  }

  downloadXML(e) {
    this.modeler.saveXML(
      `${this.props.workflow.data.type}_${this.props.project.name}`
    );
  }

  render() {
    const {
      is_publish,
      primary1Color,
      background4Color,
      muiTheme,
      workflow,
      monitor,
      actions
    } = this.props;
    return (
      <div
        style={{
          height: !workflow.is_expand
            ? "calc(100% - 56px)"
            : "calc(100vh - 57px)",
          width: "100%",
          backgroundColor: background4Color,
          position: "relative"
        }}
      >
        <CanvasComponent
          is_publish={is_publish}
          is_expand={workflow.is_expand}
          is_view={true}
          action_resetZoom={() =>
            this.modeler.viewer.get("canvas").zoom("fit-viewport", "center")
          }
          action_onZoom={this.onZoom.bind(this)}
          action_downloadXML={this.downloadXML.bind(this)}
          action_openHistories={actions.openHistories}
          action_expandView={actions.expandView}
        />
        <WorkflowMonitorViewComponent
          muiTheme={muiTheme}
          datas={monitor.instances}
          tasks={monitor.target_tasks}
          task={monitor.task}
          modeler={workflow.modeler}
          error_text_type={monitor.error_text_type}
          show_instances={monitor.show_instances}
          action_moveTo={actions.moveTo}
          action_hideViewInstances={actions.hideViewInstances}
        />
        <WorkflowMonitorExchangeComponent
          source_tasks={workflow.tasks}
          target_tasks={monitor.target_tasks}
          modeler={workflow.modeler}
          error_text_type={monitor.error_text_type}
          primary1Color={primary1Color}
          show_exchange={monitor.show_exchange}
          source_activity={monitor.source_activity}
          target_activity={monitor.target_activity}
          action_execute={actions.execute}
          action_hideExchange={actions.hideExchange}
          action_changeSourceActivity={actions.changeSourceActivity}
          action_changeTargetActivity={actions.changeTargetActivity}
        />
      </div>
    );
  }
}

export default WorkflowMonitor;
