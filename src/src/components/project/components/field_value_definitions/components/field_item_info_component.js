import React from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';

import ChipInput from 'material-ui-chip-input';

import * as global_constants from '../../../../../constants';
import * as field_constants from '../constants/field_constants';
import * as pattern_constants from '../../../../configuration/components/pattern_definitions/constants/pattern_constants';

const dataPatternConfig = {
  text: 'name',
  value: 'content'
};

const dataFieldNameConfig = {
  text: field_constants.KEY_FIELD_NAME,
  value: field_constants.KEY_FIELD_NAME
};

class FieldItemInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChangeInput(event) {
    this.props.modifyData(event.target.name, event.target.value);
  }

  handleChangeField(key, value) {
    this.props.modifyData(key, value);

    const component = this.refs[`${field_constants.KEY_ARGUMENT_DETAILS}`];

    setTimeout(function() {
      component.focus();
    }, 100);
  }

  render() {
    const {
      field,
      Translate,

      default_props,

      list_field = [],
      list_pattern = []
    } = this.props;

    const pattern = { ...field[field_constants.KEY_PATTERN] };
    let argument_details = [...field[field_constants.KEY_ARGUMENT_DETAILS]];
    return (
      <GridList cols={1} {...default_props.grid_list} padding={10}>
        <TextField
          {...default_props.text_field}
          floatingLabelText={
            <Translate value="projects.field_value_definitions.field_display" />
          }
          hintText={
            <Translate value="projects.field_value_definitions.field_display_hint" />
          }
          value={field[field_constants.KEY_FIELD_DISPLAY] || ''}
          onChange={this.handleChangeInput}
          name={`${field_constants.KEY_FIELD_DISPLAY}`}
        />
        <TextField
          {...default_props.text_field}
          floatingLabelText={
            <Translate value="projects.field_value_definitions.default_value" />
          }
          hintText={
            <Translate value="projects.field_value_definitions.default_value_hint" />
          }
          value={field[field_constants.KEY_DEFAULT_VALUE] || ''}
          onChange={this.handleChangeInput}
          name={`${field_constants.KEY_DEFAULT_VALUE}`}
        />
        <SelectField
          fullWidth={true}
          value={field[field_constants.KEY_CONTROL_TYPE]}
          onChange={(event, key, payload) =>
            this.handleChangeField(field_constants.KEY_CONTROL_TYPE, payload)
          }
          floatingLabelText={
            <Translate value="projects.field_value_definitions.control_type" />
          }
        >
          <MenuItem
            value={global_constants.COMPONENT_TEXTFIELD}
            primaryText={global_constants.COMPONENT_TEXTFIELD}
          />
          <MenuItem
            value={global_constants.COMPONENT_COMBOBOX}
            primaryText={global_constants.COMPONENT_COMBOBOX}
          />
          <MenuItem
            value={global_constants.COMPONENT_CHECKBOX}
            primaryText={global_constants.COMPONENT_CHECKBOX}
          />
          <MenuItem
            value={global_constants.COMPONENT_RADIO}
            primaryText={global_constants.COMPONENT_RADIO}
          />
          <MenuItem
            value={global_constants.COMPONENT_TEXTAREA}
            primaryText={global_constants.COMPONENT_TEXTAREA}
          />
        </SelectField>
        <SelectField
          fullWidth={true}
          value={field[field_constants.KEY_TEXT_FIELD_TYPE] || ''}
          onChange={(event, key, payload) =>
            this.handleChangeField(field_constants.KEY_TEXT_FIELD_TYPE, payload)
          }
          floatingLabelText={
            <Translate value="projects.field_value_definitions.text_field_type" />
          }
        >
          <MenuItem value={''} primaryText={''} />
          <MenuItem
            value={field_constants.KEY_FIELD_TYPE_DATE}
            primaryText={field_constants.KEY_FIELD_TYPE_DATE}
          />
          <MenuItem
            value={field_constants.KEY_FIELD_TYPE_NUMERIC}
            primaryText={field_constants.KEY_FIELD_TYPE_NUMERIC}
          />
          <MenuItem
            value={field_constants.KEY_FIELD_TYPE_CURRENCY}
            primaryText={field_constants.KEY_FIELD_TYPE_CURRENCY}
          />
        </SelectField>
        <ChipInput
          fullWidth={true}
          ref="argument_details"
          fullWidthInput={true}
          floatingLabelFixed={true}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="projects.field_value_definitions.argument_details"
            />
          }
          hintText={
            <Translate value="projects.field_value_definitions.argument_details_hint_text" />
          }
          value={argument_details}
          onRequestAdd={chip => {
            if (chip.includes('|')) {
              return;
            }
            argument_details.push(chip);
            this.props.modifyData(
              field_constants.KEY_ARGUMENT_DETAILS,
              argument_details
            );
          }}
          onRequestDelete={(chip, index) => {
            argument_details.splice(index, 1);
            this.props.modifyData(
              field_constants.KEY_ARGUMENT_DETAILS,
              argument_details
            );
          }}
        />
        <Checkbox
          checked={field[field_constants.KEY_IS_LIST] || false}
          onCheck={(event, isInputChecked) =>
            this.props.modifyData(field_constants.KEY_IS_LIST, isInputChecked)
          }
          label={
            <Translate
              value={`projects.field_value_definitions.${
                field_constants.KEY_IS_LIST
              }`}
            />
          }
        />
        <Checkbox
          checked={field[field_constants.KEY_IS_COUNT_CHARACTER] || false}
          onCheck={(event, isInputChecked) =>
            this.props.modifyData(
              field_constants.KEY_IS_COUNT_CHARACTER,
              isInputChecked
            )
          }
          label={
            <Translate
              value={`projects.field_value_definitions.${
                field_constants.KEY_IS_COUNT_CHARACTER
              }`}
            />
          }
        />
        <TextField
          ref="tooltip_input"
          {...default_props.text_field}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="projects.field_value_definitions.tooltip"
            />
          }
          hintText={
            <Translate value="projects.field_value_definitions.tooltip_hint" />
          }
          value={field[field_constants.KEY_TOOLTIP] || ''}
          onChange={this.handleChangeInput}
          name={`${field_constants.KEY_TOOLTIP}`}
        />
        <AutoComplete
          ref="value_broadcast_input"
          dataSource={list_field}
          dataSourceConfig={dataFieldNameConfig}
          searchText={field[field_constants.KEY_VALUE_BROADCAST]}
          {...default_props.auto_complete}
          floatingLabelText={
            <Translate value="projects.field_value_definitions.value_broadcast" />
          }
          hintText={
            <Translate value="projects.field_value_definitions.value_broadcast_hint" />
          }
          onUpdateInput={searchText =>
            this.props.modifyData(
              field_constants.KEY_VALUE_BROADCAST,
              searchText
            )
          }
          onNewRequest={chosenRequest => {
            this.props.modifyData(
              field_constants.KEY_VALUE_BROADCAST,
              chosenRequest[dataFieldNameConfig.value]
            );
            this.refs.value_broadcast_input.focus();
          }}
        />

        <AutoComplete
          ref="pattern_input"
          dataSource={list_pattern}
          dataSourceConfig={dataPatternConfig}
          searchText={pattern[pattern_constants.KEY_PATTERN_CONTENT] || ''}
          floatingLabelShrinkStyle={{ pointerEvents: 'all' }}
          {...default_props.auto_complete}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="projects.field_value_definitions.pattern"
            />
          }
          hintText={
            <Translate value="projects.field_value_definitions.pattern_hint" />
          }
          onUpdateInput={searchText => {
            pattern[pattern_constants.KEY_PATTERN_CONTENT] = searchText;
            this.props.modifyData(field_constants.KEY_PATTERN, pattern);
          }}
          onNewRequest={chosenRequest => {
            this.props.modifyData(field_constants.KEY_PATTERN, {
              [pattern_constants.KEY_PATTERN_DESCRIPTION]:
                chosenRequest[pattern_constants.KEY_PATTERN_DESCRIPTION],
              [pattern_constants.KEY_PATTERN_CONTENT]:
                chosenRequest[pattern_constants.KEY_PATTERN_CONTENT]
            });
            this.refs.pattern_input.focus();
          }}
        />
        <TextField
          ref="pattern_input_error_text"
          {...default_props.text_field}
          floatingLabelText={
            <Translate value="projects.field_value_definitions.pattern_input_error_text" />
          }
          hintText={
            <Translate value="projects.field_value_definitions.pattern_input_error_text_hint" />
          }
          value={pattern[pattern_constants.KEY_PATTERN_DESCRIPTION] || ''}
          onChange={event => {
            pattern[pattern_constants.KEY_PATTERN_DESCRIPTION] =
              event.target.value;
            this.props.modifyData(field_constants.KEY_PATTERN, pattern);
          }}
          name={`${pattern_constants.KEY_PATTERN_DESCRIPTION}`}
        />
      </GridList>
    );
  }
}

export default FieldItemInfo;
