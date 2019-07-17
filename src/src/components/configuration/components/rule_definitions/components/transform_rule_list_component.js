import React from "react";

import LoadingComponent from "../../../../common/ajax/load_page/circle";
import CallAjaxContainer from "../../../../common/ajax/call_ajax/containers/call_ajax_container";
import DashboardCardComponent from "../../../../common/dashboard/chip";

import * as transform_rule_constants from "../constants/transform_rule_constants";

class TransformRuleList extends React.Component {
  componentWillMount() {
    this.props.actions.getTransformRules();
  }

  componentWillUnmount() {
    this.props.actions.resetStateTransformRuleList();
  }

  addItem(data) {
    const { history, match } = this.props;
    if (data) {
      history.push(`${match.path}/${data.id}`);
    } else {
      history.push(`${match.path}/new`);
    }
  }

  render() {
    const { transform_rule_list, muiTheme } = this.props;

    if (transform_rule_list.is_fetching) {
      return <LoadingComponent />;
    }

    return (
      <div style={{width: "100%"}}>
        <CallAjaxContainer />
        <DashboardCardComponent
          muiTheme={muiTheme}
          datas={transform_rule_list.datas}
          key_value={transform_rule_constants.KEY_TRANSFORM_RULE_NAME}
          label_total="configurations.transform_rule_definitions.transform_rules_available"
          label_text_search="commons.hint_text.search"
          label_button_add="configurations.transform_rule_definitions.create_new_transform_rule"
          addItem={this.addItem.bind(this)}
          import_export={true}
        />
      </div>
    );
  }
}

export default TransformRuleList;
