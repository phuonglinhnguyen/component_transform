import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TransformRuleList from '../components/transform_rule_list_component';

import {
  getTransformRules,
  resetStateTransformRuleList
} from '../actions/transform_rule_list_action';

const TransformRuleListContainer = props => <TransformRuleList {...props} />;

const mapStateToProps = state => ({
  transform_rule_list: state.config_transform_rule_definition.transform_rule_list,
  ajax_call_ajax: state.common.ajax_call_ajax
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getTransformRules,
      resetStateTransformRuleList
    },
    dispatch
  )
});
export default connect(mapStateToProps, mapDispatchToProps)(
  TransformRuleListContainer
);
