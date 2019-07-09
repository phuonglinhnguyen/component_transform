import * as actions from "../../actions/tranform_configuration";
import {
  callAPIGetData,
  callAPICreateData,
  callAPIDeleteData,
  callAPIUpdateData
} from "./call_api";
import {cloneDeep} from 'lodash';
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

// createDataTransform
export const createData = (config: any) => async (
  dispatch: any,
  getState: any
) => {
  const projectId = config.project_id;
  await dispatch(
    callAPICreateData({
      data: config,
      projectId: config.project_id
    })
  );
  await dispatch(getDataTranform(projectId));
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

// updateDataTransform
export const updateData = (config: any) => async (
  dispatch: any,
  getState: any
) => {
  const projectId = cloneDeep(config.project_id);
  delete config.project_id;
   await dispatch(
    callAPIUpdateData({
      data: config,
      projectId: projectId,
      id: config.id
    })
  );
  await dispatch(getDataTranform(projectId));
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

// deleteDataTransform
export const deleteData = (config: any) => async (
  dispatch: any,
  getState: any
) => {
  const projectId = config.project_id;
  await dispatch(
    callAPIDeleteData({
      id: config.id,
      projectId: config.project_id
    })
  );
  await dispatch(getDataTranform(projectId));
  dispatch({
    type: actions.TRANFORM_CONFIGURATION_DELETE_DATA,
    payload: {
      config
    },
    meta: {
      resource: actions.NAME_REDUCER
    }
  });
};
// export const unmount = () => async (dispatch: any, getState: any) => {
//   dispatch({
//     type: actions.TRANFORM_CONFIGURATION_UNMOUNT,
//     payload: {},
//     meta: {
//       resource: actions.NAME_REDUCER
//     }
//   });
// };
// export const setPending = () => {
//   return {
//     type: actions.PENDING,
//     payload: {
//       success: false,
//       pending: true,
//       error: false
//     },
//     meta: {
//       resource: actions.NAME_REDUCER
//     }
//   };
// };

// export const setError = () => {
//   return {
//     type: actions.ERROR,
//     payload: {
//       success: false,
//       pending: false,
//       error: true
//     },
//     meta: {
//       resource: actions.NAME_REDUCER
//     }
//   };
// }