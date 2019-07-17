import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LookupItem from '../components/lookup_item_component';

import * as actions from '../actions/lookup_item_action';
import default_props from '../../../../common/default_props';

const LookupItemContainer = props => (
  <LookupItem {...props} default_props={default_props} />
);

const mapStateToProps = state => {
  const { lookup_item } = state.config_lookup_definition;
  const ajax_call_ajax = state.common.ajax_call_ajax;

  return {
    ajax_call_ajax,
    lookup_item
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
  LookupItemContainer
);
