import React from "react";
import PropTypes from "prop-types";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import LinearProgress from "material-ui/LinearProgress";

import ProjectInfo from "../../../app_info.json";
import AttachMoneyIcon from "material-ui/svg-icons/editor/attach-money";

import LoginHotLineComponent from "./login_hotline_component";
import LoginHireComponent from "./login_hire_component";

import { orange400, grey900, pinkA200 } from "material-ui/styles/colors";

import { Translate } from "react-redux-i18n";
import { ELROND_ENV } from "../../../constants";
const styles = {
  labelStyle: {
    color: "#FFFFFF"
  },
  floatingLabelFocusStyle: {
    color: "#FFFFFF"
  },
  inputStyle: {
    color: "#FFFFFF"
  },
  floatingLabelStyle: {
    fontSize: 20,
    color: "#FFFFFF"
  },
  errorStyle: {
    fontSize: 14,
    color: orange400
  },
  underlineFocusStyle: {
    borderColor: "#FFFFFF"
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.doLogin = this.doLogin.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/home");
      return;
    }

    let jivoElementArr = document.getElementsByClassName("globalClass_ET");

    if (jivoElementArr && jivoElementArr.length > 0) {
      let jivoElement = jivoElementArr[0];

      jivoElement.style = "display:none !important";
    }

    let jivoIframe = document.getElementById("jivo-iframe-container");
    if (jivoIframe) {
      document.getElementById("jivo-iframe-container").style =
        "display:none !important";
    }
    this.usernameInput.focus();
  }

  doLogin() {
    this.props.actions.doLogin(this.props.history, () => {
      this.usernameInput.focus();
    });
    LoginHotLineComponent;
  }

  doRegister() {
    this.props.history.push("/user-info/new");
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      this.doLogin();
    }
  }

  onChange(e) {
    this.props.actions.editUser(e);
  }

  render() {
    const {
      username,
      password,
      invalid_user_name,
      invalid_password
    } = this.props.user;

    const { status_text, isAuthenticated, isFetching, completed } = this.props;

    return (
      <MuiThemeProvider>
        <div className="login">
          <LinearProgress
            color={orange400}
            style={{
              display: !completed || completed < 0 ? "none" : "",
              position: "fixed"
            }}
            mode="determinate"
            value={completed}
          />
          <div className="login-notice">
            <LoginHireComponent />
            <LoginHotLineComponent />
          </div>
          <div className="login-main">
            <div className="card">
              <div className="title">Elrond</div>
              <div className="login-body">
                {status_text && <p className="div-error">{status_text}</p>}
                <div className="div-input">
                  <TextField
                    name="username"
                    fullWidth={true}
                    floatingLabelFixed={true}
                    value={username}
                    ref={input => {
                      this.usernameInput = input;
                    }}
                    autoComplete="off" 
                    errorText={invalid_user_name}
                    floatingLabelText={<Translate value="login.username" />}
                    onChange={this.onChange}
                    inputStyle={styles.inputStyle}
                    errorStyle={styles.errorStyle}
                    underlineFocusStyle={styles.underlineFocusStyle}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    onKeyPress={this.handleKeyPress}
                  />
                </div>
                <div className="div-input">
                  <TextField
                    name="password"
                    value={password}
                    fullWidth={true}
                    floatingLabelFixed={true}
                    type="password"
                    errorText={invalid_password}
                    floatingLabelText={<Translate value="login.password" />}
                    onChange={this.onChange}
                    onKeyPress={this.handleKeyPress}
                    inputStyle={styles.inputStyle}
                    errorStyle={styles.errorStyle}
                    underlineFocusStyle={styles.underlineFocusStyle}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  />
                </div>

                <RaisedButton
                  style={{ marginTop: 15 }}
                  type="submit"
                  primary={true}
                  disabled={isFetching || isAuthenticated}
                  fullWidth={true}
                  label={<Translate value="login.submit" />}
                  onClick={this.doLogin}
                  icon={<AttachMoneyIcon />}
                />
                {ELROND_ENV !== "PRD" && (
                  <FlatButton
                    style={{
                      marginTop: 15
                    }}
                    labelStyle={{
                      textTransform: "inherit",
                      color: "white",
                      fontWeight: 300
                    }}
                    disabled={isFetching || isAuthenticated}
                    fullWidth={true}
                    label={<Translate dangerousHTML value="login.register" />}
                    onClick={this.doRegister}
                  />
                )}
              </div>
            </div>           
          </div>
          <div className="version">{`v${ProjectInfo.version}`}</div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Login;
