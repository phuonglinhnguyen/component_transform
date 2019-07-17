import clone from 'clone';

import {
  GROUP_MANAGEMENT_CHANGE_ORDER_SETTING,
  GROUP_MANAGEMENT_DONE_GET_PARAMS,
  GROUP_MANAGEMENT_HIDE_DIALOG,
  GROUP_MANAGEMENT_INDEX_GROUP_ID,
  GROUP_MANAGEMENT_ORDER_BY_ASC,
  GROUP_MANAGEMENT_REDIRECT_GROUP,
  GROUP_MANAGEMENT_SHOW_DIALOG,
  GROUP_MANAGEMENT_ORDER_KEY_NAME,
  GROUP_MANAGEMENT_TOGGLE_DETAIL,
  GROUP_MANAGEMENT_TOGGLE_GROUP_TREE,
  GROUP_TREE_REQUEST,
  GROUP_TREE_RESET_DATA,
  GROUP_TREE_RESPONSE,
  PROJECT_INFO_UPDATE_INFOS,
  GROUP_MANAGEMENT_NOT_FOUND
} from '../constants/group_management_constant';

const initial_group_management = {
  group_id: '',
  group_tree: [],
  is_fetching_tree: false,
  is_get_generic_params: true,
  is_open_details: true,
  is_open_group_tree: true,
  project_infos: {},
  // data for confirm
  show_confirm: false,
  title_confirm: '',
  // order project
  order_key: GROUP_MANAGEMENT_ORDER_KEY_NAME,
  order_by: GROUP_MANAGEMENT_ORDER_BY_ASC,
  is_not_found: false,
  /**
   * error 
   */
  error_reason : ''
};

const group_management = (state = clone(initial_group_management), action) => {
  switch (action.type) {
    case GROUP_TREE_REQUEST:
      return {
        ...state,
        is_fetching_tree: true
      };
    case GROUP_TREE_RESPONSE:
      return {
        ...state,
        is_fetching_tree: false,
        group_tree: [...action.group_tree]
      };
    case GROUP_MANAGEMENT_DONE_GET_PARAMS:
      return {
        ...state,
        is_get_generic_params: false
      };
    case PROJECT_INFO_UPDATE_INFOS:
      return {
        ...state,
        project_infos: { ...action.project_infos }
      };
    case GROUP_MANAGEMENT_TOGGLE_DETAIL:
      return {
        ...state,
        is_open_details: action.is_open_details
      };
    case GROUP_MANAGEMENT_TOGGLE_GROUP_TREE:
      return {
        ...state,
        is_open_group_tree: action.is_open_group_tree
      };
    case GROUP_MANAGEMENT_SHOW_DIALOG:
      return {
        ...state,
        show_confirm: true,
        title_confirm: action.title_confirm
      };
    case GROUP_MANAGEMENT_REDIRECT_GROUP:
      return {
        ...state,
        group_id: action.group_id
      };
    case GROUP_MANAGEMENT_HIDE_DIALOG:
      return {
        ...state,
        show_confirm: false
      };
    case GROUP_MANAGEMENT_CHANGE_ORDER_SETTING:
      return {
        ...state,
        order_by: action.order_by,
        order_key: action.order_key
      };
    case '@@router/LOCATION_CHANGE':
      const pathname = action.payload.pathname || '';
      if (pathname.includes('groups')) {
        const arr_pathname = pathname.split('/');
        if (arr_pathname[GROUP_MANAGEMENT_INDEX_GROUP_ID] === state.group_id) {
          return {
            ...state,
            is_get_generic_params: false
          };
        } else {
          return clone(initial_group_management);
        }
      }
      return { ...state };
    case GROUP_MANAGEMENT_NOT_FOUND:
      return {
        ...state,
        is_not_found: true,
        error_reason : action.error_reason
      };
    case GROUP_TREE_RESET_DATA:
      return clone(initial_group_management);
    default:
      return state;
  }
};

export default group_management;
