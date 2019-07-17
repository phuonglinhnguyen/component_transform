import * as types from '../constants/export_configuration_constants';

const initialFieldMapping = {
  open_dialog: false,
  index: -1,
  data: {}
};
const initialFileExport = {
  open_dialog: false,
  index: -1,
  data: {}
};

const initialState = {
  field_mapping: { ...initialFieldMapping },
  file_exports: { ...initialFileExport }
};

const dialog = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DIALOG:
      return {
        ...state,
        ...action.data
      };
    case types.RESET_DIALOG:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default dialog;
