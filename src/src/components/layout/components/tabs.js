import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import { Tabs, Tab } from 'material-ui-scrollable-tabs/Tabs';
import * as constants from '../../../constants';
import _ from 'lodash';
class LayoutTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: null,
      initialSelectedIndex: 0
    };
    this.handleActive = this.handleActive.bind(this);
  }
  componentDidMount() {
    this.getActiveTab(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.getActiveTab(nextProps);
  }

  getActiveTab(props) {
    const path = props.location.pathname;
    const { navMainKey, tabRoutes = [] } = props;

    let index = -1,
      routeActive = null;

    if (
      navMainKey === constants.ROUTE_TRAINING ||
      navMainKey === constants.ROUTE_CONFIGURATION ||
      navMainKey === constants.ROUTE_REPORT ||
      navMainKey === constants.ROUTE_DIGIPAY ||
      navMainKey === constants.ROUTE_SYSTEM
    ) {
      index = 2;
    } else if (
      navMainKey === constants.ROUTE_PROJECTS ||
      navMainKey === constants.ROUTE_PRODUCTION_ADMIN
    ) {
      index = 3;
    }
  }
  componentDidMount() {
    this.getActiveTab(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.getActiveTab(nextProps);
  }

  getActiveTab(props) {

    const path = props.location.pathname;
    var { navMainKey, tabRoutes = [], current_user } = props;

    const roles = (current_user && current_user.user.roles) || [];
    let index = -1, routeActive = null, initialSelectedIndex = 0;

    if (navMainKey === constants.ROUTE_TRAINING || navMainKey === constants.ROUTE_CONFIGURATION || navMainKey === constants.ROUTE_SYSTEM || navMainKey === constants.ROUTE_REPORT  || navMainKey === constants.ROUTE_DIGIPAY) {
      index = 2;
    } else if (navMainKey === constants.ROUTE_PROJECTS || navMainKey === constants.ROUTE_PRODUCTION_ADMIN) {
      index = 3;
    }
    if (index !== -1) {
      tabRoutes = tabRoutes.filter(route => route.tabKey && route.tabKey === navMainKey &&
        _.intersection(route.roles, roles).length > 0)
      const pathArr = path.split('/');
      initialSelectedIndex = tabRoutes.findIndex(route => route.path.split('/')[index] === pathArr[index]);
      routeActive = tabRoutes.find(route => route.path.split('/')[index] === pathArr[index]);
    }
    this.setState({

      activeTab: routeActive ? routeActive.path : null,
      initialSelectedIndex: initialSelectedIndex != -1 ? initialSelectedIndex : 0
    })
  }
  handleActive(tab) {
    var path = tab.props.value;
    const { navMainKey } = this.props;
    if (navMainKey === constants.ROUTE_PROJECTS || navMainKey === constants.ROUTE_PRODUCTION_ADMIN) {
      const { projectId } = this.props;
      path = path.replace(":projectid", projectId);

    }

    this.props.history.push(path);
  }

  render() {
    const { tabRoutes = [], navMainKey, current_user } = this.props;
    const roles = (current_user && current_user.user.roles) || [];
    return (
      this.state.activeTab && (
        <Tabs
          initialSelectedIndex={this.state.initialSelectedIndex}
          value={this.state.activeTab}
          ref={node => (this._node = node)}
          tabType="scrollable-buttons"
        >
          {tabRoutes.map((data, i) => {
            if (
              data.tabKey &&
              data.tabKey === navMainKey &&
              _.intersection(data.roles, roles).length > 0
            ) {
              return (
                <Tab
                  key={i}
                  value={data.path}
                  onActive={this.handleActive}
                  label={data.label}
                />
              );
            }
            return null;
          })}
        </Tabs>
      )
    );
  }
}


export default withRouter(LayoutTabs);
