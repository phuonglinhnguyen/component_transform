import * as actions from '../actions/export_configuration';
import { cloneDeep } from 'lodash';
import ExConfig from '../../views/export_configuration/components/Models/ExConfig';
export const exportConfigValidators = {
	name: {
		error: false,
		message: `The field Name is required!`
	},
	export_destination: {
		error: false,
		message: `The field Export Destination is required!`
	},
	type: {
		error: false,
		message: `The field Export Format Type is required!`
	},
	fileName: {
		error: false,
		message: `The field File Name is required!`
	},
	value: {
		error: false,
		message: `The field Value is required!`
	},
	rootName: {
		error: false,
		message: `The field RootName is required!`
	},
	delimiter: {
		error: false,
		message: `The field Delimiter is required!`
	},
};

const initialState = {
	pending: false,
	error: false,
	success: false,
	isOpenAdd: false,
	isOpenView: false,
	isOpenEdit: false,
	isOpenDel: false,
	exConfig: new ExConfig(),
	exportConfigValidators
};

export default {
	name: actions.NAME_REDUCER,
	reducer: (state = { ...cloneDeep(initialState) }, { type, payload }: any): any => {
		switch (type) {
			case actions.EXPORT_CONFIGURATION_GET_DATA:
			case actions.EXPORT_CONFIGURATION_CREATE_DATA:
			case actions.EXPORT_CONFIGURATION_UPDATE_DATA:
			case actions.EXPORT_CONFIGURATION_DELETE_DATA:
			case actions.SET_SELECTED_EXPORT_CONFIG:
			case actions.SET_EXPORT_CONFIG:
			case actions.SET_IS_OPEN_ADD_DIALOG:
			case actions.SET_IS_OPEN_EDIT_DIALOG:
			case actions.SET_IS_OPEN_VIEW_DIALOG:
			case actions.SET_IS_OPEN_DEL_DIALOG:
			case actions.SET_IS_CLOSE_DIALOG:
			case actions.PENDING:
			case actions.RESET:
			case actions.ERROR:
			case actions.SUCCESS:
			case actions.SET_EXPORT_CONFIG_VALIDATOR:
				return {
					...state,
					...payload
				};
			case actions.EXPORT_CONFIGURATION_UNMOUNT:
				return cloneDeep(initialState);
			default:
				return state;
		}
	}
};
