import * as types from '../constants/layout_constant';
import * as constants from '../../../constants';

export function sidebarSelectType(key, routes, sideBarNew) {
  let tabRoutes = [];

  const parentRoute = routes.find(route => route.key === key);
  if (parentRoute) {
    if (sideBarNew && parentRoute.routes && parentRoute.routes.length > 0) {
      tabRoutes.push(parentRoute.routes[0]);
    } else {
      tabRoutes = parentRoute.routes;
    }
  }

  return {
    type: types.LAYOUT_SIDEBAR_SELECT,
    tabRoutes: tabRoutes,
    key: key
  };
}

export function changeActiveTab(key, routes, path) {
  let index = -1,
    activeTab = '';

  if (key === constants.ROUTE_CONFIGURATION) {
    index = 2;
  } else if (key === constants.ROUTE_PROJECTS) {
    index = 3;
  }
  if (index !== -1) {
    activeTab = routes.find(route => route.path === path.split('/')[index]);
  }

  return {
    type: types.LAYOUT_ACTIVE_TAB,

    activeTab: activeTab
  };
}
