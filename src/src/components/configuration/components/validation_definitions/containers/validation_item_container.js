import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ValidationItem from '../components/validation_item_component';

import * as actions from '../actions/validation_item_action';
import default_props from '../../../../common/default_props';

const ValidationItemContainer = props => (
  <ValidationItem {...props} default_props={default_props} /> 
);

const mapStateToProps = state => {
  const { validation_item } = state.config_validation_definition;
  const ajax_call_ajax = state.common.ajax_call_ajax;

  return {
    ajax_call_ajax,
    validation_item
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
  ValidationItemContainer
);
