import clone from "clone";

import {
  WORKFLOW_ITEM_HISTORY_SET_LIST,
  WORKFLOW_ITEM_HISTORY_SHOW,
  WORKFLOW_ITEM_HISTORY_HIDE,
  WORKFLOW_ITEM_RESET
} from "../constants/workflow_constants";

const initialState = {
  open: false,
  publishes: []
};

const workflow_item_history = (state = clone(initialState), action) => {
  switch (action.type) {
    case WORKFLOW_ITEM_HISTORY_SHOW:
      return {
        ...state,
        open: true
      };
    case WORKFLOW_ITEM_HISTORY_HIDE:
      return {
        ...state,
        open: false
      };
    case WORKFLOW_ITEM_HISTORY_SET_LIST:
      return {
        ...state,
        publishes: action.publishes || []
      };
    case WORKFLOW_ITEM_RESET:
      return clone(initialState);
    default:
      return state;
  }
};

export default workflow_item_history;
