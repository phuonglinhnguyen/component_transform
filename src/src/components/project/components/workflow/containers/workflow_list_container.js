import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import WorkflowList from "../components/workflow_list_component";
import { getList, resetState } from "../actions/workflow_list_action";

import muiThemeable from "material-ui/styles/muiThemeable";

const WorkflowListContainer = props => <WorkflowList {...props} />;

const mapStateToProps = state => ({
  user: state.current_user.user,
  workflow: state.workflow.list,
  ajax_call_ajax: state.common.ajax_call_ajax
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getList, resetState }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  muiThemeable()(WorkflowListContainer)
);
