import * as types from '../constants/service_constants';

const initialState = {
  is_fetching: false,

  datas: []
};

const service_list = (state = { ...initialState }, action) => {
  switch (action.type) {
    case types.SERVICE_LIST_REQUEST:
      return {
        ...state,
        is_fetching: true
      };
    case types.SERVICE_LIST_RESPONSE:
      return {
        ...state,
        datas: action.datas,
        is_fetching: false
      };
    case types.SERVICE_LIST_RESET_DATA:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default service_list;
