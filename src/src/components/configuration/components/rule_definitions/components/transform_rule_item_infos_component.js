import React from 'react';

import { GridList } from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import ChipInput from 'material-ui-chip-input';
import AutoComplete from 'material-ui/AutoComplete';
import AceEditor from 'react-ace';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';

const dataTransformRuleConfig = {
  text: 'name',
  value: 'content'
};

const TransformRuleInfos = ({ ...props }) => {
  const {
    default_props = {},
    label_error = '',
    transform_rule_constants = {},
    Translate,
    modifyData = () => {},
    is_inherited = false,
    list_transform_rule = [],
    field_constants,
    actionSelectData = () => {},
    actionClickChip = () => {}
  } = props;

  const transform_rule = { ...props.transform_rule };
  const arguments_transform_rule = {
    ...transform_rule[transform_rule_constants.KEY_TRANSFORM_RULE_ARGUMENTS]
  };

  const array_chip = [];
  const array_arg_key = Object.keys(arguments_transform_rule);
  array_arg_key.forEach(function(arg) {
    const data = is_inherited
      ? ` - ${arguments_transform_rule[arg] || 'Click to choose'}`
      : '';
    array_chip.push(`${arg}${data}`);
  });

  return (
    <GridList cols={1} {...default_props.grid_list} padding={20}>
      {is_inherited ? (
        <AutoComplete
          {...default_props.auto_complete}
          dataSource={list_transform_rule}
          dataSourceConfig={dataTransformRuleConfig}
          searchText={
            transform_rule[transform_rule_constants.KEY_TRANSFORM_RULE_NAME] ||
            ''
          }
          floatingLabelText={
            <Translate
              dangerousHTML
              value={`projects.field_value_definitions.transform_rule_name`}
            />
          }
          hintText={
            <Translate
              value={`projects.field_value_definitions.button_add_transform_rule`}
            />
          }
          onUpdateInput={searchText => {
            modifyData(
              transform_rule_constants.KEY_TRANSFORM_RULE_NAME,
              searchText
            );
          }}
          onNewRequest={chosenRequest =>
            actionSelectData(field_constants.KEY_RULE_TRANSFORM, chosenRequest)
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
              value="configurations.transform_rule_definitions.name"
            />
          }
          value={
            transform_rule[transform_rule_constants.KEY_TRANSFORM_RULE_NAME] ||
            ''
          }
          onChange={event =>
            modifyData(
              transform_rule_constants.KEY_TRANSFORM_RULE_NAME,
              event.target.value
            )
          }
          name={`${transform_rule_constants.KEY_TRANSFORM_RULE_NAME}`}
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
            value="configurations.transform_rule_definitions.arguments"
          />
        }
        hintText={
          <Translate value="configurations.transform_rule_definitions.hint_text_arguments" />
        }
        value={array_chip}
        onRequestAdd={chip => {
          arguments_transform_rule[chip] = '';
          modifyData(
            transform_rule_constants.KEY_TRANSFORM_RULE_ARGUMENTS,
            arguments_transform_rule
          );
        }}
        onRequestDelete={(chip, index) => {
          delete arguments_transform_rule[array_arg_key[index]];
          modifyData(
            transform_rule_constants.KEY_TRANSFORM_RULE_ARGUMENTS,
            arguments_transform_rule
          );
        }}
      />
      <Subheader>
        {
          <Translate
            value={`configurations.transform_rule_definitions.content`}
          />
        }
      </Subheader>
      <AceEditor
        mode="javascript"
        theme="solarized_dark"
        name={transform_rule_constants.KEY_TRANSFORM_RULE_SCRIPT}
        fontSize={14}
        height="600px"
        width="100%"
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={
          transform_rule[transform_rule_constants.KEY_TRANSFORM_RULE_SCRIPT] ||
          ''
        }
        editorProps={{ $blockScrolling: 'Infinity' }}
        onChange={newValue =>
          modifyData(
            transform_rule_constants.KEY_TRANSFORM_RULE_SCRIPT,
            newValue
          )
        }
        enableBasicAutocompletion={true}
        enableSnippets={true}
      />
    </GridList>
  );
};

export default TransformRuleInfos;
