import axios from 'axios';
import * as types from '../constants/error_constants';
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';


import { errorCall } from '../../../../common/ajax/call_ajax/actions/call_ajax_action';

const responseErrors = data => ({
  type: types.ERROR_LIST_RESPONSE,
  errors: data
});

export const getErrors = () => dispatch => {
  dispatch({
    type: types.ERROR_LIST_REQUEST
  });

  return axios
    .get(`${API_ENDPOINT}/apps/${APP_NAME}/error-definitions`)
    .then(res => dispatch(responseErrors(res.data)))
    .catch(error => {
      dispatch(responseErrors([]));
      return dispatch(errorCall(error.message));
    });
};

export const resetStateErrorList = () => ({
  type: types.ERROR_LIST_RESET_DATA
});
