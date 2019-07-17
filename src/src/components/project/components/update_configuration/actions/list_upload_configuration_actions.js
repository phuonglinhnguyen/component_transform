import { UPLOAD_LIST_ACTION } from './index';
import { MAX_TRY_RELOAD, TIME_TRY_RELOAD, TIME_TRY_LOAD } from '../constants';
import XClient from '../../../../common/api';
const fetchUploadConfigs = (projectId, didInvalidate) => async (dispatch) => {
    let _res = await XClient.upload_configuration.list_of_project(projectId);
    if (_res.error) {
        dispatch({ type: UPLOAD_LIST_ACTION.DID_INVALIDATION });
    } else {
        dispatch({ type: UPLOAD_LIST_ACTION.RECEIVE, payload: _res.payload, projectId });
    }
}
const shouldFetch = (list_upload_configuration, projectId) => {
    return (!list_upload_configuration.isFetching
        && (list_upload_configuration.didInvalidate < MAX_TRY_RELOAD)
        && (!list_upload_configuration.items || list_upload_configuration.projecId !== projectId)
    )
};
export const fetchIfNeeded = (info) => (dispatch) => {
    const { projectId, list_upload_configuration } = info;
    if (shouldFetch(list_upload_configuration, projectId)) {
        dispatch({ type: UPLOAD_LIST_ACTION.FETCHING });
        let _fetchUploadConfigs = fetchUploadConfigs(projectId, list_upload_configuration.didInvalidate);
        if (list_upload_configuration.didInvalidate > 0) {
            setTimeout(() => {
                dispatch(_fetchUploadConfigs)
            }, TIME_TRY_RELOAD[list_upload_configuration.didInvalidate] || TIME_TRY_LOAD);
        } else {
            dispatch(_fetchUploadConfigs)
        }
    }
}
export const reset = () => ({ type: UPLOAD_LIST_ACTION.RESET })


export default {
    fetchIfNeeded,
    reset,
}
