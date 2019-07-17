import * as types from '../constants/error_constants';

const initialState = {
  is_fetching: false,

  errors: []
};

const error_list = (state = { ...initialState }, action) => {
  switch (action.type) {
    case types.ERROR_LIST_REQUEST:
      return {
        ...state,
        is_fetching: true
      };
    case types.ERROR_LIST_RESPONSE:
      return {
        ...state,
        errors: action.errors,
        is_fetching: false
      };
    case types.ERROR_LIST_RESET_DATA:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default error_list;
