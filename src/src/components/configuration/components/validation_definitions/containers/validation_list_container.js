import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ValidationList from '../components/validation_list_component';

import {
  getValidations,
  resetStateValidationList
} from '../actions/validation_list_action';

const ValidationListContainer = props => <ValidationList {...props} />;

const mapStateToProps = state => ({
  validation_list: state.config_validation_definition.validation_list,
  ajax_call_ajax: state.common.ajax_call_ajax
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getValidations,
      resetStateValidationList
    },
    dispatch
  )
});
export default connect(mapStateToProps, mapDispatchToProps)(
  ValidationListContainer
);
