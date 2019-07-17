import * as types from '../constants/response_evaluation_constants';

const initialState = {
  open_dialog: false,
  title_dialog: '',
  handleClickSubmit: null,
  label_button_dialog: ''
};

const response_evaluation_dialog = (state = initialState, action) => {
  switch (action.type) {
    case types.PROJECT_RESPONSE_EVALUATION_ITEM_SET_DIALOG:
      return {
        ...state,
        open_dialog: action.open_dialog,
        title_dialog: action.title_dialog,
        handleClickSubmit: action.handleClickSubmit,
        label_button_dialog: action.label_button_dialog
      };
    default:
      return state;
  }
};

export default response_evaluation_dialog;
