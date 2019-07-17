import axios from 'axios';

import {
  GROUP_ITEM_ACTION_TYPE_CREATE,
  GROUP_ITEM_ACTION_TYPE_DELETE,
  GROUP_ITEM_ACTION_TYPE_UPDATE,
  GROUP_ITEM_REQUEST,
  GROUP_ITEM_RESPONSE,
  GROUP_ITEM_UPDATE_BREADCRUMB,
  GROUP_ITEM_UPDATE_STATISTIC,
  GROUP_MANAGEMENT_INDEX_GROUP_ID,
  GROUP_MANAGEMENT_NOT_FOUND,
  GROUP_MANAGEMENT_REDIRECT_GROUP,
  GROUP_MANAGEMENT_SHOW_DIALOG,
  GROUP_STATISTIC_TOTAL_GROUPS,
  GROUP_TREE_RESPONSE
} from '../constants/group_management_constant';

import { getTreeGroup } from './group_management_action';

import {
  getAssignedProjectsFromTree,
  getChildGroupDetail,
  loopGroupToUpdate
} from './group_management_utility';

import { projectSortBy } from './project_item_action';

import {
  beginCall,
  completeCall,
  errorCall,
  isCalling
} from '../../../../common/ajax/call_ajax/actions/call_ajax_action';

import { I18n } from 'react-redux-i18n';
import { pick } from 'lodash';

/**********************************************************************
 **************************** API ZONE*********************************
 **********************************************************************/

/**
 * APICreateGroup
 */
const APICreateGroup = data => {
  return axios.post('/groups', data);
};

const APIUpdateGroup = (group_id, data) => {
  return axios.patch(`/groups/${group_id}`, data);
};

const APIDeleteGroup = group_id => {
  return axios.delete(`/groups/${group_id}`);
};

/*********************************************************************
 ***************************PRIVATE FUNCTION**************************
 *********************************************************************/

/**
 * @param {*Array<Object>} breadscrumb
 * @param {*Array<Object>} child_projects
 * @param {Object} parent_infos
 */
const recieveGroupItem = (
  breadscrumb = [],
  child_projects = [],
  parent_infos = {},
  statistic_detail: {}
) => ({
  type: GROUP_ITEM_RESPONSE,
  breadscrumb,
  child_projects,
  parent_infos,
  statistic_detail
});

/********************************************************
 **********************GLOBAL FUNCTION*******************
 *******************************************************/
/**
 *
 */
const updateIdRedirect = group_id => ({
  type: GROUP_MANAGEMENT_REDIRECT_GROUP,
  group_id: group_id
});
/**
 * handle redirect to group_id when double click
 * @param {*string} group_id
 * @param {*any} history
 */
const redirectGroup = (group_id, history) => dispatch => {
  let arr_pathname = history.location.pathname.split('/');
  if (arr_pathname[GROUP_MANAGEMENT_INDEX_GROUP_ID] === group_id) {
    return;
  }
  dispatch(getGroupById(group_id));
  dispatch(updateIdRedirect(group_id));
  arr_pathname[GROUP_MANAGEMENT_INDEX_GROUP_ID] = group_id;
  return history.push(arr_pathname.join('/'));
};

/**
 *  action get group by id
 * @param {*string} group_id
 * @param {*boolean} force_get_tree
 *
 */

const getGroupById = (group_id, force_get_tree) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: GROUP_ITEM_REQUEST
  });
  if (
    getState().groups.group_management.group_tree.length === 0 ||
    force_get_tree
  ) {
    await dispatch(getTreeGroup());
  }
  const group_tree = [...getState().groups.group_management.group_tree];
  let projects = [...getState().groups.group_item.child_projects];
  if (projects.length === 0) {
    projects = getAssignedProjectsFromTree(group_tree);
  }
  let response = getChildGroupDetail(group_id, group_tree, projects);
  if (!response) {
    return dispatch({
      type: GROUP_MANAGEMENT_NOT_FOUND,
      error_reason: 'groups.group_not_found'
    });
  }
  return dispatch(
    recieveGroupItem(
      response.ancestor,
      projectSortBy(
        response.projects,
        pick(getState().groups.group_management, ['order_key', 'order_by'])
      ),
      response.parent_infos,
      response.statistic_detail
    )
  );
};
/**
 * Create or update group
 * @param {*Object} data
 */
const createUpdateGroup = data => async (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }
  const breadscrumb = [...getState().groups.group_item.breadscrumb];
  const group_infos = { ...getState().groups.group_item.group_infos };
  const parent_infos = { ...getState().groups.group_item.parent_infos };
  const tree_groups = [...getState().groups.group_management.group_tree];

  let br = [...parent_infos.ancestors, parent_infos.id];
  if (parent_infos.id === 'root') {
    br = [];
  }
  let group_id = data.id;
  let tree_groups_updated = [];
  try {
    dispatch(beginCall(I18n.t('commons.actions.saving')));
    if (group_id) {
      if (data.old_name === data.name) {
        return;
      }
      const response = await APIUpdateGroup(group_id, { name: data.name });
      let group_item = response.data;
      dispatch(completeCall(`"${data.old_name}" renamed to "${data.name}"`));
      breadscrumb[breadscrumb.length - 1] = { id: group_id, name: data.name };
      group_infos.name = data.name;
      dispatch({
        type: GROUP_ITEM_UPDATE_BREADCRUMB,
        breadscrumb: breadscrumb,
        group_infos: group_infos
      });
      tree_groups_updated = loopGroupToUpdate(
        tree_groups,
        data.id,
        { ...group_item, group_id: data.group_id },
        GROUP_ITEM_ACTION_TYPE_UPDATE
      );
    } else {
      const response = await APICreateGroup({
        ancestors: br,
        name: data.name,
        parent: br.length > 0 ? br[br.length - 1] : null
      });
      let group_item = response.data[0];
      dispatch(completeCall(`"${group_item.name}" created`));
      tree_groups_updated = loopGroupToUpdate(
        tree_groups,
        data.group_id,
        { ...group_item, group_id: data.group_id, user_online: [] },
        GROUP_ITEM_ACTION_TYPE_CREATE
      );
      const statistic_detail = {
        ...getState().groups.group_item.statistic_detail
      };
      statistic_detail[GROUP_STATISTIC_TOTAL_GROUPS] =
        statistic_detail[GROUP_STATISTIC_TOTAL_GROUPS] + 1;
      dispatch({
        type: GROUP_ITEM_UPDATE_STATISTIC,
        statistic_detail: statistic_detail
      });
    }
    return dispatch({
      type: GROUP_TREE_RESPONSE,
      group_tree: tree_groups_updated
    });
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};
/**
 * handle move Group
 * @param {*Object} data
 * @param {*Object} param1
 * @param {*string} group_parent_id
 */
const moveGroup = (
  data,
  { ancestors, group_destination },
  group_parent_id
) => async dispatch => {
  let des_ancestors = [];
  const parent =
    !group_destination.id || group_destination.id === 'root'
      ? null
      : group_destination.id;
  for (let key_ancestor in ancestors) {
    if (ancestors.hasOwnProperty(key_ancestor)) {
      let ancestor = ancestors[key_ancestor];
      if (ancestor.id !== 'root') {
        des_ancestors = [...des_ancestors, ancestor.id];
      }
    }
  }
  if (parent) {
    des_ancestors = [...des_ancestors, parent];
  }
  try {
    await APIUpdateGroup(data.id, {
      ancestors: des_ancestors,
      parent: parent
    });
    dispatch(
      completeCall(
        `${data.name} has been moved from ${data.location} to "${
          group_destination.name
        }"`
      )
    );
    return dispatch(getGroupById(group_parent_id, true));
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};
// Confirm before delete data
/*                    START                     */
const showConfirmDelete = data => (dispatch, getState) => {
  return dispatch({
    type: GROUP_MANAGEMENT_SHOW_DIALOG,
    title_confirm: I18n.t('groups.delete_group_name', {
      name: data.name
    })
  });
};
/**
 * Delete group (only group don't have sub group)
 * @param {*Object} data
 */
const deleteGroupItem = (data, history) => async (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }
  dispatch(beginCall(I18n.t('commons.actions.deleting')));
  try {
    await APIDeleteGroup(data.id);
    const tree_groups = [...getState().groups.group_management.group_tree];
    let tree_groups_updated = loopGroupToUpdate(
      tree_groups,
      data.group_id,
      data,
      GROUP_ITEM_ACTION_TYPE_DELETE
    );
    dispatch({
      type: GROUP_TREE_RESPONSE,
      group_tree: tree_groups_updated
    });
    dispatch(
      completeCall(
        I18n.t('commons.notification.delete_success', { name: data.name })
      )
    );
    return dispatch(redirectGroup(data.group_id, history));
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};

export {
  createUpdateGroup,
  deleteGroupItem,
  getGroupById,
  moveGroup,
  redirectGroup,
  showConfirmDelete,
  updateIdRedirect
};
