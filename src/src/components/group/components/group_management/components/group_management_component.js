import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import Paper from 'material-ui/Paper';

import CallAjaxContainer from '../../../../common/ajax/call_ajax/containers/call_ajax_container';
import ConfirmDialogComponent from '../../../../configuration/components/common/confirm_dialog';
import GroupActionComponent from './group_action_component';

import GroupDetailsComponent from './group_details_component';
import GroupTree from './group_tree_component';

class GroupManagement extends React.Component {
  constructor(props) {
    super(props);
    this.deleteData = this.deleteData.bind(this);
  }
  componentWillUnmount() {
    this.props.action_resetStateGroupManagement();
  }

  deleteData() {
    const { action_deleteGroupItem, group_infos, history } = this.props;
    action_deleteGroupItem(group_infos, history);
  }

  getStatusDialog() {
    return (
      this.refs['group_action_component'].getStatusDialog() &&
      !this.props.show_confirm
    );
  }

  render() {
    const {
      Translate,
      action_changePriorityProject,
      action_handleAddNew,
      action_handleAssignUser,
      action_handleMove,
      action_hideConfirmDelete,
      action_redirectGroup,
      action_showConfirmDelete,
      action_toggleDetails,
      action_toogleGroupTree,
      admin,
      breadscrumb,
      disabled_button,
      group_infos,
      group_parent_id,
      group_tree = [],
      history,
      is_getting_info,
      is_open_details,
      is_open_group_tree,
      is_selected_group,
      muiTheme,
      routes,
      show_confirm,
      title_confirm
    } = this.props;

    return (
      <div>
        <GroupActionComponent
          Translate={Translate}
          action_handleAddNew={action_handleAddNew}
          action_handleAssignUser={action_handleAssignUser}
          action_handleMove={action_handleMove}
          action_redirectGroup={group_id =>
            action_redirectGroup(group_id, history)
          }
          action_showConfirmDelete={action_showConfirmDelete}
          action_toggleDetails={action_toggleDetails}
          action_toogleGroupTree={action_toogleGroupTree}
          admin={admin}
          breadscrumb={breadscrumb}
          disabled_button={disabled_button}
          group_infos={group_infos}
          group_parent_id={group_parent_id}
          group_tree={group_tree}
          is_open_details={is_open_details}
          is_open_group_tree={is_open_group_tree}
          is_selected_group={is_selected_group}
          muiTheme={muiTheme}
          ref="group_action_component"
        />
        <div
          style={{
            display: 'flex',
            overflow: 'hidden',
            paddingTop: 55
          }}
        >
          {is_open_group_tree && (
            <div
              className="special_scroll"
              style={{
                flex: '0 0 15%',
                height: 'calc(100vh - 116px)',
                overflowY: 'auto',
                position: 'relative'
              }}
            >
              <GroupTree
                action_redirectGroup={group_id =>
                  action_redirectGroup(group_id, history)
                }
                datas={group_tree}
                id_selected={group_parent_id}
                primary1Color={muiTheme.palette.primary1Color}
                secondaryTextColor={muiTheme.palette.secondaryTextColor}
              />
            </div>
          )}
          <div
            className="special_scroll"
            style={{
              flex: '1 1',
              height: 'calc(100vh - 116px)',
              overflowX: 'hidden',
              overflowY: 'auto',
              position: 'relative'
            }}
          >
            {routes.map((route, i) => (
              <Route
                key={i}
                exact={route.exact}
                path={route.path}
                render={props => (
                  <route.component
                    {...props}
                    Translate={Translate}
                    muiTheme={muiTheme}
                    action_getStatus={this.getStatusDialog.bind(this)}
                  />
                )}
              />
            ))}
          </div>
          {is_open_details && (
            <Paper
              className="special_scroll"
              zDepth={2}
              style={{
                flex: '0 0 20%',
                height: 'calc(100vh - 116px)',
                margin: '3px 0px 0px 3px',
                overflowY: 'auto',
                position: 'relative'
              }}
            >
              <GroupDetailsComponent
                action_changePriorityProject={action_changePriorityProject}
                action_redirectGroup={group_id =>
                  action_redirectGroup(group_id, history)
                }
                action_toggleDetails={action_toggleDetails}
                group_infos={group_infos}
                is_getting_info={is_getting_info}
                muiTheme={muiTheme}
              />
            </Paper>
          )}
        </div>
        <CallAjaxContainer />
        <ConfirmDialogComponent
          actionDelete={() => {
            this.deleteData();
            action_hideConfirmDelete();
          }}
          body_dialog={
            <div
              style={{
                marginTop: 20,
                color: muiTheme.palette.textColor,
                fontWeight: 500
              }}
            >
              {<Translate value="groups.warning_delete" />}
            </div>
          }
          hideDialog={action_hideConfirmDelete}
          open={show_confirm}
          title={title_confirm}
        />
      </div>
    );
  }
}


export default GroupManagement;
