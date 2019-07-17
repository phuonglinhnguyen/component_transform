import {
  WORKFLOW_MIGRATION_GETTING,
  WORKFLOW_MIGRATION_GET_DONE,
  WORKFLOW_MIGRATION_UNSELECT_DATA_SOURCE,
  WORKFLOW_MIGRATION_SELECT_DATA_SOURCE,
  WORKFLOW_MIGRATION_SELECT_DATA_TARGET,
  WORKFLOW_MIGRATION_CHANGE_TARGET_ACTIVITY,
  WORKFLOW_MIGRATION_ERROR,
  WORKFLOW_MIGRATION_MIGRATION_DONE,
  WORKFLOW_ITEM_RESET
} from "../constants/workflow_constants";

const initialState = {
  is_fetching: false,
  action_type: false,

  workflow_source: null,
  workflow_source_instances: [],
  workflow_source_xml: null,
  workflow_target: null,
  workflow_target_instances: [],
  workflow_target_xml: null,
  targetActivityIds: null,
  generate: null,
  data_sources: [],
  data_targets: []
};

const workflow_migration = (state = { ...initialState }, action) => {
  switch (action.type) {
    case WORKFLOW_MIGRATION_GETTING:
      return {
        ...state,
        is_fetching: true
      };
    case WORKFLOW_MIGRATION_GET_DONE:
      return {
        ...state,
        data_sources: action.data_sources,
        is_fetching: false
      };
    case WORKFLOW_MIGRATION_UNSELECT_DATA_SOURCE:
      return {
        ...state,
        workflow_source: null,
        workflow_source_xml: null,
        workflow_target: null,
        workflow_target_xml: null,
        generate: null
      };
    case WORKFLOW_MIGRATION_SELECT_DATA_SOURCE:
      return {
        ...state,
        data_targets: action.data_targets,
        workflow_source: action.workflow_source,
        workflow_source_instances: action.workflow_source_instances,
        workflow_source_xml: action.workflow_source_xml,
        workflow_target: null,
        workflow_target_xml: null,
        generate: null
      };
    case WORKFLOW_MIGRATION_SELECT_DATA_TARGET:
      return {
        ...state,
        workflow_target: action.workflow_target,
        workflow_target_xml: action.workflow_target_xml,
        workflow_target_instances: action.workflow_target_instances,
        targetActivityIds: action.targetActivityIds,
        generate: action.generate
      };
    case WORKFLOW_MIGRATION_MIGRATION_DONE:
      return {
        ...state,
        workflow_source_instances: action.workflow_source_instances,
        workflow_target_instances: action.workflow_target_instances
      };
    case WORKFLOW_MIGRATION_CHANGE_TARGET_ACTIVITY:
      return {
        ...state,
        generate: action.generate
      };
    case WORKFLOW_MIGRATION_ERROR:
      return {
        ...state,
        error_text: action.message
      };
    case WORKFLOW_ITEM_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default workflow_migration;
