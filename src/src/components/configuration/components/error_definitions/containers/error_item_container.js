import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ErrorItem from '../components/error_item_component';

import * as actions from '../actions/error_item_action';
import default_props from '../../../../common/default_props';

const ErrorItemContainer = props => (
  <ErrorItem {...props} default_props={default_props} />
);

const mapStateToProps = state => {
  const { error_item } = state.config_error_definition;
  const ajax_call_ajax = state.common.ajax_call_ajax;

  return {
    ajax_call_ajax,
    error_item
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
  ErrorItemContainer
);
