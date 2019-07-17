//@flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import QCSampling from '../components/qc_sampling_main_page_component';
import AjaxItem from '../../../../common/ajax/call_ajax/containers/call_ajax_container';

import {
  getFilterAttributes,
  modifyAQL,
  handleOpenCloseBigMenus,
  resetQCSamplingState
} from '../actions/qc_sampling_action';

import {
  handleCalculateAQLQuantity,
  handleGetSample
} from '../actions/calculate_aql_action';

import {
  getAttrBatches,
  actionSelectBatches,
  loadMoreItem
} from '../actions/attr_batch_action';

import {
  getAttrLayouts,
  actionSelectLayouts
} from '../actions/attr_layout_action';

import { getAttrUsers, actionSelectUsers } from '../actions/attr_user_action';
import {
  getAttrFields,
  actionSelectFields
} from '../actions/attr_field_action';

import muiThemeable from 'material-ui/styles/muiThemeable';
import { Translate } from 'react-redux-i18n';

const QCSamplingContainer = props => (
  <div
    style={{
      margin: 2
    }}
  >
    <QCSampling Translate={Translate} {...props} />
    <AjaxItem Translate={Translate} />
  </div>
);

const mapStateToProps = (state: any) => {
  const filter_attr_batch =
    state.qc_sampling.filter_attribute.filter_attr_batch;
  const filter_attr_section =
    state.qc_sampling.filter_attribute.filter_attr_section;
  const filter_attr_layout =
    state.qc_sampling.filter_attribute.filter_attr_layout;
  const filter_attr_user = state.qc_sampling.filter_attribute.filter_attr_user;
  const filter_attr_field =
    state.qc_sampling.filter_attribute.filter_attr_field;

  const {
    aql_conditions,
    is_calculating,
    is_fetching,
    is_calculated,
    is_sampling,
    open_big_menu,
    sampling_results
  } = state.qc_sampling.qc_sampling;
  return {
    filter_attr_batch,
    filter_attr_section,
    filter_attr_layout,
    filter_attr_user,
    filter_attr_field,

    open_big_menu,
    aql_conditions,
    is_calculating,
    is_sampling,
    is_calculated,
    is_fetching,
    sampling_results
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getFilterAttributes,
        modifyAQL,
        handleCalculateAQLQuantity,
        handleOpenCloseBigMenus,
        handleGetSample,

        getAttrBatches,
        getAttrUsers,
        getAttrFields,
        getAttrLayouts,

        actionSelectBatches,
        actionSelectFields,
        actionSelectUsers,
        actionSelectLayouts,

        loadMoreItem,

        resetQCSamplingState
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  muiThemeable()(QCSamplingContainer)
);
