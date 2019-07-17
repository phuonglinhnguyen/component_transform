import { IO_CONFIGURATION_IMPORT , IO_CONFIGURATION_TYPE} from './index';
import { MAX_TRY_RELOAD, TIME_TRY_RELOAD, TIME_TRY_LOAD } from '../constants';
import XClient from '../../../../common/api';


const fetchUploadCount = (projectId, didInvalidate) => async (dispatch) => {
  let _res = await XClient.io_configurations.get_info_configurations(projectId);
  if (_res.error) {
      dispatch({ type: IO_CONFIGURATION_IMPORT.DID_INVALIDATE_COUNT });
  } else {
      dispatch({ type: IO_CONFIGURATION_IMPORT.RECEIVE_COUNT, payload: _res.payload, projectId });
  }
}
const shouldFetchCount = (io_configurations_import, projectId) => {
  let shouldUpdata = (!io_configurations_import.isFetchingCount
      && projectId
      && projectId.length
      && (io_configurations_import.didInvalidate < MAX_TRY_RELOAD)
      && (!io_configurations_import.count || io_configurations_import.count.project_id !== projectId)
  )
  return shouldUpdata
};
export const fetchCountIfNeeded = (info) => (dispatch) => {
  const { projectId, io_configurations_import } = info;
  if (shouldFetchCount(io_configurations_import, projectId)) {
      dispatch({ type: IO_CONFIGURATION_IMPORT.FETCHING_COUNT });
      let _fetchUploadCount = fetchUploadCount(projectId, io_configurations_import.didInvalidate);
      if (io_configurations_import.didInvalidate > 0) {
          setTimeout(() => {
              dispatch(_fetchUploadCount)
          }, TIME_TRY_RELOAD[io_configurations_import.didInvalidate] || TIME_TRY_LOAD);
      } else {
          dispatch(_fetchUploadCount)
      }
  }
}


export const selectSourceForm = (sourceKey) => (dispatch) => {
  dispatch({ type: IO_CONFIGURATION_IMPORT.SET_SOURCE_FROM, payload: sourceKey })
  // dispatch(export_actions.reset())
}

export const importDataFile = (data) => ({ type: IO_CONFIGURATION_IMPORT.SET_DATA_FROM_FILE, payload: data })
export const reset = (data) => ({ type: IO_CONFIGURATION_IMPORT.RESET })

const importing = () => ({ type: IO_CONFIGURATION_IMPORT.IO_CONFIGURATION_PROJECTS_IMPORTING })
const import_success = (data) => ({ type: IO_CONFIGURATION_IMPORT.IMPORT_SUCCESS, payload: data })

export const addImportConfiguration = (configurationName) => ({ type: IO_CONFIGURATION_IMPORT.ADD_IMPORT, configurationName })
export const removeImportConfiguration = (configurationName) => ({ type: IO_CONFIGURATION_IMPORT.REMOVE_IMPORT, configurationName })

export const importConfig = (projectId, callback) => async (dispatch, getState) => {

  const { io_configurations_export, projects, io_configurations_import } = getState().project.io_configurations;
  try {
    dispatch(importing)
    let dataImport = {}
    if (io_configurations_import.sourceKey === 'project') {
      let excludes = [{ configurationName: 'project_users', excludes: ['tasks_assigned'] },
      { configurationName: 'project_workflow', excludes: ['publish_id'] },
      ];
      dataImport = await XClient.io_configurations.clone_configurations(projectId, projects.projectId, io_configurations_import.importList, excludes)
    } else {
      
      dataImport = await XClient.io_configurations.import_configurations(projectId, io_configurations_import.dataFile.data, io_configurations_import.importList)
    }

    dispatch(import_success(dataImport))

    callback && callback()
  } catch (error) {
    console.log(error);
  }
}


export default {
  selectSourceForm,
  importConfig,
  importDataFile,
  reset,
  addImportConfiguration,
  removeImportConfiguration,
  fetchCountIfNeeded
}