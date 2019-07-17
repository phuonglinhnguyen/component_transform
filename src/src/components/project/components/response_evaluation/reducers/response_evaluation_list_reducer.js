import * as types from '../constants/response_evaluation_constants';

const initialState = {
  is_fetching: false,

  response_evaluations: []
};

const response_evaluation_list = (state = initialState, action) => {
  switch (action.type) {
    case types.PROJECT_RESPONSE_EVALUATION_LIST_REQUEST:
      return {
        ...state,
        is_fetching: true,
      };
    case types.PROJECT_RESPONSE_EVALUATION_LIST_SET_DATAS:
      return {
        ...state,
        response_evaluations: action.response_evaluations,
        is_fetching: false
      };
    case types.PROJECT_RESPONSE_EVALUATION_LIST_RESET_DATA:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default response_evaluation_list;
