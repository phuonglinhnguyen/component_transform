import * as constants from '../constant/processing_constants';

const initialState = {
  status_text: null,
  is_processing: false,
  is_error: false,
  show_snack_bar: false,
  name: ''
};

const processing = (state = initialState, action) => {
  switch (action.type) {
    case constants.SEND_HTTP_REQUEST:
      return {
        ...state,
        status_text: null,
        is_processing: true,
        is_error: false,
        show_snack_bar: false
      };
    case constants.RECEIVE_HTTP_RESPONSE:
      return {
        ...state,
        status_text: action.status_text,
        is_processing: false,
        is_error: action.is_error,
        show_snack_bar: action.show_snack_bar
      };
    case constants.OPEN_SNACKBAR:
      return {
        ...state,
        status_text: action.status_text,
        is_processing: false,
        is_error: action.is_error,
        show_snack_bar: true,
        name: action.name
      };
    case constants.CLOSE_SNACKBAR:
      return {
        ...state,
        is_error: false,
        show_snack_bar: false
      };
    default:
      return state;
  }
};

export default processing;
