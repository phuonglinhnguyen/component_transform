import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import WorkflowItemDataCanvasComponent from "../components/workflow_item_data_canvas_component";
import WorkflowItemToolbarComponent from "../components/workflow_item_toolbar_component";
import WorkflowItemDataToolbarDesignComponent from "../components/workflow_item_data_toolbar_design_component";
import WorkflowItemConfirmComponent from "../components/workflow_item_confirm_component";

import LoadingComponent from "../../../../common/ajax/load_page/circle";
import WorkflowHistoryContainer from "./workflow_item_history_container";
import WorkflowItemConfigContainer from "./workflow_item_config_container";

import {
  getWorkflowById,
  setCanvas,
  saveWorkflow,
  publishWorkflow,
  deleteWorkflow,
  changeType,
  hideConfirm,
  openConfirm,
  expandView,
  resetState
} from "../actions/workflow_item_action";
import { openHistories } from "../actions/workflow_item_history_action";
import { openConfig } from "../actions/workflow_item_config_action";

import muiThemeable from "material-ui/styles/muiThemeable";

class WorkflowItemDesignContainer extends React.Component {
  componentWillMount() {
    const { projectid, workflow_id } = this.props.match.params;
    this.props.actions.getWorkflowById(
      projectid,
      workflow_id,
      /*is_get_instances*/ false
    );
  }

  componentWillUnmount() {
    if(document.querySelector("section.with-tabs")) {
    document.querySelector("section.with-tabs").classList.remove("expand");
    }
    this.props.actions.resetState();
  }

  changeType(workflow_type) {
    this.props.workflow.modeler.changeType(workflow_type);
    this.props.actions.changeType(workflow_type);
  }

  saveWorkflow() {
    const { actions, history, workflow } = this.props;
    const { projectid, workflow_id } = this.props.match.params;

    workflow.modeler.saveXML(xml =>
      actions.saveWorkflow(projectid, xml, (project_id, workflow_id) => {
        history.push(`/projects/${project_id}/workflow/${workflow_id}/design`);
      })
    );
  }

  executeAction() {
    const { project, history, workflow, actions } = this.props;

    if (workflow.action_type === "delete") {
      actions.deleteWorkflow(() => {
        history.push(`/projects/${project.id}/workflow`);
      });
    } else {
      workflow.modeler.saveXML(xml =>
        actions.publishWorkflow(xml, () =>
          history.push(`/projects/${project.id}/workflow`)
        )
      );
    }
  }

  render() {
    if (this.props.workflow.is_fetching) {
      return <LoadingComponent />;
    }

    const {
      is_pm,
      workflow,
      project,
      ajax_call_ajax,
      match,
      history,
      muiTheme,
      actions
    } = this.props;
    const { primary1Color, background4Color } = muiTheme.palette;

    let is_publish = false;
    if (workflow.data.publish) {
      is_publish = true;
    }
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <WorkflowItemConfigContainer match={match} history={history} />
        <WorkflowHistoryContainer match={match} history={history} />

        <WorkflowItemConfirmComponent
          workflow={workflow}
          history={history}
          project_id={project.id}
          action_type={workflow.action_type}
          action_execute={this.executeAction.bind(this)}
          message_confirm={workflow.message_confirm}
          show_confirm={workflow.show_confirm}
          hideConfirm={this.props.actions.hideConfirm}
        />
        <WorkflowItemToolbarComponent
          match={match}
          history={history}
          is_pm={is_pm}
          primary1Color={primary1Color}
          is_publish={is_publish}
          is_calling={ajax_call_ajax.is_calling}
          action_type={ajax_call_ajax.action_type}
        >
          <WorkflowItemDataToolbarDesignComponent
            background4Color={background4Color}
            modeler={workflow.modeler}
            project={project}
            workflow_type={workflow.data.type}
            is_create={workflow.is_create}
            is_publish={is_publish}
            action_saveWorkflow={this.saveWorkflow.bind(this)}
            action_openConfirm={actions.openConfirm}
            action_changeType={this.changeType.bind(this)}
          />
        </WorkflowItemToolbarComponent>
        <WorkflowItemDataCanvasComponent
          is_publish={is_publish}
          primary1Color={primary1Color}
          background4Color={background4Color}
          {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ajax_call_ajax: state.common.ajax_call_ajax,
  workflow: state.workflow.item,
  project: state.project.project_item.project
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getWorkflowById,
        setCanvas,
        saveWorkflow,
        deleteWorkflow,
        publishWorkflow,
        changeType,
        openConfirm,
        hideConfirm,
        expandView,
        resetState,
        openConfig,
        openHistories
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  muiThemeable()(WorkflowItemDesignContainer)
);
