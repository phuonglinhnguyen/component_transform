//@flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GroupManagement from '../components/group_management_component';
import Loading from '../../../../common/loading';
import NotFound from '../components/error/not_found_page';

import { Translate } from 'react-redux-i18n';

import * as actions from '../actions/index';

import { GROUP_MANAGEMENT_TYPE_PROJECT } from '../constants/group_management_constant';
import { ROLE_ADMIN } from '../../../../../constants/index';

const GroupsContainer = props => {
  const { groups, actions, match, routes, history, roles } = props;
  const { group_management, group_item } = groups;
  const arrGroupId = match.params.groupId.split('/');
  if (group_management.is_get_generic_params) {
    return (
      <Loading
        beforeMount={() => actions.getGenericParams(arrGroupId[0], history)}
      />
    );
  }

  if (group_management.is_not_found) {
    return (
      <NotFound error={<Translate value={group_management.error_reason} />} />
    );
  }
  const is_admin = roles.indexOf(ROLE_ADMIN) > -1;
  return (
    <GroupManagement
      Translate={Translate}
      action_clickOutside={actions.clickOutside}
      action_changePriorityProject={actions.changePriorityProject}
      action_deleteGroupItem={actions.deleteGroupItem}
      action_handleAddNew={actions.handleAddNew}
      action_handleAssignUser={infos => {
        if (infos.type === GROUP_MANAGEMENT_TYPE_PROJECT) {
          actions.redirectProject(
            `/production-admin/${infos.id}/assign-users`,
            history
          );
        } else {
          actions.updateIdRedirect(infos.id);
          history.push(history.location.pathname + '/assignment');
        }
      }}
      action_handleMove={actions.handleMove}
      action_hideConfirmDelete={actions.hideConfirmDelete}
      action_redirectGroup={actions.redirectGroup}
      action_resetStateGroupManagement={actions.resetStateGroupManagement}
      action_showConfirmDelete={actions.showConfirmDelete}
      action_toggleDetails={actions.toggleDetails}
      action_toogleGroupTree={actions.toogleGroupTree}
      //////////////////////////// end action //////////////////////////////
      breadscrumb={group_item.breadscrumb}
      disabled_button={arrGroupId.length > 1}
      group_infos={group_item.group_infos}
      group_parent_id={group_item.parent_infos.id || 'root'}
      group_tree={group_management.group_tree}
      history={history}
      admin={is_admin}
      is_getting_info={group_item.is_getting_info}
      is_open_details={group_management.is_open_details}
      is_open_group_tree={group_management.is_open_group_tree}
      is_selected_group={group_item.is_selected_group}
      muiTheme={props.muiTheme}
      routes={routes}
      show_confirm={group_management.show_confirm}
      title_confirm={group_management.title_confirm}
    />
  );
};

const mapStateToProps = state => {
  const groups = state.groups;
  const user = state.current_user.user;

  return {
    groups,
    roles: user.roles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...actions
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
