import {
  crudGetList,
  crudUpdate,
  crudDelete,
  crudCreate,
  getDataObject
} from "@dgtx/coreui";

export const callAPIGetData = (input: any) => async (
  dispatch: any,
  getState: any
) => {
  const { projectId } = input;
  let data = await new Promise((resolve, reject) => {
    dispatch(
      crudGetList(
        "tranform_configuration",
        { projectId },
        {
          onSuccess: ({ result: { data } }: any) => {
            resolve(data);
          },
          onFailure: (data: any) => {
            const code = getDataObject("result.body.Code", data) || 404;
            const message =
              getDataObject("result.body.Error", data) || "get_data_error";
            resolve({ code, message });
          }
        }
      )
    );
  });
  return data;
};

export const callAPIDeleteData = (input: any) => async (
  dispatch: any,
  getState: any
) => {
  const { data, projectId } = input;
  console.log("del_data", data);

  const id = data["id"] || "123";
  console.log("wewewewewe",id);//log dc id 

  dispatch(
    crudDelete(
      "tranform_configuration",
      { data: data, projectId },
      {
        onSuccess: async () => {
          // dispatch(resetData(null, dataInsert));
          // dispatch(setSuccess());
          // dispatch(showNotification(`${actions.KEY_TRANSLATE}.delete_success`, 'success', { i18n: true, duration: 1500 }));
          console.log("thanh cong");
        },
        onFailure: () => {
          // dispatch(setError());
          // dispatch(showNotification(`${actions.KEY_TRANSLATE}.delete_error`, 'error', { i18n: true, duration: 1500 }));
          console.log("that bai");
        }
      }
    )
  );
};
export const callAPIUpdateData = (input: any) => async (
  dispatch: any,
  getState: any
) => {
  const { projectId, data } = input;
  // console.log("--------------------------------", data.id);
  dispatch(
    crudUpdate(
      "tranform_configuration",
      { data: data, projectId },
      {
        onSuccess: async () => {
          // dispatch(showNotification(`${actions.KEY_TRANSLATE}.edit_success`, 'success', { i18n: true, duration: 1500 }));
          console.log("update thanh cong");
        },
        onFailure: () => {
          // dispatch(setError());
          // dispatch(showNotification(`${actions.KEY_TRANSLATE}.edit_error`, 'error', { i18n: true, duration: 1500 }));
          console.log("that bai");
        }
      }
    )
  );
};

export const callAPICreateData = (input: any) => async (
  dispatch: any,
  getState: any
) => {
  const { projectId, data } = input;

  dispatch(
    crudCreate(
      "tranform_configuration",
      { data: data, projectId: projectId },
      {
        onSuccess: async () => {
          // dispatch(showNotification(`${actions.KEY_TRANSLATE}.add_success`, 'success', { i18n: true, duration: 1500 }));
          console.log("thanh cong");
        },
        onFailure: () => {
          // console.log(getDataObject('result.body.Code', data))
          // const code = getDataObject("result.body.Code", data) || 404;
          // const message =
          //   getDataObject("result.body.Error", data) || "get_data_error";
          console.log("that bai");
        }
      }
    )
  );
};
