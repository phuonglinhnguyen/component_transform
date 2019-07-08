import * as actions from "../../actions/tranform_configuration";
import {
  callAPIGetData,
  callAPICreateData,
  callAPIDeleteData,
  callAPIUpdateData
} from "./call_api";

export const getDataTranform = (projectId: any) => async (
  dispatch: any,
  getState: any
) => {
  const data = await dispatch(callAPIGetData({ projectId }));
  if (data.code === 404) { //null, underfied, []... =. false ; 200, 404
    // dispatch(setError());
  } else {
    dispatch({
      type: actions.TRANFORM_CONFIGURATION_GET_DATA,
      payload: {
        data
      },
      meta: {
        resource: actions.NAME_REDUCER
      }
    });
  }
};

export const createData = (config: any) => async (
  dispatch: any,
  getState: any
) => {
  dispatch(
    callAPICreateData({
      data: config,
      projectId: config.project_id
    })
  );
  dispatch({
    type: actions.TRANFORM_CONFIGURATION_CREATE_DATA,
    payload: {
      config
    },
    meta: {
      resource: actions.NAME_REDUCER
    }
  });
};

export const updateData = (config: any) => async (
  dispatch: any,
  getState: any
) => {
  console.log("config_main", config);
  const projectId = config.project_id;
  await dispatch(
    callAPIUpdateData({
      data: config,
      projectId: config.project_id,
      id: config.id
    })
  );

  await dispatch(getDataGeneralConfiguration(projectId));
  dispatch({
    type: actions.TRANFORM_CONFIGURATION_UPDATE_DATA,
    payload: {
      config
    },
    meta: {
      resource: actions.NAME_REDUCER
    }
  });
};

export const deleteData = (config: any) => async (
  dispatch: any,
  getState: any
) => {
  console.log("config_main", config);
  dispatch(
    callAPIDeleteData({
      data: config,
      projectId: config.project_id
    })
  );
  // const data = await
  // dispatch({
  //   type: actions.TRANFORM_CONFIGURATION_DELETE_DATA,
  //   payload: {
  //     config
  //   },
  //   meta: {
  //     resource: actions.NAME_REDUCER
  //   }
  // });
};




// createDataTransform
