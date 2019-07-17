import { NAME_STORE, MAX_TRY_RELOAD, TIME_TRY_RELOAD, TIME_TRY_LOAD } from '../constant';
import { FieldsTypes } from '../types';
import { parseListToObject } from './common_action';
import XClient from '../../../../common/api';
import { NotifyActions } from '../../../../common/notification';

const fetching = () => ({ type: FieldsTypes.FETCHING });
const invalidateFields = () => ({ type: FieldsTypes.DID_INVALIDATION });
export const receiveFields = (items, projectId) => ({
  type: FieldsTypes.RECEIVE,
  items,
  map: parseListToObject('id', items),
  projectId: projectId,
});
export const fetchFieldsProject = (projectId, didInvalidate) => async (dispatch) => {
  let _res = await XClient.field.list_of_project(projectId);
  if (_res.error && _res.status !== 404) {
    if (didInvalidate === MAX_TRY_RELOAD - 1) {
      dispatch(NotifyActions.error('','projects.layout_definitions.message.error.cant_get_list_field',{i18:!0}));
    }
    dispatch(invalidateFields());
  } else {
    dispatch(receiveFields(_res.payload, projectId));
  }
};
const shouldFetch = (fields, projectId) => {
  return (!fields.isFetching && (fields.didInvalidate < MAX_TRY_RELOAD) && (!fields.items || fields.projectId !== projectId))
};
export const fetchIfNeeded = info => (dispatch, getState) => {
  const { fields } = getState()[NAME_STORE];
  const { projectId } = info;
  if (shouldFetch(fields, projectId)) {
    dispatch(fetching());
    let _fetchFields = fetchFieldsProject(projectId, fields.didInvalidate);
    if (fields.didInvalidate > 0) {
      setTimeout(() => {
        dispatch(_fetchFields)
      }, TIME_TRY_RELOAD[fields.didInvalidate] || TIME_TRY_LOAD);
    } else {
      dispatch(_fetchFields)
    }
  }
};
export const resetFields = () => ({
  type: FieldsTypes.RESET
});
export default {
  fetchIfNeeded,
  resetFields,
}