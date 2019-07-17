import React from "react";

import LoadingComponent from "../../../../common/ajax/load_page/circle";
import CallAjaxContainer from "../../../../common/ajax/call_ajax/containers/call_ajax_container";
import DashboardCardComponent from "../../../../common/dashboard/chip";

import * as error_constants from "../constants/error_constants";

class ErrorList extends React.Component {
  componentWillMount() {
    this.props.actions.getErrors();
  }

  componentWillUnmount() {
    this.props.actions.resetStateErrorList();
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
    const { error_list, muiTheme } = this.props;

    if (error_list.is_fetching) {
      return <LoadingComponent />;
    }

    return (
      <div>
        <CallAjaxContainer />
        <DashboardCardComponent
          muiTheme={muiTheme}
          datas={error_list.errors}
          key_value={error_constants.KEY_ERROR_NAME}
          label_total="configurations.error_definitions.errors_available"
          label_text_search="commons.hint_text.search"
          label_button_add="configurations.error_definitions.create_new_error"
          addItem={this.addItem.bind(this)}
          import_export={true}
        />
      </div>
    );
  }
}

export default ErrorList;
