import * as types from "../constants/lookup_constants";

const initial_state = {
  is_fetching: false,

  datas: []
};

const lookup_list = (state = { ...initial_state }, action) => {
  switch (action.type) {
    case types.LOOKUP_LIST_REQUEST:
      return {
        ...state,
        is_fetching: true
      };
    case types.LOOKUP_LIST_RESPONSE:
      return {
        ...state,
        datas: action.datas,
        is_fetching: false
      };
    case types.LOOKUP_LIST_RESET_DATA:
      return {
        ...initial_state
      };
    default:
      return state;
  }
};

export default lookup_list;
