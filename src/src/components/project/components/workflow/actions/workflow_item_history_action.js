import _ from "lodash";
import clone from "clone";
import axios from "axios";
import {
  WORKFLOW_ITEM_CHANGE_VERSION,
  WORKFLOW_ITEM_HISTORY_SET_LIST,
  WORKFLOW_ITEM_HISTORY_SHOW,
  WORKFLOW_ITEM_HISTORY_HIDE
} from "../constants/workflow_constants";
import { I18n } from "react-redux-i18n";

import {
  beginCall,
  completeCall,
  errorCall,
  isCalling
} from "../../../../common/ajax/call_ajax/actions/call_ajax_action";
import { getIcon } from "../../../../common/bpmn/commons/bpmn_utils";
import { APP_NAME, BPMN_ENDPOINT } from "../../../../../constants";

export const openHistories = () => ({
  type: WORKFLOW_ITEM_HISTORY_SHOW
});

export const hideHistories = () => ({
  type: WORKFLOW_ITEM_HISTORY_HIDE
});

export const getInstancesByProcessId = (project_id,process_id) =>
  axios
    .get(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/processes/${process_id}/statistics`)
    .then(res => _.orderBy(res.data, ["instances"], ["desc"]))
    .catch(e => []);

export const getActivitiesByProcessId = (project_id,process_id) =>
  axios
    .get(
      `${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/processes/${process_id}/activity?modification=true`
    )
    .then(res => res.data.tasks)
    .catch(e => []);

export const getDetailTask = async (project_id, process_id) => {
  const instances = await getInstancesByProcessId(project_id,process_id);

  const tasks = await getActivitiesByProcessId(project_id, process_id);

  if (instances.length > 0 && tasks.length > 0) {
    for (let i = 0; i < tasks.length; i++) {
      let element = tasks[i];
      let instance = instances.find(i => i.id === element.id);
      if (instance) {
        element.instances = instance.instances;
      }
      element.icon = getIcon(element.type);
    }
  }

  return { instances, tasks };
};

export const getWorkflowsByProjectId = project_id =>
  axios.get(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/designs`).then(res => _.orderBy(res.data, ["version"], ["desc"]));

/*                      Action                         */

export const getVersionList = (
  project_id,
  publish_id,
  workflow_id,
  is_get_instances
) => async dispatch => {
  const workflows = await getWorkflowsByProjectId(project_id);
  const publishes = await axios
    .get(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/designs/${workflow_id}/publish`)
    .then(res => {
      const publishes = _.orderBy(res.data, ["deploymentTime"], ["desc"]);
      publishes.forEach(function(publish) {
        publish.source = publish.source.split(":")[1];
        const workflow = workflows.find(w => w.deploymentId === publish.id);
        if (workflow) {
          publish.publish_id = workflow.id;
        }
      }, this);

      return publishes;
    });

  dispatch({ type: WORKFLOW_ITEM_HISTORY_SET_LIST, publishes });

  if (!publishes || publishes.length < 1) {
    return { publish: null, publishes: [], instances: [], tasks: [] };
  }

  const publish = publishes.find(e => e.id === publish_id);
  if (!is_get_instances) {
    return { publish, publishes };
  }

  const { instances, tasks } = await getDetailTask(project_id, publish.publish_id);
  return { publish, publishes, instances, tasks };
};

export const getPublishById = (publish, callback_component) => async (
  dispatch,
  getState
) => {
  if (isCalling(getState())) {
    return;
  }

  const { data: data_old, is_get_instances } = getState().workflow.item;

  const data = clone(data_old);
  data.publish = publish;

  dispatch(beginCall(I18n.t("commons.actions.loading")));
  try {
    const xml = await axios
      .get(
        `${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${data.project_id}/designs/${data.id}/publish/${
          publish.id
        }`
      )
      .then(res => res.data);

    if (!is_get_instances) {
      dispatch({
        type: WORKFLOW_ITEM_CHANGE_VERSION,
        data
      });
    }
    const { instances, tasks } = await getDetailTask(data.project_id, publish.publish_id);
    dispatch({
      type: WORKFLOW_ITEM_CHANGE_VERSION,
      data,
      tasks,
      instances
    });

    callback_component(xml, instances);

    return dispatch(completeCall());
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};
