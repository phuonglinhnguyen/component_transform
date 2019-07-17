import clone from 'clone';
import { IO_CONFIGURATION_PROJECTS_TYPE } from '../action_creators/index';
const projectsInitialState = {
  isFetching: !1,
  didInvalidate: 0,
}
export default (state = clone(projectsInitialState), action) => {
  switch (action.type) {
    case IO_CONFIGURATION_PROJECTS_TYPE.FETCHING:
      return {
        ...state,
        isFetching: !0
      }
    case IO_CONFIGURATION_PROJECTS_TYPE.DID_INVALIDATE:
      let _i = state.didInvalidate + 1;
      return {
        ...state,
        isFetching: false,
        didInvalidate: _i
      };
    case IO_CONFIGURATION_PROJECTS_TYPE.RECEIVE:
      return {
        ...state,
        items: action.payload,
        didInvalidate: 0,
        isFetching: false,
      };
    case IO_CONFIGURATION_PROJECTS_TYPE.SELECT_PROJECT:
      return {
        ...state,
        projectId: action.projectId,
      };
    case IO_CONFIGURATION_PROJECTS_TYPE.RESET:
      return clone(projectsInitialState);
    default:
      return state;
  }
}