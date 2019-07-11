import * as actions from "../actions/tranform_configuration";
import { cloneDeep } from "lodash";
import Config from "../../views/tranform_configuration/components/Models/Config";

const initialState = {
  pending: false,
  error: false,
  success: false,
  data: [],
  refreshPage: false,
  config: new Config(),
  setIsOpen: false
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
      case actions.SET_CONFIG:
      case actions.SET_SELECTED_CONFIG:
      case actions.ISOPEN_DIALOG:
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
