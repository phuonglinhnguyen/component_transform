import axios from 'axios';
import * as types from '../constants/field_constants';
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';

import {
  getPatternList as getListPattern,
  resetStatePatternList
} from '../../../../configuration/components/pattern_definitions/actions/pattern_list_action';
import {
  getValidations as getListValidation,
  resetStateValidationList
} from '../../../../configuration/components/validation_definitions/actions/validation_list_action';
import {
  getLookups as getListLookup,
  resetStateLookupList
} from '../../../../configuration/components/lookup_definitions/actions/lookup_list_action';
import {
  getTransformRules as getListRule,
  resetStateTransformRuleList
} from '../../../../configuration/components/rule_definitions/actions/transform_rule_list_action';

import {
  getList as getListField,
  resetStateFieldList
} from './field_list_action';

import { resetFieldTest } from './field_preview_action';

import {
  checkProcessing,
  sendHttpRequest,
  receiveHttpResponse,
  handleExtractData,
  openRespondSnackbar
} from '../../../../common/snackbars/actions/common_action';

const requestField = () => ({
  type: types.FIELD_ITEM_REQUEST_DATA
});

const setField = (field, is_error) => {
  return {
    type: types.FIELD_ITEM_SET_DATA,
    field: field,
    is_error: is_error
  };
};

export const modifyField = (item, is_error) => ({
  type: types.FIELD_ITEM_MODIFY_DATA,
  is_error: is_error,
  field: item
});

export const getRelatedParameter = project_id => (dispatch, getState) => {
  dispatch(getListPattern());
  dispatch(getListValidation());
  dispatch(getListLookup());
  dispatch(getListField(project_id));
  dispatch(getListRule());
  return dispatch(resetFieldTest());
};

export const getFieldById = (id, project_id) => (dispatch, getState) => {
  if (getState().field_definition.field_item.is_fetching) {
    return;
  }

  dispatch(requestField());
  dispatch(sendHttpRequest());

  return axios(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/field-value-definitions/${id}`, {
    method: 'GET'
  })
    .then(res => {
      dispatch(setField(handleExtractData(res), false));
      dispatch(receiveHttpResponse());

      dispatch(getRelatedParameter(project_id));
    })
    .catch(error => {
      dispatch(setField({}, false));
      dispatch(openRespondSnackbar(error, true, `Field id :${id} `, '', true));
    });
};

export const resetStateFieldItem = () => ({
  type: types.FIELD_ITEM_RESET_DATA
});

export const resetFieldItemWhenUnmount = () => (dispatch, getState) => {
  dispatch(resetStateFieldItem());
  dispatch(resetStateFieldList());
  dispatch(resetStatePatternList());
  dispatch(resetStateValidationList());
  dispatch(resetStateLookupList());
  dispatch(resetStateTransformRuleList());
  return dispatch(resetFieldTest());
};

const checkNameIsNull = field => !field[types.KEY_FIELD_NAME];

export const insertField = (field) => (dispatch, getState) => {
  if (checkNameIsNull(field) || checkProcessing(getState())) {
    dispatch(modifyField(field, true));
    return;
  }
  dispatch(sendHttpRequest());

  return axios(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${field.project_id}/field-value-definitions/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(field)
  })
    .then(res => {
      dispatch(
        openRespondSnackbar(
          'commons.notification.create_success',
          false,
          `field ${field[types.KEY_FIELD_NAME]} `
        )
      );
      dispatch(resetStateFieldItem());
    })
    .catch(error => {
      dispatch(
        openRespondSnackbar(
          error,
          true,
          `Field ${field[types.KEY_FIELD_NAME]} `,
          '',
          false
        )
      );
    });
};

export const updateField = (field, fieldId) => (dispatch, getState) => {
  if (checkNameIsNull(field) || checkProcessing(getState())) {
    dispatch(modifyField(field, true));
    return;
  }
  dispatch(sendHttpRequest());
  field.id = undefined;
  return axios(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${field.project_id}/field-value-definitions/${fieldId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(field)
  })
    .then(() => {
      dispatch(
        openRespondSnackbar(
          'commons.notification.data_had_been_saved',
          false,
          `Field ${field[types.KEY_FIELD_NAME]} `
        )
      );
    })
    .catch(error => {
      dispatch(openRespondSnackbar(error, true, '', '', false));
    });
};

export const deleteField = (id, name, history, redirecUrl,project_id) => (
  dispatch,
  getState
) => {
  if (checkProcessing(getState())) {
    return;
  }

  dispatch(sendHttpRequest());

  return axios
    .delete(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/field-value-definitions/${id}`)
    .then(res => {
      dispatch(
        openRespondSnackbar(
          'commons.notification.delete_success',
          false,
          `field ${name} `
        )
      );
      history.push(redirecUrl);
    })
    .catch(error => {
      dispatch(openRespondSnackbar(error, true, `Field ${name} `, false));
    });
};

export const changeView = value => dispatch => {
  return dispatch({
    type: types.FIELD_ITEM_CHANGE_VIEW,
    view_mode: value
  });
};
