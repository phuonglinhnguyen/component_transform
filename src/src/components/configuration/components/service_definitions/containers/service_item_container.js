import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ServiceItem from '../components/service_item_component';

import * as actions from '../actions/service_item_action';
import default_props from '../../../../common/default_props';

const ServiceItemContainer = props => (
  <ServiceItem {...props} default_props={default_props} />
);

const mapStateToProps = state => {
  const { service_item } = state.config_service_definition;
  const ajax_call_ajax = state.common.ajax_call_ajax;

  return {
    ajax_call_ajax,
    service_item
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...actions
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ServiceItemContainer
);
