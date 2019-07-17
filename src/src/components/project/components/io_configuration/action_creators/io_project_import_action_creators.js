import { IO_CONFIGURATION_PROJECTS_TYPE } from './index';
import { MAX_TRY_RELOAD, TIME_TRY_RELOAD, TIME_TRY_LOAD } from '../constants';
import export_actions from './io_export_action_creators';
import XClient from '../../../../common/api';


const fetchList = (didInvalidate) => async (dispatch) => {
  let _res = await XClient.projects.list();
  if (_res.error) {
    dispatch({ type: IO_CONFIGURATION_PROJECTS_TYPE.DID_INVALIDATE });
  } else {
    dispatch({ type: IO_CONFIGURATION_PROJECTS_TYPE.RECEIVE, payload: _res.payload });
  }
}
const shouldFetchList = (projects) => {
  return (!projects.isFetching
    && (projects.didInvalidate < MAX_TRY_RELOAD)
    && (!projects.items)
  )
};
export const fetchListIfNeeded = (info) => (dispatch) => {
  const { projects } = info;
  if (shouldFetchList(projects)) {
    dispatch({ type: IO_CONFIGURATION_PROJECTS_TYPE.FETCHING });
    let _fetchList = fetchList(projects.didInvalidate);
    if (projects.didInvalidate > 0) {
      setTimeout(() => {
        dispatch(_fetchList)
      }, TIME_TRY_RELOAD[projects.didInvalidate] || TIME_TRY_LOAD);
    } else {
      dispatch(_fetchList)
    }
  }
}

export const reset = () => ({ type: IO_CONFIGURATION_PROJECTS_TYPE.RESET })
export const selectProject = (projectId) => (dispatch)=>{
  dispatch({ type: IO_CONFIGURATION_PROJECTS_TYPE.SELECT_PROJECT, projectId })
  // dispatch(export_actions.reset())
}

export default {
  fetchListIfNeeded,
  reset,
  selectProject,
}