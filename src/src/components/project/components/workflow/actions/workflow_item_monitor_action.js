import axios from "axios";
import {
  WORKFLOW_ITEM_DEPLOYED,
  WORKFLOW_ITEM_MONITOR_VALID,
  WORKFLOW_ITEM_MONITOR_EXCHANGE,
  WORKFLOW_ITEM_MONITOR_HIDE_VIEW_INSTANCES,
  WORKFLOW_ITEM_MONITOR_SHOW_VIEW_INSTANCES,
  WORKFLOW_ITEM_MONITOR_HIDE_VIEW_EXCHANGE,
  WORKFLOW_ITEM_MONITOR_SHOW_VIEW_EXCHANGE,
  WORKFLOW_ITEM_MONITOR_CHANGE_SOURCE_ACTIVITY,
  WORKFLOW_ITEM_MONITOR_CHANGE_TARGET_ACTIVITY
} from "../constants/workflow_constants";
import { I18n } from "react-redux-i18n";

import { getDetailTask } from "./workflow_item_history_action";
import {
  beginCall,
  completeCall,
  errorCall,
  isCalling
} from "../../../../common/ajax/call_ajax/actions/call_ajax_action";

/*
  action
*/
export const changeSourceActivity = (value, target_tasks) => ({
  type: WORKFLOW_ITEM_MONITOR_CHANGE_SOURCE_ACTIVITY,
  value,
  target_tasks
});

export const changeTargetActivity = value => ({
  type: WORKFLOW_ITEM_MONITOR_CHANGE_TARGET_ACTIVITY,
  value
});

export const execute = callback_component => async (dispatch, getState) => {
  if (isCalling(getState())) {
    return;
  }
  const { data } = getState().workflow.item;
  const { source_activity, target_activity } = getState().workflow.item_monitor;

  if (!source_activity || !target_activity) {
    return dispatch({
      type: WORKFLOW_ITEM_MONITOR_VALID,
      error_text_type: "commons.messages.this_field_is_required"
    });
  }
  if (source_activity === target_activity) {
    return dispatch(
      errorCall(I18n.t("projects.workflow.message_duplicate_tasks"))
    );
  }

  dispatch(hideExchange());

  dispatch(beginCall(I18n.t("projects.workflow.exchaning")));

  try {
    await axios
      .post(`/workflow/modification/execute`, {
        processDefinitionId: data.publish.publish_id,
        fromActivityId: source_activity,
        toActivityId: target_activity
      })
      .then(res => res.data);

    const { instances, tasks } = await getDetailTask(data.project_id, data.publish.publish_id);

    callback_component(instances);

    dispatch(completeCall(I18n.t("projects.workflow.completed")));

    dispatch({
      type: WORKFLOW_ITEM_DEPLOYED,
      instances,
      tasks
    });

    return dispatch({
      type: WORKFLOW_ITEM_MONITOR_EXCHANGE
    });
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};

export const moveTo = (datas, target_activity, callback_component) => async (
  dispatch,
  getState
) => {
  if (isCalling(getState()) || !datas || datas.length < 1) {
    return;
  }
  const { data } = getState().workflow.item;

  dispatch(beginCall(I18n.t("projects.workflow.exchaning")));
  dispatch(hideViewInstances());
  try {
    for (let i = 0; i < datas.length; i++) {
      var instance = datas[i];
      await axios
        .post(
          `/workflow/process_definitions/${
            data.publish.publish_id
          }/process_instances/${instance.processInstanceId}/modification`,
          {
            fromActivityId: instance.taskDefinitionKey,
            toActivityId: target_activity
          }
        )
        .then(res => res.data)
        .catch(err => console.log(err));
    }

    const { instances, tasks } = await getDetailTask(data.project_id, data.publish.publish_id);

    callback_component(instances);

    dispatch(completeCall(I18n.t("projects.workflow.completed")));

    return dispatch({
      type: WORKFLOW_ITEM_DEPLOYED,
      instances,
      tasks
    });
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};

export const showViewInstances = (element_id, target_tasks) => async (
  dispatch,
  getState
) => {
  if (isCalling(getState())) {
    return;
  }

  dispatch(beginCall(I18n.t("commons.actions.loading")));
  dispatch(hideExchange());

  const { data, tasks } = getState().workflow.item;
  const task = tasks.find(e => e.id === element_id);

  try {
    const datas = await axios
      .get(
        `workflow/definitions/process/${
          data.publish.publish_id
        }/task_instances/${element_id}`
      )
      .then(res => res.data);

    dispatch(completeCall());

    return dispatch({
      type: WORKFLOW_ITEM_MONITOR_SHOW_VIEW_INSTANCES,
      target_tasks,
      datas,
      task
    });
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};

export const hideViewInstances = () => ({
  type: WORKFLOW_ITEM_MONITOR_HIDE_VIEW_INSTANCES
});

export const showExchange = (element_id, target_tasks) => async (
  dispatch,
  getState
) => {
  if (isCalling(getState())) {
    return;
  }

  dispatch(hideViewInstances());

  const { tasks } = getState().workflow.item;
  let task_id;
  const task = tasks.find(e => e.id === element_id);
  if (task && task.instances) {
    task_id = task.id;
  }

  return dispatch({
    type: WORKFLOW_ITEM_MONITOR_SHOW_VIEW_EXCHANGE,
    element_id: task_id,
    target_tasks
  });
};

export const hideExchange = () => ({
  type: WORKFLOW_ITEM_MONITOR_HIDE_VIEW_EXCHANGE
});
