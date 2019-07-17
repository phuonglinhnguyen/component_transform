import React from "react";

import BpmnComponent from "../../../../common/dashboard/bpmn/bpmn_item";
import AutoComplete from "material-ui/AutoComplete";
import { Translate } from "react-redux-i18n";

const styles = {
  main: {
    display: "flex",
    height: "50%"
  },
  one: {
    height: "100%",
    flex: 1,
    padding: "0px 17px 0px 24px"
  },
  two: { height: "100%", flex: 1, padding: "0px 24px 0px 17px" }
};

class WorkflowItemMigrationCanvas extends React.PureComponent {
  handleSelectDataSource(data) {
    this.props.selectDataSource(data, () => {
      this.refs.target.setState({ searchText: "" });
      this.refs.target.focus();
    });
  }

  handleSelectDataTarget(data) {
    this.props.selectDataTarget(data);
  }

  handleUpdateDataSource(searchText) {
    if (!searchText && this.props.migration.workflow_source) {
      this.refs.target.setState({ searchText: "" });
      this.props.selectDataSource();
    }
  }

  handleUpdateDataTarget(searchText) {
    if (!searchText && this.props.migration.workflow_target) {
      this.props.selectDataTarget();
    }
  }

  focusElement(id) {
    const viewer = this.refs["canvas_source"].viewer;
    const task = viewer.get("elementRegistry").get(id);
    viewer.get("selection").select(task);
    var searchPad = viewer.get("searchPad");
    searchPad._centerViewbox(task);
  }

  render() {
    const {
      migration,
      backgroundColor,
      primaryColor,
      handleCanvasClick
    } = this.props;
    return (
      <div style={styles.main}>
        <div style={styles.one}>
          <AutoComplete
            style={{ height: 100 }}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={migration.data_sources}
            floatingLabelText={<Translate dangerousHTML value="projects.workflow.source" />}
            floatingLabelFixed={true}
            onUpdateInput={this.handleUpdateDataSource.bind(this)}
            onNewRequest={this.handleSelectDataSource.bind(this)}
            fullWidth={true}
            openOnFocus={true}
            errorText={
              migration.error_text && !migration.workflow_source
                ? migration.error_text
                : ""
            }
          />
          <BpmnComponent
            ref="canvas_source"
            type="viewer"
            index="1"
            height="calc(100% - 72px)"
            action_elementClick={handleCanvasClick}
            xml={migration.workflow_source_xml}
            instances={migration.workflow_source_instances}
            backgroundColor={backgroundColor}
            primaryColor={primaryColor}
          />
        </div>
        <div style={styles.two}>
          <AutoComplete
            ref="target"
            style={{ height: 100 }}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={migration.data_targets}
            instances={migration.workflow_target_instances}
            onNewRequest={this.handleSelectDataTarget.bind(this)}
            onUpdateInput={this.handleUpdateDataTarget.bind(this)}
            floatingLabelText={<Translate dangerousHTML value="projects.workflow.target" />}
            floatingLabelFixed={true}
            fullWidth={true}
            openOnFocus={true}
            errorText={
              migration.error_text && !migration.workflow_target
                ? migration.error_text
                : ""
            }
          />
          <BpmnComponent
            type="viewer"
            index="2"
            height="calc(100% - 72px)"
            xml={migration.workflow_target_xml}
            instances={migration.workflow_target_instances}
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
          />
        </div>
      </div>
    );
  }
}

export default WorkflowItemMigrationCanvas;
