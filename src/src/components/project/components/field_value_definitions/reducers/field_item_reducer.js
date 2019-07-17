import * as types from '../constants/field_constants';
import * as validation_constants from '../../../../configuration/components/validation_definitions/constants/validation_constants';

import { initial_lookup } from '../../../../configuration/components/lookup_definitions/reducers/lookup_item_reducer';
import { initial_pattern } from '../../../../configuration/components/pattern_definitions/reducers/pattern_item_reducer';

const initial_validation = {
  [validation_constants.KEY_VALIDATION_NAME]: '',
  [validation_constants.KEY_VALIDATION_SCRIPT]: '',
  [validation_constants.KEY_VALIDATION_ARGUMENTS]: {}
};

const initial_transform_rule = {
  name: '',
  arguments: {},
  content: ``
};

export const initial_field = {
  [types.KEY_FIELD_NAME]: '',
  [types.KEY_FIELD_DISPLAY]: '',
  [types.KEY_DEFAULT_VALUE]: '',
  [types.KEY_CONTROL_TYPE]: '',
  [types.KEY_TOOLTIP]: '',
  [types.KEY_IS_LIST]: false,
  [types.KEY_IS_COUNT_CHARACTER]: true,
  [types.KEY_PATTERN]: { ...initial_pattern },
  [types.KEY_LOOKUP_SOURCE]: { ...initial_lookup },
  [types.KEY_VALIDATION]: { ...initial_validation },
  [types.KEY_RULE_TRANSFORM]: { ...initial_transform_rule },
  [types.KEY_LOOKUP_BROADCAST]: [],
  [types.KEY_VALUE_BROADCAST]: '',
  [types.KEY_ARGUMENT_DETAILS]: []
};

const initialState = {
  is_error: false,
  is_fetching: false,
  view_mode: 0,
  field: { ...initial_field }
};

const field_item = (state = initialState, action) => {
  switch (action.type) {
    case types.FIELD_ITEM_REQUEST_DATA:
      return {
        ...state,
        is_fetching: true
      };
    case types.FIELD_ITEM_SET_DATA:
      return {
        ...state,
        field: { ...initial_field, ...action.field },
        is_error: action.is_error,
        is_fetching: false
      };
    case types.FIELD_ITEM_MODIFY_DATA:
      return {
        ...state,
        is_error: action.is_error || false,
        field: action.field
      };
    case types.FIELD_ITEM_INSERT_DATA:
      return {
        ...state,
        field: action.field
      };
    case types.FIELD_ITEM_CHANGE_VIEW:
      return {
        ...state,
        view_mode: action.view_mode
      };
    case types.FIELD_ITEM_RESET_DATA:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default field_item;
