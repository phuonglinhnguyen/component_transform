import React from 'react';

import AceEditor from 'react-ace';
import AutoComplete from 'material-ui/AutoComplete';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import ChipInput from 'material-ui-chip-input';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';

const dataValidationConfig = {
  text: 'name',
  value: 'content'
};

const ValidationInfos = ({ ...props }) => {
  const {
    default_props = {},
    label_error = '',
    validation_constants = {},
    Translate,
    modifyData = () => {},
    is_inherited = false,
    list_validation = [],
    field_constants,
    actionSelectData = () => {},
    actionClickChip = () => {}
  } = props;

  const validation = { ...props.validation };
  const arguments_validation = {
    ...validation[validation_constants.KEY_VALIDATION_ARGUMENTS]
  };

  const array_chip = [];
  const array_arg_key = Object.keys(arguments_validation);
  array_arg_key.forEach(function(arg) {
    const data = is_inherited
      ? ` - ${arguments_validation[arg] || 'Click to choose'}`
      : '';
    array_chip.push(`${arg}${data}`);
  });

  return (
    <div className="data_content" style={{ padding: 20 }}>
      {is_inherited ? (
        <AutoComplete
          {...default_props.auto_complete}
          dataSource={list_validation}
          dataSourceConfig={dataValidationConfig}
          searchText={
            validation[validation_constants.KEY_VALIDATION_NAME] || ''
          }
          floatingLabelText={
            <Translate
              dangerousHTML
              value={`projects.field_value_definitions.validation_name`}
            />
          }
          hintText={
            <Translate
              value={`projects.field_value_definitions.button_add_validation`}
            />
          }
          onUpdateInput={searchText =>
            modifyData(validation_constants.KEY_VALIDATION_NAME, searchText)
          }
          onNewRequest={chosenRequest =>
            actionSelectData(field_constants.KEY_VALIDATION, chosenRequest)
          }
        />
      ) : (
        <TextField
          autoFocus
          {...default_props.text_field}
          errorText={label_error}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="configurations.validation_definitions.name"
            />
          }
          value={validation[validation_constants.KEY_VALIDATION_NAME] || ''}
          onChange={event =>
            modifyData(
              validation_constants.KEY_VALIDATION_NAME,
              event.target.value
            )
          }
          name={`${validation_constants.KEY_VALIDATION_NAME}`}
        />
      )}
      {is_inherited && (
        <Checkbox
          label="Apply in layout"
          checked={
            validation[validation_constants.KEY_VALIDATION_APPLY_IN_LAYOUT] ||
            false
          }
          onCheck={(e, isChecked) =>
            modifyData(
              validation_constants.KEY_VALIDATION_APPLY_IN_LAYOUT,
              isChecked
            )
          }
        />
      )}
      <ChipInput
        fullWidth={true}
        fullWidthInput={true}
        floatingLabelFixed={true}
        chipRenderer={(
          {
            value,
            isFocused,
            isDisabled,
            handleClick,
            handleRequestDelete,
            defaultStyle
          },
          key
        ) => (
          <Chip
            key={key}
            style={{
              ...defaultStyle
            }}
            onClick={() => actionClickChip(array_arg_key[key])}
            onRequestDelete={handleRequestDelete}
          >
            {value}
          </Chip>
        )}
        floatingLabelText={
          <Translate
            dangerousHTML
            value="configurations.validation_definitions.arguments"
          />
        }
        hintText={
          <Translate value="configurations.validation_definitions.hint_text_arguments" />
        }
        value={array_chip}
        onRequestAdd={chip => {
          arguments_validation[chip] = '';
          modifyData(
            validation_constants.KEY_VALIDATION_ARGUMENTS,
            arguments_validation
          );
        }}
        onRequestDelete={(chip, index) => {
          delete arguments_validation[array_arg_key[index]];
          modifyData(
            validation_constants.KEY_VALIDATION_ARGUMENTS,
            arguments_validation
          );
        }}
      />
      <Subheader>
        {<Translate value={`configurations.validation_definitions.content`} />}
      </Subheader>
      <AceEditor
        mode="javascript"
        theme="solarized_dark"
        name={validation_constants.KEY_VALIDATION_SCRIPT}
        fontSize={14}
        height="600px"
        width="100%"
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={validation[validation_constants.KEY_VALIDATION_SCRIPT] || ''}
        editorProps={{ $blockScrolling: 'Infinity' }}
        onChange={newValue =>
          modifyData(validation_constants.KEY_VALIDATION_SCRIPT, newValue)
        }
        enableBasicAutocompletion={true}
        enableSnippets={true}
      />
    </div>
  );
};

export default ValidationInfos;
