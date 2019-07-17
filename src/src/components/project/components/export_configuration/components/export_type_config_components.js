import React from 'react';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

import AceEditor from 'react-ace';

import VisibilityIcon from 'material-ui/svg-icons/action/visibility';

class TextFieldNormal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open_dialog: false
    };
  }
  render() {
    const {
      Translate,
      action_handleModify,
      config_name,
      config_value,
      default_props,
      is_open_ace = false,
      multiLine = false,
      type_index,
      hintText = '',
      errorText = ''
    } = this.props;
    const { open_dialog } = this.state;
    return (
      <div>
        <TextField
          style={{ marginBottom: "4px" }}
          floatingLabelText={
            <Translate
              value={`projects.export_configuration.export_setting_${config_name.split(".")[0]}`}
            />
          }
          hintText={hintText}
          errorText={errorText}
          multiLine={multiLine}
          name={config_name.split(".")[0]}
          onChange={event =>
            action_handleModify(type_index, config_name, event.target.value)
          }
          onFocus={() => {
            if (!is_open_ace) {
              return;
            }
            this.setState({ open_dialog: true });
          }}
          rows={multiLine ? 2 : 1}
          rowsMax={4}
          value={config_value || ''}
          {...default_props.text_field}
        />
        <Dialog
          modal={false}
          onRequestClose={() => this.setState({ open_dialog: false })}
          open={open_dialog}
        >
          <Subheader>
            {
              <Translate
                value={`projects.export_configuration.export_setting_${config_name}`}
              />
            }
          </Subheader>
          <AceEditor
            cursorStart={config_value.lenght}
            editorProps={{ $blockScrolling: 'Infinity' }}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            fontSize={16}
            height="300px"
            highlightActiveLine={true}
            mode="javascript"
            name="expression"
            onChange={newValue =>
              action_handleModify(type_index, config_name, newValue)
            }
            showGutter={true}
            showPrintMargin={false}
            theme="solarized_dark"
            value={config_value}
            width="100%"
          />
        </Dialog>
      </div>
    );
  }
}

class TextFieldPassword extends React.PureComponent {
  render() {
    const {
      Translate,
      action_handleModify,
      action_handleVisibility,
      config_index,
      config_name = '',
      config_value = '',
      default_props,
      type_index,
      type_name = '',
      visibility = false
    } = this.props;
    return (
      <div>
        <TextField
          {...default_props.text_field}
          floatingLabelText={
            <Translate
              value={`projects.export_configuration.export_setting_password`}
            />
          }
          fullWidth={false}
          name={config_name}
          onChange={event =>
            action_handleModify(type_index, config_name, event.target.value)
          }
          ref={`${type_name}-${config_index}}`}
          type={visibility ? 'text' : 'password'}
          value={config_value}
        />
        <IconButton
          onClick={() =>
            action_handleVisibility(visibility, `${type_name}-${config_index}}`)
          }
        >
          <VisibilityIcon />
        </IconButton>
      </div>
    );
  }
}

class BooleanType extends React.PureComponent {
  render() {
    const {
      Translate,
      action_handleModify,
      config_name = '',
      config_value = false,
      type_index
    } = this.props;
    return (
      <Checkbox
        checked={config_value}
        label={
          <Translate
            value={`projects.export_configuration.export_setting_${config_name}`}
          />
        }
        name={config_name}
        onCheck={(event, isInputChecked) =>
          action_handleModify(type_index, config_name, isInputChecked)
        }
      />
    );
  }
}

class AutoCompleteType extends React.PureComponent {
  render() {
    const {
      Translate,
      action_handleModify,
      config_name = '',
      config_value = false,
      type_index
    } = this.props;
    return (
      <div style={{ display: 'flex' }}>
        <SelectField
          floatingLabelText={
            <Translate
              value={`projects.export_configuration.export_setting_${config_name}`}
            />
          }
          value={config_value}
          onChange={(event, index, value) =>
            action_handleModify(type_index, config_name, value)
          }
        >
          <MenuItem value={';'} primaryText="Semicolon" />
          <MenuItem value={'\t'} primaryText="Tab" />
          <MenuItem value={' '} primaryText="Space" />
          <MenuItem value={'.'} primaryText="Comma" />
          <MenuItem value={'`'} primaryText="Acute (`)" />
        </SelectField>
        <TextField
          floatingLabelText={
            <Translate
              value={`projects.export_configuration.export_setting_${config_name}`}
            />
          }
          value={config_value}
          onChange={e =>
            action_handleModify(type_index, config_name, e.target.value)
          }
        />
      </div>
    );
  }
}

export { TextFieldNormal, TextFieldPassword, BooleanType, AutoCompleteType };
