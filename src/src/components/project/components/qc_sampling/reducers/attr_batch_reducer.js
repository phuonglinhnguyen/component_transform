import * as types from '../constants/qc_sampling_constant';

const initialState = {
  is_fetching: false,
  datas: [],
  original_datas: [],
  information: '',
  datas_selected: [],
  is_load_more: false,
  search_text: ''
};

const attr_batch = (state = initialState, action) => {
  switch (action.type) {
    case types.ATTR_BATCH_REQUEST_DATAS:
      return {
        ...state,
        is_fetching: true
      };
    case types.ATTR_BATCH_RECIEVE_DATAS:
      return {
        ...state,
        is_fetching: false,
        is_load_more: action.is_load_more,
        information: action.information || '',
        datas: [...action.datas],
        original_datas: [...action.original_datas],
        search_text: action.search_text
      };
    case types.ATTR_BATCH_SELECT_DATAS:
      return {
        ...state,
        datas_selected: [...action.datas_selected]
      };
    case types.ATTR_BATCH_RESET_DATAS:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default attr_batch;
