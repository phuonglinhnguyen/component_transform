import { IO_CONFIGURATION_TYPE } from './index';
import { MAX_TRY_RELOAD, TIME_TRY_RELOAD, TIME_TRY_LOAD } from '../constants';
import XClient from '../../../../common/api';


const fetchUploadCount = (projectId, didInvalidate) => async (dispatch) => {
    let _res = await XClient.io_configurations.get_info_configurations(projectId);
    if (_res.error) {
        dispatch({ type: IO_CONFIGURATION_TYPE.DID_INVALIDATE_COUNT });
    } else {
        dispatch({ type: IO_CONFIGURATION_TYPE.RECEIVE_COUNT, payload: _res.payload, projectId });
    }
}
const shouldFetchCount = (io_configurations_export, projectId) => {
    let shouldUpdata = (!io_configurations_export.isFetchingCount
        && projectId
        && projectId.length
        && (io_configurations_export.didInvalidate < MAX_TRY_RELOAD)
        && (!io_configurations_export.count || io_configurations_export.count.project_id !== projectId)
    )
    return shouldUpdata
};
export const fetchCountIfNeeded = (info) => (dispatch) => {
    const { projectId, io_configurations_export } = info;
    if (shouldFetchCount(io_configurations_export, projectId)) {
        dispatch({ type: IO_CONFIGURATION_TYPE.FETCHING_COUNT });
        let _fetchUploadCount = fetchUploadCount(projectId, io_configurations_export.didInvalidate);
        if (io_configurations_export.didInvalidate > 0) {
            setTimeout(() => {
                dispatch(_fetchUploadCount)
            }, TIME_TRY_RELOAD[io_configurations_export.didInvalidate] || TIME_TRY_LOAD);
        } else {
            dispatch(_fetchUploadCount)
        }
    }
}
export const getExportConfigurations = (info) => async (dispatch) => {
    const { projectId, io_configurations_export } = info;
    const { exportList } = io_configurations_export;
    if (!io_configurations_export.isFetchingExport) {
        dispatch({ type: IO_CONFIGURATION_TYPE.FETCHING_EXPORT });
        let excludes = [{ configurationName: 'project_users', excludes: ['tasks_assigned'] },
        { configurationName: 'project_workflow', excludes: ['publish_id'] },
        ];

        let _res = await XClient.io_configurations.get_export_configurations(projectId, exportList, excludes);
        if (_res.error) {
            dispatch({ type: IO_CONFIGURATION_TYPE.DID_INVALIDATE_EXPORT });
        } else {
            dispatch({ type: IO_CONFIGURATION_TYPE.RECEIVE_EXPORT, payload: _res.payload });
        }
    }
}
export const downloadedExport = () => ({ type: IO_CONFIGURATION_TYPE.DOWNLOADED_EXPORT })
export const reset = () => ({ type: IO_CONFIGURATION_TYPE.RESET })
export const addExportConfiguration = (configurationName) => ({ type: IO_CONFIGURATION_TYPE.ADD_EXPORT, configurationName })
export const removeExportConfiguration = (configurationName) => ({ type: IO_CONFIGURATION_TYPE.REMOVE_EXPORT, configurationName })

export default {
    fetchCountIfNeeded,
    reset,
    addExportConfiguration,
    removeExportConfiguration,
    downloadedExport,
    getExportConfigurations
}
