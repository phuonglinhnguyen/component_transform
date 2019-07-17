import axios from "axios";
import * as types from "../constants/project_constant";
import { TIME_OUT_SHOW_MESSAGE, API_ENDPOINT, APP_NAME } from "../../../constants";
import XClient from "../../common/api";
import { crudGetOne } from '@dgtx/coreui'
import {
  checkProcessing,
  sendHttpRequest,
  receiveHttpResponse,
  handleExtractData,
  openRespondSnackbar
} from "../../common/snackbars/actions/common_action";

export const requestProject = () => ({
  type: types.PROJECT_ITEM_REQUEST_DATA
});
export const receiveProject = (data, is_error) => {
  return {
    type: types.PROJECT_ITEM_RECEIVE_DATA,
    project: data,
    is_error: is_error
  };
};
// async function getGroup(groupId) {

//   try {
//     const res = await axios.get(`/groups/${groupId}`);
//     return res.data;
//   } catch (error) {
//     console.log(error)
//     return [];
//   }
// }

export const getProjectById = id => (dispatch, getState) => {
  if (getState().project.project_item.is_fetching) {
    return;
  }

  dispatch(requestProject());
  dispatch(sendHttpRequest());
  var attribute = "omr_config,omr_configuration";
  //?excludes=${attribute}
  dispatch(crudGetOne("project", { id }, {
    onSuccess: ({ result }) => {
      dispatch(receiveProject(result.json, false));
      dispatch(receiveHttpResponse());
    },
    onFailure:({ result })=>{
      dispatch(receiveHttpResponse(true, true, result, `Project id :'${id}' `));
      dispatch(receiveProject({}, true));
    }
  }))
  // return axios(
  //   `${API_ENDPOINT}/apps/${APP_NAME}/projects/${id}`,
  //   {
  //     method: "GET"
  //   }
  // )
  //   .then(handleExtractData)
  //   .then(async res => {
  //     dispatch(receiveProject(res, false));

  //     dispatch(receiveHttpResponse());
  //   })
  //   .catch(error => {
  //     dispatch(receiveHttpResponse(true, true, error, `Project id :'${id}' `));
  //     dispatch(receiveProject({}, true));
  //   });
};
export const modifyProject = (item, type) => ({
  type: type || types.PROJECT_ITEM_MODIFY_DATA,
  project: item
});

export const updateProject = (project, id) => async (dispatch, getState) => {
  if (
    project.hasOwnProperty(types.KEY_PROJECT_NAME) &&
    !project[types.KEY_PROJECT_NAME]
  ) {
    return;
  }
  if (checkProcessing(getState())) {
    return;
  }
  dispatch(sendHttpRequest());

  if (project.batch_prioritys) {

    return await axios(`${API_ENDPOINT}/projects/${id}/batch-priorities`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({ data: project.batch_prioritys })
    })
      .then(handleExtractData)
      .then(res => {
        //  dispatch(sendBreadcrumbExtend(parseProjectToBreadcrumb(res)));
        setTimeout(function() {
          dispatch({
            type: types.PROJECT_ITEM_UPDATE_DATA,
            project: res
          });
  
          dispatch(
            openRespondSnackbar(
              "commons.notification.data_had_been_saved",
              false,
              `Project ${project[types.KEY_PROJECT_NAME]} `
            )
          );
        }, TIME_OUT_SHOW_MESSAGE);
      })
      .catch(error => {
        setTimeout(function() {
          dispatch(openRespondSnackbar(error, true));
        }, TIME_OUT_SHOW_MESSAGE);
      });
  }
  
  return await axios(`${API_ENDPOINT}/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(project)
  })
    .then(handleExtractData)
    .then(res => {
      //  dispatch(sendBreadcrumbExtend(parseProjectToBreadcrumb(res)));
      setTimeout(function() {
        dispatch({
          type: types.PROJECT_ITEM_UPDATE_DATA,
          project: res
        });

        dispatch(
          openRespondSnackbar(
            "commons.notification.data_had_been_saved",
            false,
            `Project ${project[types.KEY_PROJECT_NAME]} `
          )
        );
      }, TIME_OUT_SHOW_MESSAGE);
    })
    .catch(error => {
      setTimeout(function() {
        dispatch(openRespondSnackbar(error, true));
      }, TIME_OUT_SHOW_MESSAGE);
    });
};

export const resetStateProjectItem = () => ({
  type: types.PROJECT_ITEM_RESET_DATA
});
export const startModifyProject = project => async (dispatch, getState) => {
  try {
    //  const res = await axios.get('/groups');
    return dispatch({
      type: types.PROJECT_ITEM_START_MODIFY_DATA,
      project: project
      //  groups: res.data
    });
  } catch (error) {
    return dispatch({
      type: types.PROJECT_ITEM_START_MODIFY_DATA,
      project: project
      // groups: []
    });
  }
};
export const stopModifyProject = () => ({
  type: types.PROJECT_ITEM_STOP_MODIFY_DATA
});

export const getProjectItemByAttribute = (projectId: string, attribute) => (
  dispatch,
  getState
) => {
  if (getState().project.project_item.is_fetching) {
    return;
  }

  dispatch(requestProject());
  dispatch(sendHttpRequest());
  return axios(
    `${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/attributes?excludes=${attribute}`,
    {
      method: "GET"
    }
  )
    .then(handleExtractData)
    .then(async res => {
      dispatch(receiveProject(res, false));
      dispatch(receiveHttpResponse());
    })
    .catch(error => {
      dispatch(
        receiveHttpResponse(true, true, error, `Project id :'${projectId}' `)
      );
      dispatch(receiveProject({}, true));
    });
};

export const setActiveProject = (projectId, isActive) => async dispatch => {
  try {
    let _res = await XClient.projects.update(projectId, { active: isActive });
    if (_res.error) {
    } else {
      dispatch(getProjectById(projectId));
    }
  } catch (error) {}
};
