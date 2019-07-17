import React from "react";
import PropTypes from "prop-types";

import ContentInbox from "material-ui/svg-icons/content/inbox";
import ActionDashboard from "material-ui/svg-icons/action/dashboard";
import ActionHelp from "material-ui/svg-icons/action/help";
import ActionBuild from "material-ui/svg-icons/action/build";
import ActionPermIdentity from "material-ui/svg-icons/action/perm-identity";
import InsertChartIcon from "material-ui/svg-icons/editor/insert-chart";

import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import Panorama from "material-ui/svg-icons/image/panorama";
import FolderIcon from "material-ui/svg-icons/file/folder";

import * as constants from "../../../constants/index";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import _ from "lodash";

class NavMain extends React.Component {
  handleSelectNavMain(value) {
    this.props.handleSelectNavMain(value);
  }

  render() {
    const {
      secondaryTextColor,
      sidebarIconColor,
      sidebarIconHoverColor,
      I18n,
      current_user
    } = this.props;
    const roles = current_user && current_user.user.roles;
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <NavigationMenu />
          </IconButton>
        }
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem
          leftIcon={
            <ActionDashboard
              hoverColor={sidebarIconHoverColor}
              color={sidebarIconColor}
            />
          }
          onClick={() => this.handleSelectNavMain("/home")}
          primaryText={I18n.t("sidebar.home")}
        />
        {
          <MenuItem
            leftIcon={
              <ActionHelp
                hoverColor={sidebarIconHoverColor}
                color={sidebarIconColor}
              />
            }
            onClick={() =>
              this.handleSelectNavMain(constants.PATHNAME_GUIDE)
            }
            primaryText={I18n.t("sidebar.guide")}
          />
        }
        {_.intersection(constants.menu_roles.authorization, roles).length >
          0 && (
          <MenuItem
            leftIcon={
              <ActionPermIdentity
                hoverColor={sidebarIconHoverColor}
                color={sidebarIconColor}
              />
            }
            onClick={() =>
              this.handleSelectNavMain(constants.PATHNAME_AUTHORIZATION)
            }
            primaryText={I18n.t("sidebar.authorization")}
          />
        )}
        {_.intersection(constants.menu_roles.pre_defined, roles).length > 0 && (
          <MenuItem
            leftIcon={
              <ActionBuild
                hoverColor={sidebarIconHoverColor}
                color={sidebarIconColor}
              />
            }
            onClick={() =>
              this.handleSelectNavMain(constants.PATHNAME_CONFIGURATION)
            }
            primaryText={I18n.t("sidebar.pre_defined")}
          />
        )}
        {_.intersection(constants.menu_roles.group_management, roles).length >
          0 && (
          <MenuItem
            leftIcon={
              <FolderIcon
                hoverColor={sidebarIconHoverColor}
                color={sidebarIconColor}
              />
            }
            onClick={() =>
              this.handleSelectNavMain(constants.PATHNAME_GROUPS)
            }
            primaryText={I18n.t("sidebar.groups")}
          />
        )}
        {(_.intersection(constants.menu_roles.design, roles).length > 0 ||
          _.intersection(constants.menu_roles.production_admin, roles).length >
            0) && (
          <MenuItem
            leftIcon={
              <ContentInbox
                hoverColor={sidebarIconHoverColor}
                color={sidebarIconColor}
              />
            }
            onClick={() =>
              this.handleSelectNavMain(constants.PATHNAME_PROJECTS)
            }
            primaryText={I18n.t("sidebar.project")}
          />
        )}
        {_.intersection(constants.menu_roles.training, roles).length > 0 && (
          <MenuItem
            leftIcon={
              <Panorama
                hoverColor={sidebarIconHoverColor}
                color={sidebarIconColor}
              />
            }
            onClick={() =>
              this.handleSelectNavMain(constants.PATHNAME_TRAINING)
            }
            primaryText={I18n.t("sidebar.training")}
          />
        )}
         {_.intersection(constants.menu_roles.ocr_testing, roles).length > 0 && (
          <MenuItem
            leftIcon={
              <Panorama
                hoverColor={sidebarIconHoverColor}
                color={sidebarIconColor}
              />
            }
            onClick={() =>
              this.handleSelectNavMain(constants.PATHNAME_OCR_TESTING)
            }
            primaryText={I18n.t("sidebar.ocr_testing")}
          />
        )}
        {_.intersection(constants.menu_roles.production, roles).length > 0 && (
          <MenuItem
            leftIcon={
              <Panorama
                hoverColor={sidebarIconHoverColor}
                color={sidebarIconColor}
              />
            }
            onClick={() =>
              this.handleSelectNavMain(constants.PATHNAME_PRODUCTION)
            }
            primaryText={I18n.t("sidebar.production")}
          />
        )}
        {_.intersection(constants.menu_roles.authorization, roles).length >
          0 && (
          <MenuItem
            leftIcon={
              <div
                style={{
                  color: secondaryTextColor,
                  margin: "0px 12px 12px 12px"
                }}
              >
                <i className="fa fa-cogs fa-lg" />
              </div>
            }
            onClick={() =>
              this.handleSelectNavMain(constants.PATHNAME_SYSTEM)
            }
            primaryText={I18n.t("sidebar.system")}
          />
        )}
        <MenuItem
          leftIcon={<InsertChartIcon />}
          onClick={() => this.handleSelectNavMain(constants.PATHNAME_REPORT)}
          primaryText={I18n.t("sidebar.report")}
        />
        <MenuItem
          leftIcon={<InsertChartIcon />}
          onClick={() => this.handleSelectNavMain(constants.PATHNAME_DIGIPAY)}
          primaryText={I18n.t("sidebar.digipay")}
        />
      </IconMenu>
    );
  }
}

NavMain.propTypes = {
  homeLabel: PropTypes.string,
  projectLabel: PropTypes.string,
  monitorLabel: PropTypes.string,
  configurationLabel: PropTypes.string,
  sidebarIconColor: PropTypes.string,
  sidebarIconHoverColor: PropTypes.string,
  sidebarBackgroundColor: PropTypes.string,

  I18n: PropTypes.object,

  handleSelectNavMain: PropTypes.func
};

export default NavMain;
