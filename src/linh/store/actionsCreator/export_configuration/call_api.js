import { crudGetList, crudUpdate, crudDelete, crudCreate, getDataObject } from '@dgtx/coreui';
import { showNotification } from '@dgtx/coreui';
import {
	setPending,
	setSuccess,
	setError,
	setIsOpenAddDialog,
	setIsOpenDelDialog,
	setExportConfig,
	setIsOpenEditDialog
} from './main';
import * as actions from '../../actions/export_configuration';

export const callAPIGetDataExport = (input: any) => async (dispatch: any) => {
	const { projectId } = input;

	let data = await new Promise((resolve, reject) => {
		dispatch(
			crudGetList(
				'export_configuration',
				{ projectId },
				{
					onSuccess: ({ result: { data } }: any) => {
						resolve(data);
					},
					onFailure: (data: any) => {
						const code = getDataObject('result.body.Code', data) || 404;
						const message = getDataObject('result.body.Error', data) || 'get_data_error';
						resolve({ code, message });
					}
				}
			)
		);
	});
	return data;
};

export const callAPICreateDataExport = (input: any) => async (dispatch: any) => {
	const { projectId, data } = input;
	dispatch(setPending());
	dispatch(
		crudCreate(
			'export_configuration',
			{ data: data, projectId: projectId },
			{
				onSuccess: async () => {
					dispatch(setSuccess());
					dispatch(
						showNotification(`${actions.KEY_TRANSLATE}.add_success`, 'success', {
							i18n: true,
							duration: 1500
						})
					);
					dispatch(setIsOpenAddDialog(false));
				},
				onFailure: () => {
					dispatch(setError());
					dispatch(showNotification(`${actions.KEY_TRANSLATE}.add_error`, 'error', { i18n: true, duration: 1500 }));
				}
			}
		)
	);
};

export const callAPIUpdateDataExport = (input: any) => async (dispatch: any) => {
	const { projectId, data, id } = input;
	dispatch(setPending());
	dispatch(
		crudUpdate(
			'export_configuration',
			{ data: data, projectId, id },
			{
				onSuccess: async () => {
					dispatch(setSuccess());
					dispatch(setExportConfig(null));
					dispatch(
						showNotification(`${actions.KEY_TRANSLATE}.edit_success`, 'success', {
							i18n: true,
							duration: 1500
						})
					);
					dispatch(setIsOpenEditDialog(false));
				},
				onFailure: (error) => {
					console.log(error);
					dispatch(setError());
					dispatch(showNotification(`${actions.KEY_TRANSLATE}.edit_error`, 'error', { i18n: true, duration: 1500 }));
				}
			}
		)
	);
};

export const callAPIDeleteDataExport = (input: any) => async (dispatch: any) => {
	const { projectId, id } = input;
	dispatch(setPending());
	dispatch(
		crudDelete(
			'export_configuration',
			{ id: id, projectId },
			{
				onSuccess: async () => {
					dispatch(setSuccess());
					dispatch(
						showNotification(`${actions.KEY_TRANSLATE}.delete_success`, 'success', {
							i18n: true,
							duration: 1500
						})
					);
					dispatch(setIsOpenDelDialog(false));
				},
				onFailure: (error) => {
					console.log(error);
					dispatch(setError());
					dispatch(
						showNotification(`${actions.KEY_TRANSLATE}.delete_error`, 'error', {
							i18n: true,
							duration: 1500
						})
					);
				}
			}
		)
	);
};
