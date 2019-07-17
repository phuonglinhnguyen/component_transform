import React from "react";

import LoadingComponent from "../../../../common/ajax/load_page/circle";
import CallAjaxContainer from "../../../../common/ajax/call_ajax/containers/call_ajax_container";
import DashboardCardComponent from "../../../../common/dashboard/chip";

import * as validation_constants from "../constants/validation_constants";

class ValidationList extends React.Component {
  componentWillMount() {
    this.props.actions.getValidations();
  }

  componentWillUnmount() {
    this.props.actions.resetStateValidationList();
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
    const { validation_list, muiTheme } = this.props;

    if (validation_list.is_fetching) {
      return <LoadingComponent />;
    }

    return (
      <div style={{width: "100%"}}>
        <CallAjaxContainer />
        <DashboardCardComponent
          muiTheme={muiTheme}
          datas={validation_list.datas}
          key_value={validation_constants.KEY_VALIDATION_NAME}
          label_total="configurations.validation_definitions.validations_available"
          label_text_search="commons.hint_text.search"
          label_button_add="configurations.validation_definitions.create_new_validation"
          addItem={this.addItem.bind(this)}
          import_export={true}
        />
       
      </div>
    );
  }
}

export default ValidationList;
