import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

import AddUserIcon from 'material-ui/svg-icons/social/person-add';
import ArrowDropdownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import InfoIcon from 'material-ui/svg-icons/action/info';
import MoveIcon from 'material-ui/svg-icons/action/exit-to-app';
import NewFolderIcon from 'material-ui/svg-icons/file/create-new-folder';
import RenameIcon from 'material-ui/svg-icons/editor/border-color';
import RightChevonIcon from 'material-ui/svg-icons/navigation/chevron-right';

import { CreateEditNameDialog } from './group_dialog_component';
import { PopoverMoveTo } from './group_move_to_component';

import {
  GROUP_ACTION_UN_SELECTED,
  GROUP_MANAGEMENT_TYPE_GROUP,
  GROUP_MANAGEMENT_TYPE_PROJECT
} from '../constants/group_management_constant';

class ActionButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      anchorElMoveTo: null,
      data: {},
      label_button_dialog: '',
      label_group: GROUP_MANAGEMENT_TYPE_GROUP,
      label_project: GROUP_MANAGEMENT_TYPE_PROJECT,
      label_text: '',
      open: false,
      open_dialog: false,
      title_dialog: ''
    };
    this.getStatusDialog = this.getStatusDialog.bind(this);
  }
  handleClick = (event, from_breadscrumb) => {
    // This prevents ghost click.
    event.preventDefault();
    const label_group = from_breadscrumb
        ? 'New group'
        : GROUP_MANAGEMENT_TYPE_GROUP,
      label_project = from_breadscrumb
        ? 'New project'
        : GROUP_MANAGEMENT_TYPE_PROJECT;
    this.setState({
      anchorEl: event.currentTarget,
      label_group,
      label_project,
      open: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
      anchorElMoveTo: null,
      data: {}
    });
  };

  handleOpenDialog = (open_dialog, label_button_dialog, title_dialog, data) => {
    this.setState({
      data,
      label_button_dialog,
      label_text: !data.id ? '' : 'groups.label_new_name',
      open: false,
      open_dialog,
      title_dialog
    });
  };

  closeDialog() {
    this.setState({
      open_dialog: false
    });
  }

  getStatusDialog = () => {
    return !this.state.open_dialog && !this.state.anchorElMoveTo;
  };

  render() {
    const {
      Translate,
      action_handleAddNew,
      action_handleAssignUser,
      action_handleMove,
      action_redirectGroup,
      action_showConfirmDelete,
      action_toggleDetails,
      action_toogleGroupTree,
      admin,
      breadscrumb = [],
      disabled_button = false,
      group_infos,
      group_parent_id,
      group_tree,
      is_open_details,
      is_open_group_tree,
      is_selected_group = false,
      muiTheme
    } = this.props;

    const {
      anchorEl,
      anchorElMoveTo,
      data = {},
      label_button_dialog,
      label_group,
      label_text,
      open,
      open_dialog,
      title_dialog
    } = this.state;
    const br_length = breadscrumb.length;
    const styles = {
      label_style: {
        color: muiTheme.palette.secondaryTextColor,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      icon_secondary: {
        color: muiTheme.palette.secondaryTextColor
      },
      toolbar: {
        backgroundColor: muiTheme.palette.alternateTextColor,
        boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.3)',
        left: 0,
        position: 'fixed',
        right: 0,
        zIndex: 1
      }
    };
    return (
      <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup firstChild={true}>
            <RaisedButton
              disabled={disabled_button}
              label={<Translate value="groups.button_new" />}
              onClick={() =>
                this.handleOpenDialog(true, 'Create', 'New group', {
                  type: GROUP_MANAGEMENT_TYPE_GROUP,
                  group_id: group_parent_id
                })
              }
              primary={true}
            />
            <ToolbarSeparator />
            {breadscrumb.map((br, index) => {
              if (index < br_length - 1) {
                return (
                  <div key={`breadscrumb-${index}`} style={{ display: 'flex' }}>
                    <FlatButton
                      label={br.name}
                      labelStyle={styles.label_style}
                      onClick={() => action_redirectGroup(br.id)}
                      primary={true}
                      tooltip={br.name || ''}
                    />
                    <RightChevonIcon
                      {...styles.icon_secondary}
                      viewBox="6 -6 16 24"
                    />
                  </div>
                );
              }
              return (
                <FlatButton
                  disabled={disabled_button || (!admin && br.id === 'root')}
                  icon={
                    !disabled_button ? (
                      <ArrowDropdownIcon color={muiTheme.palette.textColor} />
                    ) : null
                  }
                  key={`breadscrumb-${index}`}
                  label={br.name}
                  labelPosition="before"
                  labelStyle={{
                    color: muiTheme.palette.textColor,
                    fontWeight: 500
                  }}
                  onClick={e => this.handleClick(e, true)}
                  primary={true}
                  style={{ marginLeft: 0 }}
                  tooltip={br.name || ''}
                />
              );
            })}
          </ToolbarGroup>
          <ToolbarGroup>
            {is_selected_group !== GROUP_ACTION_UN_SELECTED && (
              <IconButton
                onClick={() =>
                  this.handleOpenDialog(true, 'Ok', 'Rename', {
                    ...group_infos,
                    old_name: group_infos.name
                  })
                }
                tooltip={<Translate value={'groups.tooltip_rename'} />}
              >
                <RenameIcon {...styles.icon_secondary} />
              </IconButton>
            )}
            {is_selected_group !== GROUP_ACTION_UN_SELECTED && (
              <IconButton
                onClick={e =>
                  this.setState({
                    anchorElMoveTo: e.currentTarget
                  })
                }
                tooltip={<Translate value={'groups.tooltip_move_to'} />}
              >
                <MoveIcon {...styles.icon_secondary} />
              </IconButton>
            )}
            {is_selected_group !== GROUP_ACTION_UN_SELECTED && (
              <IconButton
                onClick={() => action_handleAssignUser(group_infos)}
                tooltip={<Translate value={'groups.tooltip_assign_user'} />}
              >
                <AddUserIcon {...styles.icon_secondary} />
              </IconButton>
            )}
            {is_selected_group !== GROUP_ACTION_UN_SELECTED && (
              <ToolbarSeparator style={{ margin: 15 }} />
            )}
            <IconButton
              disableTouchRipple={true}
              iconClassName="fa fa-sitemap"
              iconStyle={{
                color: is_open_group_tree
                  ? muiTheme.palette.textColor
                  : muiTheme.palette.secondaryTextColor
              }}
              onClick={() => action_toogleGroupTree(!is_open_group_tree)}
              style={
                is_open_group_tree
                  ? {
                      backgroundColor: muiTheme.palette.background3Color,
                      borderRadius: '50%'
                    }
                  : {}
              }
              tooltip={
                is_open_group_tree ? (
                  <Translate value={'groups.tooltip_hide_group_tree'} />
                ) : (
                  <Translate value={'groups.tooltip_view_group_tree'} />
                )
              }
            />
            <IconButton
              disableTouchRipple={true}
              onClick={() => action_toggleDetails(!is_open_details)}
              style={
                is_open_details
                  ? {
                      backgroundColor: muiTheme.palette.background3Color,
                      borderRadius: '50%'
                    }
                  : {}
              }
              tooltip={
                is_open_details ? (
                  <Translate value={'groups.tooltip_hide_detail'} />
                ) : (
                  <Translate value={'groups.tooltip_view_detail'} />
                )
              }
            >
              <InfoIcon
                color={
                  is_open_details
                    ? muiTheme.palette.textColor
                    : muiTheme.palette.secondaryTextColor
                }
              />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <Popover
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          onRequestClose={this.handleRequestClose}
          open={open}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <Menu listStyle={{ width: 250 }}>
            <MenuItem
              leftIcon={<NewFolderIcon />}
              onClick={() =>
                this.handleOpenDialog(true, 'Create', 'New group', {
                  type: GROUP_MANAGEMENT_TYPE_GROUP,
                  group_id: group_parent_id
                })
              }
              primaryText={label_group}
            />
            {group_infos.id !== 'root' && group_infos.type !== "Project"  && (
              <MenuItem
                leftIcon={<AddUserIcon />}
                onClick={() => {
                  action_handleAssignUser(group_infos);
                  this.setState({
                    open: false
                  });
                }}
                primaryText={<Translate value={'groups.tooltip_assign_user'} />}
              />
            )}
            {group_infos.id !== 'root' && group_infos.type !== "Project" && (
              <MenuItem
                leftIcon={<RenameIcon />}
                onClick={() =>
                  this.handleOpenDialog(true, 'Ok', 'Rename', {
                    ...group_infos,
                    old_name: group_infos.name
                  })
                }
                primaryText={<Translate value={'groups.tooltip_rename'} />}
              />
            )}
            {group_infos.id !== 'root' && group_infos.type !== "Project"  && (
              <MenuItem
                leftIcon={<MoveIcon />}
                onClick={() =>
                  this.setState({
                    open: false,
                    anchorElMoveTo: anchorEl
                  })
                }
                primaryText={<Translate value={'groups.tooltip_move_to'} />}
              />
            )}
            {group_infos.id !== 'root' && group_infos.type !== "Project"  && (
              <MenuItem
                leftIcon={<DeleteIcon />}
                onClick={() => {
                  action_showConfirmDelete(group_infos);
                  this.setState({
                    open: false
                  });
                }}
                primaryText={<Translate value={'groups.tooltip_delete'} />}
              />
            )}
          </Menu>
        </Popover>
        <CreateEditNameDialog
          Translate={Translate}
          data={data}
          handleClickSubmit={action_handleAddNew}
          label_button_dialog={label_button_dialog}
          label_text={label_text}
          muiTheme={muiTheme}
          open_dialog={open_dialog}
          resetDialog={this.closeDialog.bind(this)}
          title_dialog={title_dialog}
        />
        <PopoverMoveTo
          Translate={Translate}
          action_handleMove={action_handleMove}
          anchorEl={anchorElMoveTo}
          group_infos={group_infos}
          group_parent_id={group_parent_id}
          group_tree={group_tree}
          handleRequestClose={this.handleRequestClose.bind(this)}
          muiTheme={muiTheme}
        />
      </div>
    );
  }
}

export default ActionButtons;
