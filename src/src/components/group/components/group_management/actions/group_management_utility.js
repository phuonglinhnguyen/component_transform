import {
  GROUP_ITEM_ACTION_TYPE_CREATE,
  GROUP_ITEM_ACTION_TYPE_DELETE,
  GROUP_ITEM_ACTION_TYPE_UPDATE,
  GROUP_MANAGEMENT_TYPE_GROUP,
  GROUP_MANAGEMENT_TYPE_PROJECT,
  GROUP_STATISTIC_TOTAL_GROUPS,
  GROUP_STATISTIC_TOTAL_PROJECT,
  GROUP_STATISTIC_TOTAL_TASKS,
  GROUP_STATISTIC_TOTAL_WORKING_USER
} from '../constants/group_management_constant';

import { findIndex, orderBy, differenceBy } from 'lodash';
import clone from 'clone';
/**
 * loop group to find project
 * @param {*Array} childs
 * @param {*Array} projects
 */
const loopFindProject = (
  childs = [],
  projects = [],
  group = { id: null, name: null }
) => {
  for (let key_child in childs) {
    if (childs.hasOwnProperty(key_child)) {
      let child = childs[key_child];
      if (child.type === GROUP_MANAGEMENT_TYPE_PROJECT) {
        child.group_id = group.id;
        child.location = group.name;
        child.show = true;
        projects = [...projects, child];
      } else {
        projects = loopFindProject(child.childs, projects, {
          id: child.id,
          name: child.name
        });
      }
    }
  }
  return projects;
};

const getAssignedProjectsFromTree = tree => {
  let projects = [];
  for (let key_child in tree) {
    if (tree.hasOwnProperty(key_child)) {
      let child = tree[key_child];
      if (child.type === GROUP_MANAGEMENT_TYPE_PROJECT) {
        child.show = true;
        projects = [...projects, child];
      } else {
        projects = [
          ...projects,
          ...loopFindProject(child.childs, [], {
            id: child.id,
            name: child.name
          })
        ];
      }
    }
  }
  return projects;
};
/**
 *
 */
/**
 * Recursive child to tructure JSON
 * @param {*Array<object>} child_group
 * @param {*} group_id
 * @param {*} result
 */
const loopGroupGetDetail = (child_group, group_id, result, projects) => {
  for (let key_child_group in child_group) {
    if (child_group.hasOwnProperty(key_child_group)) {
      let group = child_group[key_child_group];
      const group_child = group.childs || [];
      if (group.id === group_id) {
        let projects_show = setShowAttribute(
          projects,
          loopFindProject(group.childs, [], { id: group.id, name: group.name })
        );
        const parent = result.ancestor[result.ancestor.length - 1];
        return {
          ...result,
          ancestor: [...result.ancestor, { id: group.id, name: group.name }],
          parent_infos: {
            ancestors: group.ancestors,
            id: group.id,
            name: group.name,
            type: GROUP_MANAGEMENT_TYPE_GROUP,
            location: parent.name,
            group_id: parent.id
          },
          childs: [...group_child],
          projects: [...projects_show],
          statistic_detail: {
            [GROUP_STATISTIC_TOTAL_GROUPS]: group[GROUP_STATISTIC_TOTAL_GROUPS],
            [GROUP_STATISTIC_TOTAL_PROJECT]:
              group[GROUP_STATISTIC_TOTAL_PROJECT],
            [GROUP_STATISTIC_TOTAL_TASKS]: group[GROUP_STATISTIC_TOTAL_TASKS],
            [GROUP_STATISTIC_TOTAL_WORKING_USER]: group.user_online.length || 0
          }
        };
      } else if (JSON.stringify(group_child).includes(group_id)) {
        return loopGroupGetDetail(
          group.childs,
          group_id,
          {
            ancestor: [...result.ancestor, { id: group.id, name: group.name }]
          },
          projects
        );
      }
    }
  }
  return null;
};

/**
 * Recursive child to tructure JSON
 * @param {*Array<object>} child_group
 * @param {*} group_id
 * @param {*} result
 */
const loopGroupToUpdate = (child_group, group_id, data, action_type) => {
  let result = clone(child_group);
  if (group_id === 'root') {
    if (action_type === GROUP_ITEM_ACTION_TYPE_CREATE) {
      result.push(data);
      return result;
    } else if (action_type === GROUP_ITEM_ACTION_TYPE_DELETE) {
      result = result.filter(_g => _g.id !== data.id);
      return result;
    }
  }
  for (let key_child_group in child_group) {
    if (child_group.hasOwnProperty(key_child_group)) {
      let group = { ...child_group[key_child_group] };
      let group_childs = group.childs || [];
      if (group.id === group_id) {
        if (action_type === GROUP_ITEM_ACTION_TYPE_CREATE) {
          group.childs = [...group_childs, data];
          group[GROUP_STATISTIC_TOTAL_GROUPS] =
            group[GROUP_STATISTIC_TOTAL_GROUPS] + 1;
        } else if (action_type === GROUP_ITEM_ACTION_TYPE_UPDATE) {
          group.name = data.name;
        } else if (action_type === GROUP_ITEM_ACTION_TYPE_DELETE) {
          group_childs = group_childs.filter(_g => _g.id !== data.id);
          group.childs = [...group_childs];
          group[GROUP_STATISTIC_TOTAL_GROUPS] =
            group[GROUP_STATISTIC_TOTAL_GROUPS] - 1;
        }
        result[key_child_group] = group;
      } else if (JSON.stringify(group_childs).includes(group_id)) {
        result[key_child_group].childs = loopGroupToUpdate(
          group_childs,
          group_id,
          data,
          action_type
        );
      }
    }
  }
  return result;
};

const setShowAttribute = (projects = [], data_show) => {
  let result = [];
  for (let key_project in projects) {
    if (projects.hasOwnProperty(key_project)) {
      let project = { ...projects[key_project] };
      if (!data_show) {
        project.show = true;
      } else if (findIndex(data_show, _data => _data.id === project.id) > -1) {
        project.show = true;
      } else {
        project.show = false;
      }
      result = [...result, project];
    }
  }
  return result;
};
/**
 *
 */
const getStatisticDetail = tree_ex => {
  let statistic_detail = {
    [GROUP_STATISTIC_TOTAL_GROUPS]: 0,
    [GROUP_STATISTIC_TOTAL_PROJECT]: 0,
    [GROUP_STATISTIC_TOTAL_TASKS]: 0
  };
  let working_user = []
  for (let key in tree_ex) {
    if (tree_ex.hasOwnProperty(key)) {
      let element = tree_ex[key];
      statistic_detail[GROUP_STATISTIC_TOTAL_GROUPS] =
        statistic_detail[GROUP_STATISTIC_TOTAL_GROUPS] +
        element[GROUP_STATISTIC_TOTAL_GROUPS];
      statistic_detail[GROUP_STATISTIC_TOTAL_PROJECT] =
        statistic_detail[GROUP_STATISTIC_TOTAL_PROJECT] +
        element[GROUP_STATISTIC_TOTAL_PROJECT];
      statistic_detail[GROUP_STATISTIC_TOTAL_TASKS] =
        statistic_detail[GROUP_STATISTIC_TOTAL_TASKS] +
        element[GROUP_STATISTIC_TOTAL_TASKS];
      working_user = [...working_user, ...differenceBy(element.user_online, working_user, 'name')];
    }
  }
  statistic_detail[GROUP_STATISTIC_TOTAL_WORKING_USER] = working_user.length
  return statistic_detail;
};
/**
 * Get child group detail by group id
 * @param {*String} group_id
 */
const getChildGroupDetail = (group_id: string, tree_ex, projects) => {
  if (group_id === 'root') {
    let projects_show = setShowAttribute(projects);
    const statistic_detail = getStatisticDetail(tree_ex);
    return {
      parent_infos: {
        id: 'root',
        name: 'Groups',
        ancestors: []
      },
      ancestor: [{ id: 'root', name: 'Groups' }],
      childs: [...tree_ex],
      projects: projects_show,
      statistic_detail: statistic_detail
    };
  }
  return loopGroupGetDetail(
    tree_ex,
    group_id,
    {
      ancestor: [{ id: 'root', name: 'Groups' }],
      parent: 'Group'
    },
    projects
  );
};

const highLightProject = (projects, text_search, un_highlight) => {
  for (let key in projects) {
    if (projects.hasOwnProperty(key)) {
      let project = clone(projects[key]) || { name: '' };
      if (
        !un_highlight &&
        project.show &&
        project.name.toUpperCase().includes(text_search)
      ) {
        project.highlight = true;
      } else {
        project.highlight = false;
      }
      projects[key] = project;
    }
  }
  return orderBy(projects, ['highlight'], ['desc']);
};

export {
  getAssignedProjectsFromTree,
  getChildGroupDetail,
  highLightProject,
  loopGroupToUpdate
};
