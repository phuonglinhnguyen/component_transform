import * as types from '../constants/export_configuration_constants';

const initialState = {
  is_fetching: false,
  datas: []
};

const export_configuration_list = (state = initialState, action) => {
  switch (action.type) {
    case types.EXPORT_CONFIGURATION_LIST_REQUEST:
      return {
        ...state,
        is_fetching: true
      };
    case types.EXPORT_CONFIGURATION_LIST_RECEIVE_DATAS:
      return {
        ...state,
        datas: action.datas,
        is_fetching: false
      };
    case types.EXPORT_CONFIGURATION_LIST_RESET_DATA:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default export_configuration_list;
