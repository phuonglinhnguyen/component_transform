import { cloneDeep } from 'lodash';
import clone from 'clone';

import { IO_CONFIGURATION_IMPORT, IO_CONFIGURATION_TYPE } from '../action_creators';
const importInitialState = {
  dataFile: {},
  sourceKey: 'project',
  isImporting: !1,
  isFetchingCount: !1,
  didInvalidate: 0,
  configurations: {},
  gettingConfigurations: !1,
  importList: [],

}
export default (state = cloneDeep(importInitialState), action) => {
  switch (action.type) {
    case IO_CONFIGURATION_IMPORT.SET_SOURCE_FROM:
      return {
        ...state,
        sourceKey: action.payload
      }
    case IO_CONFIGURATION_IMPORT.SET_DATA_FROM_FILE:
      return {
        ...state,
        dataFile: action.payload
      }
    case IO_CONFIGURATION_IMPORT.RESET:
      return cloneDeep(importInitialState)

    case IO_CONFIGURATION_IMPORT.IMPORTING:
      return {
        ...state,
        isImporting: !0,
      }
    case IO_CONFIGURATION_IMPORT.IMPORT_SUCCESS:
      return {
        ...state,
        isImporting: !1,
        dataSuccess: action.payload
      }
    case IO_CONFIGURATION_IMPORT.FETCHING_COUNT:
      return {
        ...state,
        isFetchingCount: !0,
        count: undefined
      }
    case IO_CONFIGURATION_IMPORT.DID_INVALIDATE_COUNT:
      let _i = state.didInvalidate + 1;
      return {
        ...state,
        isFetchingCount: false,
        didInvalidate: _i
      };
    case IO_CONFIGURATION_IMPORT.RECEIVE_COUNT:
      return {
        ...state,
        count: action.payload,
        projectId: action.projectId,
        didInvalidate: 0,
        isFetchingCount: false,
      };
    case IO_CONFIGURATION_IMPORT.ADD_IMPORT: {
      let _imports = clone(state.importList);
      let _importsCurrent = clone(_imports)
      if (Array.isArray(action.configurationName)) {
        action.configurationName.forEach(configName => {
          if (!_importsCurrent.includes(configName))
            _imports.push(configName);
        })
      } else {
        if (!_importsCurrent.includes(action.configurationName))
          _imports.push(action.configurationName);
      }
      return {
        ...state,
        importList: _imports
      }
    }
    case IO_CONFIGURATION_IMPORT.REMOVE_IMPORT: {
      let _exports = clone(state.importList);
      if (Array.isArray(action.configurationName)) {
        _exports = _exports.filter(config => !action.configurationName.includes(config));
      } else {
        _exports = _exports.filter(config => action.configurationName !== config);
      }
      return {
        ...state,
        importList: _exports
      }
    } 

    default:
      return state
  }
}