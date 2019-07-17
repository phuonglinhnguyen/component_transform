import _ from "lodash";
import axios from "axios";
import {
  WORKFLOW_ITEM_CONFIG_SHOW,
  WORKFLOW_ITEM_CONFIG_HIDE,
  WORKFLOW_ITEM_CONFIG_SET_SECTIONS,
  WORKFLOW_ITEM_CONFIG_SET_LAYOUTS,
  WORKFLOW_ITEM_CONFIG_SET_SERVICES
} from "../constants/workflow_constants";

import { I18n } from "react-redux-i18n";

import {
  beginCall,
  completeCall,
  isCalling
} from "../../../../common/ajax/call_ajax/actions/call_ajax_action";
import { APP_NAME, BPMN_ENDPOINT } from "../../../../../constants";

export const getSectionsByLayoutId = (projectId,layoutId) =>
  axios
    .get(`/apps/${APP_NAME}/projects/${projectId}/layout-definitions/${layoutId}/section-definitions`)
    .then(res => _.orderBy(res.data, ["name"], ["asc"]))
    .catch(e => []);

export const getSections = index => async (dispatch, getState) => {
  if (index === -1) {
    return dispatch({
      type: WORKFLOW_ITEM_CONFIG_SET_SERVICES,
      sections: []
    });
  }

  if (isCalling(getState())) {
    return;
  }

  dispatch(beginCall(I18n.t("commons.actions.loading")));
  const { id: project_id } = getState().project.project_item.project;

  const { layouts } = getState().workflow.item_config;
  const layout = layouts[index];

  let sections;
  if (!layout.sections) {
    sections = await getSectionsByLayoutId(project_id,layout.id);

    layout.sections = sections;
  } else {
    sections = layout.sections;
  }
  dispatch(completeCall());

  return dispatch({
    type: WORKFLOW_ITEM_CONFIG_SET_SECTIONS,
    sections
  });
};

export const openConfig = (task_type, element) => async (
  dispatch,
  getState
  ) => {
    const { services, layouts } = getState().workflow.item_config;
    const { id: project_id } = getState().project.project_item.project;
  
  dispatch(beginCall(I18n.t("commons.actions.loading")));

  if (!services || services.length < 1) {
    const services = await axios
      .get(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/configurations/services`)
      .then(res => res.data)
      .catch(error => []);

    dispatch({
      type: WORKFLOW_ITEM_CONFIG_SET_SERVICES,
      services
    });
  }

  if (!layouts || layouts.length < 1) {
    const layouts = await axios
      .get(`/apps/${APP_NAME}/projects/${project_id}/layout-definitions?includes=name`)
      .then(res => res.data)
      .catch(error => []);

    dispatch({
      type: WORKFLOW_ITEM_CONFIG_SET_LAYOUTS,
      layouts
    });
  }

  dispatch(completeCall());

  return dispatch({
    type: WORKFLOW_ITEM_CONFIG_SHOW,
    task_type,
    element
  });
};

export const hideConfig = () => ({
  type: WORKFLOW_ITEM_CONFIG_HIDE
});
