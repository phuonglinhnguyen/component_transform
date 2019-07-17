import axios from 'axios';

import * as types from '../constants/response_evaluation_constants';
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';

import {
  handleExtractData,
} from '../../../../common/snackbars/actions/common_action';

const setList = list => ({
  type: types.PROJECT_RESPONSE_EVALUATION_LIST_SET_DATAS,
  response_evaluations: list
});

export const requestList = () => ({
  type: types.PROJECT_RESPONSE_EVALUATION_LIST_REQUEST
});

export const getList = (projectId) => (dispatch, getState) => {
  const response_evaluation_list = getState().project.response_evaluation.response_evaluation_list;
  if (response_evaluation_list.is_fetching || response_evaluation_list.response_evaluations.length > 0) {
    return;
  }

  dispatch(requestList());

  return axios(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/response-evaluations`, {
    method: 'GET'
  })
    .then(handleExtractData)
    .then(res => {
    
      dispatch(setList(res));
    })
    .catch(error => {
      dispatch(setList([]));
     // dispatch(openRespondSnackbar(error, true));
    });
};

export const resetStateResponseEvaluationList = () => ({
  type: types.PROJECT_RESPONSE_EVALUATION_LIST_RESET_DATA
});
