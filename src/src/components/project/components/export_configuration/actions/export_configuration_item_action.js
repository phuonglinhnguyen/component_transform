import axios from 'axios';
import * as types from '../constants/export_configuration_constants';
import { resetDialog } from '../../../../common/dialog/actions/dialog_common_action';
import lodash from 'lodash';

import {
  checkProcessing,
  sendHttpRequest,
  handleError,
  openRespondSnackbar
} from '../../../../common/snackbars/actions/common_action';

import {
  getList,
  resetStateFieldList
} from '../../field_value_definitions/actions/field_list_action';
import {
  getList as getListConfig,
  resetStateExportConfigurationList
} from './export_configuration_list_action';
import { updateFieldExport } from './export_configuration_fields_action';
import { BPMN_ENDPOINT, API_ENDPOINT, APP_NAME } from '../../../../../constants';
import { getDataObject } from '@dgtx/coreui';
import clone from 'clone';

const insertSuccess = () => ({
  type: types.EXPORT_CONFIGURATION_ITEM_INSERT_DATA
});

const saveExportConfigs = (
  projectId: string,
  export_configurations: Array<Object>
) => {
  return axios(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({ export_configurations: export_configurations })
  });
};

export const receiveExportConfiguration = (data, originals_data) => {
  return {
    type: types.EXPORT_CONFIGURATION_ITEM_RECEIVE_DATA,
    export_configuration: data,
    originals_data: originals_data
  };
};

export const updateField = (params: Object) => ({
  type: types.EXPORT_CONFIGURATION_UPDATE_FIELD_TYPE_ROOT_CONFIG,
  datas: params,
});

export const updateFieldTypeRootConfig = (params: Object,) => (dispatch: any, getState: any) => {
  const {
    export_configuration_item
  } = getState().export_configuration;
  let newData = clone(export_configuration_item.data);
  if(getDataObject("type_exports.0.config.root.attrs", newData)){
    newData.type_exports[0].config.root.attrs = params.type_exports;
  }
  dispatch({
    type: types.EXPORT_CONFIGURATION_UPDATE_FIELD_TYPE_ROOT_CONFIG,
    data: newData
  });
}

export const addFieldTypeRootConfig = (data) => (dispatch: any, getState: any) => {
  const {
    export_configuration_item
  } = getState().export_configuration;
  let newData = clone(export_configuration_item.data)
  let item = {
    "name": data.name,
    "value": data.value
  }
  let index = getDataObject("index", data);
  if (getDataObject("type_exports.0.config.root.attrs", newData)) {
    if (index === -1) {
      if (data.name.length <= 0 || data.value.length <= 0) {
        return;
      }
      newData.type_exports[0].config.root.attrs.push(item);
    }
    else {
      if (data.name.length <= 0 && data.value.length <= 0) {
        newData.type_exports[0].config.root.attrs.splice(index, 1);
      }
      else {
        newData.type_exports[0].config.root.attrs[index] = item;
      }
    }
  }
  dispatch({
    type: types.EXPORT_CONFIGURATION_ADD_FIELD_ROOT_CONFIG,
    data: newData
  });

}

const getListFields = (
  projectId: string,
  index: string,
  export_configuration: Object = {}
) => async (dispatch: any, getState: any) => {
  await dispatch(getList(projectId));
  const fields = getState().field_definition.field_list.fields;

  let fields_project = [];
  const originals_field = [];
  for (var key in fields) {
    fields_project.push({ name: fields[key].name });
    originals_field.push(fields[key].name);
  }
  const _clone_fields = [...fields_project];
  if (index !== 'new') {
    const fields_export = export_configuration.fields_export;
    fields_project = lodash.differenceBy(fields_project, fields_export, 'name');
  }
  export_configuration.fields_project = [...fields_project];
  dispatch(
    receiveExportConfiguration(export_configuration, {
      fields_project: _clone_fields,
      fields_original: originals_field
    })
  );
};

export const getExportConfiguration = (
  projectId: string,
  index: number
) => async (dispatch, getState) => {
  await dispatch(getListConfig(projectId));
  let item = {};
  if (index !== 'new') {
    const export_configurations = getState().export_configuration
      .export_configuration_list.datas;
    item = export_configurations[index] || {};
  }
  dispatch(getListFields(projectId, index, item));
};

const checkNameIsNull = export_configuration =>
  !export_configuration[types.KEY_EXPORT_CONFIGURATION_NAME];

const checkNameConflict = (datas, item, configId) => {
  const index_name = lodash.findIndex(
    datas,
    _export_config => _export_config.name === item.name
  );
  if (index_name > -1 && configId === 'new') {
    return true;
  } else if (index_name > -1 && index_name !== parseInt(configId, 10)) {
    return true;
  }
  return false;
};

export const updateExportConfig = (
  projectId: string,
  configId: string,
  export_configuration: Object
) => async (dispatch, getState) => {
  if (checkNameIsNull(export_configuration) || checkProcessing(getState())) {
    dispatch(updateFieldExport(export_configuration, true));
    return;
  }
  const list_export_configurations = getState().export_configuration
    .export_configuration_list.datas;

  if (
    checkNameConflict(
      list_export_configurations,
      export_configuration,
      configId
    )
  ) {
    dispatch(
      openRespondSnackbar(
        `commons.http_status.conflict`,
        true,
        `Export configuration ${
        export_configuration[types.KEY_EXPORT_CONFIGURATION_NAME]
        } `,
        '',
        false
      )
    );
    return;
  }
  dispatch(sendHttpRequest());
  const data_ = lodash.omit(export_configuration, [
    'fields_original',
    'fields_project'
  ]);
  if (configId === 'new') {
    list_export_configurations.push(data_);
  } else {
    list_export_configurations[configId] = data_;
  }

  try {
    await saveExportConfigs(projectId, list_export_configurations);
    if (configId === 'new') {
      dispatch(
        openRespondSnackbar(
          'commons.notification.create_success',
          false,
          `Export configuration ${
          export_configuration[types.KEY_EXPORT_CONFIGURATION_NAME]
          } `
        )
      );
      dispatch(insertSuccess());
    } else {
      dispatch(
        openRespondSnackbar(
          'commons.notification.update_success',
          false,
          `Export configuration ${
          export_configuration[types.KEY_EXPORT_CONFIGURATION_NAME]
          } `
        )
      );
    }
  } catch (error) {
    dispatch(
      handleError(
        error,
        `Export configuration ${
        export_configuration[types.KEY_EXPORT_CONFIGURATION_NAME]
        } `,
        true
      )
    );
  }
};

export const deleteExportConfiguration = (
  projectId: string,
  index: number,
  name: string,
  history: any,
  redirecUrl: any
) => async (dispatch, getState) => {
  if (checkProcessing(getState())) {
    return;
  }

  dispatch(sendHttpRequest());
  const list_export_configurations = getState().export_configuration
    .export_configuration_list.datas;//
  list_export_configurations.splice(index, 1);
  try {
    await saveExportConfigs(projectId, list_export_configurations);
    dispatch(
      openRespondSnackbar(
        'commons.notification.delete_success',
        false,
        `Export configuration ${name} `
      )
    );
    history.push(redirecUrl);
  } catch (error) {
    dispatch(handleError(error, `Export configuration ${name}`, true));
  }
};

const resetStateExportConfigItem = () => ({
  type: types.EXPORT_CONFIGURATION_ITEM_RESET_DATA
});

export const setCompleter = langTools => dispatch => {
  // const api_reponse =

  let customCompleter = {
    getCompletions: function (editor, session, pos, prefix, callback) {
      callback(null, [
        {
          snippet: `/mnt/x-storageasaf/`,
          meta: 'elrond',
          caption: 'x_storage1'
        },
        { snippet: `/mnt/x-storage/1a`, meta: 'elrond', caption: 'x_storage2' },
        { snippet: `/mnt/x-storage/23`, meta: 'elrond', caption: 'x_storage3' }
      ]);
    }
  };
  langTools.addCompleter(customCompleter);
  return;
};

export const resetStateExportConfigurationItem = () => (dispatch: any) => {
  dispatch(resetDialog());
  dispatch(resetStateFieldList());
  dispatch(resetStateExportConfigurationList());
  dispatch(resetStateExportConfigItem());
};
