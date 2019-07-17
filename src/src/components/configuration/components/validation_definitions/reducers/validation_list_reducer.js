import * as types from "../constants/validation_constants";

const initialState = {
  is_fetching: false,

  datas: []
};

const validation_list = (state = { ...initialState }, action) => {
  switch (action.type) {
    case types.VALIDATION_LIST_REQUEST:
      return {
        ...state,
        is_fetching: true
      };
    case types.VALIDATION_LIST_RESPONSE:
      return {
        ...state,
        datas: action.datas,
        is_fetching: false
      };
    case types.VALIDATION_LIST_RESET_DATA:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default validation_list;
