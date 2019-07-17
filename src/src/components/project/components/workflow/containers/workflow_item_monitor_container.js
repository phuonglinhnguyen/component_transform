import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import LoadingComponent from "../../../../common/ajax/load_page/circle";
import WorkflowItemMonitorComponent from "../components/workflow_item_monitor_component";
import WorkflowItemToolbarComponent from "../components/workflow_item_toolbar_component";
import WorkflowHistoryContainer from "./workflow_item_history_container";

import * as item_actions from "../actions/workflow_item_action";
import * as monitor_actions from "../actions/workflow_item_monitor_action";
import { openHistories } from "../actions/workflow_item_history_action";

import muiThemeable from "material-ui/styles/muiThemeable";

class WorkflowMigrationContainer extends React.Component {
  componentWillMount() {
    const { projectid, workflow_id } = this.props.match.params;
    this.props.actions.getWorkflowById(
      projectid,
      workflow_id,
      /*is_get_instances*/ true
    );
  }

  componentWillUnmount() {
    document.querySelector("section.with-tabs").classList.remove("expand");
    this.props.actions.resetState();
  }

  render() {
    if (this.props.workflow.is_fetching) {
      return <LoadingComponent />;
    }
    const {
      is_pm,
      workflow,
      muiTheme,
      ajax_call_ajax,
      match,
      history
    } = this.props;
    const { primary1Color, background4Color } = muiTheme.palette;

    let is_publish = false;
    if (workflow.data.publish) {
      is_publish = true;
    }
    return (
      <div className="column_left">
        <WorkflowHistoryContainer match={match} history={history} />
        <WorkflowItemToolbarComponent
          is_pm={is_pm}
          match={this.props.match}
          history={this.props.history}
          primary1Color={primary1Color}
          is_publish={true}
          is_calling={ajax_call_ajax.is_calling}
          action_type={ajax_call_ajax.action_type}
        />
        <WorkflowItemMonitorComponent
          is_publish={is_publish}
          primary1Color={primary1Color}
          background4Color={background4Color}
          muiTheme={muiTheme}
          {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  workflow: state.workflow.item,
  monitor: state.workflow.item_monitor,
  project: state.project.project_item.project,
  ajax_call_ajax: state.common.ajax_call_ajax
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...item_actions,
      ...monitor_actions,
      openHistories
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(
  muiThemeable()(WorkflowMigrationContainer)
);
