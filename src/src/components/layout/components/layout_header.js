import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import LayoutTabs from './tabs';
import * as constants from '../../../constants';
import AppBar from 'material-ui/AppBar';
import Sidebar from './side_bar';
import LayoutHeaderInfo from './layout_header_information/container/layout_header_information_container';

import LayoutHeaderIconRightComponent from './layout_header_icon_right';

import _ from 'lodash';

class LayoutHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: null,
      navMainKey: [''],
      tabRoutes: []
    };
  }

  componentDidMount() {
    this.redirectDefaultPage(this.props);
    this.handleChangeNavMain(this.props);
  }
  handleChangeNavMain(props) {
    const routes = props.routes;
    const url_pathnames = props.location.pathname.split('/');
    const navMainKey = url_pathnames[1];
    if (
      navMainKey === constants.ROUTE_PROJECTS ||
      navMainKey === constants.ROUTE_PRODUCTION_ADMIN
    ) {
      this.sidebarSelectType(
        navMainKey,
        routes,
        url_pathnames,
        url_pathnames[2]
      );
    } else if (
      navMainKey === constants.ROUTE_CONFIGURATION ||
      navMainKey === constants.ROUTE_TRAINING ||
      navMainKey === constants.ROUTE_REPORT ||
      navMainKey === constants.ROUTE_DIGIPAY ||
      navMainKey === constants.ROUTE_SYSTEM
    ) {
      this.sidebarSelectType(navMainKey, routes, url_pathnames);
    } else {
      this.sidebarSelectType('', routes, url_pathnames);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.redirectDefaultPage(nextProps);
    this.handleChangeNavMain(nextProps);
  }
  sidebarSelectType(key, routes, url_pathnames, projectId) {
    var tabRoutes = [];
    const parentRoute = routes.find(route => route.key === key);
    if (parentRoute) {
      tabRoutes = parentRoute.routes;
    }
    this.setState({
      tabRoutes: tabRoutes,
      navMainKey: key,
      projectId: projectId
    });
  }

  redirectDefaultPage(props) {
    const url_pathnames = props.location.pathname.split('/');
    const mainKey = url_pathnames[1];
    const parentRoute = props.routes.find(route => route.key === mainKey);
    if (
      parentRoute &&
      url_pathnames.length === parentRoute.path.split('/').length
    ) {
      const userRoles = props.current_user.user.roles;

      var value;
      // if (_.intersection(parentRoute.roles, userRoles).length > 0) {
      //   value = parentRoute.default_path;
      // } else {
      for (var routeItem of parentRoute.routes) {
        if (!value && _.intersection(routeItem.roles, userRoles).length > 0) {
          value = routeItem.path;
        }
      }
      //}
      if (value) {
        if (
          mainKey === constants.ROUTE_PROJECTS ||
          mainKey === constants.ROUTE_PRODUCTION_ADMIN
        ) {
          value = value.replace(':projectid', url_pathnames[2]);
        }
        this.props.history.push(value);
      }
    }
  }

  handleSideBarSelect(key, object) {
    this.sidebarSelectType(key, this.props.routes, object);
  }
  renderLeft() {
    const { muiTheme, location, current_user } = this.props;
    return (
      <Sidebar
        current_user={current_user}
        location={location}
        sidebarIconColor={muiTheme.palette.sidebarIconColor}
        secondaryTextColor={muiTheme.palette.secondaryTextColor}
        sidebarListHoverColor={muiTheme.palette.sidebarListHoverColor}
        sidebarIconHoverColor={muiTheme.palette.sidebarIconHoverColor}
        sidebarBackgroundColor={muiTheme.palette.sidebarBackgroundColor}
        handleSideBarSelect={this.handleSideBarSelect.bind(this)}
      />
    );
  }
  render() {
    return (
      <div>
        <AppBar
          style={{ boxShadow: 'none' }}
          title={
            <LayoutHeaderInfo
              muiTheme={this.props.muiTheme}
              pathname={this.props.location.pathname}
              current_user={this.props.current_user}
            />
          }
          iconElementLeft={this.renderLeft()}
          iconElementRight={<LayoutHeaderIconRightComponent {...this.props} />}
        />
        <LayoutTabs
          navMainKey={this.state.navMainKey}
          projectId={this.state.projectId}
          tabRoutes={this.state.tabRoutes}
          {...this.props}
        />
      </div>
    );
  }
}


export default withRouter(LayoutHeader);
