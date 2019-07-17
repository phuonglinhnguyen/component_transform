import {
  WORKFLOW_ITEM_CONFIG_SHOW,
  WORKFLOW_ITEM_CONFIG_HIDE,
  WORKFLOW_ITEM_CONFIG_SET_LAYOUTS,
  WORKFLOW_ITEM_CONFIG_SET_SECTIONS,
  WORKFLOW_ITEM_CONFIG_SET_SERVICES,
  WORKFLOW_ITEM_RESET
} from "../constants/workflow_constants";

const initialState = {
  open: false,
  task_type: null,
  element: null
};

const workflow_item_config = (state = { ...initialState }, action) => {
  switch (action.type) {
    case WORKFLOW_ITEM_CONFIG_SET_LAYOUTS:
      return {
        ...state,
        layouts: action.layouts
      };
    case WORKFLOW_ITEM_CONFIG_SET_SECTIONS:
      return {
        ...state,
        sections: action.sections
      };
    case WORKFLOW_ITEM_CONFIG_SET_SERVICES:
      return {
        ...state,
        services: action.services
      };
    case WORKFLOW_ITEM_CONFIG_SHOW:
      return {
        ...state,
        open: true,
        task_type: action.task_type,
        element: action.element
      };
    case WORKFLOW_ITEM_CONFIG_HIDE:
      return {
        ...state,
        open: false
      };
    case WORKFLOW_ITEM_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default workflow_item_config;
