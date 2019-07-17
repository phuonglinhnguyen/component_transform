import React from 'react';

import LoadingComponent from '../../../../common/ajax/load_page/circle';
import CallAjaxContainer from '../../../../common/ajax/call_ajax/containers/call_ajax_container';
import DashboardCardComponent from '../../../../common/dashboard/chip';

import * as service_constants from '../constants/service_constants';

class ServiceList extends React.Component {
  componentWillMount() {
    this.props.actions.getServices();
  }

  componentWillUnmount() {
    this.props.actions.resetStateServiceList();
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
    const { service_list, muiTheme } = this.props;

    if (service_list.is_fetching) {
      return <LoadingComponent />;
    }

    return (
      <div style={{width:"100%"}}>
        <CallAjaxContainer />
        <DashboardCardComponent
          muiTheme={muiTheme}
          datas={service_list.datas}
          key_value={service_constants.KEY_SERVICE_NAME}
          label_total="configurations.service_definitions.services_available"
          label_text_search="commons.hint_text.search"
          label_button_add="configurations.service_definitions.create_new_service"
          addItem={this.addItem.bind(this)}
        />
      </div>
    );
  }
}

export default ServiceList;
