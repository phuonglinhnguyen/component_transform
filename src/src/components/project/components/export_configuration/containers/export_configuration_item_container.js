import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';


import ExportConfigurationItem from '../components/export_configuration_item_component';
import Processing from '../../../../common/snackbars/containers/common_processing_container';

import {
  getExportConfiguration,
  updateExportConfig,
  deleteExportConfiguration,
  resetStateExportConfigurationItem,
  setCompleter,
  updateFieldTypeRootConfig,
  addFieldTypeRootConfig
} from '../actions/export_configuration_item_action';

import {
  updateFieldExport,
  modifyFieldExport,
  onClickTransferField
} from '../actions/export_configuration_fields_action';

import {
  actionAddNewType,
  actionEditFileExport,
  actionDeleteTypeReport
} from '../actions/export_configuration_type_action';

import {
  setDialog,
  resetDialog
} from '../actions/export_configuration_dialog_action';

import { setDialog as setDialogCommon } from '../../../../common/dialog/actions/dialog_common_action';

import { Translate } from 'react-redux-i18n';

import default_props from '../../../../common/default_props';

const ExportConfigurationItemContainer = props => (
  <div
    style={{
      backgroundColor: props.muiTheme.palette.background1Color,
      overflow : 'hidden',
      width: "100%",
      marginBottom:"20px"
    }}
  > 

    <Processing
      Translate={Translate}
      default_props={default_props}
      muiTheme={props.muiTheme}
    />
    <ExportConfigurationItem
      Translate={Translate}
      default_props={default_props}
      {...props}
    />
  </div>
);

ExportConfigurationItemContainer.propTypes = {
  export_configuration_item: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const pathname = state.router.location.pathname;
  const dialog = state.export_configuration.export_configuration_dialog;
  const is_fetching_field = state.field_definition.field_list.is_fetching;
  const { export_configuration_item } = state.export_configuration;
  const { is_error, is_redirect } = state.common.common_processing;
  const { is_fetching } = state.export_configuration.export_configuration_list;
  return {
    dialog,
    pathname,
    export_configuration_item,
    is_error,
    is_fetching,
    is_fetching_field,
    is_redirect
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        actionAddNewType,
        actionDeleteTypeReport,
        actionEditFileExport,
        deleteExportConfiguration,
        getExportConfiguration,
        modifyFieldExport,
        onClickTransferField,
        resetDialog,
        resetStateExportConfigurationItem,
        setCompleter,
        setDialog,
        setDialogCommon,
        updateExportConfig,
        updateFieldExport,
        updateFieldTypeRootConfig,
        addFieldTypeRootConfig
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ExportConfigurationItemContainer
);
