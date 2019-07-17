import React from "react";
import PropTypes from "prop-types";

import { GridList } from "material-ui/GridList";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import Check from "material-ui/svg-icons/navigation/check";
import Fail from "material-ui/svg-icons/navigation/cancel";

import * as transform_rule_constants from "../constants/transform_rule_constants";
import { Translate } from "react-redux-i18n";

class TransformRulePreviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transform_rule: { ...props.transform_rule },
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
      transform_rule: { ...nextProps.transform_rule },
      error: nextProps.error
    });
  }

  handleChangeInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    const transform_rule = this.state.transform_rule;
    transform_rule[name] = value;
    this.setState({
      transform_rule: transform_rule,
      event_in_input: { ...event }
    });
  }

  handleChangeInputOfArguments(event) {
    const name = event.target.name;
    const value = event.target.value;
    const transform_rule = this.state.transform_rule;
    transform_rule[name] = value;
    this.setState({
      transform_rule: transform_rule
    });
  }

  handleTestTransformRule(event, script, transform_rule_arguments) {
    try {
      let input = "value";
      const parameters = [];
      const transform_rule = this.state.transform_rule;
      parameters.push(event.target.value);

      Object.keys(transform_rule_arguments).forEach(variable => {
        input = input + "," + variable;
        parameters.push(transform_rule[variable] || "");
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
            <this.props.Translate value="configurations.transform_rule_definitions.test_script_invalid" />
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
            <this.props.Translate value="configurations.transform_rule_definitions.test_script_valid" />
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
              value={`configurations.transform_rule_definitions.transform_rule_test_return`}
            />
          }
          rowsMax={4}
          textareaStyle={{
            WebkitTextFillColor:
              error === true
                ? this.props.muiTheme.palette.accent1Color
                : this.props.muiTheme.palette.primary2Color
          }}
          name={"transform_rule_test_return"}
          value={value_result}
        />
      );
    }
  }

  render() {
    const {
      transform_rule,
      default_props,
      error,
      result,
      event_in_input
    } = this.state;

    const transform_rule_arguments =
      transform_rule[transform_rule_constants.KEY_TRANSFORM_RULE_ARGUMENTS] || {};

    return (
      <div>
        <GridList cols={1} {...default_props.grid_list}>
          {Object.keys(transform_rule_arguments).length > 0 ? (
            Object.keys(transform_rule_arguments).map((variable, index) => {
              return (
                <TextField
                  {...default_props.text_field}
                  key={index}
                  title={"Input value to test here"}
                  name={variable}
                  floatingLabelText={variable}
                  hintText={
                    <Translate
                      value={`configurations.transform_rule_definitions.input_test_hint_text`}
                    />
                  }
                  value={transform_rule[`${variable}`] || ""}
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
              this.handleTestTransformRule(
                event,
                transform_rule[transform_rule_constants.KEY_TRANSFORM_RULE_SCRIPT],
                transform_rule_arguments
              )}
            title={"Input value to test here"}
            name={transform_rule_constants.KEY_TRANSFORM_RULE_PREVIEW}
            floatingLabelText={
              <Translate
                value={`configurations.transform_rule_definitions.input_test`}
              />
            }
            hintText={
              <Translate
                value={`configurations.transform_rule_definitions.input_test_hint_text`}
              />
            }
            value={
              transform_rule[transform_rule_constants.KEY_TRANSFORM_RULE_PREVIEW] || ""
            }
            onChange={this.handleChangeInput}
          />
        </GridList>

        <GridList cols={2} {...default_props.grid_list}>
          <RaisedButton
            onClick={event =>
              this.handleTestTransformRule(
                event_in_input || event,
                transform_rule[transform_rule_constants.KEY_TRANSFORM_RULE_SCRIPT],
                transform_rule_arguments
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

TransformRulePreviewComponent.propTypes = {
  transform_rule: PropTypes.object
};

export default TransformRulePreviewComponent;
