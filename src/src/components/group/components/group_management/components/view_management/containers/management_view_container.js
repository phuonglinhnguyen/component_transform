//@flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Loading from '../../../../../../common/loading';
import ViewManagement from '../components/view_management_component';

import {
  changeOrderSetting,
  clickOutside,
  filterProject,
  redirectProject,
  selectProject
} from '../../../actions/index';

const ManagementViewContainer = props => {
  const { groups, actions } = props;
  const { group_management, group_item } = groups;
  if (group_item.is_calling_api || group_management.is_get_generic_params) {
    return <Loading style={{ height: 845 }} />;
  }

  return (
    <ViewManagement
      action_changeOrderSetting={actions.changeOrderSetting}
      action_clickOutside={actions.clickOutside}
      action_filterProject={actions.filterProject}
      action_getStatus={props.action_getStatus}
      action_redirectProject={actions.redirectProject}
      action_selectProject={actions.selectProject}
      //////////////////////////// end action //////////////////////////////
      Translate={props.Translate}
      child_projects={group_item.child_projects}
      history={props.history}
      id_selected={group_item.id_selected}
      is_open_details={group_management.is_open_details}
      is_open_group_tree={group_management.is_open_group_tree}
      muiTheme={props.muiTheme}
      order_by={group_management.order_by}
      order_key={group_management.order_key}
      statistic_detail={group_item.statistic_detail}
    />
  );
};

const mapStateToProps = state => {
  const groups = state.groups;
  const { current_user } = state;

  return {
    groups,
    username: current_user.user.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        changeOrderSetting,
        clickOutside,
        filterProject,
        redirectProject,
        selectProject
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ManagementViewContainer
);
