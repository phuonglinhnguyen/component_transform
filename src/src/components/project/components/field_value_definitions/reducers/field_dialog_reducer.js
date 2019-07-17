import * as types from '../constants/field_constants';

const initialState = {
  open_dialog: false,
  title_dialog: '',
  handleClickSubmit: null,
  label_button_dialog: '',
  body_dialog: null
};

const field_dialog = (state = initialState, action) => {
  switch (action.type) {
    case types.FIELD_ITEM_SET_DIALOG:
      return {
        ...state,
        open_dialog: action.open_dialog,
        title_dialog: action.title_dialog,
        handleClickSubmit: action.handleClickSubmit,
        label_button_dialog: action.label_button_dialog,
        body_dialog: action.body_dialog
      };
    default:
      return state;
  }
};

export default field_dialog;
