import axios from "axios";
import { APP_NAME, BPMN_ENDPOINT } from '../../../../../constants'
import {
  WORKFLOW_ITEM_SET_CANVAS,
  WORKFLOW_ITEM_GETTING,
  WORKFLOW_ITEM_GET_DONE,
  WORKFLOW_ITEM_DEPLOYED,
  WORKFLOW_ITEM_CREATE,
  WORKFLOW_ITEM_SHOW_CONFIRM,
  WORKFLOW_ITEM_CHANGE_TYPE,
  WORKFLOW_ITEM_HIDE_CONFIRM,
  WORKFLOW_ITEM_ERROR,
  WORKFLOW_ITEM_VALID,
  WORKFLOW_ITEM_SET_DATA,
  WORKFLOW_ITEM_EXPAND,
  WORKFLOW_ITEM_RESET
} from "../constants/workflow_constants";
import { I18n } from "react-redux-i18n";

import {
  beginCall,
  completeCall,
  errorCall,
  isCalling
} from "../../../../common/ajax/call_ajax/actions/call_ajax_action";
import { getVersionList } from "./workflow_item_history_action";

export const expandView = expand => ({
  type: WORKFLOW_ITEM_EXPAND,
  expand
});

/*        Clear data when leave out page          */
export const resetState = () => ({
  type: WORKFLOW_ITEM_RESET
});

/**
 * Get workflow by id
 *
 * @param {*} project_id
 * @param {*} workflow_id
 */
export const setCanvas = modeler => ({
  type: WORKFLOW_ITEM_SET_CANVAS,
  modeler
});

export const getWorkflowNameFromXml = xml => {
  let workflow_type = "";
  try {
    const _parse = new DOMParser().parseFromString(xml, "text/xml");
    let children = _parse.childNodes[0].children;
    let children_length = children.length;

    for (let j = 0; j < children_length; j++) {
      if (children[j].nodeName === "bpmn:process") {
        workflow_type = children[j].getAttribute("name").split("_")[0];
        break;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return workflow_type;
};

export const getWorkflowById = (
  project_id,
  workflow_id,
  is_get_instances
) => async (dispatch, getState) => {
  if (workflow_id === "new") {
    return dispatch({
      type: WORKFLOW_ITEM_CREATE
    });
  }

  dispatch({
    type: WORKFLOW_ITEM_GETTING,
    is_get_instances
  });

  try {
    const data = await axios
      .get(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/designs/${workflow_id}`)
      .then(res => res.data);

    data.type = getWorkflowNameFromXml(data.xml);
    if (!data.publish_id) {
      return dispatch({
        type: WORKFLOW_ITEM_GET_DONE,
        data
      });
    }

    const { publish, instances, tasks } = await dispatch(
      getVersionList(project_id, data.publish_id, workflow_id, is_get_instances)
    );
    data.publish = publish;

    return dispatch({
      type: WORKFLOW_ITEM_GET_DONE,
      data,
      tasks,
      instances
    });
  } catch (error) {
    dispatch({
      type: WORKFLOW_ITEM_ERROR
    });
    return dispatch(errorCall(error.message));
  }
};

/*
#
#
# CREATE, PATCH, DELETE
#
#
#
*/

export const changeType = workflow_type => ({
  type: WORKFLOW_ITEM_CHANGE_TYPE,
  workflow_type
});

/*      Create new workflow       */
export const saveWorkflow = (project_id,xml, callback_redirect) => (
  dispatch,
  getState
) => {
  const { data, is_create } = getState().workflow.item;
  if (isCalling(getState())) {
    return;
  }

  if (!data.type) {
    return dispatch({
      type: WORKFLOW_ITEM_VALID
    });
  }

  dispatch(beginCall(I18n.t("commons.actions.saving")));

  let api, message;

  if (is_create) {
    api = axios.post(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/designs/create`, {
      type: data.type,
      xml
    });

    message = "commons.notification.create_success";
  } else {
    api = axios.patch(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/designs/${data.id}`, {
      type: data.type,
      xml
    });
    message = "commons.notification.data_had_been_saved";
  }

  return api
    .then(res => {
      const data_new = res.data;
      data_new.type = data.type;
      if (is_create) {
        dispatch({
          type: WORKFLOW_ITEM_SET_DATA,
          data: data_new
        });

        dispatch(
          completeCall(I18n.t(message, { name: data.type.toUpperCase() }))
        );

        return callback_redirect(project_id, res.data.id);
      }

      return dispatch(
        completeCall(I18n.t(message, { name: data.type.toUpperCase() }))
      );
    })
    .catch(error => dispatch(errorCall(error.message)));
};

/**
 *  Publish or Delete workflow
 * @param {*} callBack_redirect
 */

// ## confirm delete
/*                START                        */

export const openConfirm = (action_type, message) => (dispatch, getState) => {
  if (action_type !== "delete") {
    const { type } = getState().workflow.item.data;
    if (!type) {
      return dispatch(hideConfirm());
    }
  }
  return dispatch({
    type: WORKFLOW_ITEM_SHOW_CONFIRM,
    action_type,
    message
  });
};

export const hideConfirm = () => ({
  type: WORKFLOW_ITEM_HIDE_CONFIRM
});
/*                END                        */

export const publishWorkflow = (xml, callBack_redirect) => async (
  dispatch,
  getState
) => {
  if (isCalling(getState())) {
    return;
  }
  const { data } = getState().workflow.item;
  const { username } = getState().current_user.user;
  const { project_id, id } = data;

  dispatch(hideConfirm());

  dispatch(beginCall(I18n.t("commons.actions.publishing")));

  try {
    await axios.patch(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/designs/${id}`, {
      type: data.type.toLowerCase(),
      xml
    });

    const data_new = await axios
      .post(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/designs/${id}/publish`, {
        deployer: username
      })
      .then(res => res.data);

    const { publish, instances, tasks } = await dispatch(
      getVersionList(project_id, data_new.publish_id, id)
    );

    data_new.type = data.type;
    data_new.publish = publish;

    dispatch({
      type: WORKFLOW_ITEM_DEPLOYED,
      data: data_new,
      instances,
      tasks
    });

    return dispatch(
      completeCall(I18n.t("projects.workflow.published", { name: data.type }))
    );
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};

export const deleteWorkflow = callBack_redirect => async (
  dispatch,
  getState
) => {
  if (isCalling(getState())) {
    return;
  }
  const { data } = getState().workflow.item;

  dispatch(hideConfirm());

  dispatch(beginCall(I18n.t("commons.actions.deleting")));

  return await axios
    .delete(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${data.project_id}/designs/${data.id}`)
    .then(res => {
      dispatch(
        completeCall(
          I18n.t("commons.notification.delete_success", {
            name: data.type
          })
        )
      );

      return callBack_redirect();
    })
    .catch(error => dispatch(errorCall(error.message)));
};
