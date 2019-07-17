import axios from "axios";
import * as types from "../constants/validation_constants";
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';

import {
  beginCall,
  completeCall,
  errorCall,
  isCalling
} from "../../../../common/ajax/call_ajax/actions/call_ajax_action";

import { I18n } from "react-redux-i18n";

/**
 * Get validation by id
 * @param {*} id 
 */
export const getValidationById = id => (dispatch, getState) => {
  if (id === "new") {
    return dispatch({
      type: types.VALIDATION_ITEM_CREATE_EMPTY_DATA
    });
  }

  dispatch({
    type: types.VALIDATION_ITEM_REQUEST
  });

  return axios
    .get(`${API_ENDPOINT}/apps/${APP_NAME}/validation-definitions/${id}`)
    .then(res =>
      dispatch({
        type: types.VALIDATION_ITEM_RESPONSE,
        data: res.data
      })
    )
    .catch(error => {
      dispatch({
        type: types.VALIDATION_ITEM_ERROR_DATA
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
export const modifyValidation = (name, value) => (dispatch, getState) => {
  const data  = {...getState().config_validation_definition.validation_item.data};
  data[name] = value;

  return dispatch({
    type: types.VALIDATION_ITEM_MODIFY_DATA,
    data: data
  });
};

// ## Validation
const checkNameIsNull = validation => {
  let error = "";
  if (!validation[types.KEY_VALIDATION_NAME]) {
    error = I18n.t(
      "configurations.validation_definitions.this_field_is_required"
    );
  }

  return error;
};

/**
 * Clear data when leave out page
 */
export const resetStateValidationItem = () => ({
  type: types.VALIDATION_ITEM_RESET
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
export const createValidation = data => (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }

  const { is_create } = getState().config_validation_definition.validation_item;
  const error = checkNameIsNull(data);
  dispatch({
    type: types.VALIDATION_ITEM_VALIDATION,
    error_field_name: error
  });

  if (error) {
    return;
  }
  dispatch(beginCall(I18n.t("commons.actions.saving")));

  return axios
    .post(`${API_ENDPOINT}/apps/${APP_NAME}/validation-definitions`, data)
    .then(() => {
      if (is_create) {
        dispatch({
          type: types.VALIDATION_ITEM_CREATE_EMPTY_DATA
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
export const patchValidation = data => (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }
  const error = checkNameIsNull(data);
  
  if (error) {
    dispatch({
      type: types.VALIDATION_ITEM_VALIDATION,
      error_field_name: error
    });
    return;
  }

  dispatch(beginCall(I18n.t("commons.actions.saving")));

  return axios
    .patch(`${API_ENDPOINT}/apps/${APP_NAME}/validation-definitions/${data.id}`, data)
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
    type: types.VALIDATION_ITEM_SHOW_DIALOG,
    title_confirm: I18n.t(
      "configurations.validation_definitions.delete_validation_name",
      {
        name: getState().config_validation_definition.validation_item.data.name
      }
    )
  });
};

export const hideConfirmDelete = () => ({
  type: types.VALIDATION_ITEM_HIDE_DIALOG
});
/*                    END                     */

export const deleteValidation = callBack_redirect => (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }

  dispatch(beginCall(I18n.t("commons.actions.deleting")));

  const {
    id,
    name
  } = getState().config_validation_definition.validation_item.data;

  return axios
    .delete(`${API_ENDPOINT}/apps/${APP_NAME}/validation-definitions/${id}`)
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
