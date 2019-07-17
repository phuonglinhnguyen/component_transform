import React from "react";

import DashboardCard from "../../../../common/dashboard/bpmn";

import LoadingComponent from "../../../../common/ajax/load_page/circle";
import CallAjaxContainer from "../../../../common/ajax/call_ajax/containers/call_ajax_container";

import { ROLE_PROJECT_MANAGER } from "../../../../../constants";

class WorkflowList extends React.Component {
  constructor(props) {
    super(props);

    let is_pm = false;
    const roles = this.props.user.roles;
    for (var i = 0; i < roles.length; i++) {
      var r = roles[i];
      if (r === ROLE_PROJECT_MANAGER) {
        is_pm = true;
        break;
      }
    }
    this.state = {
      is_pm
    };
  }

  componentWillMount() {
    this.props.actions.getList(this.props.match.params.projectid);
  }

  componentWillUnmount() {
    this.props.actions.resetState();
  }

  goToPageWorkflowItem(data, type) {
    let id = data ? data.id : "new";

    this.props.history.push(`${this.props.match.url}/${id}/${type}`);
  }

  render() {
    const { workflow, muiTheme } = this.props;

    if (workflow.is_fetching) {
      return <LoadingComponent />;
    }

    return (
      <div style={{width: "100%"}}>
        <CallAjaxContainer />
        <DashboardCard
          is_pm={this.state.is_pm}
          palette={muiTheme.palette}
          label_total="projects.workflow.workflows_available"
          addItem={this.goToPageWorkflowItem.bind(this)}
          datas={workflow.datas}
        />
      </div>
    );
  }
}

export default WorkflowList;
