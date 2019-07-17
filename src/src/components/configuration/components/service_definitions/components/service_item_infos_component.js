import React from 'react';

import TextField from 'material-ui/TextField';
import ChipInput from 'material-ui-chip-input';

import {
  KEY_SERVICE_NAME,
  KEY_SERVICE_JAVA_CLASS,
  KEY_SERVICE_PARAMETERS,
  SUBKEY_SERVICE_PARAMETER_NAME,
  SUBKEY_SERVICE_PARAMETER_TYPE,
  SUBKEY_SERVICE_PARAMETER_VALUE,
  SUBKEY_SERVICE_PARAMETER_INVISIBLE
} from '../constants/service_constants';

import ParameterItem from './service_parameter_item_component';

class ServiceInfos extends React.Component {
  constructor(props) {
    super(props);
    this.modifyParameterItem = this.modifyParameterItem.bind(this);

    this.state = {
      error: {}
    };
  }

  getStatusError() {
    const { error } = this.state;
    for (let key in error) {
      if (error.hasOwnProperty(key)) {
        return true;
      }
    }
    return false;
  }

  modifyParameterItem(name, value, index) {
    const { service, action_modifyData } = this.props;
    let error = { ...this.state.error };
    let service_parameters = service[KEY_SERVICE_PARAMETERS];
    for (let key_service in service_parameters) {
      if (service_parameters.hasOwnProperty(key_service)) {
        let service_parameter = service_parameters[key_service];
        if (name === SUBKEY_SERVICE_PARAMETER_NAME) {
          if (service_parameter[SUBKEY_SERVICE_PARAMETER_NAME] === value) {
            error[`KEY_SERVICE_PARAMETERS_${index}`] = 'Conflicted';
            break;
          } else {
            delete error[`KEY_SERVICE_PARAMETERS_${index}`];
          }
        }
      }
    }
    this.setState({
      error: error
    });
    let parameter_item = { ...service_parameters[index] };
    parameter_item[name] = value;
    service_parameters[index] = parameter_item;
    action_modifyData(KEY_SERVICE_PARAMETERS, service_parameters);
  }

  render() {
    const {
      default_props = {},
      label_error = '',
      Translate,
      muiTheme,
      action_modifyData = () => {},
      action_deleteParameter
    } = this.props;
    const { error } = this.state;
    const service = { ...this.props.service };
    const service_parameters = Array.isArray(service[KEY_SERVICE_PARAMETERS])
      ? [...service[KEY_SERVICE_PARAMETERS]]
      : [];
    let title_parameters = [];
    for (let key in service_parameters) {
      if (service_parameters.hasOwnProperty(key)) {
        let service_param = service_parameters[key];
        title_parameters = [
          ...title_parameters,
          service_param[SUBKEY_SERVICE_PARAMETER_NAME]
        ];
      }
    }
    return (
      <div style={{ padding: '10px 20px 10px 20px' }}>
        <TextField
          autoFocus
          {...default_props.text_field}
          errorText={label_error}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="configurations.service_definitions.name"
            />
          }
          value={service[KEY_SERVICE_NAME] || ''}
          onChange={event =>
            action_modifyData(KEY_SERVICE_NAME, event.target.value)
          }
          name={`${KEY_SERVICE_NAME}`}
        />
        <TextField
          {...default_props.text_field}
          floatingLabelText={
            <Translate value="configurations.service_definitions.java_class" />
          }
          value={service[KEY_SERVICE_JAVA_CLASS] || ''}
          onChange={event =>
            action_modifyData(KEY_SERVICE_JAVA_CLASS, event.target.value)
          }
          name={`${KEY_SERVICE_JAVA_CLASS}`}
        />
        <ChipInput
          fullWidth={true}
          fullWidthInput={true}
          floatingLabelFixed={true}
          floatingLabelText={
            <Translate
              dangerousHTML
              value="configurations.service_definitions.parameters"
            />
          }
          hintText={
            <Translate value="configurations.service_definitions.parameters_hint_text" />
          }
          errorText={label_error[KEY_SERVICE_PARAMETERS] || ''}
          value={title_parameters}
          onRequestAdd={chip => {
            action_modifyData(KEY_SERVICE_PARAMETERS, [
              ...service_parameters,
              {
                [SUBKEY_SERVICE_PARAMETER_NAME]: chip,
                [SUBKEY_SERVICE_PARAMETER_TYPE]: 'Text',
                [SUBKEY_SERVICE_PARAMETER_VALUE]: '',
                [SUBKEY_SERVICE_PARAMETER_INVISIBLE]: true
              }
            ]);
          }}
          onRequestDelete={(chip, index) => {
            action_deleteParameter(index);
          }}
        />
        {service_parameters.map((_param_item, index) => {
          return (
            <ParameterItem
              key={`${index}`}
              data={service_parameters[index]}
              Translate={Translate}
              muiTheme={muiTheme}
              default_props={default_props}
              action_modifyParameterItem={(name, value) =>
                this.modifyParameterItem(name, value, index)
              }
              errorText={error[`KEY_SERVICE_PARAMETERS_${index}`] || ''}
              index={index}
              action_deleteParameterItem={index_item => {
                action_deleteParameter(index_item);
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default ServiceInfos;
