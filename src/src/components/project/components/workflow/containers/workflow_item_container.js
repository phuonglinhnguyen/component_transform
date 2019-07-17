import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";

import WorkflowItemDesignContainer from "./workflow_item_design_container";
import WorkflowItemMigrationComponent from "./workflow_item_migration_container";
import WorkflowItemMonitorComponent from "./workflow_item_monitor_container";
import CallAjaxContainer from "../../../../common/ajax/call_ajax/containers/call_ajax_container";

import "diagram-js/assets/diagram-js.css";
import "bpmn-js/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/assets/bpmn-font/css/bpmn-embedded.css";
import "../../../../../styles/assets/bpmn/properties_panel/app.css";
import { ROLE_PROJECT_MANAGER, ROLE_DESIGNER } from "../../../../../constants";

class WorkflowItemContainer extends React.Component {
  constructor(props) {
    super(props);

    let is_pm = false,
      is_designer = false;
    const roles = this.props.user.roles;
    for (var i = 0; i < roles.length; i++) {
      var r = roles[i];
      if (r === ROLE_PROJECT_MANAGER) {
        is_pm = true;
        break;
      } else if (r === ROLE_DESIGNER) {
        is_designer = true;
      }
    }
    this.state = {
      is_pm,
      is_designer
    };
  }
  render() {
    const { is_pm, is_designer } = this.state;
    return (
      <div className="two_column" style={{width: "100%", marginLeft:"-16px",marginBottom:"16px"}}>
        <CallAjaxContainer name={this.props.workflow.data.type} />
          <Route
            exact={true}
            path={`/projects/:projectid/workflow/:workflow_id/design`}
            render={props => (
              <WorkflowItemDesignContainer is_pm={is_pm} {...props} />
            )}
          />
          <Route
            exact={true}
            path={`/projects/:projectid/workflow/:workflow_id/migration`}
            render={props => (
              <WorkflowItemMigrationComponent is_pm={is_pm} {...props} />
            )}
          />
          <Route
            exact={true}
            path={`/projects/:projectid/workflow/:workflow_id/monitor`}
            render={props => (
              <WorkflowItemMonitorComponent is_pm={is_pm} {...props} />
            )}
          />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.current_user.user,
  workflow: state.workflow.item
});

export default connect(mapStateToProps)(WorkflowItemContainer);
