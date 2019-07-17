import axios from 'axios';
import { API_ENDPOINT,APP_NAME } from '../../../../../constants';

import * as types from '../constants';
import {
    openRespondSnackbar
} from '../../../../common/snackbars/actions/common_action';
import { saveFileJSON } from '../../../../../utils/common/file_io'

export const openDialogExport = (functionKey) => async (dispatch, getState) => {
    var responseDatas = await axios.get(`apps/${APP_NAME}/${functionKey}`);
    const datas = responseDatas.data

    dispatch({
        type: types.PRE_DEFINED_EXPORT_OPEN_DIALOG,
        datas: datas,
        key: functionKey
    })
}

export const closeDialogExport = () => (dispatch, getState) => {
    dispatch({
        type: types.PRE_DEFINED_EXPORT_CLOSE_DIALOG
    })
}

export const exportCheckItems = (items) => (dispatch, getState) => {


    dispatch({
        type: types.PRE_DEFINED_EXPORT_CHECK_ITEMS,
        selected_items: items

    })

}

export const exportDatas = () => async(dispatch, getState) => {
    const {  key, selected_items } = getState().config_import_export_pre_defined.export_pre_defined;
    var export_datas = {};
    export_datas[key] = selected_items;
   

    try {
       await saveFileJSON(`${key}_${new Date().toLocaleString("en-US")}.json`, export_datas);
        dispatch({ type: types.PRE_DEFINED_EXPORT_SAVE_DATAS })
       

    } catch (error) {
        dispatch(
            openRespondSnackbar(
                error,
                true,

            )
        );
    }

}