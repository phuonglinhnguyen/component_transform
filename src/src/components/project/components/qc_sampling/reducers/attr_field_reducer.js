import * as types from '../constants/qc_sampling_constant';

const initialState = {
  is_fetching: false,
  search_text: '',
  information: '',
  original_datas: [],
  datas_selected: [],
  datas: []
};

const attr_batch = (state = initialState, action) => {
  switch (action.type) {
    case types.ATTR_FIELD_REQUEST_DATAS:
      return {
        ...state,
        is_fetching: true,
        datas: [],
        original_datas: []
      };
    case types.ATTR_FIELD_RECIEVE_DATAS:
      return {
        ...state,
        is_fetching: false,
        information: action.information || '',
        search_text: action.search_text,
        original_datas: [...action.original_datas],
        datas: [...action.datas]
      };
    case types.ATTR_FIELD_SELECT_DATAS:
      return {
        ...state,
        datas_selected: [...action.datas_selected]
      };
    case types.ATTR_FIELD_RESET_DATAS:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default attr_batch;
