import * as types from '../constants/export_configuration_constants';

export const setDialog = data => ({
  type: types.SET_DIALOG,
  data: data
});

export const resetDialog = () => ({
  type: types.RESET_DIALOG
});
