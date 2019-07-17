import axios from 'axios';

import * as types from '../constants';
import { API_ENDPOINT, APP_NAME } from '../../../../../constants';

import { getPatternList } from '../../pattern_definitions/actions/pattern_list_action'
import { getErrors } from '../../error_definitions//actions/error_list_action'
import { getLookups } from '../../lookup_definitions/actions/lookup_list_action'
import { getTransformRules } from '../../rule_definitions/actions/transform_rule_list_action'
import { getServices } from '../../service_definitions//actions/service_list_action'
import { getValidations } from '../../validation_definitions/actions/validation_list_action'

import {
    handleExtractData,
    openRespondSnackbar
} from '../../../../common/snackbars/actions/common_action';
import { setTimeout } from 'timers';


export const openDialogImport = (functionKey) => async (dispatch, getState) => {
    dispatch({
        type: types.PRE_DEFINED_IMPORT_OPEN_DIALOG,
        key: functionKey

    })
}

export const closeDialogImport = () => (dispatch, getState) => {
    dispatch({
        type: types.PRE_DEFINED_IMPORT_CLOSE_DIALOG
    })
}

export const importCheckItems = (items) => (dispatch, getState) => {


    dispatch({
        type: types.PRE_DEFINED_IMPORT_CHECK_ITEMS,
        selected_items: items

    })

}
export const importChangeFile = (file) => (dispatch, getState) => {
    if (file) {
        const { name } = file;
        if (name.endsWith('.json')) {
            let reader = new FileReader();
            reader.onload = eventReder => {
                let data = { file, data: JSON.parse(eventReder.target.result) }
                const { key } = getState().config_import_export_pre_defined.import_pre_defined;
                const keyArr = Object.keys(data.data);

                if (keyArr.find(item => item === key || item === key.replace(/-/g, "_"))) {
                    dispatch({
                        type: types.PRE_DEFINED_IMPORT_CHANGE_FILE,
                        datas: data.data[key],

                        error_text: '',
                        file: data.file
                    })
                }
            }
            reader.readAsText(file, "UTF-8");


        } else {
            dispatch({
                type: types.PRE_DEFINED_IMPORT_CHANGE_FILE,
                file: null,
                datas: [],
                datas_info: [],
                error_text: 'Only accept json file!!!'
            })
        }
    }
}

export const importDatas = () => (dispatch, getState) => {
    const { selected_items, key } = getState().config_import_export_pre_defined.import_pre_defined;
    var import_datas = {};
    import_datas[key.replace(/-/g, "_")] = selected_items;
    return axios(`${API_ENDPOINT}/apps/${APP_NAME}/import-export-definitions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(import_datas)
    }).then(handleExtractData)
        .then(res => {

            var message = res.reduce(function (prevVal, elem) {
                switch (key) {
                    case "error-definitions": dispatch(getErrors()); break;
                    case "validation-definitions": dispatch(getValidations()); break;
                    case "pattern-definitions": dispatch(getPatternList()); break;
                    case "lookup-definitions": dispatch(getLookups()); break;
                    case "transform-rule-definitions": dispatch(getTransformRules()); break;
                    case "service-definitions": dispatch(getServices()); break;
                    default: return;
                }

                return `${prevVal ? `${prevVal} \n ***` : `${prevVal} ***`}  ${elem.key}: ${elem.response.length} items ${elem.conflicts && elem.conflicts.length > 0 ? `(${elem.conflicts.length} conflict names): ${elem.conflicts.join(',')}` : ''}`
            }, "");

            setTimeout(
                dispatch(
                    openRespondSnackbar(
                        message,
                        false,
                        'Import Pre-defined'
                    )
                ), 10000);
            dispatch({ type: types.PRE_DEFINED_IMPORT_SAVE_DATAS })
        })
        .catch(error => {
            dispatch(
                openRespondSnackbar(
                    error,
                    true,
                )
            );
        })




}
