import React from "react";

import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import clone from "clone";

class ConfigServiceTask extends React.PureComponent {
  constructor(props) {
    super(props);

    const { data_config, services } = this.props;
    let service,
      parameters = [];
    if (data_config && services) {
      for (let i = 0; i < services.length; i++) {
        if (services[i].java_class === data_config.class_name) {
          service = services[i];
          parameters = clone(service.parameters);
          parameters.forEach(function(p) {
            let i = data_config.parameters.inputParameters.find(
              e => e.name === p.name
            );
            if (i) {
              p.value = i.value;
            }
          }, this);

          break;
        }
      }
    }

    this.state = {
      value: service,
      parameters: parameters
    };

    this.onServiceChange = this.onServiceChange.bind(this);
    this.onParamChange = this.onParamChange.bind(this);
  }

  onServiceChange(event, key, value) {
    this.setState({ value, parameters: clone(value.parameters) });
  }

  onParamChange(event) {
    const { parameters } = this.state;
    parameters[event.target.name].value = event.target.value;

    this.setState({ parameters: clone(parameters) });
  }

  getConfig({ viewer, moddle, element }) {
    const { value, parameters } = this.state;

    const node = viewer.get("elementRegistry").get(element.id);
    let java_class;

    const extensionElements = moddle.create("bpmn:ExtensionElements");

    if (value) {
      java_class = value.java_class;
      const inputOutput = moddle.create("camunda:InputOutput");

      inputOutput.inputParameters = [];
      for (var i = 0; i < parameters.length; i++) {
        const parameter = parameters[i];
        const inputParameter = moddle.create("camunda:InputParameter");

        inputParameter.name = parameter.name;
        inputParameter.value = parameter.value;

        inputOutput.inputParameters.push(inputParameter);
      }

      extensionElements.set("values", [inputOutput]);
    }

    viewer.get("modeling").updateProperties(node, {
      class: java_class,
      extensionElements: extensionElements
    });
  }

  render() {
    const { value, parameters } = this.state;
    const { services } = this.props;
    return (
      <div style={{ minHeight: 400 }}>
        <SelectField
          floatingLabelText="Service"
          floatingLabelFixed={true}
          value={value}
          fullWidth={true}
          onChange={this.onServiceChange}
        >
          <MenuItem value={null} primaryText="" />
          {services.map((data, i) => (
            <MenuItem key={i} value={data} primaryText={data.service_name} />
          ))}
        </SelectField>
        {parameters.map((data, i) => {
          if (!data.invisible) {
            return (
              <TextField
                key={i}
                name={`${i}`}
                fullWidth={true}
                onChange={this.onParamChange}
                value={data.value}
                floatingLabelText={data.name}
                floatingLabelFixed={true}
              />
            );
          }
          return null;
        })}
      </div>
    );
  }
}
export default ConfigServiceTask;
