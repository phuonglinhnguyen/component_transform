import clone from 'clone';

import {
  GROUP_ITEM_REQUEST,
  GROUP_ITEM_RESET_DATA,
  GROUP_ITEM_RESPONSE,
  GROUP_ITEM_SELECT_GROUP,
  GROUP_ITEM_UPDATE_BREADCRUMB,
  GROUP_ITEM_UPDATE_DETAILS,
  GROUP_ITEM_UPDATE_STATISTIC,
  PROJECT_ITEM_UPDATE_NAME
} from '../constants/group_management_constant';
const initial_state = {
  is_calling_api: false,
  /**
   *  ancestor when create new group
   */
  breadscrumb: [],
  /**
   * use to view in UI
   */
  statistic_detail: {},
  child_projects: [],
  /**
   * details when select group
   */
  id_selected: 'root',
  is_getting_info: false,
  group_infos: {},
  is_selected_group: -1,
  group_activity: [],
  /**
   * parent infos when select outside
   */
  parent_infos: {}
};

const group_item = (state = clone(initial_state), action) => {
  switch (action.type) {
    case GROUP_ITEM_REQUEST:
      return {
        ...state,
        is_calling_api: true
      };
    case GROUP_ITEM_RESPONSE:
      return {
        ...state,
        breadscrumb: [...action.breadscrumb],
        child_projects: [...action.child_projects],
        group_infos: { ...action.parent_infos },
        id_selected: '',
        is_calling_api: false,
        is_selected_group: -1,
        parent_infos: { ...action.parent_infos },
        statistic_detail: { ...action.statistic_detail }
      };
    case GROUP_ITEM_SELECT_GROUP:
      return {
        ...state,
        group_infos: { ...action.group_infos },
        id_selected: action.id_selected,
        is_getting_info: action.is_getting_info,
        is_selected_group: action.is_selected_group
      };
    case GROUP_ITEM_UPDATE_DETAILS:
      return {
        ...state,
        group_infos: { ...action.group_infos },
        is_getting_info: false
      };
    case PROJECT_ITEM_UPDATE_NAME:
      return {
        ...state,
        child_projects: [...action.child_projects]
      };
    case GROUP_ITEM_UPDATE_BREADCRUMB:
      return {
        ...state,
        breadscrumb: [...action.breadscrumb],
        parent_infos: { ...action.group_infos },
        group_infos: { ...action.group_infos }
      };
    case GROUP_ITEM_UPDATE_STATISTIC:
      return {
        ...state,
        statistic_detail: { ...action.statistic_detail }
      };
    case GROUP_ITEM_RESET_DATA:
      return clone(initial_state);
    default:
      return state;
  }
};

export default group_item;
