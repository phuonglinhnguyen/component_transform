import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ServiceList from '../components/service_list_component';

import {
  getServices,
  resetStateServiceList
} from '../actions/service_list_action';

const ServiceListContainer = props => <ServiceList {...props} />;

const mapStateToProps = state => ({
  service_list: state.config_service_definition.service_list,
  ajax_call_ajax: state.common.ajax_call_ajaxx
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getServices,
      resetStateServiceList
    },
    dispatch
  )
});
export default connect(mapStateToProps, mapDispatchToProps)(
  ServiceListContainer
);
