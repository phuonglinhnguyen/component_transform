import axios from "axios";
import * as types from "../constants/lookup_constants";
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';


import {
  beginCall,
  completeCall,
  errorCall,
  isCalling
} from "../../../../common/ajax/call_ajax/actions/call_ajax_action";

import { I18n } from "react-redux-i18n";

/**
 * Get lookup by id
 * @param {*} id
 */
export const getLookupById = id => (dispatch, getState) => {
  if (id === "new") {
    return dispatch({
      type: types.LOOKUP_ITEM_CREATE_EMPTY_DATA
    });
  }

  dispatch({
    type: types.LOOKUP_ITEM_REQUEST
  });

  return axios
    .get(`${API_ENDPOINT}/apps/${APP_NAME}/lookup-definitions/${id}`)
    .then(res =>
      dispatch({
        type: types.LOOKUP_ITEM_RESPONSE,
        data: res.data
      })
    )
    .catch(error => {
      dispatch({
        type: types.LOOKUP_ITEM_ERROR_DATA
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
export const modifyLookup = (name, value) => (dispatch, getState) => {
  const data = { ...getState().config_lookup_definition.lookup_item.data };
  data[name] = value;

  return dispatch({
    type: types.LOOKUP_ITEM_MODIFY_DATA,
    data: data
  });
};

// ## Validate
const checkParamsNull = lookup => {
  let error = {};
  if (!lookup[types.KEY_LOOKUP_NAME]) {
    error[types.KEY_LOOKUP_NAME] = I18n.t(
      "configurations.lookup_definitions.this_field_is_required"
    );
  }
  if (
    Array.isArray(lookup[types.KEY_LOOKUP_LOCALE]) &&
    lookup[types.KEY_LOOKUP_LOCALE].length === 0
  ) {
    error.locale = I18n.t(
      "configurations.lookup_definitions.this_field_is_required"
    );
  }
  if (!lookup[types.KEY_LOOKUP_LOOKUP_FIELD]) {
    error.lookup_field = I18n.t(
      "configurations.lookup_definitions.this_field_is_required"
    );
  }

  return error;
};

/**
 * Clear data when leave out page
 */
export const resetStateLookupItem = () => ({
  type: types.LOOKUP_ITEM_RESET
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
export const createLookup = data => (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }

  const { is_create } = getState().config_lookup_definition.lookup_item;
  const error = checkParamsNull(data);

  if (Object.keys(error).length > 0) {
    dispatch({
      type: types.LOOKUP_ITEM_VALIDATE_DATA,
      label_error: error
    });
    return;
  }
  dispatch(beginCall(I18n.t("commons.actions.saving")));

  return axios
    .post(`${API_ENDPOINT}/apps/${APP_NAME}/lookup-definitions`, data)
    .then(() => {
      if (is_create) {
        dispatch({
          type: types.LOOKUP_ITEM_CREATE_EMPTY_DATA
        });
      }
      return dispatch(completeCall("commons.notification.create_success"));
    })
    .catch(error => dispatch(errorCall(error.message)));
};

/**
 *  Update of modify a part of data
 *
 */
export const patchLookup = data => (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }
  const error = checkParamsNull(data);

  if (Object.keys(error).length > 0) {
    dispatch({
      type: types.LOOKUP_ITEM_VALIDATE_DATA,
      label_error: error
    });
    return;
  }

  dispatch(beginCall(I18n.t("commons.actions.saving")));

  return axios
    .patch(`${API_ENDPOINT}/apps/${APP_NAME}/lookup-definitions/${data.id}`, data)
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
    type: types.LOOKUP_ITEM_SHOW_DIALOG,
    title_confirm: I18n.t(
      "configurations.lookup_definitions.delete_lookup_name",
      {
        name: getState().config_lookup_definition.lookup_item.data.name
      }
    )
  });
};

export const hideConfirmDelete = () => ({
  type: types.LOOKUP_ITEM_HIDE_DIALOG
});
/*                    END                     */

export const deleteLookup = callBack_redirect => (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }

  dispatch(beginCall(I18n.t("commons.actions.deleting")));

  const { id, name } = getState().config_lookup_definition.lookup_item.data;

  return axios
    .delete(`${API_ENDPOINT}/apps/${APP_NAME}/lookup-definitions/${id}`)
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
