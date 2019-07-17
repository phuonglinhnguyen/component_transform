import React from "react";

import CanvasComponent from "../../../../common/bpmn";

import Modeler from "../../../../common/bpmn/libs/modeler";

class WorkflowItemDataCanvas extends React.Component {
  componentDidMount() {
    const { project, workflow, primary1Color, accent1Color } = this.props;

    let modeler = new Modeler({
      type: "modeler",
      project_id: project.id,
      project_name: project.name,
      canvas_id: "#js-canvas",
      properties_panel_id: "#js-properties-panel",
      xml: workflow.data.xml,
      workflow_type: workflow.data.type,
      instances: workflow.instances,
      primary1Color,
      accent1Color,
      actions: { openConfig: this.openConfig.bind(this) }
    });

    this.props.actions.setCanvas(modeler);
    this.modeler = modeler;
  }

  openConfig(task_type, element) {
    this.props.actions.openConfig(task_type, element);
  }

  onZoom(is_zoom_out) {
    this.modeler.onZoom(is_zoom_out);
  }

  onUpload(e) {
    const project_name = this.props.project.name;
    const workflow_type = this.props.workflow.data.type;

    this.modeler.onUpload(
      e,
      `${workflow_type}_${this.props.match.params.projectid}`,
      `${workflow_type}_${project_name}`
    );
  }

  downloadXML(e) {
    this.modeler.downloadXML();
  }

  downloadPDF(e) {
    this.modeler.downloadPDF();
  }

  render() {
    const { is_publish, background4Color, workflow, actions } = this.props;

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
          is_expand={workflow.is_expand}
          is_publish={is_publish}
          action_resetZoom={() =>
            this.modeler.viewer.get("canvas").zoom("fit-viewport", "center")
          }
          action_onZoom={this.onZoom.bind(this)}
          action_onUpload={this.onUpload.bind(this)}
          action_downloadPDF={this.downloadPDF.bind(this)}
          action_downloadXML={this.downloadXML.bind(this)}
          action_openHistories={actions.openHistories}
          action_expandView={actions.expandView}
        />
      </div>
    );
  }
}

export default WorkflowItemDataCanvas;
