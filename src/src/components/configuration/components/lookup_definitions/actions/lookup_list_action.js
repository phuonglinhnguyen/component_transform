import axios from "axios";
import * as types from "../constants/lookup_constants";
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';

import { errorCall } from "../../../../common/ajax/call_ajax/actions/call_ajax_action";

const responseLookups = data => ({
  type: types.LOOKUP_LIST_RESPONSE,
  datas: data
});

export const getLookups = () => dispatch => {
  dispatch({
    type: types.LOOKUP_LIST_REQUEST
  });

  return axios
    .get(`${API_ENDPOINT}/apps/${APP_NAME}/lookup-definitions`)
    .then(res => dispatch(responseLookups(res.data)))
    .catch(error => {
      dispatch(responseLookups([]));
      return dispatch(errorCall(error.message));
    });
};

export const resetStateLookupList = () => ({
  type: types.LOOKUP_LIST_RESET_DATA
});
