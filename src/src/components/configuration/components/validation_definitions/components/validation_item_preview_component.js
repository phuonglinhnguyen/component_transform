import React from "react";
import PropTypes from "prop-types";

import { GridList } from "material-ui/GridList";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import Check from "material-ui/svg-icons/navigation/check";
import Fail from "material-ui/svg-icons/navigation/cancel";

import * as validation_constants from "../constants/validation_constants";
import { Translate } from "react-redux-i18n";

class ValidationPreviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validation: { ...props.validation },
      default_props: { ...props.default_props },
      error: null
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeInputOfArguments = this.handleChangeInputOfArguments.bind(
      this
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      validation: { ...nextProps.validation },
      error: nextProps.error
    });
  }

  handleChangeInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    const validation = this.state.validation;
    validation[name] = value;
    this.setState({
      validation: validation,
      event_in_input: { ...event }
    });
  }

  handleChangeInputOfArguments(event) {
    const name = event.target.name;
    const value = event.target.value;
    const validation = this.state.validation;
    validation[name] = value;
    this.setState({
      validation: validation
    });
  }

  handleTestValidation(event, script, validation_arguments) {
    try {
      let input = "value";
      const parameters = [];
      const validation = this.state.validation;
      parameters.push(event.target.value);

      Object.keys(validation_arguments).forEach(variable => {
        input = input + "," + variable;
        parameters.push(validation[variable] || "");
      });
      // eslint-disable-next-line no-new-func
      var fnc = Function(`${input}`, `${script}`);
      this.updateState(false, fnc.apply(this, parameters));
    } catch (error) {
      this.updateState(true, error);
    }
  }

  updateState(error, result) {
    this.setState({
      error: error,
      result: result
    });
  }

  getIcon(error) {
    if (error === true) {
      return (
        <RaisedButton
          icon={<Fail color={this.props.muiTheme.palette.accent1Color} />}
          label={
            <this.props.Translate value="configurations.validation_definitions.test_script_invalid" />
          }
          labelPosition="before"
          disabledLabelColor={this.props.muiTheme.palette.accent1Color}
          disabled={true}
          disabledBackgroundColor={this.props.muiTheme.palette.borderColor}
        />
      );
    } else if (error === false) {
      return (
        <RaisedButton
          icon={<Check color={this.props.muiTheme.palette.primary2Color} />}
          label={
            <this.props.Translate value="configurations.validation_definitions.test_script_valid" />
          }
          labelPosition="before"
          disabledLabelColor={this.props.muiTheme.palette.primary2Color}
          disabled={true}
          disabledBackgroundColor={this.props.muiTheme.palette.borderColor}
        />
      );
    } else {
      return <div />;
    }
  }

  renderResult(error, result) {
    if (error === null) {
      return <div />;
    } else {
      const value_result = !result
        ? ""
        : error === true ? result.toString() : JSON.stringify(result);
      return (
        <TextField
          {...this.props.default_props.text_field}
          multiLine={true}
          floatingLabelText={
            <this.props.Translate
              value={`configurations.validation_definitions.validation_test_return`}
            />
          }
          rowsMax={4}
          textareaStyle={{
            WebkitTextFillColor:
              error === true
                ? this.props.muiTheme.palette.accent1Color
                : this.props.muiTheme.palette.primary2Color
          }}
          name={"validation_test_return"}
          value={value_result}
        />
      );
    }
  }

  render() {
    const {
      validation,
      default_props,
      error,
      result,
      event_in_input
    } = this.state;

    const validation_arguments =
      validation[validation_constants.KEY_VALIDATION_ARGUMENTS] || {};

    return (
      <div>
        <GridList cols={1} {...default_props.grid_list}>
          {Object.keys(validation_arguments).length > 0 ? (
            Object.keys(validation_arguments).map((variable, index) => {
              return (
                <TextField
                  {...default_props.text_field}
                  key={index}
                  title={"Input value to test here"}
                  name={variable}
                  floatingLabelText={variable}
                  hintText={
                    <Translate
                      value={`configurations.validation_definitions.input_test_hint_text`}
                    />
                  }
                  value={validation[`${variable}`] || ""}
                  onChange={this.handleChangeInputOfArguments}
                />
              );
            })
          ) : (
            <div />
          )}
          <TextField
            {...default_props.text_field}
            onBlur={event =>
              this.handleTestValidation(
                event,
                validation[validation_constants.KEY_VALIDATION_SCRIPT],
                validation_arguments
              )}
            title={"Input value to test here"}
            name={validation_constants.KEY_VALIDATION_PREVIEW}
            floatingLabelText={
              <Translate
                value={`configurations.validation_definitions.input_test`}
              />
            }
            hintText={
              <Translate
                value={`configurations.validation_definitions.input_test_hint_text`}
              />
            }
            value={
              validation[validation_constants.KEY_VALIDATION_PREVIEW] || ""
            }
            onChange={this.handleChangeInput}
          />
        </GridList>

        <GridList cols={2} {...default_props.grid_list}>
          <RaisedButton
            onClick={event =>
              this.handleTestValidation(
                event_in_input || event,
                validation[validation_constants.KEY_VALIDATION_SCRIPT],
                validation_arguments
              )}
            label={"Test"}
            secondary={true}
          />
          {this.getIcon(error)}
        </GridList>
        {this.renderResult(error, result)}
      </div>
    );
  }
}

ValidationPreviewComponent.propTypes = {
  validation: PropTypes.object
};

export default ValidationPreviewComponent;
