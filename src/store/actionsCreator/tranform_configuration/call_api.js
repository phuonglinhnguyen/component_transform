import { 
    crudGetList, 
    crudUpdate,
    crudDelete,
    crudCreate,
    getDataObject } from "@dgtx/coreui";

export const callAPIGetData = (input: any) => async (dispatch: any, getState: any) => {
    const {  projectId } = input;
    let data = await new Promise((resolve, reject) => {
        dispatch(crudGetList("tranform_configuration", { projectId }, {
            onSuccess: ({ result: { data } }: any) => {
                resolve(data)
                console.log('thanh cong')
            },
            onFailure: (data: any) => {
                // console.log(getDataObject('result.body.Code', data))
                console.log(data)
                const code = getDataObject('result.body.Code', data) || 404
                const message = getDataObject('result.body.Error', data) || 'get_data_error';
                resolve({ code, message });
            }
        }))
    })
    return data
}

export const callAPIUpdateData = (input: any) => async (dispatch: any, getState: any) => {
    const {  projectId, config } = input;
    dispatch(crudUpdate("tranform_configuration", { data: config, projectId }, {
        onSuccess: async () => {
            // dispatch(showNotification(`${actions.KEY_TRANSLATE}.edit_success`, 'success', { i18n: true, duration: 1500 }));
            console.log('thanh cong')
        },
        onFailure: () => {
            // dispatch(setError());
            // dispatch(showNotification(`${actions.KEY_TRANSLATE}.edit_error`, 'error', { i18n: true, duration: 1500 }));
            console.log('that bai')
        }
    }))
}

export const callAPIDeleteData = (config: any) => async (dispatch: any, getState: any) => {
    const id = config['_id'] || '123'
    dispatch(crudDelete("tranform_configuration", { data: { id }, projectId }, {
        onSuccess: async () => {
            // dispatch(resetData(null, dataInsert));
            // dispatch(setSuccess());
            // dispatch(showNotification(`${actions.KEY_TRANSLATE}.delete_success`, 'success', { i18n: true, duration: 1500 }));
            console.log('thanh cong')
        },
        onFailure: () => {
            // dispatch(setError());
            // dispatch(showNotification(`${actions.KEY_TRANSLATE}.delete_error`, 'error', { i18n: true, duration: 1500 }));
            console.log('that bai')
        }
    }))
}

export const callAPICreateData = (input: any) => async (dispatch: any, getState: any) => {
    const {  projectId, config } = input;
    dispatch(crudCreate("tranform_configuration", { data: config, projectId }, {
        onSuccess: async () => {
            // dispatch(showNotification(`${actions.KEY_TRANSLATE}.add_success`, 'success', { i18n: true, duration: 1500 }));
            console.log('thanh cong')
        },
        onFailure: () => {
            // console.log(getDataObject('result.body.Code', data))
            const code = getDataObject('result.body.Code', data) || 404
            const message = getDataObject('result.body.Error', data) || 'get_data_error';
            console.log('that bao')
        }
    }))
}