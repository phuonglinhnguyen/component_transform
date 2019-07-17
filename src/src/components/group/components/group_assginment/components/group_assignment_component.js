import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import TableX from '../../../../common/table-x/components/table';
import * as constants from '../constants';
import Paper from 'material-ui/Paper';
import Loading from '../../../../common/loading';
import Wrapper from '../../../../common/layout/wrapper';
import LayoutSeparate from '../../../../common/layout/layout_separate';
import Subheader from 'material-ui/Subheader/Subheader';
class GroupAssignmentComponent extends Component {
  constructor(props) {
    super(props);
    this.onAssignFilter = this.onAssignFilter.bind(this);
    this.onUnAssignFilter = this.onUnAssignFilter.bind(this);
    this.onAssignOneUser = this.onAssignOneUser.bind(this);
    this.onUnAssignOneUser = this.onUnAssignOneUser.bind(this);

    this.renderAssignOneUser = this.renderAssignOneUser.bind(this);
    this.renderUnAssignOneUser = this.renderUnAssignOneUser.bind(this);
    this.isEnableAssignButton = this.isEnableAssignButton.bind(this);
    this.isEnableUnAssignButton = this.isEnableUnAssignButton.bind(this);
    this.onClose = this.onClose.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const groupId = nextProps.match.params.groupId;
    if (this.props.match.params.groupId !== groupId && groupId !== 'root') {
      this.props.actions.getListDatas(groupId);
    }
  }
  componentWillUnmount() {

    this.props.actions.groupAssignmentResetState();
  }
  componentWillMount() {
    const groupId = this.props.match.params.groupId;

    this.props.actions.getListDatas(groupId);
  }

  isEnableAssignButton() {
    if (this._tableUserNotAssigned) {
      if (this._tableUserNotAssigned.state.is_filter) {
        const user_assigns = this._tableUserNotAssigned.getDataFilter();

        return user_assigns.length > 0;
      }
      return false;
    }
    return false;
  }
  isEnableUnAssignButton() {
    if (this._tableUsersAssigned) {
      var user_un_assigns = this._tableUsersAssigned.getDataFilter();
      user_un_assigns = user_un_assigns && user_un_assigns.filter(user => !user[constants.KEY_GROUP_ASSIGNMENT_PARENT_NAME]);
      return (
        this._tableUsersAssigned.state.is_filter && user_un_assigns.length > 0
      );
    }
    return false;
  }

  onAssignFilter() {
    var user_assigns = this._tableUserNotAssigned.getDataFilter();

    const groupId = this.props.match.params.groupId;
    if (user_assigns && user_assigns.length > 0) {

      this.props.actions.assignUsers(groupId, user_assigns);
    }
  }
  onUnAssignFilter() {
    var user_un_assigns = this._tableUsersAssigned.getDataFilter();
    const groupId = this.props.match.params.groupId;
    user_un_assigns = user_un_assigns && user_un_assigns.filter(user => !user[constants.KEY_GROUP_ASSIGNMENT_PARENT_NAME]);
    if (user_un_assigns && user_un_assigns.length > 0) {
      this.props.actions.unAssignUsers(groupId, user_un_assigns);
    }
  }
  onAssignOneUser(data) {
    const groupId = this.props.match.params.groupId;
    if (data) {
      this.props.actions.assignUsers(groupId, [data]);
    }
  }
  onUnAssignOneUser(data) {
    const groupId = this.props.match.params.groupId;
    if (data) {
      this.props.actions.unAssignUsers(groupId, [data]);
    }
  }
  getColumns(isAssign) {
    return [
      {
        title: isAssign ? 'Assign' : 'UnAssign',
        render: isAssign
          ? this.renderAssignOneUser
          : this.renderUnAssignOneUser,
        name: constants.KEY_GROUP_ASSIGNMENT_PARENT_NAME,
        sort: isAssign?false:true,
        style: { padding: 0 }
      },
      {
        name: constants.KEY_GROUP_ASSIGNMENT_USERNAME,
        title: constants.TITLE_GROUP_ASSIGNMENT_USERNAME,
        sort: true
      },
      {
        name: constants.KEY_GROUP_ASSIGNMENT_GROUP,
        title: constants.TITLE_GROUP_ASSIGNMENT_GROUP,
        sort: true
      },
      {
        name: constants.KEY_GROUP_ASSIGNMENT_DISPLAYNAME,
        title: constants.TITLE_GROUP_ASSIGNMENT_DISPLAYNAME,
        sort: true
      }

    ];
  }

  renderAssignOneUser(user) {

    return (
      <FlatButton
        label="Assign"
        title="Assign"
        primary={true}
        onClick={event => this.onAssignOneUser(user)}
      />
    )
  }
  renderUnAssignOneUser(user) {
    return (
      user[constants.KEY_GROUP_ASSIGNMENT_PARENT_NAME] ?
        <Subheader>{user[constants.KEY_GROUP_ASSIGNMENT_PARENT_NAME]}</Subheader>
        :
        <FlatButton
          label="UnAssign"
          title="UnAssign"
          primary={true}
          onClick={event => this.onUnAssignOneUser(user)}
        />
    );
  }


  getSearchKeys() {
    return [
      constants.KEY_GROUP_ASSIGNMENT_USERNAME,
      constants.KEY_GROUP_ASSIGNMENT_GROUP,
      constants.KEY_GROUP_ASSIGNMENT_DISPLAYNAME
    ];
  }


  _addRefTableUserNotAssigned(node) {
    this._tableUserNotAssigned = node;
  }
  _addRefTableUserAssigned(node) {
    this._tableUsersAssigned = node;
  }
  onClose() {
    const groupId = this.props.match.params.groupId
    this.props.history.push(`/groups/${groupId}`);
  }
  render() {
    const { user_assigneds, user_not_assigneds, is_fetching } = this.props.group_assignment;

    return (
      <div>


        {is_fetching ? <Loading /> :
          <Wrapper
            muiTheme={this.props.muiTheme}
            offset={{ top: 0 }}
            style={{ width: 'auto', background: 'transparent' }}
          >

            <IconButton

              onClick={this.onClose}
              style={{ float: 'right', marginBottom: '-30px', position: 'relative', color: 'red' }}
              iconStyle={{ color: 'red' }}
              tooltip='Close'
            >
              <NavigationClose />
            </IconButton>
            <LayoutSeparate

              firstStyle={{ width: 'calc(50% - 16px)' }}
              secondStyle={{ width: '50%' }}
              wrapperStyle={{
                backgroundColor: this.props.muiTheme.palette.background1Color
              }}
              viewType={1}
              first={
                <Paper style={{ height: 'calc(100% - 32px)', width: 'calc(100% - 16px)', margin: '16px 0 0 16px' }}>
                  <TableX
                    ref={node => this._addRefTableUserNotAssigned(node)}
                    selectable={false}
                    multiSelectable={false}
                    muiTheme={this.props.muiTheme}
                    datas={user_not_assigneds}
                    columns={this.getColumns(true)}
                    paging={true}
                    pagingPosition={'bottom'}
                    search_keys={this.getSearchKeys()}
                    tableActions={() => (
                      <RaisedButton
                        label=" Assign filtered users "
                        disabled={!this.isEnableAssignButton()}
                        primary={true}
                        onClick={this.onAssignFilter}
                      />
                    )}
                    renderCheckboxCondition={this.renderCheckboxCondition}
                    tableStyle={{
                      bodyStyle: { maxHeight: '66vh' }
                    }}
                    searchHintText="User"
                  />
                </Paper>
              }
              second={
                <Paper style={{ height: 'calc(100% - 32px)', width: 'calc(100% - 16px)', margin: '16px 0 0 0px' }}>
                  <TableX
                    ref={node => this._addRefTableUserAssigned(node)}
                    selectable={false}
                    multiSelectable={false}
                    datas={user_assigneds}
                    muiTheme={this.props.muiTheme}
                    columns={this.getColumns(false)}
                    paging={true}
                    pagingPosition={'bottom'}
                    search_keys={this.getSearchKeys()}
                    tableActions={() => (
                      <RaisedButton
                        label="Unassign filtered users   "
                        disabled={!this.isEnableUnAssignButton()}
                        secondary={true}
                        onClick={this.onUnAssignFilter}
                      />
                    )}
                    renderCheckboxCondition={this.renderCheckboxCondition}
                    tableStyle={{
                      bodyStyle: { maxHeight: '66vh' }
                    }}
                    searchHintText="User"
                  />
                </Paper>
              }
            />

          </Wrapper>
        }


      </div>
    );
  }
}


export default withRouter(GroupAssignmentComponent);
