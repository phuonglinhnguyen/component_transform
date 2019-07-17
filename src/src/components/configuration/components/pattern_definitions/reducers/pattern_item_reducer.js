import * as types from "../constants/pattern_constants";
import clone from "clone";

export const initial_pattern = {
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

  // Pattern
  error_field_name: "",

  data: { ...initial_pattern }
};

const pattern_item = (state = clone(initial_state), action) => {
  switch (action.type) {
    case types.PATTERN_ITEM_CREATE_EMPTY_DATA:
      return {
        ...clone(initial_state),
        is_create: true
      };
    case types.PATTERN_ITEM_REQUEST:
      return {
        ...state,
        is_fetching: true
      };
    case types.PATTERN_ITEM_RESPONSE:
      return {
        ...state,
        data: { ...initial_pattern, ...action.data },
        is_fetching: false
      };
    case types.PATTERN_ITEM_MODIFY_DATA:
      return {
        ...state,
        data: action.data
      };
    case types.PATTERN_ITEM_VALIDATED:
      return {
        ...state,
        error_field_name: action.error_field_name
      };
    case types.PATTERN_ITEM_ERROR_DATA:
      return {
        ...state,
        is_error: true,
        is_fetching: false
      };
    case types.PATTERN_ITEM_SHOW_DIALOG:
      return {
        ...state,
        show_confirm: true,
        title_confirm: action.title_confirm
      };
    case types.PATTERN_ITEM_HIDE_DIALOG:
      return {
        ...state,
        show_confirm: false
      };
    case types.PATTERN_ITEM_RESET:
      return clone(initial_state);
    default:
      return state;
  }
};

export default pattern_item;
