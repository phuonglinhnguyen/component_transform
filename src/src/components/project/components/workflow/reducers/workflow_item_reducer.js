import {
  WORKFLOW_ITEM_SET_CANVAS,
  WORKFLOW_ITEM_GETTING,
  WORKFLOW_ITEM_GET_DONE,
  WORKFLOW_ITEM_CHANGE_VERSION,
  WORKFLOW_ITEM_DEPLOYED,
  WORKFLOW_ITEM_CREATE,
  WORKFLOW_ITEM_ERROR,
  WORKFLOW_ITEM_SHOW_CONFIRM,
  WORKFLOW_ITEM_HIDE_CONFIRM,
  WORKFLOW_ITEM_SET_DATA,
  WORKFLOW_ITEM_CHANGE_TYPE,
  WORKFLOW_ITEM_VALID,
  WORKFLOW_ITEM_EXPAND,
  WORKFLOW_ITEM_RESET
} from "../constants/workflow_constants";

import clone from "clone";

const initialWorkflow = {
  publish_id: "",
  xml: ""
};

const initialState = {
  is_expand: false,
  is_create: false,
  is_fetching: true,
  is_saving: false,
  is_error: false,
  show_confirm: false,
  message_confirm: "",
  message: "",
  action_type: "",

  data: initialWorkflow,
  instances: [],
  tasks: []
};

const workflow_item = (state = clone(initialState), action) => {
  switch (action.type) {
    case WORKFLOW_ITEM_GETTING:
      return {
        ...state,
        is_get_instances: action.is_get_instances,
        is_fetching: true
      };
    case WORKFLOW_ITEM_CREATE:
      return {
        ...state,
        is_fetching: false,
        is_create: true,
        data: { ...initialWorkflow }
      };
    case WORKFLOW_ITEM_VALID:
      return {
        ...state,
      };
    case WORKFLOW_ITEM_CHANGE_TYPE:
      return {
        ...state,
        data: {
          ...state.data,
          type: action.workflow_type
        }
      };
    case WORKFLOW_ITEM_SET_CANVAS:
      return {
        ...state,
        modeler: action.modeler
      };
    case WORKFLOW_ITEM_CHANGE_VERSION:
      return {
        ...state,
        instances: action.instances || [],
        tasks: action.tasks || [],
        data: action.data
      };
    case WORKFLOW_ITEM_GET_DONE:
    case WORKFLOW_ITEM_DEPLOYED:
      return {
        ...state,
        is_fetching: false,
        data: action.data || state.data,
        instances: action.instances || [],
        tasks: action.tasks || []
      };
    case WORKFLOW_ITEM_ERROR:
      return {
        ...state,
        is_error: true,
        is_fetching: false
      };
    case WORKFLOW_ITEM_SHOW_CONFIRM:
      return {
        ...state,
        show_confirm: true,
        message_confirm: action.message,
        action_type: action.action_type
      };
    case WORKFLOW_ITEM_HIDE_CONFIRM:
      return {
        ...state,
        show_confirm: false
      };
    case WORKFLOW_ITEM_SET_DATA:
      return {
        ...state,
        is_create: false,
        data: { ...action.data }
      };    
    case WORKFLOW_ITEM_EXPAND:
      return {
        ...state,
        is_expand: action.expand
      };
    case WORKFLOW_ITEM_RESET:
      return clone(initialState);
    default:
      return state;
  }
};

export default workflow_item;
