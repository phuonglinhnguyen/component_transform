import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import FieldItem from '../components/field_item_component';
// import FieldDialog from './field_dialog_container';
import Dialog from '../../../../common/dialog/containers/dialog_container';
import FieldProcessing from '../../../../common/snackbars/containers/common_processing_container';

import { setDialogField } from '../actions/field_common_action';
import {
  setDialog,
  resetDialog
} from '../../../../common/dialog/actions/dialog_common_action';

import {
  handleChangeFieldRelated,
  handleOnChangeFieldTest,
  handleFocusOut
} from '../actions/field_preview_action';

import {
  changeView,
  deleteField,
  getFieldById,
  getRelatedParameter,
  insertField,
  modifyField,
  resetFieldItemWhenUnmount,
  resetStateFieldItem,
  updateField
} from '../actions/field_item_action';

import { I18n, Translate } from 'react-redux-i18n';

const FieldItemContainer = props => (
  <div
    className="special_scroll"
    style={{
      width: "100%",
      //height: 'calc(100vh)',
      //marginLeft: '25%',
      overflowY: 'scroll',
      overflowX: 'hidden',
      backgroundColor: props.muiTheme.palette.background1Color
    }}
  >
    <Dialog Translate={Translate} />
    <FieldProcessing muiTheme={props.muiTheme} Translate={Translate} />

    <FieldItem I18n={I18n} Translate={Translate} {...props} />
  </div>
);

FieldItemContainer.propTypes = {
  field_item: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const pathname = state.router.location.pathname;
  const { field_list, field_item, field_preview } = state.field_definition;
  const patterns = state.config_pattern_definition.pattern_list.patterns;
  const validations = state.config_validation_definition.validation_list.datas;
  const lookups = state.config_lookup_definition.lookup_list.datas;
  const lookup_selector = state.config_lookup_definition.lookup_selector;
  const rule_transforms =
    state.config_transform_rule_definition.transform_rule_list.datas;
  const { is_error, is_redirect } = state.common.common_processing;
  return {
    is_error,
    is_redirect,
    pathname,
    field_item,
    field_preview,
    list_field: field_list.fields,
    list_lookup: lookups,
    list_pattern: patterns,
    list_validation: validations,
    lookup_selector: lookup_selector,
    rule_transforms
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getFieldById,
        getRelatedParameter,
        modifyField,
        updateField,
        insertField,
        deleteField,
        resetStateFieldItem,
        changeView,

        setDialog,
        resetDialog,

        setDialogField,

        handleChangeFieldRelated,
        handleOnChangeFieldTest,
        handleFocusOut,

        resetFieldItemWhenUnmount
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldItemContainer);
