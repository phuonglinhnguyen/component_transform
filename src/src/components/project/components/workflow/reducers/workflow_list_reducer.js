import {
  WORKFLOW_LIST_GETTING,
  WORKFLOW_LIST_GET_DONE,
  WORKFLOW_LIST_RESET
} from "../constants/workflow_constants";

const initialState = {
  is_fetching: false,

  datas: []
};

const workflow_list = (state = { ...initialState }, action) => {
  switch (action.type) {
    case WORKFLOW_LIST_GETTING:
      return {
        ...state,
        is_fetching: true
      };
    case WORKFLOW_LIST_GET_DONE:
      return {
        ...state,
        datas: action.datas,
        is_fetching: false,
      };
    case WORKFLOW_LIST_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default workflow_list;
