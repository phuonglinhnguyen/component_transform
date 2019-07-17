import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import ConfigHumanTaskComponent from "../../../../common/bpmn/config_human_task_component";
import ConfigScriptTaskComponent from "../../../../common/bpmn/config_script_task_component";
import ConfigServiceTaskComponent from "../../../../common/bpmn/config_service_task_component";

import { Translate } from "react-redux-i18n";

class WorkflowItemDataConfig extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onCloseConfig = this.onCloseConfig.bind(this);
  }

  onCloseConfig() {
    const { workflow, config, actions } = this.props;
    const { task_type, element } = config;

    const viewer = workflow.modeler.viewer,
      moddle = viewer.get("moddle");

    if (task_type === "ScriptTask") {
      this.refs.scriptTask.getConfig({ viewer, element });
    } else if (task_type === "ServiceTask") {
      this.refs.serviceTask.getConfig({ viewer, moddle, element });
    } else {
      this.refs.userTask.getConfig({
        viewer,
        moddle,
        element
      });
    }

    actions.hideConfig();
  }

  render() {
    const { config, actions } = this.props;
    if (!config.open) {
      return null;
    }

    const { task_type, element, layouts, sections, services } = config;

    let body_config = "";
    if (task_type === "ServiceTask") {
      body_config = (
        <ConfigServiceTaskComponent
          ref="serviceTask"
          data_config={element.data_config}
          services={services}
        />
      );
    } else if (task_type === "ScriptTask") {
      body_config = (
        <ConfigScriptTaskComponent
          ref="scriptTask"
          data_config={element.data_config}
        />
      );
    } else if (task_type === "UserTask") {
      body_config = (
        <ConfigHumanTaskComponent
          ref="userTask"
          layouts={layouts}
          sections={sections}
          data_config={element.data_config}
          action_getSections={actions.getSections}
        />
      );
    }

    return (
      <Dialog
        style={{ paddingTop: "0px" }}
        repositionOnUpdate={false}
        title={element.name}
        autoScrollBodyContent={true}
        bodyClassName="cool_scroll"
        open={true}
        actions={[
          <FlatButton
            onClick={this.onCloseConfig}
            label={<Translate value="commons.actions.close" />}
          />
        ]}
        onRequestClose={this.onCloseConfig}
      >
        {body_config}
      </Dialog>
    );
  }
}
export default WorkflowItemDataConfig;
