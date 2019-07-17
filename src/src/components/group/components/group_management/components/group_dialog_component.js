import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { isEqual } from 'lodash';

class CreateEditNameDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      error_text: ''
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const props = { ...this.props };
    const state = { ...this.state };

    for (let key in props) {
      if (props.hasOwnProperty(key) && nextProps.hasOwnProperty(key)) {
        if (
          !isEqual(props[key], nextProps[key]) &&
          typeof props[key] !== 'function'
        ) {
          return true;
        }
      }
    }
    for (let key in state) {
      if (state.hasOwnProperty(key) && nextState.hasOwnProperty(key)) {
        if (!isEqual(state[key], nextState[key])) {
          return true;
        }
      }
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: { ...nextProps.data },
      error_text: ''
    });
  }

  handleModify(name, value) {
    let data = { ...this.state.data };
    data[name] = value;
    this.setState({
      data: data
    });
  }

  render() {
    const {
      Translate,
      handleClickSubmit = () => undefined,
      label_button_dialog = '',
      label_text = '',
      muiTheme,
      open_dialog = false,
      resetDialog = () => undefined,
      title_dialog = ''
    } = this.props;

    const { data, error_text } = this.state;
    const action_button = [
      <FlatButton
        label={<Translate value={'commons.actions.cancel'} />}
        onClick={() => resetDialog()}
        style={{ marginRight: 20 }}
      />,
      <RaisedButton
        backgroundColor={muiTheme.palette.primary1Color}
        label={<Translate value={label_button_dialog} />}
        labelStyle={{ color: muiTheme.palette.alternateTextColor }}
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
          handleClickSubmit(data);
        }}
      />
    ];
    return (
      <Dialog
        actions={action_button}
        contentStyle={{ width: 500, height: 250 }}
        modal={true}
        onRequestClose={() => resetDialog()}
        open={open_dialog}
        title={title_dialog}
      >
        <TextField
          autoFocus
          errorText={error_text || ''}
          floatingLabelFixed={true}
          floatingLabelText={<Translate dangerousHTML value={label_text} />}
          fullWidth={true}
          onChange={event => this.handleModify('name', event.target.value)}
          onFocus={event => event.target.select()}
          value={data.name || ''}
        />
      </Dialog>
    );
  }
}

export { CreateEditNameDialog };
