import * as types from '../constants/field_constants';

export const setDialogField = data => ({
  type: types.FIELD_ITEM_SET_DIALOG,
  open_dialog: data.open_dialog,
  title_dialog: data.title_dialog,
  handleClickSubmit: data.handleClickSubmit,
  label_button_dialog: data.label_button_dialog,
  body_dialog: data.body_dialog
});
