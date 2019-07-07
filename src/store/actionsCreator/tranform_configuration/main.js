import * as actions from "../../actions/tranform_configuration";
import {
  callAPIGetData,
  callAPIUpdateData,
  callAPIDeleteData
} from "./call_api";

export const getDataTranform = (projectId: any) => async (
  dispatch: any,
  getState: any
) => {
  const data = await dispatch(callAPIGetData({ projectId }));
  // if(data.code === 404){

  // }
  // else{

  // }
  dispatch({
    type: actions.TRANFORM_CONFIGURATION_GET_DATA,
    payload: {
      data
    },
    meta: {
      resource: actions.NAME_REDUCER
    }
  });
};

export const deleteData = (config: any) => async (dispatch: any, getState: any) => {
  console.log("test");
  dispatch(callAPIDeleteData(config))
};

// createDataTransform