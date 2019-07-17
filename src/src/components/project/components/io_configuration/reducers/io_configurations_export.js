import clone from 'clone';
import { IO_CONFIGURATION_TYPE } from '../action_creators/index';
const exportInitialState = {
    isFetchingCount: !1,
    isFetchingExport: !1,
    didInvalidate: 0,
    configurations: {},
    gettingConfigurations: !1,
    fileName: '',
    exportList: [],
}
export default (state = clone(exportInitialState), action) => {
    switch (action.type) {
        case IO_CONFIGURATION_TYPE.FETCHING_COUNT:
            return {
                ...state,
                isFetchingCount: !0,
                count: undefined
            }
        case IO_CONFIGURATION_TYPE.DID_INVALIDATE_COUNT:
            let _i = state.didInvalidate + 1;
            return {
                ...state,
                isFetchingCount: false,
                didInvalidate: _i
            };
        case IO_CONFIGURATION_TYPE.RECEIVE_COUNT:
            return {
                ...state,
                count: action.payload,
                projectId: action.projectId,
                didInvalidate: 0,
                isFetchingCount: false,
            };
        case IO_CONFIGURATION_TYPE.ADD_EXPORT: {
            let _exports = clone(state.exportList);
            let _exportsCurrent = clone(_exports)
            if (Array.isArray(action.configurationName)) {
                action.configurationName.forEach(configName => {
                    if(!_exportsCurrent.includes(configName))
                    _exports.push(configName);
                })
            } else {
                if(!_exportsCurrent.includes(action.configurationName))
                _exports.push(action.configurationName);
            }
            return {
                ...state,
                exportList: _exports
            }
        }
        case IO_CONFIGURATION_TYPE.REMOVE_EXPORT: {
            let _exports = clone(state.exportList);
            if (Array.isArray(action.configurationName)) {
                _exports = _exports.filter(config => !action.configurationName.includes(config));
            } else {
                _exports = _exports.filter(config => action.configurationName !== config);
            }
            return {
                ...state,
                exportList: _exports
            }
        }
        case IO_CONFIGURATION_TYPE.FETCHING_EXPORT: {
            return {
                ...state,
                isFetchingExport: !0
            }
        }
        case IO_CONFIGURATION_TYPE.DID_INVALIDATE_EXPORT: {
            return {
                ...state,
                isFetchingExport: !1
            }

        }
        case IO_CONFIGURATION_TYPE.RECEIVE_EXPORT: {
            return {
                ...state,
                isFetchingExport: !1,
                dataExport: action.payload
            }
        }
        case IO_CONFIGURATION_TYPE.DOWNLOADED_EXPORT: {
            return {
                ...state,
                isFetchingExport: !1,
                dataExport: undefined,
                exportList:[]
            }
        }
        case IO_CONFIGURATION_TYPE.RESET:
            return clone(exportInitialState);
        default:
            return state;
    }
}