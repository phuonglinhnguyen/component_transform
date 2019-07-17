import * as types from '../constants/lookup_constants';
import clone from "clone";

export const initial_lookup = {
  [types.KEY_LOOKUP_ALLOW_MULTIPLE]: false,
  [types.KEY_LOOKUP_CHARACTERS_TRIGGER_LOOKUP]: 1,
  [types.KEY_LOOKUP_GROUP_PROJECT]: 'ancestry',
  [types.KEY_LOOKUP_KEY_VALUE]: 'data_value',
  [types.KEY_LOOKUP_LOCALE]: [],
  [types.KEY_LOOKUP_LOOKUP_AFTER_TIME]: 1,
  [types.KEY_LOOKUP_LOOKUP_FIELD]: '',
  [types.KEY_LOOKUP_NAME]: '',
  [types.KEY_LOOKUP_PARAM_SET]: 'return []',
  [types.KEY_LOOKUP_RESULT_VIEW_CONFIG]: [],
  [types.KEY_LOOKUP_RELATED_COLUMNS]: []
};

const error_text = '';

const initial_label_error = {
  name: error_text,
  locale: error_text,
  lookup_field: error_text
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
 
   // Validation
   label_error: { ...initial_label_error },
 
   data: { ...initial_lookup },
};

const lookup_item = (state = clone(initial_state), action) => {
  switch (action.type) {
    case types.LOOKUP_ITEM_CREATE_EMPTY_DATA:
      return {
        ...clone(initial_state),
        is_create: true
      };
    case types.LOOKUP_ITEM_REQUEST:
      return {
        ...state,
        is_fetching: true
      };
    case types.LOOKUP_ITEM_RESPONSE:
      return {
        ...state,
        data: { ...initial_lookup, ...action.data },
        is_fetching: false
      };
    case types.LOOKUP_ITEM_MODIFY_DATA:
      return {
        ...state,
        data: action.data
      };
    case types.LOOKUP_ITEM_VALIDATE_DATA:
      return {
        ...state,
        label_error: action.label_error
      };
    case types.LOOKUP_ITEM_ERROR_DATA:
      return {
        ...state,
        is_error: true,
        is_fetching: false
      };
    case types.LOOKUP_ITEM_SHOW_DIALOG:
      return {
        ...state,
        show_confirm: true,
        title_confirm: action.title_confirm
      };
    case types.LOOKUP_ITEM_HIDE_DIALOG:
      return {
        ...state,
        show_confirm: false
      };
    case types.LOOKUP_ITEM_RESET:
      return clone(initial_state);
    default:
      return state;
  }
};

export default lookup_item;
