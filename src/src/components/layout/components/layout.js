import React from "react";
import { Route, Redirect } from "react-router";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import elrondThemeBlue from "../../../styles/themes/elrond_blue";
import elrondThemeGrey from "../../../styles/themes/elrond_grey";
import elrondThemePurple from "../../../styles/themes/elrond_purple";
import elrondThemeCyan from "../../../styles/themes/elrond_cyan";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import Sidebar from "./side_bar";
import LayoutHeader from "./layout_header";
import { Translate } from "react-redux-i18n";
import {
  MUI_THEME_STYLE_CYAN,
  MUI_THEME_STYLE_BLUE,
  MUI_THEME_STYLE_PURPLE,
  MUI_THEME_STYLE_GREY
} from "../constants/layout_constant";

import { API_ENDPOINT } from "../../../constants/index";
import NotificationBarContainer from "../../common/notification/bar/container";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    const username = props.current_user.user.username || "default";
    const muiThemeStyle =
      window.localStorage.getItem(`Elrond_${username}_theme`) ||
      MUI_THEME_STYLE_BLUE;
    let theme = this.getMuiThemeByKey(muiThemeStyle);
    this.state = {
      muiTheme: getMuiTheme(theme),
      muiThemeStyle: muiThemeStyle,
      endpoint: API_ENDPOINT // socket.io
    };

    this.changeMuiTheme = this.changeMuiTheme.bind(this);
  }

  getMuiThemeByKey(key) {
    switch (key) {
      case MUI_THEME_STYLE_CYAN:
        return elrondThemeCyan;
      case MUI_THEME_STYLE_BLUE:
        return elrondThemeBlue;
      case MUI_THEME_STYLE_PURPLE:
        return elrondThemePurple;
      case MUI_THEME_STYLE_GREY:
        return elrondThemeGrey;
      default:
        break;
    }
  }

  changeMuiTheme(muiThemeStyle) {
    const { current_user } = this.props;
    let theme = this.getMuiThemeByKey(muiThemeStyle);

    window.localStorage.setItem(
      `Elrond_${current_user.user.username || "default"}_theme`,
      muiThemeStyle
    );
    this.setState({
      muiTheme: getMuiTheme(theme),
      muiThemeStyle: muiThemeStyle
    });
  }

  renderLeft() {
    const { muiTheme, location, current_user } = this.props;
    return (
      <Sidebar
        current_user={current_user}
        location={location}
        sidebarIconColor={muiTheme.palette.sidebarIconColor}
        sidebarListHoverColor={muiTheme.palette.sidebarListHoverColor}
        sidebarIconHoverColor={muiTheme.palette.sidebarIconHoverColor}
        sidebarBackgroundColor={muiTheme.palette.sidebarBackgroundColor}
      />
    );
  }

  render() {
    const { muiTheme, muiThemeStyle } = this.state;
    const { routes, current_user } = this.props;
    const { isAuthenticated } = current_user;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <NotificationBarContainer />
          <header role="banner">
            {isAuthenticated && (
              <LayoutHeader
                Translate={Translate}
                {...this.props}
                muiTheme={muiTheme}
                muiThemeStyle={muiThemeStyle}
                changeMuiTheme={this.changeMuiTheme}
              />
            )}
          </header>
          <div style={{overflow : 'auto'}}>
            {routes.map((route, i) => {
              return (
                <Route
                  key={i}
                  exact={route.exact}
                  path={route.path}
                  render={props => {
                    return (
                      <route.component
                        {...props}
                        routes={route.routes}
                        muiTheme={muiTheme}
                      />
                    );
                  }}
                />
              );
            })}
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout;
