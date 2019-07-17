import * as types from '../constants/field_constants';

const initialState = {
  field_value: {},
  field_error: '',
  value_transform: ''
};

const field_preview = (state = initialState, action) => {
  switch (action.type) {
    case types.FIELD_PREVIEW_RECIEVED_DATA:
      return {
        field_value: { ...action.field_value },
        field_error: action.field_error,
        value_transform: action.value_transform
      };
    case types.FIELD_PREVIEW_RESET_DATA:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default field_preview;
