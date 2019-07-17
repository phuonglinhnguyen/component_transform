import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TableX from '../../common/table-x/components/table';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import { merge2Array } from '../../../utils/common/merge_deep';
import RolesComponent from './roles_component';
import { CardHeader } from 'material-ui/Card';
import UserRoleDialogComponent from './user_roles_dialog_component';
import * as constants from '../utils/user_roles_constants';

import Paper from 'material-ui/Paper';
import Loading from '../../common/loading';
import Wrapper from '../../common/layout/wrapper';
import LayoutSeparate from '../../common/layout/layout_separate';
class UserRoleComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      nameData: '',
      visibleAddInput: false,
      datas: []
    };
    this.onCheckAllRoles = this.onCheckAllRoles.bind(this);
    this.onCheckAllUser = this.onCheckAllUser.bind(this);
    this.onCheckRole = this.onCheckRole.bind(this);
    this.onCheckUser = this.onCheckUser.bind(this);
    this.onAddRoles = this.onAddRoles.bind(this);
    this.renderRole = this.renderRole.bind(this);
    this.onClickEditUserRole = this.onClickEditUserRole.bind(this);
    this.getSelectedUsers = this.getSelectedUsers.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }
  componentDidMount() {
    this.props.actions.getListUserRoles();
  }
  componentWillMount() {
    this.props.actions.getListUserADs();
  }
  componentWillUnmount() {
    this.props.actions.resetListState();
  }
  renderTableRoles() {
    const columns = [{ name: 'name', title: 'Role' }];
    var datas = [];
    for (var role of constants.ROLES) {
      datas.push({ name: role });
    }

    const tableStyle = {
      bodyStyle: { maxHeight: '68vh' }
    };
    return (
      <TableX
        ref={node => this._addRefRole(node)}
        selectable={true}
        muiTheme={this.props.muiTheme}
        multiSelectable={true}
        datas={datas}
        columns={columns}
        paging={false}
        tableActions={this.renderActionsRole}
        tableStyle={tableStyle}
      />
    );
  }
  renderActionsRole() {
    return <Subheader>Select Roles</Subheader>;
  }
  renderTable(datas) {
    const columns = [
      {
        name: constants.USER_ROLE_KEY_USERNAME,
        title: constants.USER_ROLE_TITLE_USERNAME,
        sort: true
      },
      {
        name: constants.USER_ROLE_KEY_GROUP,
        title: constants.USER_ROLE_TITLE_GROUP,
        sort: true
      },
      {
        name: constants.USER_ROLE_KEY_DISPLAY_NAME,
        title: constants.USER_ROLE_TITLE_DISPLAY_NAME,
        sort: true
      },
      {
        name: constants.USER_ROLE_KEY_ROLES,
        title: constants.USER_ROLE_TITLE_ROLES,
        render: this.renderRole,
        colSpan: 2,
        sort: true
      }
    ];
    const search_keys = [
      constants.USER_ROLE_KEY_USERNAME,
      constants.USER_ROLE_KEY_GROUP,
      constants.USER_ROLE_KEY_DISPLAY_NAME
    ];
    const tableStyle = {
      bodyStyle: { maxHeight: '66vh' }
    };
    return (
      <TableX
        ref={node => this._addRefTable(node)}
        selectable={true}
        multiSelectable={true}
        muiTheme={this.props.muiTheme}
        datas={datas}
        columns={columns}
        paging={true}
        pagingPosition={'bottom'}
        search_keys={search_keys}
        tableActions={this.renderActions}
        tableStyle={tableStyle}
        searchHintText={'Name or Group'}
      />
    );
  }
  renderActions() {
    return (
      <RaisedButton
        onClick={this.onAddRoles}
        label="Save Roles"
        primary={true}
      />
    );
  }
  renderRole(data) {
    const roles = data && data.roles ? data.roles : [];
    return (
      <GridList cellHeight="auto">
        <GridTile>
          <Subheader style={{ whiteSpace: 'normal' }}>
            {roles.join(' , ')}
          </Subheader>
        </GridTile>
        <GridTile>
          {roles.length > 0 ? (
            <IconButton onClick={event => this.onClickEditUserRole(data)}>
              <ImageEdit />
            </IconButton>
          ) : (
              <div />
            )}
        </GridTile>
      </GridList>
    );
  }
  filter(user_roles, user_ads) {
    user_ads = user_ads || [];
    user_ads = user_ads.filter(function (user) {
      const find = user_roles.find(
        prj_user => prj_user.username === user.username
      );

      return !find;
    });
    return user_ads;
  }

  onCheckUser(user, isInputChecked) {
    const users = [user];
    this.props.actions.checkUsers(users, isInputChecked);
  }
  onCheckAllUser(users, isInputChecked) {
    this.props.actions.checkUsers(users, isInputChecked);
  }
  onCheckRole(role, isInputChecked) {
    const roles = [role];
    this.props.actions.checkRoles(roles, isInputChecked);
  }
  onCheckAllRoles(roles, isInputChecked) {
    this.props.actions.checkRoles(roles, isInputChecked);
  }
  getSelectedUsers() {
    if (this._table) {
      return this._table.getSelectedData();
    }
    return [];
  }
  getSelectedRoles() {
    if (this._role) {
      return this._role.getSelectedData();
    }
    return [];
  }
  onAddRoles() {
    const selected_users = this.getSelectedUsers();
    if (selected_users.length > 0) {
      const selected_roles = this.getSelectedRoles();
      const current_username = this.props.current_user.user.username;
      this.props.actions.saveUserRoles(selected_users, selected_roles, current_username);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { user_role_list, user_ads } = nextProps;

    if (!user_role_list.is_fetching && !user_ads.is_fetching) {
      const { user_roles = [] } = user_role_list;
      const { users = [] } = user_ads;
      const datas = merge2Array(
        users,
        user_roles,
        constants.USER_ROLE_KEY_USERNAME
      );
      this.setState({ datas: datas });
    }
  }
  onClickEditUserRole = user => {
    this.props.actions.dialogOpen(user);
  };
  _addRefTable(node) {
    this._table = node;
  }
  _addRefRole(node) {
    this._role = node;
  }
  render() {
    const { datas } = this.state;
    const { user_role_list, user_ads } = this.props;

    const fetching = user_role_list.is_fetching || user_ads.is_fetching;
    return (
      <div>
        <UserRoleDialogComponent {...this.props} />
        <Wrapper
          muiTheme={this.props.muiTheme}
          offset={{ top: 70 }}
          style={{ width: 'auto' }}
        >
          {fetching ? <Loading /> :
            <LayoutSeparate
              style={fetching ? { display: 'none' } : {}}
              firstStyle={{ width: 'calc(67% - 16px)' }}
              secondStyle={{ width: '33%' }}
              wrapperStyle={{
                backgroundColor: this.props.muiTheme.palette.background1Color
              }}
              viewType={1}
              first={
                <Paper style={{ height: 'calc(100% - 32px)', width:'calc(100% - 16px)',  margin:'16px 0 0 16px' }}>
                  {this.renderTable(datas)}
                </Paper>
              }
              second={
                <Paper style={{ height: 'calc(100% - 32px)', width:'calc(100% - 16px)',  margin:'16px 0 0 0px' }}>
                  <GridList cellHeight="auto" padding={0}>
                    <GridTile style={{ margin: '15px 15px 0px 15px' }}>
                      <CardHeader title="Select Roles" />
                    </GridTile>
                  </GridList>

                  <RolesComponent
                    ref={node => this._addRefRole(node)}
                    onCheckRow={this.onCheckRole}
                    onCheckAll={this.onCheckAllRoles}
                    user_roles={user_role_list.user_roles}
                  />
                </Paper>
              }
            />
          }
        </Wrapper>
      </div>
    );
  }
}

export default UserRoleComponent;
