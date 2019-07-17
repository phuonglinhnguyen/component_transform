import {
  FIELD_PREVIEW_RECIEVED_DATA,
  KEY_PATTERN,
  KEY_VALIDATION,
  KEY_RULE_TRANSFORM,
  FIELD_PREVIEW_RESET_DATA,
  KEY_FIELD_TYPE_NUMERIC,
  KEY_TEXT_FIELD_TYPE,
  KEY_FIELD_TYPE_DATE
} from '../constants/field_constants';
import * as validation_constants from '../../../../configuration/components/validation_definitions/constants/validation_constants';
import * as pattern_constants from '../../../../configuration/components/pattern_definitions/constants/pattern_constants';

const updateFieldValue = (
  field_value: Object,
  field_error: string,
  value_transform
) => ({
  type: FIELD_PREVIEW_RECIEVED_DATA,
  field_value: field_value,
  field_error: field_error || '',
  value_transform: value_transform || ''
});

export const handleTestValidation = (
  value: string,
  field_preview: Object,
  script: string,
  validation_arguments: Object,
  apply_layout: false
) => {
  try {
    let input = 'value';
    let parameters = [];
    parameters.push(value);
    if (apply_layout) {
      input = input + `,record_data`;
      parameters.push(field_preview);
    } else {
      Object.keys(validation_arguments).forEach(variable => {
        input = input + ',' + variable;
        parameters.push(field_preview[validation_arguments[variable]] || '');
      });
    }
    // eslint-disable-next-line no-new-func
    var fnc = new Function(`${input}`, `${script}`);
    var result = fnc.apply(this, parameters);
    return result;
  } catch (error) {
    return [
      {
        type: 'error',
        message: error.message
      }
    ];
  }
};

export const handleTestPattern = (pattern: Object, value: string) => {
  if (new RegExp(pattern[pattern_constants.KEY_PATTERN_CONTENT]).test(value)) {
    return '';
  } else {
    return pattern[pattern_constants.KEY_PATTERN_DESCRIPTION];
  }
};

export const handleChangeFieldRelated = (name: string, value: string) => (
  dispatch: any,
  getState: any
) => {
  let field_value = {
    ...getState().field_definition.field_preview.field_value
  };
  let field_error = getState().field_definition.field_preview.field_error;

  field_value[name] = value;
  dispatch(updateFieldValue(field_value, field_error));
};

export const handleOnChangeFieldTest = (name: string, value: string) => (
  dispatch: any,
  getState: any
) => {
  let field_value = {
    ...getState().field_definition.field_preview.field_value
  };
  let field_error = getState().field_definition.field_preview.field_error;
  field_value[name] = value;
  const field = {
    ...getState().field_definition.field_item.field
  };

  if (field[KEY_PATTERN][pattern_constants.KEY_PATTERN_CONTENT]) {
    field_error = handleTestPattern(field[KEY_PATTERN], value);
  }
  dispatch(updateFieldValue(field_value, field_error));
};

export const handleFormatFieldValue = (format_type, value) => {
  switch (format_type) {
    case KEY_FIELD_TYPE_NUMERIC:
      if (!value) {
        return '';
      }
      else 
       {
        let arr = value.split('.');
        value = arr[0] + '.' + arr[1] || 0;
        value = parseFloat(value).toFixed(2);
        return value;
      }
      break;
    case KEY_FIELD_TYPE_DATE:
      if (value.length === 6) {
        let current_year = new Date().getFullYear();
        let plus_year = 20 + value.slice(4, 6);
        if (parseInt(plus_year) > current_year) {
          plus_year = 19 + value.slice(4, 6);
        }
        value = value.slice(0, 4) + plus_year;
      }
      return value;
      break;
    default:
      break;
  }
};

export const handleFocusOut = (event: any) => (
  dispatch: any,
  getState: any
) => {
  let value = event.target.value;
  const name = event.target.name;

  let field_value = {
    ...getState().field_definition.field_preview.field_value
  };
  let field_error = getState().field_definition.field_preview.field_error;
  const field = {
    ...getState().field_definition.field_item.field
  };
  const validation = field[KEY_VALIDATION];
  const rule_transform = field[KEY_RULE_TRANSFORM];

  if (field[KEY_PATTERN][pattern_constants.KEY_PATTERN_CONTENT]) {
    field_error = handleTestPattern(field[KEY_PATTERN], value);
  }
  if (validation[validation_constants.KEY_VALIDATION_SCRIPT]) {
    field_error = handleTestValidation(
      value,
      field_value,
      validation[validation_constants.KEY_VALIDATION_SCRIPT],
      validation[validation_constants.KEY_VALIDATION_ARGUMENTS]
    );
  }
  if (field[KEY_TEXT_FIELD_TYPE]) {
    value = handleFormatFieldValue(field[KEY_TEXT_FIELD_TYPE], value);
  }
  field_value[name] = value;
  let value_transform = value;
  if (rule_transform[validation_constants.KEY_VALIDATION_SCRIPT]) {
    value_transform = handleTestValidation(
      value_transform,
      field_value,
      rule_transform[validation_constants.KEY_VALIDATION_SCRIPT],
      rule_transform[validation_constants.KEY_VALIDATION_ARGUMENTS]
    );
  }
  dispatch(updateFieldValue(field_value, field_error, value_transform));
};

export const resetFieldTest = () => ({
  type: FIELD_PREVIEW_RESET_DATA
});
