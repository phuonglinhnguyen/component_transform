import * as types from '../constants/qc_sampling_constant';

const initial_aql_conditions = {
  [types.QC_CONDITION_KEY_INSPECTION_LEVEL]: {},
  error_threshold: 0,
  apply_aql_user: false,
  condition_preview: [],
  condition_header: [
    { name: 'batch_name', title: 'batch_name', sort: true },
    { name: 'keyer', title: 'keyer', sort: true },
    { name: 'inspection', title: 'inspection_level', sort: true },
    {
      name: 'error_threshold',
      title: 'error_threshold',
      sort: true,
      align_right: true
    }
  ]
};

const initial_sampling_results = {
  is_calculating: false,
  is_sampling: false,
  original_results: [],
  results: [],
  headers: []
};

const initial_open_big_menu = {
  [types.QC_CONDITION_KEY_BATCH]: null,
  [types.QC_CONDITION_KEY_SECTION]: null,
  [types.QC_CONDITION_KEY_QC_FIELDS]: null,
  [types.QC_CONDITION_KEY_KEYER]: null
};

const initialState = {
  is_fetching: false,
  is_calculated: false,
  aql_table: {},
  aql_conditions: { ...initial_aql_conditions },
  open_big_menu: { ...initial_open_big_menu },
  sampling_results: { ...initial_sampling_results }
};

const qc_sampling = (state = initialState, action) => {
  switch (action.type) {
    case types.ATTR_CONDITION_SEND_REQUEST:
      return {
        ...state,
        is_fetching: true
      };
    case types.ATTR_CONDITION_RECIEVE_RESULT:
      return {
        ...state,
        aql_table: { ...action.aql_table },
        is_fetching: false
      };
    case types.QC_SAMPLING_UPDATE_SAMPLING_CONDITIONS:
      return {
        ...state,
        is_calculated: false,
        aql_conditions: { ...action.aql_conditions }
      };
    case types.QC_SAMPLING_SEND_REQUEST_CALCULATE:
      return {
        ...state,

        sampling_results: {
          ...initial_sampling_results,
          is_calculating: true
        }
      };
    case types.QC_SAMPLING_RECIEVE_RESULT_CALCULATE:
      return {
        ...state,
        is_calculated: true,
        aql_conditions: { ...state.aql_conditions, condition_preview: [] },
        sampling_results: {
          ...action.sampling_results,
          is_calculating: false
        }
      };
    case types.QC_SAMPLING_UPDATE_BIG_MENUS:
      return {
        ...state,
        open_big_menu: { ...initial_open_big_menu, ...action.open_big_menu }
      };
    case types.QC_SAMPLING_SEND_REQUEST_SAMPLE:
      return {
        ...state,
        sampling_results: {
          ...state.sampling_results,
          is_sampling: true
        }
      };
    case types.QC_SAMPLING_RESET_STATE:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default qc_sampling;
