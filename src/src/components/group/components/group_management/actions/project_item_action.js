import axios from 'axios';

import {
  GROUP_ITEM_SELECT_GROUP,
  GROUP_ITEM_UPDATE_DETAILS,
  GROUP_ITEM_UPDATE_STATISTIC,
  GROUP_MANAGEMENT_CHANGE_ORDER_SETTING,
  GROUP_MANAGEMENT_TYPE_PROJECT,
  GROUP_STATISTIC_TOTAL_PROJECT,
  GROUP_STATISTIC_TOTAL_TASKS,
  GROUP_STATISTIC_TOTAL_WORKING_USER,
  PROJECT_INFO_UPDATE_INFOS,
  PROJECT_ITEM_UPDATE_NAME
} from '../constants/group_management_constant';

import {
  beginCall,
  completeCall,
  errorCall,
  isCalling
} from '../../../../common/ajax/call_ajax/actions/call_ajax_action';
import { getTreeGroup, clickOutside } from './group_management_action';
import { highLightProject } from './group_management_utility';
import { I18n } from 'react-redux-i18n';

import { findIndex, orderBy, pick } from 'lodash';

/****************************************************
 * API ZONE                                         *
 ****************************************************/
/**
 *
 * @param {*Object} data
 */
const APICreateProject = data => {
  return axios.post('/projects', data);
};
/**
 *
 * @param {*string} project_id
 * @param {*Object} data
 */
const APIUpdateProject = (project_id, data) => {
  return axios.patch(`/projects/${project_id}`, data);
};

/*****************************************************
 * END API ZONE                                      *
 *****************************************************/

/*****************************************************
 * PRIVATE FUNCTION ZONE                             *
 *****************************************************/

const projectSortBy = (projects, { order_key, order_by }) => {
  return orderBy(projects, [order_key], [order_by]);
};

/**
 * get project info by project id
 * @param {*string} project_id
 */
const APIGetProjectInfo = project_id => {
  return axios.get(`/projects/${project_id}/details`);
};
/*****************************************************
 * END PRIVATE FUNCTION ZONE                         *
 *****************************************************/
/*****************************************************
 * GLOBAL FUNCTION ZONE                              *
 *****************************************************/

/**
 * handle select project
 * @param {*string} project_id
 * @param {*boolean} force_select
 */
const selectProject = (project_id, force_select) => async (
  dispatch,
  getState
) => {
  const projects = [...getState().groups.group_item.child_projects];
  const project_infos = { ...getState().groups.group_management.project_infos };
  const group_infos = getState().groups.group_item.group_infos;
  if (group_infos.id === project_id && !force_select) {
    return;
  }
  let project_item = projects.filter(_project => _project.id === project_id)[0];
  if (!project_item) {
    return;
  }
  dispatch({
    type: GROUP_ITEM_SELECT_GROUP,
    id_selected: project_item.id,
    is_getting_info: true,
    is_selected_group: 0,
    group_infos: project_item
  });
  let project_response = project_infos[project_id];
  if (!project_response) {
    try {
      project_response = await (await APIGetProjectInfo(project_id)).data;
      dispatch({
        type: PROJECT_INFO_UPDATE_INFOS,
        project_infos: { ...project_infos, [project_id]: project_response }
      });
    } catch (error) {
      project_response = [];
      dispatch({
        type: PROJECT_INFO_UPDATE_INFOS,
        project_infos: { ...project_infos, [project_id]: [] }
      });
    }
  }
  project_item.task_infos = project_response || [];
  project_item.type = GROUP_MANAGEMENT_TYPE_PROJECT;
  return dispatch({
    type: GROUP_ITEM_UPDATE_DETAILS,
    group_infos: project_item
  });
};
/**
 * handle redirect project
 * @param {*string} url
 * @param {*any} history
 */
const redirectProject = (url, history) => dispatch => {
  return history.replace(url);
};
/**
 * handle create update project
 * @param {*Object} data
 */
const createUpdateProject = data => async (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }
  let child_projects = [...getState().groups.group_item.child_projects];
  let project_id = data.id;
  try {
    dispatch(beginCall(I18n.t('commons.actions.saving')));
    if (project_id) {
      if (data.old_name === data.name) {
        return;
      }
      await APIUpdateProject(data.id, { name: data.name });
      const index_project = findIndex(
        child_projects,
        _project => _project.id === data.id
      );
      let project_item = { ...child_projects[index_project] };
      project_item.name = data.name;
      child_projects[index_project] = project_item;
      dispatch({
        type: PROJECT_ITEM_UPDATE_NAME,
        child_projects: child_projects
      });
      dispatch(completeCall(`"${data.old_name}" renamed to "${data.name}"`));
    } else {
      const response = await APICreateProject({
        name: data.name,
        group_id: data.group_id
      });
      let project_item = response.data;
      child_projects = [...project_item, ...child_projects];
      dispatch({
        type: PROJECT_ITEM_UPDATE_NAME,
        child_projects: child_projects
      });
      project_id = project_item[0].id;
      dispatch(completeCall(`"${project_item[0].name}" created`));
    }
    return dispatch(selectProject(project_id, true));
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};

const changePriorityProject = (project_id, priority) => async (
  dispatch,
  getState
) => {
  if (isCalling(getState())) {
    return;
  }
  let child_projects = [...getState().groups.group_item.child_projects];
  try {
    dispatch(beginCall(I18n.t('commons.actions.saving')));
    await APIUpdateProject(project_id, { priority: priority });
    const index_project = findIndex(child_projects, _p => _p.id === project_id);
    let project_item = { ...child_projects[index_project] };
    project_item.priority = priority;
    child_projects[index_project] = project_item;

    dispatch({
      type: PROJECT_ITEM_UPDATE_NAME,
      child_projects: projectSortBy(
        child_projects,
        pick(getState().groups.group_management, ['order_key', 'order_by'])
      )
    });
    dispatch(completeCall(`Priority changed`));
    return dispatch(selectProject(project_id, true));
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};
/**
 * handle move project to group
 * @param {*Object} data
 * @param {*Object} param1
 */
const moveProject = (
  data,
  { ancestors, group_destination },
  is_hide_project
) => async (dispatch, getState) => {
  const child_projects = [...getState().groups.group_item.child_projects];

  try {
    await APIUpdateProject(data.id, {
      group_id: group_destination.id
    });
    const index_project = findIndex(
      child_projects,
      _project => _project.id === data.id
    );
    let project_item = { ...child_projects[index_project] };
    project_item.group_id = group_destination.id;
    project_item.location = group_destination.name;
    project_item.show = !is_hide_project;
    child_projects[index_project] = project_item;
    dispatch(
      completeCall(`"${data.name}" has been moved to ${group_destination.name}`)
    );
    dispatch({
      type: PROJECT_ITEM_UPDATE_NAME,
      child_projects: child_projects
    });
    if (is_hide_project) {
      let statistic_detail = {
        ...getState().groups.group_item.statistic_detail
      };
      statistic_detail[GROUP_STATISTIC_TOTAL_PROJECT] =
        statistic_detail[GROUP_STATISTIC_TOTAL_PROJECT] - 1;
      statistic_detail[GROUP_STATISTIC_TOTAL_TASKS] =
        statistic_detail[GROUP_STATISTIC_TOTAL_TASKS] -
        project_item[GROUP_STATISTIC_TOTAL_TASKS];
      statistic_detail[GROUP_STATISTIC_TOTAL_WORKING_USER] =
        statistic_detail[GROUP_STATISTIC_TOTAL_WORKING_USER] -
        project_item[GROUP_STATISTIC_TOTAL_WORKING_USER];
      dispatch({
        type: GROUP_ITEM_UPDATE_STATISTIC,
        statistic_detail: statistic_detail
      });
      dispatch(clickOutside());
    } else {
      dispatch(selectProject(project_item.id, true));
    }
    return dispatch(getTreeGroup());
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};

const changeOrderSetting = (order_by, order_key) => (dispatch, getState) => {
  const projects = [...getState().groups.group_item.child_projects];
  dispatch({
    type: PROJECT_ITEM_UPDATE_NAME,
    child_projects: projectSortBy(projects, { order_by, order_key })
  });
  return dispatch({
    type: GROUP_MANAGEMENT_CHANGE_ORDER_SETTING,
    order_by,
    order_key
  });
};

const filterProject = (text_search, un_highlight = false) => (
  dispatch,
  getState
) => {
  const projects = [...getState().groups.group_item.child_projects];
  const response = highLightProject(
    projects,
    text_search.toUpperCase(),
    un_highlight
  );
  return dispatch({
    type: PROJECT_ITEM_UPDATE_NAME,
    child_projects: response
  });
};

/*****************************************************
 * END GLOBAL FUNCTION                               *
 *****************************************************/

export {
  APICreateProject,
  APIUpdateProject,
  changeOrderSetting,
  changePriorityProject,
  createUpdateProject,
  filterProject,
  moveProject,
  projectSortBy,
  redirectProject,
  selectProject
};
