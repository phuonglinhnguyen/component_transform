import React from 'react';
import PropTypes from 'prop-types';

import { GridList } from 'material-ui/GridList';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Subheader from 'material-ui/Subheader';
import InputLookupField from '../../../../common/form/input_field';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import * as constants from '../../../../../constants';
import * as field_constants from '../constants/field_constants';
import * as validation_constants from '../../../../configuration/components/validation_definitions/constants/validation_constants';

import _ from 'lodash';

const renderTextField = (
  Translate: any,
  field: Object,
  field_preview: Object,
  default_props: Object,
  lookup_selector: Object,
  handleChangeFieldRelated: any,
  handleOnChangeFieldTest: any,
  handleFocusOut: any
) => {
  let rows = 1;
  let multiLine = false;
  const validation_arguments =
    field[field_constants.KEY_VALIDATION][
      validation_constants.KEY_VALIDATION_ARGUMENTS
    ] || {};
  const rule_arguments =
    field[field_constants.KEY_RULE_TRANSFORM][
      validation_constants.KEY_VALIDATION_ARGUMENTS
    ] || {};
  const argument_preview = _.assign(validation_arguments, rule_arguments);
  if (
    field[field_constants.KEY_CONTROL_TYPE] === constants.COMPONENT_TEXTAREA
  ) {
    rows = 5;
    multiLine = true;
  }
  const field_value = field_preview.field_value || '';
  const field_error = field_preview.field_error;
  let errorText = '';
  if (field_error) {
    if (typeof field_error === 'string') {
      errorText = field_error;
    } else {
      errorText = JSON.stringify(field_error);
    }
  }
  const default_value = field[field_constants.KEY_DEFAULT_VALUE] || '';
  return (
    <GridList {...default_props.grid_list} padding={20} cols={1}>
      {Object.keys(argument_preview).map((variable, index) => (
        <TextField
          {...default_props.text_field}
          key={index}
          title={'Input value of field argument'}
          name={validation_arguments[variable]}
          floatingLabelText={validation_arguments[variable]}
          hintText={'Please input here first'}
          value={field_value[validation_arguments[variable]] || ''}
          onChange={event =>
            handleChangeFieldRelated(
              validation_arguments[variable],
              event.target.value
            )
          }
        />
      ))}
      <InputLookupField
        floatingLabelText={field[field_constants.KEY_FIELD_DISPLAY]}
        floatingLabelFixed={true}
        value={
          field_value[field[field_constants.KEY_FIELD_NAME]] || default_value
        }
        changeField={val =>
          handleOnChangeFieldTest(field[field_constants.KEY_FIELD_NAME], val)
        }
        field={field}
        name={field[field_constants.KEY_FIELD_NAME]}
        nextFocus={() => undefined}
        errorText={errorText}
        onBlur={event => handleFocusOut(event)}
        rows={rows}
        multiLine={multiLine}
      />
      <TextField
        {...default_props.text_field}
        title={'Value transformed'}
        name={'value_transformed'}
        floatingLabelText={'Value transformed'}
        value={field_preview.value_transform || ''}
      />
    </GridList>
  );
};

const renderCheckbox = (field, default_props) => {
  if (
    Array.isArray(field[field_constants.KEY_ARGUMENT_DETAILS]) &&
    field[field_constants.KEY_ARGUMENT_DETAILS].length > 0
  ) {
    return (
      <GridList {...default_props.grid_list} padding={20} cols={1}>
        <Subheader inset={true}>
          {field[field_constants.KEY_FIELD_DISPLAY]}
        </Subheader>
        {field[field_constants.KEY_ARGUMENT_DETAILS].map((v, i) => (
          <Checkbox key={i} value={v} title={v} label={v} />
        ))}
      </GridList>
    );
  }
  return (
    <GridList {...default_props.grid_list} padding={20} cols={1}>
      <Checkbox
        title={field[field_constants.KEY_TOOLTIP]}
        label={field[field_constants.KEY_FIELD_DISPLAY]}
      />
    </GridList>
  );
};

const renderRadioButton = (field, default_props) => {
  return (
    <GridList {...default_props.grid_list} padding={20} cols={1}>
      <Subheader inset={true}>
        {field[field_constants.KEY_FIELD_DISPLAY]}
      </Subheader>
      <RadioButtonGroup name={field[field_constants.KEY_FIELD_DISPLAY]}>
        {Array.isArray(field[field_constants.KEY_ARGUMENT_DETAILS]) &&
        field[field_constants.KEY_ARGUMENT_DETAILS].length > 0 ? (
          field[field_constants.KEY_ARGUMENT_DETAILS].map((v, i) => {
            return <RadioButton key={i} value={v} title={v} label={v} />;
          })
        ) : (
          <div />
        )}
      </RadioButtonGroup>
    </GridList>
  );
};

const renderSelectField = (
  field_preview,
  field,
  default_props,
  handleOnChangeFieldTest
) => {
  const field_value = field_preview.field_value || '';

  return (
    <GridList {...default_props.grid_list} padding={20} cols={1}>
      <SelectField
        value={field_value[field[field_constants.KEY_FIELD_NAME]]}
        floatingLabelText={field[field_constants.KEY_FIELD_DISPLAY]}
        onChange={(event, index, value) =>
          handleOnChangeFieldTest(field[field_constants.KEY_FIELD_NAME], value)
        }
      >
        {Array.isArray(field[field_constants.KEY_ARGUMENT_DETAILS]) &&
        field[field_constants.KEY_ARGUMENT_DETAILS].length > 0 ? (
          field[field_constants.KEY_ARGUMENT_DETAILS].map((v, i) => {
            return <MenuItem key={i} value={i} primaryText={v} />;
          })
        ) : (
          <div />
        )}
      </SelectField>
    </GridList>
  );
};

class FieldItemPreview extends React.Component {
  renderPreviewItem() {
    const {
      field_preview,
      field,

      Translate,
      default_props,

      handleChangeFieldRelated,
      handleOnChangeFieldTest,
      handleFocusOut,

      lookup_selector
    } = this.props;
    if (field.control_type === constants.COMPONENT_CHECKBOX) {
      return renderCheckbox(field, default_props);
    }

    if (
      field.control_type === constants.COMPONENT_TEXTFIELD ||
      field.control_type === constants.COMPONENT_TEXTAREA
    ) {
      return renderTextField(
        Translate,
        field,
        field_preview,
        default_props,
        lookup_selector,
        handleChangeFieldRelated,
        handleOnChangeFieldTest,
        handleFocusOut
      );
    }

    if (field.control_type === constants.COMPONENT_RADIO) {
      return renderRadioButton(field, default_props);
    }

    if (field.control_type === constants.COMPONENT_COMBOBOX) {
      return renderSelectField(
        field_preview,
        field,
        default_props,
        handleOnChangeFieldTest
      );
    }
  }
  render() {
    const { field, default_props } = this.props;

    if (!field.control_type) {
      return null;
    }

    return (
      <GridList {...default_props.grid_list} padding={0} cols={1}>
        <Subheader>Field Preview</Subheader>
        <Paper>{this.renderPreviewItem()}</Paper>
      </GridList>
    );
  }
}

FieldItemPreview.propTypes = {
  field: PropTypes.object
};

export default FieldItemPreview;
