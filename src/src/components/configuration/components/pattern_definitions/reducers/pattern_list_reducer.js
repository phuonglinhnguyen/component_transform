import * as types from '../constants/pattern_constants';

const initialState = {
  is_fetching: false,

  patterns: []
};

const pattern_list = (state = initialState, action) => {
  switch (action.type) {
    case types.PATTERN_LIST_REQUEST:
      return {
        ...state,
        is_fetching: true,
      };
    case types.PATTERN_LIST_SET_DATAS:
      return {
        ...state,
        patterns: action.patterns,
        is_fetching: false
      };
    case types.PATTERN_LIST_RESET_DATA:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default pattern_list;
