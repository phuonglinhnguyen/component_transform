import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PatternItem from '../components/pattern_item_component';

import * as actions from '../actions/pattern_item_action';

import default_props from '../../../../common/default_props';

const PatternItemContainer = props => (
  <PatternItem {...props} default_props={default_props} />
);

const mapStateToProps = state => {
  const { pattern_item } = state.config_pattern_definition;
  const ajax_call_ajax = state.common.ajax_call_ajax;

  return {
    ajax_call_ajax,
    pattern_item
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  PatternItemContainer
);
