import clone from 'clone';
import { UPLOAD_ACTION, GOTO } from './index';
import { MAX_TRY_RELOAD, TIME_TRY_RELOAD, TIME_TRY_LOAD } from '../constants';
import XClient from '../../../../common/api';
import { NotifyActions } from '../../../../common/notification';
import { setTimeout } from 'timers';
const fetchUploadConfig = (config_id, didInvalidate) => async (dispatch) => {
    let _res = await XClient.upload_configuration.get(config_id);
    if (_res.error) {
        dispatch({ type: UPLOAD_ACTION.DID_INVALIDATION });
        if (didInvalidate === (MAX_TRY_RELOAD - 1)) {
            dispatch(NotifyActions.error('', 'projects.upload_configuration.message.error.not_exist', { i18: !0 }));
            setTimeout(() => {
                dispatch({ type: UPLOAD_ACTION.RESET_ITEM });
                dispatch(gotoList());
            }, 1570)
        }
    } else {
        dispatch({ type: UPLOAD_ACTION.RECEIVE, payload: converOjectStrucToLearnObject(_res.payload) });
    }
}
const shouldFetch = (item_upload, config_id) => {
    return (!item_upload.isFetching
        && (item_upload.didInvalidate < MAX_TRY_RELOAD)
        && (
            !item_upload.item
            || item_upload.item.id !== config_id
        )
    )
};
export const gotoList = () => ({ type: GOTO.LIST });
export const resetGoto = () => ({ type: GOTO.RESET });
export const fetchIfNeeded = (info) => (dispatch) => {
    const { item_upload_configuration, config_id } = info;
    if (shouldFetch(item_upload_configuration, config_id)) {
        dispatch({ type: UPLOAD_ACTION.FETCHING });
        let _fetchUpload = fetchUploadConfig(config_id, item_upload_configuration.didInvalidate);
        if (item_upload_configuration.didInvalidate > 0) {
            setTimeout(() => {
                dispatch(_fetchUpload)
            }, TIME_TRY_RELOAD[item_upload_configuration.didInvalidate] || TIME_TRY_LOAD);
        } else {
            dispatch(_fetchUpload)
        }
    }
}
export const changeField = (field_name, field_value) => {
    return { type: UPLOAD_ACTION.CHANGE_FIELD_VALUE, field_name, field_value }
}


export const changeFieldByName = (item, field_name, field_value) => {
    let data = clone(item);
    let parts = field_name.split('.');
    let dataTmp = data;
    for (let index = 0; index < parts.length - 1; index++) {
        dataTmp[parts[index]] = dataTmp[parts[index]] || {};
        dataTmp = dataTmp[parts[index]];
    }
    dataTmp[parts[parts.length - 1]] = field_value;
    return data;
}
const converToOjectStruc = (data) => {
    let dataResult = {};
    Object.keys(data).forEach((key) => {
        dataResult = changeFieldByName(dataResult, key, data[key]);
    })
    return dataResult;
}
const converOjectStrucToLearnObject = (data, key = '') => {
    let dataResult = {}
    Object.keys(data).forEach((_key) => {
        if (typeof data[_key] === 'object') {
            Object.assign(dataResult, converOjectStrucToLearnObject(data[_key], key + _key + '.'))
        } else {
            dataResult[key + _key] = data[_key]
        }
    })
    return dataResult;
}
export const deleteConfig = (config_id) => async (dispatch) => {
    dispatch({ type: UPLOAD_ACTION.DELETING });
    let _res = await XClient.upload_configuration.delete(config_id);
    if (_res.error) {
        dispatch(NotifyActions.error('', 'projects.upload_configuration.message.error.cant_delete', { i18: !0 }))
        dispatch({ type: UPLOAD_ACTION.DELETED_INVALIDATION });
    } else {
        dispatch(NotifyActions.success('', 'projects.upload_configuration.message.success.delete_success', { i18: !0 }));
        setTimeout(() => {
            dispatch({ type: UPLOAD_ACTION.RESET_ITEM });
            dispatch(gotoList());
        }, 570)
    }
}
export const saveConfig = (data, projectId) => async (dispatch) => {
    let dataStruc = converToOjectStruc(data.item)
    dataStruc.project_id = projectId;
    dispatch({ type: UPLOAD_ACTION.ADDING });
    let _res = await XClient.upload_configuration.add(dataStruc);
    if (_res.error) {
        dispatch({ type: UPLOAD_ACTION.ADDED });
        dispatch(NotifyActions.error('', JSON.stringify(_res.payload)))
    } else {
        dispatch(reset());
        dispatch(NotifyActions.success('', 'projects.upload_configuration.message.success.save_success', { i18: !0 }));
    }
}
export const updateConfig = (data, config_id) => async (dispatch) => {
    let dataStruc = converToOjectStruc(data)
    delete dataStruc.id;
    dispatch({ type: UPLOAD_ACTION.UPDATING });
    let _res = await XClient.upload_configuration.update(config_id, dataStruc);
    if (_res.error) {
        dispatch(NotifyActions.success('', 'projects.upload_configuration.message.error.cant_update', { i18: !0 }))
        dispatch({ type: UPLOAD_ACTION.UPDATED });
    } else {
        dispatch(NotifyActions.success('', 'projects.upload_configuration.message.success.update_success', { i18: !0 }))
        dispatch({ type: UPLOAD_ACTION.UPDATED });
    }
}
export const reset = () => ({ type: UPLOAD_ACTION.RESET_ITEM })
export default {
    changeField,
    fetchIfNeeded,
    reset,
    deleteConfig,
    updateConfig,
    saveConfig,
    gotoList,
    resetGoto,
}
