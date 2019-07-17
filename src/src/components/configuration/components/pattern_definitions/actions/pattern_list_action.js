import axios from 'axios';

import * as types from '../constants/pattern_constants';
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';

import { errorCall } from '../../../../common/ajax/call_ajax/actions/call_ajax_action';

const setPatternList = list => ({
  type: types.PATTERN_LIST_SET_DATAS,
  patterns: list
});

export const getPatternList = () => (dispatch, getState) => {
  dispatch({
    type: types.PATTERN_LIST_REQUEST
  });

  return axios
    .get(`${API_ENDPOINT}/apps/${APP_NAME}/pattern-definitions`)
    .then(res => dispatch(setPatternList(res.data)))
    .catch(error => {
      dispatch(setPatternList([]));
      return dispatch(errorCall(error.message));
    });
};

export const resetStatePatternList = () => ({
  type: types.PATTERN_LIST_RESET_DATA
});
