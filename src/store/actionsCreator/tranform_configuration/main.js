import * as actions from '../../actions/tranform_configuration'
import { callAPIGetData } from './call_api';
export const getDataTranform = (projectId: any) => async (dispatch: any, getState: any) => {
    console.log("projectId; ", projectId);
    const data = await dispatch(callAPIGetData({projectId}));
    console.log("data; ", data);
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