import * as types from "../constants/transform_rule_constants";

const initialState = {
  is_fetching: false,

  datas: []
};

const transform_rule_list = (state = { ...initialState }, action) => {
  switch (action.type) {
    case types.TRANSFORM_RULE_LIST_REQUEST:
      return {
        ...state,
        is_fetching: true
      };
    case types.TRANSFORM_RULE_LIST_RESPONSE:
      return {
        ...state,
        datas: action.datas,
        is_fetching: false
      };
    case types.TRANSFORM_RULE_LIST_RESET_DATA:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default transform_rule_list;
