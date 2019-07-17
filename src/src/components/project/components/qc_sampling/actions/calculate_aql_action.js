//@flow
import axios from "axios";

import * as types from "../constants/qc_sampling_constant";

import {
  errorCall,
  completeCall
} from "../../../../common/ajax/call_ajax/actions/call_ajax_action";

import {
  resetQCSamplingState,
  getFilterAttributes
} from "./qc_sampling_action";

import { has, unionBy, replace } from "lodash";
const sendRequestCalculateQuantity = () => ({
  type: types.QC_SAMPLING_SEND_REQUEST_CALCULATE
});

const calculateAQL = (inspection, lot_size, aql_table) => (
  dispatch,
  getState
) => {
  if (lot_size < 2) {
    return 0;
  }
  const { sample_plan, sample_size_code } = aql_table;
  let key_code = null;
  let aql_size = 0;
  for (let key in sample_size_code) {
    if (sample_size_code.hasOwnProperty(key)) {
      let element = sample_size_code[key];
      if (
        lot_size >= element.lot_size.min &&
        lot_size <= element.lot_size.max
      ) {
        switch (inspection) {
          case types.INSPECTION_LEVEL_IMPORTANT_I:
            key_code = element.level[0];
            break;
          case types.INSPECTION_LEVEL_IMPORTANT_II:
            key_code = element.level[1];
            break;
          case types.INSPECTION_LEVEL_NORMAL_I:
            key_code = element.level[2];
            break;
          case types.INSPECTION_LEVEL_NORMAL_II:
            key_code = element.level[3];
            break;
          case types.INSPECTION_LEVEL_STABLE_I:
            key_code = element.level[4];
            break;
          case types.INSPECTION_LEVEL_STABLE_II:
            key_code = element.level[5];
            break;
          default:
            break;
        }
      }
    }
  }
  if (key_code) {
    for (let k in sample_plan) {
      if (sample_plan.hasOwnProperty(k)) {
        let element = sample_plan[k];
        if (key_code === element.level) {
          aql_size = element.size > lot_size ? lot_size : element.size;
        }
      }
    }
  } else {
    aql_size = lot_size;
  }
  return aql_size;
};

const recieveCalculateResult = (results: Array<Object>) => ({
  type: types.QC_SAMPLING_RECIEVE_RESULT_CALCULATE,
  sampling_results: {
    original_results: [...results],
    results: [...results],
    headers: [
      { name: "batch_name", title: "batch_name", sort: true },
      { name: "keyer", title: "keyer", sort: true },
      { name: "inspection", title: "inspection", sort: true },
      {
        name: "total_docs",
        title: "total_records",
        sort: true,
        align_right: true
      },
      { name: "aql_size", title: "aql_size", sort: true, align_right: true }
    ]
  }
});

const sendRequestSample = () => ({
  type: types.QC_SAMPLING_SEND_REQUEST_SAMPLE
});
const callAPICalculate = (projectId, conditions) => (dispatch, getState) => {
  return axios(`/projects/${projectId}/qc-sample`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(conditions)
  });
};

const callAPISample = (projectId, conditions) => (dispatch, getState) => {
  return axios(`/projects/${projectId}/qc-random-sample`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(conditions)
  });
};

const callAPIStartWorkdflow = (project_id, variables) => (
  dispatch,
  getState
) => {
  return axios(`/workflow/definitions/${project_id}/start_instance?key=qc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(variables)
  });
};

const transformToVariables = data => {
  let batches_detail = [...data.sample_details];
  let map_batches = {};
  for (let key_batch in batches_detail) {
    if (batches_detail.hasOwnProperty(key_batch)) {
      let batch = batches_detail[key_batch];
      const batch_id = batch.batch_id;
      if (has(map_batches, batch_id)) {
        let details = map_batches[batch_id].variables.docs.value;
        map_batches[batch_id].variables.docs = {
          value: unionBy(details, batch.documents_sample, "id")
        };
      } else {
        const businessKey = replace(data.project_name, / /g, "_");
        map_batches[batch_id] = {
          variables: {
            project_id: {
              value: data.project_id
            },
            project_name: {
              value: data.project_name
            },
            batch_id: {
              value: batch_id
            },
            batch_name: {
              value: batch.batch_name
            },
            docs: {
              value: [...batch.documents_sample]
            },
            qc_execution_config: {
              value: {
                id: data.id,
                fields: data.fields
              }
            }
          },
          businessKey: `${businessKey}_QC_Execution`
        };
      }
    }
  }
  let array = Object.keys(map_batches).map(value => {
    return map_batches[value];
  });
  return array;
};

export const handleCalculateAQLQuantity = () => async (
  dispatch: any,
  getState: any
) => {
  const { is_calculating, is_sampling } = getState().qc_sampling.qc_sampling;
  const conditions = getState().qc_sampling.qc_sampling.aql_conditions
    .condition_preview;
  if (is_calculating || is_sampling || conditions.length === 0) {
    return;
  }
  dispatch(sendRequestCalculateQuantity());
  const projectId = getState().project.project_item.project.id;
  const aql_table = getState().qc_sampling.qc_sampling.aql_table;
  try {
    let results = await (await dispatch(
      callAPICalculate(projectId, conditions)
    )).data;
    for (let key in results) {
      if (results.hasOwnProperty(key)) {
        let element = results[key];
        const lot_size = element.documents.length;
        const inspection = element.inspection;
        const sample_size = dispatch(
          calculateAQL(inspection, lot_size, aql_table)
        );
        element.inspection_level = inspection.split(" ")[1];
        element.inspection_type = inspection.split(" ")[0];
        element.total_docs = lot_size;
        element.aql_size = sample_size;
        results[key] = element;
      }
    }
    results = results.filter(_r => _r.aql_size > 0 && _r.total_docs > 0);
    dispatch(recieveCalculateResult(results));
  } catch (error) {
    dispatch(recieveCalculateResult([]));
    dispatch(errorCall(error.message));
  }
};

export const handleGetSample = () => async (dispatch: any, getState: any) => {
  const { is_sampling } = getState().qc_sampling.qc_sampling;
  const {
    original_results
  } = getState().qc_sampling.qc_sampling.sampling_results;
  if (original_results.length === 0 || is_sampling) {
    return;
  }
  const { id, name } = getState().project.project_item.project;
  dispatch(sendRequestSample());
  const {
    original_datas,
    datas_selected
  } = getState().qc_sampling.filter_attribute.filter_attr_field;
  const fields = datas_selected.length === 0 ? original_datas : datas_selected;
  let request_params = {
    project_id: id,
    project_name: name,
    fields: fields,
    sample_details: original_results
  };
  try {
    const response = await dispatch(callAPISample(id, request_params));
    if (response.status === 201 && typeof response.data === "object") {
      const variables = transformToVariables(response.data);
      for (let key_variable in variables) {
        if (variables.hasOwnProperty(key_variable)) {
          var element = variables[key_variable];
          await dispatch(callAPIStartWorkdflow(id, element));
        }
      }
      dispatch(completeCall("commons.notification.get_sample_success"));
      dispatch(resetQCSamplingState());
      dispatch(getFilterAttributes(id));
    }
  } catch (error) {
    if (has(error, "response.status")) {
      error.response.status = -1;
      return dispatch(errorCall(error.message));
    } else {
      return dispatch(errorCall(error.message));
    }
  }
};
