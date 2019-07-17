import * as types from '../constants/service_constants';
import clone from 'clone';

const initial_service = {
  service_name: '',
  java_class: '',
  parameters: []
};

const initial_state = {
  // create === true when param url is 'new'
  is_create: false,
  // error when not found data by id
  is_error: false,
  // fectching === true when get data
  is_fetching: false,

  // data for confirm
  show_confirm: false,
  title_confirm: '',

  // Service
  error_field_name: '',

  data: { ...initial_service }
};

const service_item = (state = clone(initial_state), action) => {
  switch (action.type) {
    case types.SERVICE_ITEM_CREATE_EMPTY_DATA:
      return {
        ...clone(initial_state),
        is_create: true
      };
    case types.SERVICE_ITEM_REQUEST:
      return {
        ...state,
        is_fetching: true
      };
    case types.SERVICE_ITEM_RESPONSE:
      return {
        ...state,
        data: { ...initial_service, ...action.data },
        is_fetching: false
      };
    case types.SERVICE_ITEM_MODIFY_DATA:
      return {
        ...state,
        data: action.data
      };
    case types.SERVICE_ITEM_SERVICE:
      return {
        ...state,
        error_field_name: action.error_field_name
      };
    case types.SERVICE_ITEM_ERROR_DATA:
      return {
        ...state,
        is_error: true,
        is_fetching: false
      };
    case types.SERVICE_ITEM_SHOW_DIALOG:
      return {
        ...state,
        show_confirm: true,
        title_confirm: action.title_confirm
      };
    case types.SERVICE_ITEM_HIDE_DIALOG:
      return {
        ...state,
        show_confirm: false
      };
    case types.SERVICE_ITEM_RESET:
      return clone(initial_state);
    default:
      return state;
  }
};

export default service_item;
