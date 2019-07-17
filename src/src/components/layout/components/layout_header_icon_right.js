import React from "react";

import { ToolbarGroup, ToolbarSeparator } from "material-ui/Toolbar";

import LayoutHeaderIconRightHotlineComponent from "./layout_header_icon_right_hotline";
import LayoutHeaderIconRightAccountComponent from "./layout_header_icon_right_account";
import LayoutHeaderIconRightNotificationComponent from "./layout_header_icon_right_notification/container";

class LayoutHeaderIconRight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openMenu: false,
      openSetting: false
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.actions.handleLogoutAction();
  }

  render() {
    const {
      current_user,
      muiTheme,
      changeMuiTheme,
      muiThemeStyle
    } = this.props;
    if (!current_user || !current_user.user) {
      return <div />;
    }
    return (
      <ToolbarGroup lastChild={this.props.lastChild}>
        <LayoutHeaderIconRightHotlineComponent
          accent1Color={muiTheme.palette.accent1Color}
          primary1Color={muiTheme.palette.primary1Color}
        />
        <LayoutHeaderIconRightNotificationComponent
          accent1Color={muiTheme.palette.accent1Color}
          primary1Color={muiTheme.palette.primary1Color}
          textColor={muiTheme.palette.textColor}
          secondaryTextColor={muiTheme.palette.secondaryTextColor}
        />
        <ToolbarSeparator className="separator" />
        <LayoutHeaderIconRightAccountComponent
          muiThemeStyle={muiThemeStyle}
          action_changeMuiTheme={changeMuiTheme}
          secondaryTextColor={muiTheme.palette.secondaryTextColor}
          accent1Color={muiTheme.palette.accent1Color}
          primary1Color={muiTheme.palette.primary1Color}
          current_user={current_user}
          action_logout={this.props.actions.handleLogoutAction}
        />
      </ToolbarGroup>
    );
  }
}
export default LayoutHeaderIconRight;
