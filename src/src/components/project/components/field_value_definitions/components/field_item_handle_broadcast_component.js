import React from 'react';
import AceEditor from 'react-ace';
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import ChipInput from 'material-ui-chip-input';
import Subheader from 'material-ui/Subheader';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import * as field_constants from '../constants/field_constants';
import * as validation_constants from '../../../../configuration/components/validation_definitions/constants/validation_constants';

import ValidationInfos from '../../../../configuration/components/validation_definitions/components/validation_item_infos_component';

class FieldItemHandleBroadcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDialog: false,
      argument_selected: ''
    };
  }

  handleChangeData(name, value) {
    const data = { ...this.props.field[field_constants.KEY_HANDLE_BROADCAST] };
    data[name] = value;
    this.props.modifyData(field_constants.KEY_HANDLE_BROADCAST, data);
  }
  openDialog(v) {
    this.setState({
      isOpenDialog: true,
      argument_selected: v
    });
  }

  handleUpdateFieldName(validation, masterKey, name, argument, value) {
    const validation_arguments = { ...validation[name] };
    validation_arguments[argument] = value;
    validation[name] = validation_arguments;
    this.props.modifyData(masterKey, validation);
    this.setState({
      isOpenDialog: false,
      argument_selected: ''
    });
  }

  render() {
    const {
      field,
      Translate,
      default_props,

      list_field = [],

      modifyData,
      muiTheme
    } = this.props;

    const { isOpenDialog, argument_selected } = this.state;
    const data_validation = { ...field[field_constants.KEY_HANDLE_BROADCAST] };
    const arguments_validation = {
      ...data_validation[validation_constants.KEY_VALIDATION_ARGUMENTS]
    };

    const array_chip = [];
    const array_arg_key = Object.keys(arguments_validation);
    array_arg_key.forEach(function (arg) {
      const data = ` - ${arguments_validation[arg] || 'Click to choose'}`;
      array_chip.push(`${arg}${data}`);
    });
    return (
      <Card style={{ boxShadow: 'none' }}>
        <CardTitle
          title={
            <Translate
              value={`projects.field_value_definitions.handle_broadcast`}
              nodata={''}
            />
          }
          style={{ padding: '7px 0px 0px 16px' }}
          titleStyle={{ fontSize: 16 }}
          showExpandableButton={true}
          actAsExpander={true}
          iconstyle={{ color: muiTheme.palette.accent3Color }}
        />
        <CardActions expandable={true}>
          <div className="data_content" style={{ padding: 20 }}>
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
                    onClick={() => this.openDialog(array_arg_key[key])}
                    onRequestDelete={handleRequestDelete}
                  >
                    {value}
                  </Chip>
                )}
              floatingLabelText={
                <Translate
                  dangerousHTML
                  value="projects.field_value_definitions.handle_broadcast_arguments"
                />
              }
              hintText={
                <Translate value="projects.field_value_definitions.handle_broadcast_hint_text_arguments" />
              }
              value={array_chip}
              onRequestAdd={chip => {
                arguments_validation[chip] = '';
                this.handleChangeData(
                  validation_constants.KEY_VALIDATION_ARGUMENTS,
                  arguments_validation
                );
              }}
              onRequestDelete={(chip, index) => {
                delete arguments_validation[array_arg_key[index]];
                this.handleChangeData(
                  validation_constants.KEY_VALIDATION_ARGUMENTS,
                  arguments_validation
                );
              }}
            />
            <Subheader>
              {<Translate value={`projects.field_value_definitions.handle_broadcast_content`} />}
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
              value={data_validation[validation_constants.KEY_VALIDATION_SCRIPT] || ''}
              editorProps={{ $blockScrolling: 'Infinity' }}
              onChange={newValue =>
                this.handleChangeData(validation_constants.KEY_VALIDATION_SCRIPT, newValue)
              }
              enableBasicAutocompletion={true}
              enableSnippets={true}
            />
          </div>
          {/* <ValidationInfos
          default_props={default_props}
          validation_constants={validation_constants}
          label_error={''}
          validation={data_validation}
          Translate={Translate}
          modifyData={this.handleChangeData.bind(this)}
          is_inherited={true}
          list_validation={list_validation}
          field_constants={field_constants}
          actionSelectData={modifyData.bind(this)}
          actionClickChip={this.openDialog.bind(this)}
        /> */}
          <Dialog
            modal={false}
            open={isOpenDialog}
            onRequestClose={() =>
              this.setState({ isOpenDialog: false, argument_selected: '' })
            }
          >
            <AutoComplete
              {...default_props.auto_complete}
              autoFocus={isOpenDialog}
              hintText={
                <Translate
                  value={'projects.field_value_definitions.type_name_of_field'}
                />
              }
              dataSource={list_field}
              dataSourceConfig={{
                text: "name",
                value: "name"
              }}
              floatingLabelText={
                <Translate
                  value={'projects.field_value_definitions.button_add_field'}
                />
              }
              onNewRequest={chosenRequest =>
                this.handleUpdateFieldName(
                  data_validation,
                  field_constants.KEY_HANDLE_BROADCAST,
                  validation_constants.KEY_VALIDATION_ARGUMENTS,
                  argument_selected,
                  chosenRequest.name
                )
              }
            />
          </Dialog>
        </CardActions>
      </Card>
    );
  }
}

export default FieldItemHandleBroadcast;
