import * as types from '../constants/project_constant';

const initial_project = {
  id: '0',
  name: '',
  priority: 1,
  customer: '',
  active: true,
  group_id:null,
  group_name:''
};

const initialState = {
  is_error: false,
  is_fetching: false,
  project: { ...initial_project },
  project_modify: null,
  groups:[]
  
};

const project_item = (state = initialState, action) => {
  switch (action.type) {
    case types.PROJECT_ITEM_REQUEST_DATA:
      return {
        ...state,
        project:{...initial_project},
        is_fetching: true
      };
    case types.PROJECT_ITEM_RECEIVE_DATA:
      return {
        ...state,
        project: action.project,
        is_error: action.is_error,
        is_fetching: false
      };
    case types.PROJECT_ITEM_MODIFY_DATA:
      return {
        ...state,
        project: action.project,

      };
    case types.PROJECT_ITEM_INSERT_DATA:
      return {
        ...state,
        project: action.project,
        project_modify: null
      };
    case types.PROJECT_ITEM_UPDATE_DATA:
      return {
        ...state,
        project: action.project,
        project_modify: null
      };
    case types.PROJECT_ITEM_RESET_DATA:
      return {
        ...initialState
      };
    case types.PROJECT_ITEM_START_MODIFY_DATA:
      return {
        ...state,
        project_modify: action.project ? {...action.project} : { ...initial_project },
        groups:action.groups
      };
    case types.PROJECT_ITEM_STOP_MODIFY_DATA:
      return {
        ...state,
        project_modify: null,
        groups:[]
      };
    default:
      return state;
  }
};

export default project_item;
