import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IOConfiguration from '../components/io_pre_defined_component'
import { Translate } from 'react-redux-i18n';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {
  closeDialogExport,
  exportCheckItems,
  openDialogExport,
  exportDatas
} from '../actions/export_pre_defined_actions'

import {
  openDialogImport,
  closeDialogImport,
  importCheckItems,
  importDatas,
  importChangeFile
}
  from '../actions/import_pre_defined_actions'
import CommonProcessing from '../../../../common/snackbars/containers/common_processing_container';
const IOConfigurationContainer = props =>
  <div style={{width: "100%"}}>
    <CommonProcessing Translate={Translate} muiTheme={props.muiTheme}  {...props} />
    <IOConfiguration {...props} />
  </div>;

IOConfigurationContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  import_export_pre_defined: state.config_import_export_pre_defined


});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      closeDialogExport,
      exportCheckItems,
      openDialogExport,
      exportDatas,
      openDialogImport,
      closeDialogImport,
      importCheckItems,
      importDatas,
      importChangeFile

    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(IOConfigurationContainer));
