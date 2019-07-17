import {
  WORKFLOW_ITEM_MONITOR_HIDE_VIEW_INSTANCES,
  WORKFLOW_ITEM_MONITOR_SHOW_VIEW_INSTANCES,
  WORKFLOW_ITEM_MONITOR_HIDE_VIEW_EXCHANGE,
  WORKFLOW_ITEM_MONITOR_SHOW_VIEW_EXCHANGE,
  WORKFLOW_ITEM_MONITOR_CHANGE_SOURCE_ACTIVITY,
  WORKFLOW_ITEM_MONITOR_CHANGE_TARGET_ACTIVITY,
  WORKFLOW_ITEM_MONITOR_VALID,
  WORKFLOW_ITEM_MONITOR_EXCHANGE,
  WORKFLOW_ITEM_RESET
} from "../constants/workflow_constants";

const initialState = {
  show_exchange: false,
  show_instances: false,
  instances: null
};

const workflow_motior = (state = { ...initialState }, action) => {
  switch (action.type) {
    case WORKFLOW_ITEM_MONITOR_SHOW_VIEW_EXCHANGE:
      return {
        ...state,
        source_activity: action.element_id,
        target_tasks: action.target_tasks,
        target_activity: null,
        error_text_type: null,
        show_exchange: true,
        show_instances: false
      };
    case WORKFLOW_ITEM_MONITOR_HIDE_VIEW_EXCHANGE:
      return {
        ...state,
        show_exchange: false,
        target_tasks: null
      };
    case WORKFLOW_ITEM_MONITOR_SHOW_VIEW_INSTANCES:
      return {
        ...state,
        instances: action.datas,
        target_tasks: action.target_tasks,
        task: action.task,
        show_instances: true,
        show_exchange: false
      };
    case WORKFLOW_ITEM_MONITOR_HIDE_VIEW_INSTANCES:
      return {
        ...state,
        show_instances: false,
        instances: null,
        target_tasks: null
      };
    case WORKFLOW_ITEM_MONITOR_CHANGE_SOURCE_ACTIVITY:
      return {
        ...state,
        target_tasks: action.target_tasks,
        source_activity: action.value
      };
    case WORKFLOW_ITEM_MONITOR_CHANGE_TARGET_ACTIVITY:
      return {
        ...state,
        target_activity: action.value
      };
    case WORKFLOW_ITEM_MONITOR_VALID:
      return {
        ...state,
        error_text_type: action.error_text_type
      };
    case WORKFLOW_ITEM_MONITOR_EXCHANGE:
      return {
        ...state,
        source_activity: null,
        target_activity: null
      };
    case WORKFLOW_ITEM_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default workflow_motior;
