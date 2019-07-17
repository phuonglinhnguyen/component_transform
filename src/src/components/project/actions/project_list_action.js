import axios from 'axios';

import * as types from '../constants/project_constant';
import { TIME_OUT_SHOW_MESSAGE, API_ENDPOINT, ROLE_ADMIN, ROLE_DESIGNER } from '../../../constants';

import {
  checkProcessing,
  handleExtractData,
  openRequestSnackbar,
  openRespondSnackbar
} from '../../common/snackbars/actions/common_action';
import { importConfig } from '../components/io_configuration/action_creators/io_import_action_creators';
import { stopModifyProject } from './project_item_action';
import { orderBy } from 'lodash'
const receiveList = (list, canAdd) => ({
  type: types.PROJECT_LIST_RECEIVE_DATAS,
  projects: list,
  canAdd: canAdd
});

export const pushDataIntoList = project => ({
  type: types.PROJECT_LIST_PUSH_DATA_INTO_LIST,
  project: project
});

export const removeDataFromList = index => ({
  type: types.PROJECT_LIST_REMOVE_DATA_FROM_LIST,
  index: index
});

export const requestList = () => ({
  type: types.PROJECT_LIST_REQUEST
});
async function getGroups() {
  return axios.get('/groups').then(handleExtractData)
    .then(res => {
      return res;
    }).catch(error => {
      console.log(error)
      return [];
    });
}
function findGroup(groups, group_id) {
  if (groups && group_id) {

    for (var item of groups) {
      if (item.id === group_id) {
        return item;
      }
      if (item.childs && item.childs.length > 0) {
        var found = findGroup(item.childs, group_id);

        if (found) {
          return found;
        }
      }
    }
  }
}

function getAllProjects() {
  return axios.get('/projects').then(handleExtractData)
    .then(res => {
      return res;
    }).catch(error => {
      throw new Error(error)
    });
}

export const getList = (filterActive,showAll) => (dispatch, getState) => {
  const project_list = getState().project.project_list;
  if (project_list.is_fetching || project_list.projects.length > 0) {
    return;
  }

  dispatch(requestList());
  const current_user = getState().current_user;
  var  canAdd = false;
  if (current_user.user.roles.find(item => item === ROLE_ADMIN || item === ROLE_DESIGNER)) {
    canAdd = true;
  }
  return Promise.all([getAllProjects(), getGroups()]).then(async results => {
    var projects = results[0], groups = results[1];

    if (!showAll&&!canAdd) {
      let response = await axios.get(`/user/${current_user.user.username}/projects`);
      let userProjects = response.data;
      projects = projects.filter(prj => userProjects.find(item => item.project_id === prj.id));
    }
    for (var project of projects) {
      if (project.project_id) {
        project.id = project.project_id
      }

      let group = findGroup(groups, project.group_id);
      if (group) {
        project.group_name = group.name;
      }

    }
    if(filterActive){
      projects=projects.filter(item=>item.active)
    }
    projects = orderBy(projects, 'name', 'asc')
    dispatch(receiveList(projects, canAdd));

  }).catch(error => {
    dispatch(receiveList([], canAdd));
    dispatch(openRespondSnackbar(error + '', true));
  });


};

export const resetStateProjectList = () => ({
  type: types.PROJECT_LIST_RESET_DATA
});

export const insertProject = project => (dispatch, getState) => {
  if (checkProcessing(getState())) {
    return;
  }
  dispatch(openRequestSnackbar('commons.notification.working'));

  return axios(`${API_ENDPOINT}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(project)
  })
    .then(handleExtractData)
    .then(res => {
      dispatch(importConfig(res[0].id, () => {
        setTimeout(function () {
          dispatch(
            openRespondSnackbar(
              'commons.notification.create_success',
              false,
              `Project ${project[types.KEY_PROJECT_NAME]} `
            )
          );
          dispatch(pushDataIntoList(res[0]));
          dispatch(stopModifyProject());
        }, TIME_OUT_SHOW_MESSAGE);
      }))
    })
    .catch(error => {
      setTimeout(function () {
        dispatch(
          openRespondSnackbar(
            error + '',
            true,
            `Project ${project[types.KEY_PROJECT_NAME]} `
          )
        );
      }, TIME_OUT_SHOW_MESSAGE);
    });
};
