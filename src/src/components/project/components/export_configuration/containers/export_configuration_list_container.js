import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ExportConfigurationList from '../components/export_configuration_list_component';
import ExportConfigurationProcessing from '../../../../common/snackbars/containers/common_processing_container';

import { I18n, Translate } from 'react-redux-i18n';

import { closeSnackbar } from '../../../../common/snackbars/actions/common_action';
import {
  getList,
  resetStateExportConfigurationList
} from '../actions/export_configuration_list_action';

const ExportConfigurationListContainer = props => (
  <div style={{ margin: 2, flex: 'inherit' }}>
    <ExportConfigurationProcessing
      Translate={Translate}
      muiTheme={props.muiTheme}
    />
    {/* <p>this is the export page!</p> */}
    <ExportConfigurationList I18n={I18n} Translate={Translate} {...props} />
  </div>
);

const mapStateToProps = state => {
  const export_configuration_list =
    state.export_configuration.export_configuration_list;
  return {
    datas: export_configuration_list.datas,
    is_fetching: export_configuration_list.is_fetching
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      closeSnackbar,
      getList,
      resetStateExportConfigurationList
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ExportConfigurationListContainer
);
