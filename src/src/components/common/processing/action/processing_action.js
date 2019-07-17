import * as constants from '../constant/processing_constants';

export const sendHttpRequest = () => ({
  type: constants.SEND_HTTP_REQUEST,
  status_text: ''
});

export const receiveHttpResponse = (show_snack_bar, status_text) => ({
  type: constants.RECEIVE_HTTP_RESPONSE,
  status_text: status_text || '',
  show_snack_bar: show_snack_bar || false
});

export const closeSnackbar = () => ({
  type: constants.CLOSE_SNACKBAR
});
export const callAjaxError = (error, dispatch) => {
  dispatch(receiveHttpResponse(true, error));
};
export const handleResponse = response => {
  if (!response.ok) {
    throw response.statusText;
  }

  return response.json();
};

export const openRespondSnackbar = (status_text, is_error, name) => ({
  type: constants.OPEN_SNACKBAR,
  status_text: status_text || '',
  name: name || '',
  is_error: is_error || false
});
