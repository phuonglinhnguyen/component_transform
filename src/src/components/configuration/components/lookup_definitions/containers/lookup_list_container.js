import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LookupList from '../components/lookup_list_component';

import {
  getLookups,
  resetStateLookupList
} from '../actions/lookup_list_action';

const LookupListContainer = props => <LookupList {...props} />;

const mapStateToProps = state => ({
  lookup_list: state.config_lookup_definition.lookup_list,
  ajax_call_ajax: state.common.ajax_call_ajax
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getLookups,
      resetStateLookupList
    },
    dispatch
  )
});
export default connect(mapStateToProps, mapDispatchToProps)(
  LookupListContainer
);
