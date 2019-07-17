import * as types from "../constants/error_constants";
import clone from "clone";

const initial_error = {
  name: "",
  arguments: {},
  content: ``
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
  title_confirm: "",

  // Error
  error_field_name: "",

  data: { ...initial_error }
};

const error_item = (state = clone(initial_state), action) => {
  switch (action.type) {
    case types.ERROR_ITEM_CREATE_EMPTY_DATA:
      return {
        ...clone(initial_state),
        is_create: true
      };
    case types.ERROR_ITEM_REQUEST:
      return {
        ...state,
        is_fetching: true
      };
    case types.ERROR_ITEM_RESPONSE:
      return {
        ...state,
        data: { ...initial_error, ...action.data },
        is_fetching: false
      };
    case types.ERROR_ITEM_MODIFY_DATA:
      return {
        ...state,
        data: action.data
      };
    case types.ERROR_ITEM_VALIDATE:
      return {
        ...state,
        error_field_name: action.error_field_name
      };
    case types.ERROR_ITEM_ERROR_DATA:
      return {
        ...state,
        is_error: true,
        is_fetching: false
      };
    case types.ERROR_ITEM_SHOW_DIALOG:
      return {
        ...state,
        show_confirm: true,
        title_confirm: action.title_confirm
      };
    case types.ERROR_ITEM_HIDE_DIALOG:
      return {
        ...state,
        show_confirm: false
      };
    case types.ERROR_ITEM_RESET:
      return clone(initial_state);
    default:
      return state;
  }
};

export default error_item;
