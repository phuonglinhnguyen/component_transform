import React from "react";

import LoadingComponent from "../../../../common/ajax/load_page/circle";
import DashboardCard from "../../../../common/dashboard/chip";
import CallAjaxContainer from "../../../../common/ajax/call_ajax/containers/call_ajax_container";

import * as pattern_constants from "../constants/pattern_constants";

class PatternList extends React.Component {
  componentWillMount() {
    this.props.actions.getPatternList();
  }

  componentWillUnmount() {
    this.props.actions.resetStatePatternList();
  }

  goToPagePattern(data) {
    this.props.history.push(
      `${this.props.match.path}/${data ? data.id : "new"}`
    );
  }

  render() {
    const { pattern_list, muiTheme } = this.props;

    if (pattern_list.is_fetching) {
      return <LoadingComponent />;
    }

    return (
      <div style={{width: "100%"}}>
        <CallAjaxContainer />
        <DashboardCard
          muiTheme={muiTheme}
          key_value={pattern_constants.KEY_PATTERN_NAME}
          label_total="configurations.pattern_definitions.patterns_available"
          label_text_search="commons.hint_text.search"
          label_button_add="configurations.pattern_definitions.create_new_pattern"
          addItem={this.goToPagePattern.bind(this)}
          datas={pattern_list.patterns}
          import_export={true}
        />
      </div>
    );
  }
}
export default PatternList;
