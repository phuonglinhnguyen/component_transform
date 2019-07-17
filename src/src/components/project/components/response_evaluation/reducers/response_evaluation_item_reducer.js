import * as types from '../constants/response_evaluation_constants';

const initial_response_evaluation = {

  name: '',
  key: '',
  values: [{ '': '' }]

};
const initial_response_evaluation_error = {

  name: '',
  key: '',
  values: [{ key: '', value: '' }]
};

const initialState = {
  is_response_evaluation: false,
  is_fetching: false,
  fields: [],
  response_evaluation: { ...initial_response_evaluation },
  response_evaluation_error: { ...initial_response_evaluation_error }
};

const response_evaluation_item = (state = initialState, action) => {
  switch (action.type) {

    case types.PROJECT_RESPONSE_EVALUATION_ITEM_REQUEST_DATA:
      return {
        ...state,
        is_fetching: true,
        response_evaluation: {},
        response_evaluation_error: {}
      };
    case types.PROJECT_RESPONSE_EVALUATION_ITEM_RECEIVE_DATA:
      return {
        ...state,
        response_evaluation: { ...initial_response_evaluation, ...action.response_evaluation },
        response_evaluation_error: { ...action.response_evaluation_error },
        is_fetching: false
      };
    case types.PROJECT_RESPONSE_EVALUATION_ITEM_MODIFY_DATA:
      return {
        ...state,
        response_evaluation: action.response_evaluation,
        response_evaluation_error: action.response_evaluation_error
      };
    case types.PROJECT_RESPONSE_EVALUATION_ITEM_INSERT_DATA:
      return {
        ...state,
        response_evaluation: action.response_evaluation
      };
    case types.PROJECT_RESPONSE_EVALUATION_ITEM_RESET_DATA:
      return {
        ...initialState
      };
    case types.PROJECT_RESPONSE_EVALUATION_LIST_FIELD_REQUEST:
      return {
        ...state,
        is_fetching: true
      };
    case types.PROJECT_RESPONSE_EVALUATION_LIST_FIELD_RECEIVE:
      return {
        ...state,
        is_fetching: false,
        fields: action.fields
      };
    default:
      return state;
  }
};

export default response_evaluation_item;
