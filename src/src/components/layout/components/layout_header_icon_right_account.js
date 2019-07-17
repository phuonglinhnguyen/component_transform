import React from "react";
import axios from "axios";

import Subheader from "material-ui/Subheader";
import FlatButton from "material-ui/FlatButton";
import Paper from "material-ui/Paper";
import CircularProgress from "material-ui/CircularProgress";
import LayoutHeaderIconRightThemesComponent from "./layout_header_icon_right_themes";

import AccountIcon from "material-ui/svg-icons/action/account-circle";

import { Translate } from "react-redux-i18n";
import moment from "moment";

class LayoutHeaderIconRightAccount extends React.PureComponent {
  state = {
    open: false,
    is_ajax: false
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      is_ajax: false,
      total_keyed_characters: 0,
      speed_second_per_char: 0,
      styles: {
        number: {
          color: "rgb(103, 58, 183)",
          padding: "0 15px 0 15px",
          fontSize: 35
        },
        body_popup: {
          minWidth: 300,
          height: "auto",
          position: "fixed",
          right: 10,
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px -4px 10px"
        },
        card: {
          float: "right",
          width: 180,
          height: 76,
          textAlign: "right"
        },
        card_number: {
          color: this.props.secondaryTextColor,
          height: 43,
          lineHeight: "48px",
          fontSize: 32
        }
      }
    };
  }

  componentDidMount() {
    document.addEventListener(
      "click",
      function(event) {
        const id = event.target.id;
        const { open, target } = this.state;
        if (open) {
          if (target === event.target) {
            return false;
          }

          const e = document.getElementById("popup_user");

          if (!e || e.contains(event.target)) {
            return;
          }

          if (!id || id !== "popup_user") {
            this.setState({ open: false });
          }
        }
      }.bind(this)
    );
  }

  handleClick = async event => {
    // This prevents ghost click.
    event.preventDefault();
    const { open } = this.state;
    if (!open) {
      this.setState({
        open: true,
        target: event.target
      });
    } else {
      this.setState({
        open: false
      });
    }
  };

  showReport = async event => {
    // This prevents ghost click.
    event.preventDefault();
    if (this.state.is_ajax) {
      return;
    }

    this.setState({
      is_ajax: true,
      show_report: true,
      target: event.target
    });

    const data = await axios
      .get(`/reports/users/${this.props.current_user.user.username}?speed`)
      .then(res => {
        let total_keyed_characters = res.data.total_keyed_characters
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let speed_second_per_char = parseFloat(res.data.speed_second_per_char);
        if (speed_second_per_char > 0) {
          speed_second_per_char = speed_second_per_char.toFixed(2);
        }
        return { total_keyed_characters, speed_second_per_char };
      })
      .catch(err => ({
        total_keyed_characters: 0,
        speed_second_per_char: 0
      }));

    this.setState({
      is_ajax: false,
      total_keyed_characters: data.total_keyed_characters,
      speed_second_per_char: data.speed_second_per_char
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const {
      current_user,
      accent1Color,
      primary1Color,
      muiThemeStyle,
      action_logout,
      action_changeMuiTheme
    } = this.props;

    const {
      is_ajax,
      show_report,
      total_keyed_characters,
      speed_second_per_char,
      styles
    } = this.state;

    return (
      <div style={{ position: "relative" }}>
        <FlatButton
          className="account"
          onClick={this.handleClick}
          label={current_user.user.username}
          id="btn_open_popup_user"
          icon={<AccountIcon />}
        />
        <Paper
          id="popup_user"
          rounded={false}
          zDepth={2}
          style={{
            ...styles.body_popup,
            display: this.state.open ? "" : "none"
          }}
        >
          <div
            style={{
              height: 100,
              background: primary1Color,
              width: "100%",
              textAlign: "center",
              verticalAlign: "middle",
              color: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <i className="fa fa-user-circle fa-3x" aria-hidden="true" />
            <div style={{ padding: 7 }}>{current_user.user.username}</div>
          </div>

          <Subheader>Themes</Subheader>
          <LayoutHeaderIconRightThemesComponent
            muiThemeStyle={muiThemeStyle}
            action_changeMuiTheme={action_changeMuiTheme}
          />

          <Subheader
            onClick={this.showReport}
            style={{
              cursor: "pointer"
            }}
          >
            Thống kê trong ngày ({`${moment(new Date()).format("YYYY/MM/DD")}`})
            <span
              style={{
                color: primary1Color,
                paddingLeft: 13,
                verticalAlign: "sub"
              }}
            >
              <i
                className={`fa ${
                  !show_report ? "fa-caret-down" : "fa-refresh"
                } fa-2x`}
              />
            </span>
          </Subheader>
          {show_report &&
            !is_ajax && (
              <div>
                <div style={{ padding: "0px 20px 10px 20px" }}>
                  <i
                    style={{ color: accent1Color }}
                    className="fa fa-keyboard-o fa-4x"
                    aria-hidden="true"
                  />
                  <div style={styles.card}>
                    <div style={styles.card_number}>
                      {total_keyed_characters}
                    </div>
                    <div>Characters</div>
                  </div>
                </div>
                <div style={{ padding: "10px 20px" }}>
                  <i
                    style={{ color: accent1Color }}
                    className="fa fa-tachometer fa-4x"
                    aria-hidden="true"
                  />
                  <div style={styles.card}>
                    <div
                      style={styles.card_number}
                    >{`${speed_second_per_char}s`}</div>
                    <div>Speed</div>
                  </div>
                </div>
              </div>
            )}
          {show_report &&
            is_ajax && (
              <div style={{ textAlign: "center" }}>
                <CircularProgress size={60} thickness={7} />
              </div>
            )}

          <FlatButton
            fullWidth={true}
            primary={true}
            onClick={action_logout}
            label={<Translate value="header.logout" />}
          />
        </Paper>
      </div>
    );
  }
}
export default LayoutHeaderIconRightAccount;
