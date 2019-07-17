import axios from 'axios';
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';


import {
  KEY_SERVICE_NAME,
  SERVICE_ITEM_CREATE_EMPTY_DATA,
  SERVICE_ITEM_ERROR_DATA,
  SERVICE_ITEM_HIDE_DIALOG,
  SERVICE_ITEM_MODIFY_DATA,
  SERVICE_ITEM_REQUEST,
  SERVICE_ITEM_RESET,
  SERVICE_ITEM_RESPONSE,
  SERVICE_ITEM_SERVICE,
  SERVICE_ITEM_SHOW_DIALOG,
  KEY_SERVICE_PARAMETERS
} from '../constants/service_constants';

import {
  beginCall,
  completeCall,
  errorCall,
  isCalling
} from '../../../../common/ajax/call_ajax/actions/call_ajax_action';

import { I18n } from 'react-redux-i18n';

/**
 * Get service by id
 * @param {*} id
 */
export const getServiceById = id => (dispatch, getState) => {
  if (id === 'new') {
    return dispatch({
      type: SERVICE_ITEM_CREATE_EMPTY_DATA
    });
  }

  dispatch({
    type: SERVICE_ITEM_REQUEST
  });

  return axios
    .get(`apps/${APP_NAME}/services/${id}`)
    .then(res =>
      dispatch({
        type: SERVICE_ITEM_RESPONSE,
        data: res.data
      })
    )
    .catch(error => {
      dispatch({
        type: SERVICE_ITEM_ERROR_DATA
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
export const modifyService = (name, value) => (dispatch, getState) => {
  const data = { ...getState().config_service_definition.service_item.data };
  data[name] = value;

  return dispatch({
    type: SERVICE_ITEM_MODIFY_DATA,
    data: data
  });
};

export const deleteParameter = index => (dispatch, getState) => {
  const data = { ...getState().config_service_definition.service_item.data };
  let parameters = [...data[KEY_SERVICE_PARAMETERS]];
  parameters.splice(index, 1);
  data[KEY_SERVICE_PARAMETERS] = parameters;
  return dispatch({
    type: SERVICE_ITEM_MODIFY_DATA,
    data: data
  });
};

// ## Service
const checkNameIsNull = service => {
  let error = '';
  if (!service[KEY_SERVICE_NAME]) {
    error = I18n.t('configurations.service_definitions.this_field_is_required');
  }

  return error;
};

/**
 * Clear data when leave out page
 */
export const resetStateServiceItem = () => ({
  type: SERVICE_ITEM_RESET
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
export const createService = data => (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }

  const { is_create } = getState().config_service_definition.service_item;
  const error = checkNameIsNull(data);
  dispatch({
    type: SERVICE_ITEM_SERVICE,
    error_field_name: error
  });

  if (error) {
    return;
  }
  dispatch(beginCall(I18n.t('commons.actions.saving')));

  return axios
    .post(`apps/${APP_NAME}/services`, data)
    .then(() => {
      if (is_create) {
        dispatch({
          type: SERVICE_ITEM_CREATE_EMPTY_DATA
        });
      }
      return dispatch(completeCall('commons.notification.data_had_been_saved'));
    })
    .catch(error => dispatch(errorCall(error.message)));
};

/**
 *  Update of modify a part of data
 *
 */
export const patchService = data => (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }
  const error = checkNameIsNull(data);

  if (error) {
    dispatch({
      type: SERVICE_ITEM_SERVICE,
      error_field_name: error
    });
    return;
  }

  dispatch(beginCall(I18n.t('commons.actions.saving')));

  return axios
    .patch(`apps/${APP_NAME}/services/${data.id}`, data)
    .then(() =>
      dispatch(completeCall(I18n.t('commons.notification.data_had_been_saved')))
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
    type: SERVICE_ITEM_SHOW_DIALOG,
    title_confirm: I18n.t(
      'configurations.service_definitions.delete_service_name',
      {
        name: getState().config_service_definition.service_item.data.name
      }
    )
  });
};

export const hideConfirmDelete = () => ({
  type: SERVICE_ITEM_HIDE_DIALOG
});
/*                    END                     */

export const deleteService = callBack_redirect => (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }

  dispatch(beginCall(I18n.t('commons.actions.deleting')));

  const { id, name } = getState().config_service_definition.service_item.data;

  return axios
    .delete(`apps/${APP_NAME}/services/${id}`)
    .then(res => {
      dispatch(
        completeCall(
          I18n.t('commons.notification.delete_success', { name: name })
        )
      );
      return callBack_redirect();
    })
    .catch(error => dispatch(errorCall(error.message)));
};
