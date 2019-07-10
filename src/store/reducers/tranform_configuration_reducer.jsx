import * as actions from "../actions/tranform_configuration";
import { cloneDeep } from "lodash";

const initialState = {
  pending: false,
  error: false,
  success: false,
  data: [],
  refreshPage: false,
};

export default {
  name: actions.NAME_REDUCER,
  reducer: (
    state = { ...cloneDeep(initialState) },
    { type, payload }: any
  ): any => {
    switch (type) {
      case actions.TRANFORM_CONFIGURATION_GET_DATA:
      case actions.TRANFORM_CONFIGURATION_UPDATE_DATA:
      case actions.TRANFORM_CONFIGURATION_CREATE_DATA:
      case actions.TRANFORM_CONFIGURATION_DELETE_DATA:
      case actions.PENDING:
      case actions.RESET:
      case actions.ERROR:
      case actions.SUCCESS:
        return {
          ...state,
          ...payload
        };
      case actions.TRANFORM_CONFIGURATION_UNMOUNT:
        return cloneDeep(initialState);
      default:
        return state;
    }
  }
};
