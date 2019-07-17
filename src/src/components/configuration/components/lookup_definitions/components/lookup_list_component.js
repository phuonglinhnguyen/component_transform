import React from "react";

import LoadingComponent from "../../../../common/ajax/load_page/circle";
import CallAjaxContainer from "../../../../common/ajax/call_ajax/containers/call_ajax_container";
import DashboardCardComponent from "../../../../common/dashboard/chip";

import * as lookup_constants from "../constants/lookup_constants";

class LookupList extends React.Component {
  componentWillMount() {
    this.props.actions.getLookups();
  }

  componentWillUnmount() {
    this.props.actions.resetStateLookupList();
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
    const { lookup_list, muiTheme } = this.props;

    if (lookup_list.is_fetching) {
      return <LoadingComponent />;
    }

    return (
      <div>
        <CallAjaxContainer />
        <DashboardCardComponent
          muiTheme={muiTheme}
          datas={lookup_list.datas}
          key_value={lookup_constants.KEY_LOOKUP_NAME}
          label_total="configurations.lookup_definitions.lookups_available"
          label_text_search="commons.hint_text.search"
          label_button_add="configurations.lookup_definitions.create_new_lookup"
          addItem={this.addItem.bind(this)}
          import_export={true}
        />
      </div>
    );
  }
}

export default LookupList;
