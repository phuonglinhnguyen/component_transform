import * as types from '../constants/export_configuration_constants';
import { receiveExportConfiguration } from './export_configuration_item_action';
import lodash from 'lodash';

export const updateFieldExport = (params: Object, is_error: boolean) => ({
  type: types.EXPORT_CONFIGURATION_UPDATE_FIELD_EXPORT,
  data: params,
  is_error: is_error
});

export const onClickTransferField = (
  datas: Array<Object>,
  from_src: boolean
) => (dispatch: any, getState: any) => {
  if (datas.length === 0) {
    return;
  }
  let fields_export = [
    ...getState().export_configuration.export_configuration_item.data
      .fields_export
  ];

  if (from_src) {
    let fields_project = [
      ...getState().export_configuration.export_configuration_item.data
        .fields_project
    ];
    datas = lodash.differenceBy(datas, fields_export, 'name');
    const datas_clone = [];
    datas.forEach(function(element) {
      datas_clone.push({
        name: element.name,
        expression: `return data.${element.name}`
      });
    });
    fields_export = fields_export.concat(datas_clone);
    fields_project = lodash.difference(fields_project, datas);
    dispatch(
      updateFieldExport({
        fields_export: fields_export,
        fields_project: fields_project
      })
    );
  } else {
    const fields_original = [
      ...getState().export_configuration.export_configuration_item
        .originals_data.fields_project
    ];
    fields_export = lodash.difference(fields_export, datas);
    const fields_project = lodash.differenceBy(
      fields_original,
      fields_export,
      'name'
    );
    dispatch(
      updateFieldExport({
        fields_export: fields_export,
        fields_project: fields_project
      })
    );
  }
};

export const modifyFieldExport = (index: number, data: Object) => (
  dispatch: any,
  getState: any
) => {
  const datas = {
    ...getState().export_configuration.export_configuration_item.data
  };
  const fields_export = [...datas.fields_export];

  if (index === -1) {
    fields_export.push(data);
  } else {
    fields_export[index] = data;
  }
  datas.fields_export = fields_export;
  dispatch(receiveExportConfiguration(datas));
};
