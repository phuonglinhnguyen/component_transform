import axios from 'axios';
import * as types from '../constants/response_evaluation_constants';
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';
import { I18n } from 'react-redux-i18n';
import {
  checkProcessing,
  sendHttpRequest,
  handleExtractData,
  openRespondSnackbar
} from '../../../../common/snackbars/actions/common_action';
import { setDialog } from './response_evaluation_common_action';
export const getFieldDefinitions = (project_id: string) => async (dispatch: any, getState: any) => {
  
  return axios(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/field-value-definitions`, {
    method: 'GET'
  })
    .then(handleExtractData)
    .then(res => {

      dispatch({
        type: types.PROJECT_RESPONSE_EVALUATION_LIST_FIELD_RECEIVE,
        fields: res
      })
    })
    .catch(error => {

      dispatch({
        type: types.PROJECT_RESPONSE_EVALUATION_LIST_FIELD_RECEIVE,
        fields: []
      })
    });


};


export const getResponseEvaluationById = (projectId, id) => async (dispatch, getState) => {

  var { response_evaluation_item } = getState().project.response_evaluation;
  if (response_evaluation_item.is_fetching) {
    return;

  }
  dispatch({ type: types.PROJECT_RESPONSE_EVALUATION_ITEM_REQUEST_DATA });

  return axios(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/response-evaluations/${id}`, {
    method: 'GET'
  })
    .then(handleExtractData)
    .then(res => {
      const { response_evaluation_error } = checkResponseEvaluation(res);
      dispatch({
        type: types.PROJECT_RESPONSE_EVALUATION_ITEM_RECEIVE_DATA,
        response_evaluation: res,
        response_evaluation_error: response_evaluation_error
      })
    })
    .catch(error => {
      dispatch(
        openRespondSnackbar(error, true, `Response Evaluation id :'${id}' `)
      );
    });


};

export const modifyResponseEvaluation = (item, type) => (dispatch, getState) => {

  const { response_evaluation_error } = checkResponseEvaluation(item);

  dispatch({
    type: type || types.PROJECT_RESPONSE_EVALUATION_ITEM_MODIFY_DATA,
    response_evaluation: item,
    response_evaluation_error: response_evaluation_error
  })
};


const canSaveResponseEvaluation = (item) => {
  const { is_error } = checkResponseEvaluation(item);



  return !is_error;
}

export const insertResponseEvaluation = (projectId, item) => async (dispatch, getState) => {
  if (!canSaveResponseEvaluation(item) || checkProcessing(getState())) {
    return;
  }

  dispatch(sendHttpRequest());

  item.project_id = projectId;



  return axios(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/response-evaluations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(item)
  })
    .then(handleExtractData)
    .then(res => {
      dispatch(
        openRespondSnackbar(
          'commons.notification.create_success',
          false,
          `Project Response Evaluation ${item[types.KEY_PROJECT_RESPONSE_EVALUATION_NAME]} `
        )
      );
      dispatch(resetStateResponseEvaluationItem());
    })
    .catch(error => {
      dispatch(
        openRespondSnackbar(
          error,
          true,
          `Project Response Evaluation ${item[types.KEY_PROJECT_RESPONSE_EVALUATION_NAME]} `
        )
      );
    });
};

export const updateResponseEvaluation = (projectId, item) => async (dispatch, getState) => {

  if (!canSaveResponseEvaluation(item) || checkProcessing(getState())) {
    return;
  }

  dispatch(sendHttpRequest());

  return axios(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/response-evaluations/${item.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(item)
  })
    .then(handleExtractData)
    .then(() => {
      dispatch(
        openRespondSnackbar(
          'commons.notification.data_had_been_saved',
          false,
          `Project Response Evaluation ${item[types.KEY_PROJECT_RESPONSE_EVALUATION_NAME]} `
        )
      );
    })
    .catch(error => {
      dispatch(openRespondSnackbar(error, true));
    });
};

export const deleteResponseEvaluation = (projectId, item, history, redirecUrl) => async (
  dispatch,
  getState
) => {

  if (checkProcessing(getState())) {
    return;
  }

  dispatch(setDialog({ open_dialog: false }));
  dispatch(sendHttpRequest());



  return axios(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/response-evaluations/${item.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },

  })
    .then(handleExtractData)
    .then(res => {
      dispatch(
        openRespondSnackbar(
          'commons.notification.delete_success',
          false,
          `Project Response Evaluation ${item[types.KEY_PROJECT_RESPONSE_EVALUATION_NAME]} `
        )
      );
      history.push(redirecUrl);
    })
    .catch(error => {
      dispatch(
        openRespondSnackbar(
          error,
          true,
          `Project Response Evaluation ${item[types.KEY_PROJECT_RESPONSE_EVALUATION_NAME]} `
        )
      );
    });
};
export const resetStateResponseEvaluationItem = () => ({
  type: types.PROJECT_RESPONSE_EVALUATION_ITEM_RESET_DATA
});


export const checkResponseEvaluation = (response_evaluation) => {

  var response_evaluation_error = {}, is_error = false;
  if (!response_evaluation[types.KEY_PROJECT_RESPONSE_EVALUATION_NAME]) {

    response_evaluation_error[types.KEY_PROJECT_RESPONSE_EVALUATION_NAME] = I18n.t('projects.response_evaluation.field_required')
    is_error = true;
  }
  if (!response_evaluation[types.KEY_PROJECT_RESPONSE_EVALUATION_KEY]) {

    response_evaluation_error[types.KEY_PROJECT_RESPONSE_EVALUATION_KEY] = I18n.t('projects.response_evaluation.field_required')
    is_error = true;
  }
  const { values_errors, is_values_error } = checkResponseEvaluationValues(
    response_evaluation[types.KEY_PROJECT_RESPONSE_EVALUATION_VALUES])
  response_evaluation_error[types.KEY_PROJECT_RESPONSE_EVALUATION_VALUES] = values_errors;
  is_error = is_error ? is_values_error : is_error;

  return { response_evaluation_error, is_error };

}
const checkResponseEvaluationValues = (values) => {
  var values_errors = [], is_values_error = false;
  var listKeys = [];
  for (var index = 0; index < values.length; index++) {
    var error = {};
    var kArray = Object.keys(values[index]);
    var vValue = values[index][kArray[0]];
    if (!kArray[0]) {
      error.key = I18n.t('projects.response_evaluation.field_required');
      is_values_error = true;
    } else {
      if (listKeys.find(item => item === kArray[0])) {
        error.key = I18n.t('projects.response_evaluation.field_conflict');
        is_values_error = true;
      } else {
        listKeys.push(kArray[0])
      }
    }
    if (!vValue) {
      error.value = I18n.t('projects.response_evaluation.field_required');
      is_values_error = true
    }

    values_errors.push(error);
  }

  return { values_errors, is_values_error };
}
