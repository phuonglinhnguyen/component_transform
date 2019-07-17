import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import WorkflowItemDataHistoryComponent from "../components/workflow_item_history_component";

import muiThemeable from "material-ui/styles/muiThemeable";

import * as actions from "../actions/workflow_item_history_action";

const WorkflowItemHistoryContainer = props => (
  <WorkflowItemDataHistoryComponent {...props} />
);

const mapStateToProps = state => ({
  workflow: state.workflow.item,
  project: state.project.project_item.project,
  version: state.workflow.item_history
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...actions
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  muiThemeable()(WorkflowItemHistoryContainer)
);
