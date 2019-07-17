import axios from 'axios';

import {
  GROUP_ITEM_RESET_DATA,
  GROUP_ITEM_SELECT_GROUP,
  GROUP_MANAGEMENT_DONE_GET_PARAMS,
  GROUP_MANAGEMENT_HIDE_DIALOG,
  GROUP_MANAGEMENT_NOT_FOUND,
  GROUP_MANAGEMENT_TOGGLE_DETAIL,
  GROUP_MANAGEMENT_TOGGLE_GROUP_TREE,
  GROUP_MANAGEMENT_TYPE_PROJECT,
  GROUP_TREE_REQUEST,
  GROUP_TREE_RESET_DATA,
  GROUP_TREE_RESPONSE
} from '../constants/group_management_constant';
import {
  errorCall,
  isCalling
} from '../../../../common/ajax/call_ajax/actions/call_ajax_action';

import {
  createUpdateGroup,
  getGroupById,
  moveGroup
} from './group_item_action';

import { createUpdateProject, moveProject } from './project_item_action';

/**
 * store group tree into reducer
 * @param {*group_tree} data
 */
const responseTreeGroup = data => ({
  type: GROUP_TREE_RESPONSE,
  group_tree: data
});
/**
 * PRIVATE FUNCTION
 */

/**
 * GLOBAL FUNCTION
 */

/**
 * get params when loading
 * @param {*string} group_id
 */
const getGenericParams = (group_id: string) => async (dispatch: any) => {
  await dispatch(getGroupById(group_id));
  return dispatch({
    type: GROUP_MANAGEMENT_DONE_GET_PARAMS
  });
};

/**
 * get tree group
 */
const getTreeGroup = () => async dispatch => {
  dispatch({
    type: GROUP_TREE_REQUEST
  });
  try {
    const res = await axios.get('/groups?attributes=show_project');
    if(typeof res.data === 'string'){
      return  dispatch({
        type: GROUP_MANAGEMENT_NOT_FOUND,
        error_reason : res.data
      });
    }
    return dispatch(responseTreeGroup(res.data));
  } catch (error) {
    dispatch(errorCall(error.message));
    // dispatch({
    //   type: GROUP_MANAGEMENT_NOT_FOUND,
    //   error_reason : error.message
    // });
    return dispatch(responseTreeGroup([]));
  }
};

/**
 * action click outside component
 */
const clickOutside = () => (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }
  const parent_infos = getState().groups.group_item.parent_infos || {};
  return dispatch({
    type: GROUP_ITEM_SELECT_GROUP,
    group_infos: parent_infos,
    id_selected: parent_infos.id,
    is_getting_info: false,
    is_selected_group: -1
  });
};
/**
 * reset state when unmount
 */
const resetStateGroupManagement = () => dispatch => {
  dispatch({
    type: GROUP_ITEM_RESET_DATA
  });
  return dispatch({
    type: GROUP_TREE_RESET_DATA
  });
};
/**
 * Open/Close details zone
 * @param {*boolean} is_open
 */
const toggleDetails = is_open => ({
  type: GROUP_MANAGEMENT_TOGGLE_DETAIL,
  is_open_details: is_open
});

const toogleGroupTree = is_open => ({
  type: GROUP_MANAGEMENT_TOGGLE_GROUP_TREE,
  is_open_group_tree: is_open
});

const handleAddNew = data => dispatch => {
  if (data.type === GROUP_MANAGEMENT_TYPE_PROJECT) {
    return dispatch(createUpdateProject(data));
  } else {
    return dispatch(createUpdateGroup(data));
  }
};

const handleMove = (
  data,
  details,
  group_parent_id,
  is_hide_project
) => dispatch => {
  if (data.type === GROUP_MANAGEMENT_TYPE_PROJECT) {
    dispatch(moveProject(data, details, is_hide_project));
  } else {
    dispatch(moveGroup(data, details, group_parent_id));
  }
};

const hideConfirmDelete = () => ({
  type: GROUP_MANAGEMENT_HIDE_DIALOG
});
/**
 * END
 */

export {
  clickOutside,
  getGenericParams,
  getTreeGroup,
  handleAddNew,
  handleMove,
  hideConfirmDelete,
  resetStateGroupManagement,
  toggleDetails,
  toogleGroupTree
};
