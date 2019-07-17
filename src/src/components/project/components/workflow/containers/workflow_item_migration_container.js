import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import WorkflowItemMigrationComponent from "../components/workflow_item_migration_component";
import WorkflowItemToolbarComponent from "../components/workflow_item_toolbar_component";
import WorkflowItemMigrationButtonComponent from "../components/workflow_item_migration_button_component";
import LoadingComponent from "../../../../common/ajax/load_page/circle";

import * as actions from "../actions/workflow_item_migration_action";
import { getWorkflowById } from "../actions/workflow_item_action";

import muiThemeable from "material-ui/styles/muiThemeable";

class WorkflowItemMigrationContainer extends React.Component {
  componentWillMount() {
    const { projectid, workflow_id } = this.props.match.params;
    this.props.actions.getWorkflowById(
      projectid,
      workflow_id,
      /*is_get_instances*/ false
    );
  }

  componentWillUnmount() {
    this.props.actions.resetState();
  }
  
  render() {
    if (this.props.workflow.is_fetching) {
      return <LoadingComponent />;
    }

    const { is_pm, migration, muiTheme, ajax_call_ajax, actions } = this.props;
    const { primary1Color } = muiTheme.palette;

    let is_publish = false;
    if (migration.data_sources && migration.data_sources.length > 0) {
      is_publish = true;
    }

    return (
      <div className="column_left">
        <WorkflowItemToolbarComponent
          is_pm={is_pm}
          match={this.props.match}
          history={this.props.history}
          primary1Color={primary1Color}
          is_publish={is_publish}
          is_calling={ajax_call_ajax.is_calling}
          action_type={ajax_call_ajax.action_type}
        >
          <WorkflowItemMigrationButtonComponent
            action_execute={() => actions.generate("execute")}
            action_validation={() => actions.generate("validate")}
            ajax_call_ajax={ajax_call_ajax}
          />
        </WorkflowItemToolbarComponent>
        <WorkflowItemMigrationComponent {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  workflow: state.workflow.item,
  migration: state.workflow.item_migration,
  ajax_call_ajax: state.common.ajax_call_ajax
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions, getWorkflowById }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  muiThemeable()(WorkflowItemMigrationContainer)
);
