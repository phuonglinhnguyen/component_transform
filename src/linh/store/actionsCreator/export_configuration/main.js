import * as actions from '../../actions/export_configuration';
import { getDataObject } from '@dgtx/coreui';
import {
	callAPIGetDataExport,
	callAPICreateDataExport,
	callAPIDeleteDataExport,
	callAPIUpdateDataExport
} from './call_api';
import { cloneDeep, isEmpty } from 'lodash';
import { exportConfigValidators as default_exportConfigValidators } from '../../reducers/export_configuration_reducer.jsx';
import ExConfig from '../../../views/export_configuration/components/Models/ExConfig';

export const getData = (projectId: any) => async (dispatch: any) => {
	dispatch(resetStateAPI());
	dispatch(setPending());
	dispatch(getDataExport(projectId));
};

export const getDataExport = (projectId: any) => async (dispatch: any) => {
	const data = await dispatch(callAPIGetDataExport({ projectId }));
	if (data.code) {
		dispatch({
			type: actions.EXPORT_CONFIGURATION_GET_DATA,
			payload: {
				data: [],
				refreshPage: false
			},
			meta: {
				resource: actions.NAME_REDUCER
			}
		});
		dispatch(setSuccess());
	} else {
		dispatch({
			type: actions.EXPORT_CONFIGURATION_GET_DATA,
			payload: {
				data: data,
				refreshPage: false
			},
			meta: {
				resource: actions.NAME_REDUCER
			}
		});
		dispatch(setSuccess());
	}
};

// createDataExport
export const createDataExport = (exConfig: any) => async (dispatch: any) => {
	const checkConfigResult = await dispatch(checkConfigValidator(exConfig));
	if (checkConfigResult) {
		const projectId = exConfig.project_id;

		await dispatch(
			callAPICreateDataExport({
				data: exConfig,
				projectId: projectId
			})
		);
		await dispatch(getDataExport(projectId));
		dispatch({
			type: actions.EXPORT_CONFIGURATION_CREATE_DATA,
			payload: {
				exConfig
			},
			meta: {
				resource: actions.NAME_REDUCER
			}
		});
	}
};

export const updateDataExport = (exConfig: any) => async (dispatch: any) => {
	const checkConfigResult = await dispatch(checkConfigValidator(exConfig));
	if (checkConfigResult) {
		const projectId = cloneDeep(exConfig.project_id);
		delete exConfig.project_id;
		await dispatch(
			callAPIUpdateDataExport({
				data: exConfig,
				projectId: projectId,
				id: exConfig.id
			})
		);
		await dispatch(getDataExport(projectId));
		dispatch({
			type: actions.EXPORT_CONFIGURATION_UPDATE_DATA,
			payload: {
				exConfig
			},
			meta: {
				resource: actions.NAME_REDUCER
			}
		});
	}
};

// delete Data Export
export const deleteDataExport = (exConfig: any) => async (dispatch: any) => {
	const projectId = exConfig.project_id;
	await dispatch(
		callAPIDeleteDataExport({
			id: exConfig.id,
			projectId: projectId
		})
	);
	await dispatch(getDataExport(projectId));
	dispatch({
		type: actions.EXPORT_CONFIGURATION_DELETE_DATA,
		payload: {
			exConfig
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	});
};

// open Dialog Export
export const setIsOpenAddDialog = (value) => {
	return {
		type: actions.SET_IS_OPEN_ADD_DIALOG,
		payload: {
			isOpenAdd: value
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setIsOpenViewDialog = (value) => {
	return {
		type: actions.SET_IS_OPEN_VIEW_DIALOG,
		payload: {
			isOpenView: value
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setIsOpenEditDialog = (value) => {
	return {
		type: actions.SET_IS_OPEN_EDIT_DIALOG,
		payload: {
			isOpenEdit: value
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setIsOpenDelDialog = (value) => {
	return {
		type: actions.SET_IS_OPEN_DEL_DIALOG,
		payload: {
			isOpenDel: value
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

// close Dialog Export
export const setIsCloseDialog = (value) => {
	return {
		type: actions.SET_IS_CLOSE_DIALOG,
		payload: {
			isOpenAdd: value,
			isOpenView: value,
			isOpenEdit: value,
			exConfig: new ExConfig(),
			exportConfigValidators: default_exportConfigValidators
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setExportConfig = (exConfig: any) => async (dispatch: any) => {
	dispatch({
		type: actions.SET_EXPORT_CONFIG,
		payload: {
			exConfig
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	});
};

export const setSelectedExportConfig = (exConfig: any) => async (dispatch: any) => {
	dispatch({
		type: actions.SET_SELECTED_EXPORT_CONFIG,
		payload: {
			exConfig
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	});
};

export const resetStateAPI = () => {
	return {
		type: actions.RESET,
		payload: {
			success: false,
			pending: false,
			error: false
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setError = () => {
	return {
		type: actions.ERROR,
		payload: {
			success: false,
			pending: false,
			error: true
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setSuccess = () => {
	return {
		type: actions.SUCCESS,
		payload: {
			success: true,
			pending: false,
			error: false
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setPending = () => {
	return {
		type: actions.PENDING,
		payload: {
			success: false,
			pending: true,
			error: false
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const unmount = () => async (dispatch: any) => {
	dispatch({
		type: actions.EXPORT_CONFIGURATION_UNMOUNT,
		payload: {},
		meta: {
			resource: actions.NAME_REDUCER
		}
	});
};

const checkConfigValidator = (exConfig: any) => async (dispatch: any) => {
	let result = true;
	if (exConfig) {
		if (isEmpty(exConfig.name) && isEmpty(exConfig.export_destination)) {
			await dispatch(setConfigValidator('name', true));
			result = false;
		}
		if (isEmpty(exConfig.export_destination)) {
			await dispatch(setConfigValidator('export_destination', true));
			result = false;
		}
	} else {
		result = false;
	}
	return result;
};

export const setConfigValidator = (name, value) => async (dispatch: any, getState: any) => {
	const { core } = cloneDeep(getState());
	let exportConfigValidators = getDataObject(`resources.${actions.NAME_REDUCER}.data.exportConfigValidators`, core);
	exportConfigValidators[name].error = value;
	await dispatch({
		type: actions.SET_EXPORT_CONFIG_VALIDATOR,
		payload: {
			exportConfigValidators
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	});
};
