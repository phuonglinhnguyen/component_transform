import axios from "axios";
import * as types from "../constants/transform_rule_constants";
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';


import { errorCall } from "../../../../common/ajax/call_ajax/actions/call_ajax_action";

const responseTransformRules = data => ({
  type: types.TRANSFORM_RULE_LIST_RESPONSE,
  datas: data
});

export const getTransformRules = () => dispatch => {
  dispatch({
    type: types.TRANSFORM_RULE_LIST_REQUEST
  });

  return axios
    .get(`${API_ENDPOINT}/apps/${APP_NAME}/transform-rule-definitions`)
    .then(res => dispatch(responseTransformRules(res.data)))
    .catch(error => {
      dispatch(responseTransformRules([]));
      return dispatch(errorCall(error.message));
    });
};

export const resetStateTransformRuleList = () => ({
  type: types.TRANSFORM_RULE_LIST_RESET_DATA
});
