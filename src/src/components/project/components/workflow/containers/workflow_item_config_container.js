import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import WorkflowItemDataConfigComponent from "../components/workflow_item_data_config_component";

import muiThemeable from "material-ui/styles/muiThemeable";

import * as actions from "../actions/workflow_item_config_action";

const WorkflowItemConfigContainer = props => (
  <WorkflowItemDataConfigComponent {...props} />
);

const mapStateToProps = state => {
  return {
    workflow: state.workflow.item,
    config: state.workflow.item_config
  };
};

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
  muiThemeable()(WorkflowItemConfigContainer)
);
