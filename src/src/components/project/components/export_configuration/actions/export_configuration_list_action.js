import axios from 'axios';

import * as types from '../constants/export_configuration_constants';

import {
  handleExtractData,
  handleError
} from '../../../../common/snackbars/actions/common_action';
import { API_ENDPOINT ,APP_NAME} from '../../../../../constants';
const receiveList = list => ({
  type: types.EXPORT_CONFIGURATION_LIST_RECEIVE_DATAS,
  datas: list
});

export const requestList = () => ({
  type: types.EXPORT_CONFIGURATION_LIST_REQUEST
});

export const getList = (projectId: string) => (dispatch, getState) => {
  const export_configuration_list = getState().export_configuration
    .export_configuration_list;
  if (export_configuration_list.is_fetching) {
    return;
  }

  dispatch(requestList());
  return axios(
    `${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/export_configurations?includes=export_configurations`,
    {
      method: 'GET'
    }
  )
    .then(handleExtractData)
    .then(res => {
      const export_configurations = res.export_configurations || [];
      dispatch(receiveList(export_configurations));
    })
    .catch(error => {
      dispatch(receiveList([]));
      dispatch(handleError(error));
    });
};

export const resetStateExportConfigurationList = () => ({
  type: types.EXPORT_CONFIGURATION_LIST_RESET_DATA
});
