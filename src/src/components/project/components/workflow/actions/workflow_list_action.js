import axios from "axios";
import _ from "lodash";
import {
  WORKFLOW_LIST_GETTING,
  WORKFLOW_LIST_GET_DONE,
  WORKFLOW_LIST_RESET
} from "../constants/workflow_constants";

import { API_ENDPOINT,APP_NAME, BPMN_ENDPOINT } from '../../../../../constants';

import { errorCall } from "../../../../common/ajax/call_ajax/actions/call_ajax_action";

const responseWorkflows = datas => ({
  type: WORKFLOW_LIST_GET_DONE,
  datas
});

export const getList = project_id => (dispatch, getState) => {
  dispatch({
    type: WORKFLOW_LIST_GETTING
  });

  return axios
    .get(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/designs`)
    .then(res => {
      const datas = res.data;
      const l = datas.length;

      for (let index = 0; index < l; index++) {
        let data = datas[index];
        try {
          const xml = new DOMParser().parseFromString(data.xml, "text/xml");
          let children = xml.childNodes[0].children;
          let children_length = children.length;
          for (let j = 0; j < children_length; j++) {
            if (children[j].nodeName === "bpmn:process") {
              data.name = children[j].getAttribute('name').split("_")[0].toUpperCase();
              break;
            }
          }
        } catch (error) {
          data.name = data.id;
          console.log(error);
        }
      } 

      return dispatch(responseWorkflows(_.orderBy(datas, ["name"], ["asc"])));
    })
    .catch(error => {
      dispatch(responseWorkflows([]));
      return dispatch(errorCall(error.message));
    });
};

export const resetState = () => ({
  type: WORKFLOW_LIST_RESET
});
