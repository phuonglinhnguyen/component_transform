import React from "react";
import PropTypes from "prop-types";

import TextField from "material-ui/TextField";

import * as pattern_constants from "../constants/pattern_constants";

class PatternItemPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pattern: { ...props.pattern },
      default_props: { ...props.default_props },
      Translate: props.Translate
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pattern: { ...nextProps.pattern }
    });
  }

  handleChangeInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    const pattern = this.state.pattern;
    pattern[name] = value;
    this.setState({
      pattern: pattern
    });
  }

  handleExecutePattern(pattern) {
    try {
      const result =
        pattern[pattern_constants.KEY_PATTERN_CONTENT] &&
        !new RegExp(pattern[pattern_constants.KEY_PATTERN_CONTENT], "g").test(
          pattern[pattern_constants.KEY_PATTERN_PREVIEW] || ""
        )
          ? pattern[pattern_constants.KEY_PATTERN_DESCRIPTION]
          : null;
      return result;
    } catch (error) {
      return error.toString()
    }
  }

  render() {
    const { pattern, default_props, Translate } = this.state;

    return (
      <TextField
        {...default_props.text_field}
        errorText={this.handleExecutePattern(pattern)}
        title={"Input value to test here"}
        name={pattern_constants.KEY_PATTERN_PREVIEW}
        floatingLabelText={
          <Translate value={`configurations.pattern_definitions.input_test`} />
        }
        hintText={
          <Translate
            value={`configurations.pattern_definitions.input_test_hint_text`}
          />
        }
        value={pattern[pattern_constants.KEY_PATTERN_PREVIEW] || ""}
        onChange={this.handleChangeInput}
      />
    );
  }
}

PatternItemPreview.propTypes = {
  pattern: PropTypes.object
};

export default PatternItemPreview;
