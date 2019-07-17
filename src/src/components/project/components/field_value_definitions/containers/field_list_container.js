import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FieldList from '../components/field_list_component';
import FieldProcessing from '../../../../common/snackbars/containers/common_processing_container';

import { Translate } from 'react-redux-i18n';

import { closeSnackbar } from '../../../../common/snackbars/actions/common_action';
import { getList, resetStateFieldList } from '../actions/field_list_action';

const FieldListContainer = props => (
  <div style={{ padding: 2, width: "100%"}}>
    <FieldProcessing muiTheme={props.muiTheme} Translate={Translate} />
    <FieldList Translate={Translate} {...props} />
  </div>
);

const mapStateToProps = state => {
  const field_list = state.field_definition.field_list;
  const is_error = state.common.common_processing.is_error;

  return {
    is_error: is_error,
    fields: field_list.fields,
    is_fetching: field_list.is_fetching
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getList,
      closeSnackbar,
      resetStateFieldList
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(FieldListContainer);
