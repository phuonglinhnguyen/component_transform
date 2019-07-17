import * as types from '../constants/export_configuration_constants';

const initial_export_configuration = {
  fields_export: [],
  fields_project: [],
  name: '',
  type_exports: []
};

const initial_originals_data = {
  fields_original: [],
  fields_project: []
};

const initialState = {
  data: { ...initial_export_configuration },
  is_error: false,
  originals_data: { ...initial_originals_data }
};

const export_configuration_item = (state = initialState, action) => {
  switch (action.type) {
    case types.EXPORT_CONFIGURATION_ITEM_RECEIVE_DATA:
      return {
        ...state,
        data: {
          ...initial_export_configuration,
          ...action.export_configuration
        },
        originals_data: action.originals_data
          ? { ...action.originals_data }
          : {
            ...state.originals_data
          }
      };
    case types.EXPORT_CONFIGURATION_ITEM_MODIFY_DATA:
      return {
        ...state,
        data: action.export_configuration
      };
    case types.EXPORT_CONFIGURATION_ITEM_INSERT_DATA:
      return {
        ...state,
        data: { ...initial_export_configuration, ...state.originals_data }
      };

    case types.EXPORT_CONFIGURATION_UPDATE_FIELD_EXPORT:
      return {
        ...state,
        is_error:
          action.is_error === undefined ? state.is_error : action.is_error,
        data: {
          ...state.data,
          ...action.data
        }
      };
    case types.EXPORT_CONFIGURATION_UPDATE_FIELD_TYPE_ROOT_CONFIG:
      return {
        ...state,
        data: action.data,
      };
    case types.EXPORT_CONFIGURATION_ADD_FIELD_ROOT_CONFIG:
      return {
        ...state,
        data: action.data,
      };
    case types.EXPORT_CONFIGURATION_ITEM_RESET_DATA:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default export_configuration_item;
