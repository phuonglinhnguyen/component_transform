import React from 'react';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { Translate } from 'react-redux-i18n';

import default_props from '../../../../common/default_props';
import lodash from 'lodash';
const init_data = {
  text_import: '',
  separate_by: ';'
};
class FieldDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      error_text: ''
    };
    this.handleModify = this.handleModify.bind(this);
    this.setDialogField = this.props.actions.setDialogField.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const props = { ...this.props };
    const state = { ...this.state };

    for (let key in props) {
      if (props.hasOwnProperty(key) && nextProps.hasOwnProperty(key)) {
        if (
          !lodash.isEqual(props[key], nextProps[key]) &&
          typeof props[key] !== 'function'
        ) {
          return true;
        }
      }
    }
    for (let key in state) {
      if (state.hasOwnProperty(key) && nextState.hasOwnProperty(key)) {
        if (!lodash.isEqual(state[key], nextState[key])) {
          return true;
        }
      }
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    let error_text = (
      <Translate
        value={'projects.export_configuration.this_field_is_required'}
      />
    );
    this.setState({
      error_text: error_text,
      data: { ...init_data }
    });
  }

  componentWillUnmount() {
    this.props.actions.setDialogField({ open_dialog: false });
  }

  handleModify(key, value) {
    let data = { ...this.state.data };
    let error_text = '';
    data[key] = value;
    const field_name = data.text_import;
    if (!field_name) {
      error_text = (
        <Translate
          value={'projects.export_configuration.this_field_is_required'}
        />
      );
    }
    this.setState({
      error_text: error_text,
      data: data
    });
  }
  render() {
    const { open_dialog = false, handleClickSubmit } = this.props.field_dialog;
    const { data, error_text } = this.state;
    const action_button = [
      <FlatButton
        label={<Translate value={'commons.actions.cancel'} />}
        onClick={() => this.setDialogField({ open_dialog: false })}
        primary={true}
      />,
      <FlatButton
        label={<Translate value={'commons.actions.create'} />}
        primary={true}
        onClick={() => {
          if (error_text) {
            return;
          }
          handleClickSubmit(data);
          this.setDialogField({ open_dialog: false });
        }}
      />
    ];
    return (
      <Dialog
        actions={action_button}
        title={'Create multiple field with string'}
        modal={false}
        onRequestClose={() => this.setDialogField({ open_dialog: false })}
        open={open_dialog}
      >
        <TextField
          {...default_props.text_field}
          autoFocus={true}
          multiLine={true}
          rowsMax={4}
          floatingLabelText={
            <Translate
              dangerousHTML
              value={'projects.field_value_definitions.text_import'}
            />
          }
          hintText={
            <Translate
              value={'projects.field_value_definitions.text_import_hint_text'}
            />
          }
          name="text_import"
          errorText={error_text || ''}
          onChange={event =>
            this.handleModify('text_import', event.target.value)}
          value={data.text_import || ''}
        />
        <SelectField
          value={data.separate_by || ';'}
          floatingLabelText="Separated by"
          onChange={(event, key, payload) =>
            this.handleModify('separate_by', payload)}
        >
          <MenuItem value={';'} primaryText=";" />
          <MenuItem value={','} primaryText="," />
        </SelectField>
      </Dialog>
    );
  }
}
export default FieldDialog;
