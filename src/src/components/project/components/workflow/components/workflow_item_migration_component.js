import React from "react";
import ReactDOM from "react-dom";

import LoadingComponent from "../../../../common/ajax/load_page/circle";
import WorkflowItemMigrationCanvasComponent from "./workflow_item_migration_canvas_component";
import WorkflowItemMigrationTableComponent from "./workflow_item_migration_table_component";
import WorkflowItemConfirmComponent from "./workflow_item_confirm_component";

class WorkflowMigration extends React.Component {
  componentWillMount() {
    const { project_id, definition_key } = this.props.workflow.data;

    this.props.actions.getMigrationList(project_id, definition_key);
  }

  handleCanvasClick(event) {
    if (this.refs["workflow_table"]) {
      const refs = this.refs["workflow_table"].refs;
      const node = ReactDOM.findDOMNode(refs[`row_${event.element.id}`]);
      if (node) {
        refs[`row_${event.element.id}`].onRowClick(event);
        node.scrollIntoView({
          block: "start",
          behavior: "smooth"
        });
      }
    }
  }

  focusElement(row) {
    this.refs["workflow_canvas"].focusElement(
      this.props.migration.generate.instructions[row].sourceActivityIds[0]
    );
  }

  render() {
    const { migration, muiTheme, actions } = this.props;

    if (migration.is_fetching) {
      return <LoadingComponent />;
    }

    const primaryColor = muiTheme.palette.primary1Color;
    const backgroundColor = muiTheme.palette.background4Color;
    return (
      <div>
        <WorkflowItemConfirmComponent
          action_type={migration.action_type}
          message_confirm={`projects.workflow.message_${migration.action_type}`}
          show_confirm={migration.show_confirm}
          hideConfirm={this.props.actions.hideConfirm}
          action_execute={actions.generate}
        />

        <div
          style={{ overflow: "auto", height: "calc(100vh - 168px)" }}
          className="cool_scroll"
        >
          <WorkflowItemMigrationCanvasComponent
            ref="workflow_canvas"
            handleCanvasClick={this.handleCanvasClick.bind(this)}
            selectDataSource={actions.selectDataSource}
            selectDataTarget={actions.selectDataTarget}
            migration={migration}
            backgroundColor={backgroundColor}
            primaryColor={primaryColor}
          />
          {migration.generate && (
            <WorkflowItemMigrationTableComponent
              ref="workflow_table"
              action_focusElement={this.focusElement.bind(this)}
              action_changeTargetActivity={actions.changeTargetActivity}
              targetActivityIds={migration.targetActivityIds}
              instructions={migration.generate.instructions}
            />
          )}
        </div>
      </div>
    );
  }
}

export default WorkflowMigration;
