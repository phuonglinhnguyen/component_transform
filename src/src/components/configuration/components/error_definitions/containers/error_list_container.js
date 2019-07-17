import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ErrorList from '../components/error_list_component';

import {
  getErrors,
  resetStateErrorList
} from '../actions/error_list_action';

const ErrorListContainer = props => <ErrorList {...props} />;

const mapStateToProps = state => ({
  error_list: state.config_error_definition.error_list,
  ajax_call_ajax: state.common.ajax_call_ajax
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getErrors,
      resetStateErrorList
    },
    dispatch
  )
});
export default connect(mapStateToProps, mapDispatchToProps)(
  ErrorListContainer
);
