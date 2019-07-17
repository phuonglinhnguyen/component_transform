import axios from "axios";
import clone from "clone";
import _ from "lodash";

import {
  WORKFLOW_MIGRATION_MIGRATION_DONE,
  WORKFLOW_MIGRATION_UNSELECT_DATA_SOURCE,
  WORKFLOW_MIGRATION_CHANGE_TARGET_ACTIVITY,
  WORKFLOW_MIGRATION_SELECT_DATA_TARGET,
  WORKFLOW_MIGRATION_SELECT_DATA_SOURCE,
  WORKFLOW_MIGRATION_GETTING,
  WORKFLOW_MIGRATION_GET_DONE,
  WORKFLOW_MIGRATION_ERROR,
  WORKFLOW_ITEM_RESET
} from "../constants/workflow_constants";
import {
  beginCall,
  completeCall,
  errorCall,
  isCalling
} from "../../../../common/ajax/call_ajax/actions/call_ajax_action";

import { I18n } from "react-redux-i18n";

/**
 * Data for the first load page
 */
const responseWorkflows = data_sources => ({
  type: WORKFLOW_MIGRATION_GET_DONE,
  data_sources
});

export const getMigrationList = (project_id, definition_key) => (
  dispatch,
  getState
) => {
  dispatch({
    type: WORKFLOW_MIGRATION_GETTING
  });

  return axios
    .get(`/workflow/definitions/${project_id}`)
    .then(res => {
      const datas = res.data;
      const array = [];
      for (let i = 0; i < datas.length; i++) {
        let data = datas[i];
        if (definition_key === data.key.toLowerCase()) {
          data["text"] = `${data.name.toUpperCase()} - Version: ${
            data.version
          }`;
          data["value"] = data.name;
          array.push(data);
        }
      }
      return dispatch(
        responseWorkflows(_.orderBy(array, ["name", "version"], ["asc", "asc"]))
      );
    })
    .catch(error => {
      dispatch(responseWorkflows([]));
      return dispatch(errorCall(error.message));
    });
};

export const getInstances = id => {
  return axios
    .get(`workflow/definitions/process/${id}/statistics`)
    .then(res => res.data)
    .catch(error => []);
};

export const selectDataSource = (data, callback) => async (
  dispatch,
  getState
) => {
  if (!data) {
    return dispatch({
      type: WORKFLOW_MIGRATION_UNSELECT_DATA_SOURCE
    });
  }

  const { data_sources } = getState().workflow.item_migration;
  const data_targets = [];

  for (let i = 0; i < data_sources.length; i++) {
    let element = data_sources[i];
    if (data.id !== element.id) {
      data_targets.push(element);
    }
  }

  dispatch(beginCall(I18n.t("commons.actions.loading")));

  let workflow_source_instances, workflow_source_xml;
  try {
    workflow_source_instances = await this.getInstances(data.id);

    workflow_source_xml = await axios
      .get(`/workflow/definitions/process/${data.id}/xml`)
      .then(res => res.data.bpmn20Xml);

    dispatch({
      type: WORKFLOW_MIGRATION_SELECT_DATA_SOURCE,
      data_targets,
      workflow_source_instances,
      workflow_source: data,
      workflow_source_xml
    });

    callback();

    return dispatch(completeCall());
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};

/* Action for generate */

export const selectDataTarget = workflow_target => async (
  dispatch,
  getState
) => {
  if (isCalling(getState())) {
    return;
  }

  if (!workflow_target) {
    return dispatch({
      type: WORKFLOW_MIGRATION_SELECT_DATA_TARGET,
      workflow_target: null,
      workflow_target_xml: null,
      generate: null
    });
  }

  const { workflow_source } = getState().workflow.item_migration;

  dispatch(beginCall(I18n.t("commons.actions.loading")));

  try {
    const workflow = await axios
      .get(`/workflow/definitions/process/${workflow_target.id}/xml`)
      .then(res => res.data);

    const workflow_target_instances = await this.getInstances(
      workflow_target.id
    );

    const generate = await axios
      .post("/workflow/migartion/generate", {
        targetProcessDefinitionId: workflow_target.id,
        sourceProcessDefinitionId: workflow_source.id
      })
      .then(res => res.data);

    let activite_sources = await axios
      .get(
        `/workflow/definitions/process/${
          workflow_source.id
        }/activity?migration=true`
      )
      .then(res => res.data);

    let activite_targets = await axios
      .get(
        `/workflow/definitions/process/${
          workflow_target.id
        }/activity?migration=true`
      )
      .then(res => res.data);

    const instructions = [];
    const targetActivityIds = [];
    for (let j = 0; j < generate.instructions.length; j++) {
      const instruction = generate.instructions[j];
      const activite_source = activite_sources.tasks.find(
        e => instruction.sourceActivityIds[0] === e.id
      );

      if (!activite_source) {
        instruction.sourceActivityName = instruction.sourceActivityIds[0];
      } else {
        instruction.sourceActivityName =
          activite_source.name || activite_source.id;
      }

      const activite_target = activite_targets.tasks.find(
        e => instruction.targetActivityIds[0] === e.id
      );

      let targetActivityName;
      if (!activite_target) {
        targetActivityName = instruction.targetActivityIds[0];
      } else {
        targetActivityName = activite_target.name || activite_target.id;
      }

      targetActivityIds.push({
        key: instruction.targetActivityIds[0],
        name: targetActivityName
      });

      instructions.push(instruction);
    }
    generate.instructions = instructions;

    dispatch({
      type: WORKFLOW_MIGRATION_SELECT_DATA_TARGET,
      workflow_target,
      workflow_target_xml: workflow.bpmn20Xml,
      workflow_target_instances,
      generate,
      targetActivityIds: _.orderBy(targetActivityIds, ["name"], ["asc"])
    });

    return dispatch(completeCall());
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};

/*            Migration            */
export const changeTargetActivity = (index, value) => (dispatch, getState) => {
  const generate = clone(getState().workflow.item_migration.generate);
  generate.instructions[index].targetActivityIds[0] = value;

  return dispatch({
    type: WORKFLOW_MIGRATION_CHANGE_TARGET_ACTIVITY,
    generate
  });
};

export const generate = (action_type) => async (dispatch, getState) => {

  if (isCalling(getState())) {
    return;
  }
  const {
    generate,
    workflow_target,
    workflow_source
  } = getState().workflow.item_migration;

  if (!workflow_target || !workflow_source) {
    return dispatch({
      type: WORKFLOW_MIGRATION_ERROR,
      message: I18n.t("commons.messages.this_field_is_required")
    });
  }
  
  dispatch(beginCall(I18n.t("project.workflow.migrating")));

  const instructions = clone(generate.instructions);

  for (let i = 0; i < instructions.length; i++) {
    let element = instructions[i];
    delete element.sourceActivityName;
    delete element.targetActivityName;
  }

  try {
    await axios
      .post(`/workflow/migartion/${action_type}`, {
        targetProcessDefinitionId: workflow_target.id,
        sourceProcessDefinitionId: workflow_source.id,
        instructions: instructions
      })
      .then(res => res.data);

    const workflow_target_instances = await this.getInstances(
      workflow_target.id
    );

    const workflow_source_instances = await this.getInstances(
      workflow_source.id
    );

    dispatch({
      type: WORKFLOW_MIGRATION_MIGRATION_DONE,
      workflow_target_instances,
      workflow_source_instances
    });

    if (action_type === "validate") {
      return dispatch(completeCall(I18n.t("project.workflow.work_fine")));
    }
    return dispatch(completeCall(I18n.t("project.workflow.completed")));
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};

/*      END ________     */

/**
 * RESET
 */
export const resetState = () => ({
  type: WORKFLOW_ITEM_RESET
});
