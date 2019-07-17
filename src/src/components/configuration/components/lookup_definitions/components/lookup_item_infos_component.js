import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { GridList } from 'material-ui/GridList';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import ChipInput from 'material-ui-chip-input';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';

import Add from 'material-ui/svg-icons/content/add';

import _ from 'lodash';
const dataLookupConfig = {
  text: 'name',
  value: 'name'
};

class LookupInfos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      key_value: ''
    };
    this.handleModifyResultView = this.handleModifyResultView.bind(this);
    this.handleAddViewConfig = this.handleAddViewConfig.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(this.props, nextProps) || !_.isEqual(nextState, this.state)
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: '',
      key_value: ''
    });
  }

  handleModifyResultView(name, value) {
    this.setState({
      [name]: value
    });
  }

  handleAddViewConfig() {
    const { title, key_value } = this.state;
    const { lookup_constants, handleAddChip } = this.props;
    if (!title) {
      const node = this.refs['lookup-view-config-title'];
      if (node) {
        setTimeout(function () {
          node.focus();
        }, 10);
      }
      return;
    }
    if (!key_value) {
      const node = this.refs['lookup-view-config-key_value'];
      if (node) {
        setTimeout(function () {
          node.focus();
        }, 10);
      }
      return;
    }
    handleAddChip(
      { title, key_value },
      lookup_constants.KEY_LOOKUP_RESULT_VIEW_CONFIG
    );
  }

  render() {
    const {
      default_props,
      lookup_constants,
      lookup,
      label_error,
      Translate,
      modifyData,
      handleAddChip,
      handleDeleteChip,
      is_inherited = false,
      list_lookup,
      field_constants,
      actionSelectData
    } = this.props;
    const { title, key_value } = this.state;

    const padding_num = is_inherited ? 0 : 20;
    const cols_num = is_inherited ? 1 : 2;

    return (
      <GridList
        cols={cols_num}
        {...default_props.grid_list}
        padding={padding_num}
      >
        {is_inherited ? (
          <AutoComplete
            {...default_props.auto_complete}
            dataSource={list_lookup}
            dataSourceConfig={dataLookupConfig}
            searchText={lookup[lookup_constants.KEY_LOOKUP_NAME] || ''}
            floatingLabelText={
              <Translate
                dangerousHTML
                value={`projects.field_value_definitions.lookup_source.name`}
              />
            }
            hintText={
              <Translate
                value={`projects.field_value_definitions.lookup_source.name_hint_text`}
              />
            }
            onUpdateInput={searchText => {
              modifyData(lookup_constants.KEY_LOOKUP_NAME, searchText);
            }}
            onNewRequest={chosenRequest =>
              actionSelectData(field_constants.KEY_LOOKUP_SOURCE, chosenRequest)
            }
          />
        ) : (
            <TextField
              autoFocus
              {...default_props.text_field}
              errorText={label_error[lookup_constants.KEY_LOOKUP_NAME] || ''}
              value={lookup[lookup_constants.KEY_LOOKUP_NAME] || ''}
              name={`${lookup_constants.KEY_LOOKUP_NAME}`}
              floatingLabelText={
                <Translate
                  dangerousHTML
                  value="configurations.lookup_definitions.name"
                />
              }
              hintText={
                <Translate value="configurations.lookup_definitions.name_hint_text" />
              }
              onChange={event =>
                modifyData(lookup_constants.KEY_LOOKUP_NAME, event.target.value)
              }
            />
          )}
        <TextField
          {...default_props.text_field}
          errorText={
            label_error[lookup_constants.KEY_LOOKUP_LOOKUP_FIELD] || ''
          }
          value={lookup[lookup_constants.KEY_LOOKUP_LOOKUP_FIELD] || ''}
          name={`${lookup_constants.KEY_LOOKUP_LOOKUP_FIELD}`}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="configurations.lookup_definitions.lookup_field"
            />
          }
          hintText={
            <Translate value="configurations.lookup_definitions.lookup_field_hint_text" />
          }
          onChange={event =>
            modifyData(
              lookup_constants.KEY_LOOKUP_LOOKUP_FIELD,
              event.target.value
            )
          }
        />
        <ChipInput
          fullWidth={true}
          fullWidthInput={true}
          floatingLabelFixed={true}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="configurations.lookup_definitions.locale"
            />
          }
          hintText={
            <Translate value="configurations.lookup_definitions.locale_hint_text" />
          }
          errorText={label_error[lookup_constants.KEY_LOOKUP_LOCALE] || ''}
          value={lookup[lookup_constants.KEY_LOOKUP_LOCALE]}
          onRequestAdd={chip =>
            handleAddChip(chip, lookup_constants.KEY_LOOKUP_LOCALE)
          }
          onRequestDelete={(chip, index) =>
            handleDeleteChip(index, lookup_constants.KEY_LOOKUP_LOCALE)
          }
        />
        <ChipInput
          fullWidth={true}
          fullWidthInput={true}
          floatingLabelFixed={true}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="configurations.lookup_definitions.related_columns"
            />
          }
          hintText={
            <Translate value="configurations.lookup_definitions.related_columns_hint_text" />
          }
          errorText={
            label_error[lookup_constants.KEY_LOOKUP_RELATED_COLUMNS] || ''
          }
          value={lookup[lookup_constants.KEY_LOOKUP_RELATED_COLUMNS]}
          onRequestAdd={chip =>
            handleAddChip(chip, lookup_constants.KEY_LOOKUP_RELATED_COLUMNS)
          }
          onRequestDelete={(chip, index) =>
            handleDeleteChip(index, lookup_constants.KEY_LOOKUP_RELATED_COLUMNS)
          }
        />
        <TextField
          floatingLabelText={
            <Translate value="configurations.lookup_definitions.group_project" />
          }
          floatingLabelFixed={true}
          value={lookup[lookup_constants.KEY_LOOKUP_GROUP_PROJECT]}
          onChange={(event) => {
            modifyData(lookup_constants.KEY_LOOKUP_GROUP_PROJECT, event.target.value)
          }
          }
        />

        <SelectField
          floatingLabelText={
            <Translate value="configurations.lookup_definitions.allow_multiple" />
          }
          floatingLabelFixed={true}
          value={lookup[lookup_constants.KEY_LOOKUP_ALLOW_MULTIPLE]}
          onChange={(event, key, payload) =>
            modifyData(lookup_constants.KEY_LOOKUP_ALLOW_MULTIPLE, payload)
          }
        >
          <MenuItem value={true} primaryText={'Allow'} />
          <MenuItem value={false} primaryText={'Only single'} />
        </SelectField>

        <TextField
          {...default_props.text_field}
          value={
            lookup[lookup_constants.KEY_LOOKUP_CHARACTERS_TRIGGER_LOOKUP] || 1
          }
          name={`${lookup_constants.KEY_LOOKUP_CHARACTERS_TRIGGER_LOOKUP}`}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="configurations.lookup_definitions.characters_trigger_lookup"
            />
          }
          onChange={event =>
            modifyData(
              lookup_constants.KEY_LOOKUP_CHARACTERS_TRIGGER_LOOKUP,
              parseInt(event.target.value, 10) || 1
            )
          }
        />
        <TextField
          {...default_props.text_field}
          value={lookup[lookup_constants.KEY_LOOKUP_LOOKUP_AFTER_TIME] || 0}
          name={`${lookup_constants.KEY_LOOKUP_LOOKUP_AFTER_TIME}`}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="configurations.lookup_definitions.lookup_after_time"
            />
          }
          onChange={event =>
            modifyData(
              lookup_constants.KEY_LOOKUP_LOOKUP_AFTER_TIME,
              parseInt(event.target.value, 10) || 0
            )
          }
        />
        <TextField
          {...default_props.text_field}
          value={lookup[lookup_constants.KEY_LOOKUP_KEY_VALUE] || ''}
          name={`${lookup_constants.KEY_LOOKUP_KEY_VALUE}`}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="configurations.lookup_definitions.key_value"
            />
          }
          onChange={event =>
            modifyData(
              lookup_constants.KEY_LOOKUP_KEY_VALUE,
              event.target.value || ''
            )
          }
        />
        <TextField
          {...default_props.text_field}
          value={lookup[lookup_constants.KEY_LOOKUP_SPECIFIC_PROJECT] || ''}
          name={`${lookup_constants.KEY_LOOKUP_SPECIFIC_PROJECT}`}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="configurations.lookup_definitions.specific_project"
            />
          }
          hintText={
            <Translate value="configurations.lookup_definitions.specific_project_hint_text" />
          }
          onChange={event =>
            modifyData(
              lookup_constants.KEY_LOOKUP_SPECIFIC_PROJECT,
              event.target.value
            )
          }
        />
        {/**input has ad space after selected value lookup */}
        <Checkbox
          label={<Translate
            dangerousHTML
            value="configurations.lookup_definitions.lookup_space_after_choosen"
          />}
          style={{
            margin:'8px 0px 8px 0px'
          }}
          name={`${lookup_constants.KEY_LOOKUP_SPACE_AFTER_CHOOSEN}`}
          checked={lookup[lookup_constants.KEY_LOOKUP_SPACE_AFTER_CHOOSEN] || false}
          onCheck={_ =>
            modifyData(
              lookup_constants.KEY_LOOKUP_SPACE_AFTER_CHOOSEN,
              !lookup[lookup_constants.KEY_LOOKUP_SPACE_AFTER_CHOOSEN]
            )
          }
        />
        <TextField
          {...default_props.text_field}
          value={lookup[lookup_constants.KEY_LOOKUP_PARAM_SET] || ''}
          name={`${lookup_constants.KEY_LOOKUP_PARAM_SET}`}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="configurations.lookup_definitions.param_set"
            />
          }
          hintText={
            <Translate value="configurations.lookup_definitions.param_set_hint_text" />
          }
          onChange={event =>
            modifyData(
              lookup_constants.KEY_LOOKUP_PARAM_SET,
              event.target.value
            )
          }
        />
        <div />
        <div>
          <Subheader>
            <Translate value="configurations.lookup_definitions.result_view_config" />
          </Subheader>
          <GridList {...default_props.grid_list} padding={0} cols={3}>
            <TextField
              value={title || ''}
              {...default_props.text_field}
              ref="lookup-view-config-title"
              name={`view-config-title`}
              floatingLabelText={
                <Translate
                  dangerousHTML
                  value="configurations.lookup_definitions.title"
                />
              }
              onChange={event =>
                this.handleModifyResultView('title', event.target.value)
              }
            />
            <TextField
              {...default_props.text_field}
              ref="lookup-view-config-key_value"
              value={key_value || ''}
              name={`view-config-key-value`}
              floatingLabelText={
                <Translate
                  dangerousHTML
                  value="configurations.lookup_definitions.key_value"
                />
              }
              onChange={event =>
                this.handleModifyResultView('key_value', event.target.value)
              }
            />
            <RaisedButton
              style={{ marginTop: 25, minWidth: 45 }}
              onClick={() => this.handleAddViewConfig()}
              icon={<Add />}
              primary={true}
            />
          </GridList>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          {lookup[lookup_constants.KEY_LOOKUP_RESULT_VIEW_CONFIG] &&
            lookup[lookup_constants.KEY_LOOKUP_RESULT_VIEW_CONFIG].length > 0
            ? lookup[lookup_constants.KEY_LOOKUP_RESULT_VIEW_CONFIG].map(
              (v, i) => (
                <Chip
                  key={i}
                  {...default_props.chip}
                  onRequestDelete={() =>
                    handleDeleteChip(
                      i,
                      lookup_constants.KEY_LOOKUP_RESULT_VIEW_CONFIG
                    )
                  }
                >
                  {`${v.title} - ${v.key_value}`}
                </Chip>
              )
            )
            : null}
        </div>
      </GridList>
    );
  }
}

export default LookupInfos;
