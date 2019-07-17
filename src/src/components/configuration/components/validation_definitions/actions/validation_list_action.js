import axios from "axios";
import * as types from "../constants/validation_constants";
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';

import { errorCall } from "../../../../common/ajax/call_ajax/actions/call_ajax_action";

const responseValidations = data => ({
  type: types.VALIDATION_LIST_RESPONSE,
  datas: data
});

export const getValidations = () => dispatch => {
  dispatch({
    type: types.VALIDATION_LIST_REQUEST
  });

  return axios
    .get(`${API_ENDPOINT}/apps/${APP_NAME}/validation-definitions`)
    .then(res => dispatch(responseValidations(res.data)))
    .catch(error => {
      dispatch(responseValidations([]));
      return dispatch(errorCall(error.message));
    });
};

export const resetStateValidationList = () => ({
  type: types.VALIDATION_LIST_RESET_DATA
});
