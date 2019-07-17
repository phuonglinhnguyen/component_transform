import axios from 'axios';

import * as types from '../constants/field_constants';
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';

import {
  handleExtractData,
  openRespondSnackbar
} from '../../../../common/snackbars/actions/common_action';

const setList = fields => ({
  type: types.FIELD_LIST_SET_DATAS,
  fields: fields
});

const requestList = () => ({
  type: types.FIELD_LIST_REQUEST
});

export const getList = project_id => (dispatch, getState) => {
  const field_list = getState().field_definition.field_list;

  if (field_list.is_fetching) {
    return;
  }

  dispatch(requestList());

  return axios(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/field-value-definitions`, {
    method: 'GET'
  })
    .then(res => {
      dispatch(setList(handleExtractData(res)));
    })
    .catch(error => {
      dispatch(setList([]));
      if (!error.toString().includes('not_found')) {
        dispatch(openRespondSnackbar(error.toString(), true));
      }
    });
};

export const resetStateFieldList = () => ({
  type: types.FIELD_LIST_RESET_DATA
});

export default {
  resetStateFieldList,
  getList
}
