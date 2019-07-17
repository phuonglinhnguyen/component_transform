import axios from "axios";
import * as types from "../constants/error_constants";
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';


import {
  beginCall,
  completeCall,
  errorCall,
  isCalling
} from "../../../../common/ajax/call_ajax/actions/call_ajax_action";

import { I18n } from "react-redux-i18n";

/**
 * Get error by id
 * @param {*} id 
 */
export const getErrorById = id => (dispatch, getState) => {
  if (id === "new") {
    return dispatch({
      type: types.ERROR_ITEM_CREATE_EMPTY_DATA
    });
  }

  dispatch({
    type: types.ERROR_ITEM_REQUEST
  });

  return axios
    .get(`${API_ENDPOINT}/apps/${APP_NAME}/error-definitions/${id}`)
    .then(res =>
      dispatch({
        type: types.ERROR_ITEM_RESPONSE,
        data: res.data
      })
    )
    .catch(error => {
      dispatch({
        type: types.ERROR_ITEM_ERROR_DATA
      });
      return dispatch(errorCall(error.message));
    });
};

/**
 * Event onChange text
 * 
 * @param {*} name 
 * @param {*} value 
 */
export const modifyError = (name, value) => (dispatch, getState) => {
  const data  = {...getState().config_error_definition.error_item.data};
  data[name] = value;

  return dispatch({
    type: types.ERROR_ITEM_MODIFY_DATA,
    data: data
  });
};

// ## Error
const checkNameIsNull = error => {
  let error_text = "";
  if (!error[types.KEY_ERROR_NAME]) {
    error_text = I18n.t(
      "configurations.error_definitions.this_field_is_required"
    );
  }

  return error_text;
};

/**
 * Clear data when leave out page
 */
export const resetStateErrorItem = () => ({
  type: types.ERROR_ITEM_RESET
});

/*
##
##
##  CRUD API
##
##
*/

/**
 *  Create new data
 * 
 */
export const createError = data => (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }

  const { is_create } = getState().config_error_definition.error_item;
  const error = checkNameIsNull(data);
  
  if (error) {
    dispatch({
      type: types.ERROR_ITEM_VALIDATE,
      error_field_name: error
    });
    return;
  }
  dispatch(beginCall(I18n.t("commons.actions.saving")));

  return axios
    .post(`${API_ENDPOINT}/apps/${APP_NAME}/error-definitions`, data)
    .then(() => {
      if (is_create) {
        dispatch({
          type: types.ERROR_ITEM_CREATE_EMPTY_DATA
        });
      }
      return dispatch(completeCall("commons.notification.data_had_been_saved"));
    })
    .catch(error => dispatch(errorCall(error.message)));
};

/**
 *  Update of modify a part of data
 * 
 */
export const patchError = data => (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }
  const error = checkNameIsNull(data);
  
  if (error) {
    dispatch({
      type: types.ERROR_ITEM_VALIDATE,
      error_field_name: error
    });
    return;
  }

  dispatch(beginCall(I18n.t("commons.actions.saving")));

  return axios
    .patch(`${API_ENDPOINT}/apps/${APP_NAME}/error-definitions/${data.id}`, data)
    .then(() =>
      dispatch(completeCall(I18n.t("commons.notification.data_had_been_saved")))
    )
    .catch(error => dispatch(errorCall(error.message)));
};

/**
 * Delete data
 */

// Confirm before delete data
/*                    START                     */
export const showConfirmDelete = () => (dispatch, getState) => {
  return dispatch({
    type: types.ERROR_ITEM_SHOW_DIALOG,
    title_confirm: I18n.t(
      "configurations.error_definitions.delete_error_name",
      {
        name: getState().config_error_definition.error_item.data.name
      }
    )
  });
};

export const hideConfirmDelete = () => ({
  type: types.ERROR_ITEM_HIDE_DIALOG
});
/*                    END                     */

export const deleteError = callBack_redirect => (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }

  dispatch(beginCall(I18n.t("commons.actions.deleting")));

  const {
    id,
    name
  } = getState().config_error_definition.error_item.data;

  return axios
    .delete(`${API_ENDPOINT}/apps/${APP_NAME}/error-definitions/${id}`)
    .then(res => {
      dispatch(
        completeCall(
          I18n.t("commons.notification.delete_success", { name: name })
        )
      );

      return callBack_redirect();
    })
    .catch(error => dispatch(errorCall(error.message)));
};
