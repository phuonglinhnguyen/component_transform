import * as types from '../constants/project_constant';

const initialState = {
  is_fetching: false,
  canAdd: false,
  projects: []
};

const project_list = (state = initialState, action) => {
  switch (action.type) {
    case types.PROJECT_LIST_REQUEST:
      return {
        ...state,
        is_fetching: true
      };
    case types.PROJECT_LIST_RECEIVE_DATAS:
      return {
        ...state,
        projects: action.projects,
        canAdd:action.canAdd,
        is_fetching: false
      };
    case types.PROJECT_LIST_PUSH_DATA_INTO_LIST:
      var projects = [...state.projects];
      projects.unshift(action.project);
      return {
        ...state,
        projects: projects
      };
    case types.PROJECT_LIST_REMOVE_DATA_FROM_LIST:
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, action.index),
          ...state.projects.slice(action.index + 1, state.projects.length)
        ]
      };
    case types.PROJECT_LIST_RESET_DATA:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default project_list;
