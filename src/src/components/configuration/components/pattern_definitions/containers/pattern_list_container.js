import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PatternList from '../components/pattern_list_component';

import {
  getPatternList,
  resetStatePatternList
} from '../actions/pattern_list_action';

const PatternListContainer = props => <PatternList {...props} />;

const mapStateToProps = state => ({
  pattern_list: state.config_pattern_definition.pattern_list,
  ajax_call_ajax: state.common.ajax_call_ajax
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getPatternList,
      resetStatePatternList
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PatternListContainer
);
