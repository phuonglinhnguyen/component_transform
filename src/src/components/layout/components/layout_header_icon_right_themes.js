import React from "react";

import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import FloatingActionButton from "material-ui/FloatingActionButton";

import SettingIcon from "material-ui/svg-icons/editor/format-color-fill";
import CheckIcon from "material-ui/svg-icons/action/check-circle";

import {
  MUI_THEME_STYLE_CYAN,
  MUI_THEME_STYLE_BLUE,
  MUI_THEME_STYLE_PURPLE,
  MUI_THEME_STYLE_GREY
} from "../constants/layout_constant";

class LayoutHeaderIconRightThemes extends React.PureComponent {
  state = {
    openSetting: false
  };

  render() {
    const { muiThemeStyle, action_changeMuiTheme } = this.props;
    return (
      <div
        style={{
          display: "flex",
          marginBottom: 25,
          justifyContent: "space-around"
        }}
      >
        <FloatingActionButton
          onClick={() => action_changeMuiTheme(MUI_THEME_STYLE_CYAN)}
          mini={true}
          backgroundColor="#2196F3"
        >
          {muiThemeStyle === MUI_THEME_STYLE_CYAN && <CheckIcon />}
        </FloatingActionButton>
        <FloatingActionButton
          onClick={() => action_changeMuiTheme(MUI_THEME_STYLE_BLUE)}
          mini={true}
          backgroundColor="#3F51B5"
        >
          {muiThemeStyle === MUI_THEME_STYLE_BLUE && <CheckIcon />}
        </FloatingActionButton>
        <FloatingActionButton
          onClick={() => action_changeMuiTheme(MUI_THEME_STYLE_PURPLE)}
          mini={true}
          backgroundColor="#673AB7"
        >
          {muiThemeStyle === MUI_THEME_STYLE_PURPLE && <CheckIcon />}
        </FloatingActionButton>
        <FloatingActionButton
          onClick={() => action_changeMuiTheme(MUI_THEME_STYLE_GREY)}
          mini={true}
          backgroundColor="#607D8B"
        >
          {muiThemeStyle === MUI_THEME_STYLE_GREY && <CheckIcon />}
        </FloatingActionButton>
      </div>
    );
  }
}
export default LayoutHeaderIconRightThemes;
