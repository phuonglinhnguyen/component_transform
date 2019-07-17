import React from 'react';

import TextField from 'material-ui/TextField';
import AceEditor from 'react-ace';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { Translate } from 'react-redux-i18n';

import default_props from '../../../../common/default_props';
import * as export_constants from '../constants/export_configuration_constants';
import lodash from 'lodash';

class DialogFieldMapping extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      error_text: '',
      index: -1,
      title_dialog: '',
      label_button_dialog: '',
      datas: []
    };
    this.handleModify = this.handleModify.bind(this);
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
    let title_dialog = 'New field';
    let label_button_dialog = 'commons.actions.create';
    if (nextProps.index !== -1) {
      title_dialog = `Edit ${nextProps.data.name}`;
      label_button_dialog = 'commons.actions.update';
    }
    this.setState({
      error_text: '',
      title_dialog: title_dialog,
      label_button_dialog: label_button_dialog,
      data: { ...nextProps.data },
      index: nextProps.index,
      datas: nextProps.datas
    });
  }

  handleModify(key, value) {
    const { datas, index } = this.state;
    let data = { ...this.state.data };
    let error_text = this.state.error_text;
    data[key] = value;
    const field_name = data.name;
    const index_field = lodash.findIndex(datas, _d => _d.name === field_name);
    if (key === 'name' && !field_name) {
      error_text = (
        <Translate
          value={'projects.export_configuration.this_field_is_required'}
        />
      );
    } else if (key === 'name' && field_name.length > 0) {
      error_text = '';
    }
    if (index_field !== -1 && index_field !== index) {
      error_text = (
        <Translate
          value={'projects.export_configuration.this_field_is_conflict'}
        />
      );
    }
    this.setState({
      error_text: error_text,
      data: data
    });
  }
  render() {
    const { index, open_dialog, handleClickSubmit, resetDialog } = this.props;

    const { data, error_text, title_dialog, label_button_dialog } = this.state;
    const action_button = [
      <FlatButton
        label={<Translate value={'commons.actions.cancel'} />}
        onClick={() => resetDialog()}
        primary={true}
      />,
      <FlatButton
        label={<Translate value={label_button_dialog} />}
        primary={true}
        onClick={() => {
          if (!data.name) {
            this.setState({
              error_text: (
                <Translate
                  value={'projects.export_configuration.this_field_is_required'}
                />
              )
            });
            return;
          }
          resetDialog();
          handleClickSubmit(index, data);
        }}
      />
    ];
    return (
      <Dialog
        actions={action_button}
        title={title_dialog}
        modal={false}
        onRequestClose={() => resetDialog()}
        open={open_dialog}
      >
        <TextField
          {...default_props.text_field}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="projects.export_configuration.field_export_name"
            />
          }
          autoFocus
          name="name"
          errorText={error_text || ''}
          onChange={event => this.handleModify('name', event.target.value)}
          value={data.name || ''}
        />
        <span>
          {<Translate value="projects.export_configuration.expression" />}
        </span>
        aaaaaa
        <AceEditor
          editorProps={{ $blockScrolling: 'Infinity' }}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          fontSize={16}
          height="250px"
          highlightActiveLine={true}
          mode="javascript"
          name={'expression'}
          onChange={newValue => this.handleModify('expression', newValue)}
          showGutter={true}
          showPrintMargin={false}
          theme="solarized_dark"
          value={data.expression || ''}
          width="100%"
        />
      </Dialog>
    );
  }
}

class DialogFileFormat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      error_text: '',
      index: -1,
      title_dialog: 'New export',
      datas: []
    };
    this.handleModify = this.handleModify.bind(this);
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
    this.setState({
      error_text: '',
      data: { ...nextProps.data },
      title_dialog: 'New format',
      index: nextProps.index,
      datas: nextProps.datas
    });
  }

  handleModify(key, value) {
    let data = { ...this.state.data };
    const datas = [...this.state.datas];

    let error_text = this.state.error_text;
    data[key] = value;
    if (key === 'name' && !value) {
      error_text = (
        <Translate
          value={'projects.export_configuration.this_field_is_required'}
        />
      );
    } else if (key === 'name' && value.length > 0) {
      error_text = '';
    }
    if (
      key === 'name' &&
      lodash.findIndex(datas, _d => _d.name === value) !== -1
    ) {
      error_text = (
        <Translate
          value={'projects.export_configuration.this_field_is_conflict'}
        />
      );
    }
    if (key === 'type') {
      const element = this.refs['format-name'];
      if (element) {
        setTimeout(function() {
          element.focus();
        }, 100);
      }
    }
    this.setState({
      error_text: error_text,
      data: data
    });
  }
  render() {
    const { open_dialog, handleClickSubmit, resetDialog } = this.props;
    const { data, error_text, title_dialog } = this.state;
    const action_button = [
      <FlatButton
        label={<Translate value={'commons.actions.cancel'} />}
        primary={true}
        onClick={() => resetDialog()}
      />,
      <FlatButton
        label={<Translate value={'commons.actions.create'} />}
        primary={true}
        onClick={() => {
          if (error_text) {
            return;
          }
          resetDialog();
          handleClickSubmit(data);
        }}
      />
    ];
    return (
      <Dialog
        actions={action_button}
        title={title_dialog}
        modal={false}
        onRequestClose={() => resetDialog()}
        open={open_dialog}
      >
        <SelectField
          floatingLabelText="Format type"
          value={data.type || ''}
          onChange={(event, index, value) => this.handleModify('type', value)}
        >
          <MenuItem
            value={export_constants.PARAMETER_FORMAT_TYPE_DB3}
            primaryText={export_constants.PARAMETER_FORMAT_TYPE_DB3}
          />
          <MenuItem
            value={export_constants.PARAMETER_FORMAT_TYPE_CSV}
            primaryText={export_constants.PARAMETER_FORMAT_TYPE_CSV}
          />
          <MenuItem
            value={export_constants.PARAMETER_FORMAT_TYPE_XLS}
            primaryText={export_constants.PARAMETER_FORMAT_TYPE_XLS}
          />
          <MenuItem
            value={export_constants.PARAMETER_FORMAT_TYPE_TXT}
            primaryText={export_constants.PARAMETER_FORMAT_TYPE_TXT}
          />
          <MenuItem
            value={export_constants.PARAMETER_FORMAT_TYPE_XML}
            primaryText={export_constants.PARAMETER_FORMAT_TYPE_XML}
          />
        </SelectField>
        <TextField
          {...default_props.text_field}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="projects.export_configuration.type_export_name"
            />
          }
          ref="format-name"
          autoFocus
          name="type_export_name"
          errorText={error_text || ''}
          onChange={event => this.handleModify('name', event.target.value)}
          value={data.name || ''}
        />
      </Dialog>
    );
  }
}
export { DialogFileFormat, DialogFieldMapping };
