import * as types from '../constants/response_evaluation_constants';

export const setDialog = data => ({
  type: types.PROJECT_RESPONSE_EVALUATION_ITEM_SET_DIALOG,
  open_dialog: data.open_dialog,
  title_dialog: data.title_dialog,
  handleClickSubmit: data.handleClickSubmit,
  label_button_dialog: data.label_button_dialog
});
