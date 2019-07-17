import axios from 'axios';
import * as types from '../constants/service_constants';
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';


import { errorCall } from '../../../../common/ajax/call_ajax/actions/call_ajax_action';

const responseServices = data => ({
  type: types.SERVICE_LIST_RESPONSE,
  datas: data
});

export const getServices = () => dispatch => {
  dispatch({
    type: types.SERVICE_LIST_REQUEST
  });

  return axios
    .get(`apps/${APP_NAME}/services`)
    .then(res => dispatch(responseServices(res.data)))
    .catch(error => {
      dispatch(responseServices([]));
      return dispatch(errorCall(error.message));
    });
};

export const resetStateServiceList = () => ({
  type: types.SERVICE_LIST_RESET_DATA
});
