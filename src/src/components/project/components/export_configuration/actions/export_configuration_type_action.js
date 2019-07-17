import * as types from '../constants/export_configuration_constants';

import { updateFieldExport } from './export_configuration_fields_action';
import { getDataObject } from '@dgtx/coreui';
import clone from 'clone';
const db3_config = {
  table_name: '',
  username: '',
  password: ''
};

const csv_config = {
  file_name_pattern: '',
  delimiter: ';'
};

const xls_config = {
  database: '',
  url: ''
};

const txt_config = {
  file_name_pattern: '',
  export_template: '',
  delimiter: '\t'
};

const xml_config = {
  folder_name_pattern: '',
  file_name_pattern: '',
  delimiter: ';',
  encoding: '',
  pretty_print: '',
  indent: '',
  root: {
    name: '',
    attrs: []
  }
};

export const actionAddNewType = (item: Object) => (
  dispatch: any,
  getState: any
) => {
  const type_exports = [
    ...getState().export_configuration.export_configuration_item.data
      .type_exports
  ];
  switch (item.type) {
    case types.PARAMETER_FORMAT_TYPE_DB3:
      item.config = { ...db3_config };
      break;
    case types.PARAMETER_FORMAT_TYPE_TXT:
      item.config = { ...txt_config };
      break;
    case types.PARAMETER_FORMAT_TYPE_CSV:
      item.config = { ...csv_config };
      break;
    case types.PARAMETER_FORMAT_TYPE_XLS:
      item.config = { ...xls_config };
      break;
    case types.PARAMETER_FORMAT_TYPE_XML:
      item.config = { ...xml_config };
      break;
    default:
      item.config = {};
      break;
  }
  type_exports.push(item);
  dispatch(
    updateFieldExport({
      type_exports: [...type_exports]
    })
  );
};

export const actionEditFileExport = (
  index: number,
  key: string,
  value: string
) => (dispatch: any, getState: any) => {
  const {
    export_configuration_item
  } = getState().export_configuration;
  let type_exports = clone(export_configuration_item.data.type_exports)

  let _key = key.split(".");
  const item = { ...type_exports[index] };
  const config = { ...item.config };
  if (_key.length === 1) {
    config[key] = value;
  }
  else if (_key.length === 2) {
    config[_key[0]][_key[1]] = value;
  }
  item.config = config;
  type_exports[index] = item;
  dispatch(
    updateFieldExport({
      type_exports: [...type_exports]
    })
  );
};

export const actionDeleteTypeReport = (index: number) => (
  dispatch: any,
  getState: any
) => {
  let type_exports = [
    ...getState().export_configuration.export_configuration_item.data
      .type_exports
  ];
  type_exports.splice(index, 1);

  dispatch(
    updateFieldExport({
      type_exports: [...type_exports]
    })
  );
};
