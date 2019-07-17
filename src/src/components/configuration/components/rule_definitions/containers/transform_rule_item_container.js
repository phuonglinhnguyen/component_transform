import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TransformRuleItem from '../components/transform_rule_item_component';

import * as actions from '../actions/transform_rule_item_action';
import default_props from '../../../../common/default_props';

const TransformRuleItemContainer = props => (
  <TransformRuleItem {...props} default_props={default_props} />
);

const mapStateToProps = state => {
  const { transform_rule_item } = state.config_transform_rule_definition;
  const ajax_call_ajax = state.common.ajax_call_ajax;

  return {
    ajax_call_ajax,
    transform_rule_item
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
  TransformRuleItemContainer
);
