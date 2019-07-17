import React from 'react';

import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';

import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import FolderIcon from 'material-ui/svg-icons/file/folder';

import { isEqual } from 'lodash';
import { GROUP_MANAGEMENT_TYPE_PROJECT } from '../constants/group_management_constant';

class PopoverMoveTo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ancestors: [],
      childs: [],
      group_destination: { id: null },
      is_disabled_button: true,
      is_hide_project: false,
      label_button: 'Move',
      previous_id: 'root',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const props = { ...this.props };
    const state = { ...this.state };

    for (let key in props) {
      if (props.hasOwnProperty(key) && nextProps.hasOwnProperty(key)) {
        if (
          !isEqual(props[key], nextProps[key]) &&
          typeof props[key] !== 'function'
        ) {
          return true;
        }
      }
    }
    for (let key in state) {
      if (state.hasOwnProperty(key) && nextState.hasOwnProperty(key)) {
        if (!isEqual(state[key], nextState[key])) {
          return true;
        }
      }
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.anchorEl) {
      return;
    }
    const parent_id =
      nextProps.group_infos.group_id || nextProps.group_infos.id;
    const result = this.getValidGroup(nextProps.group_tree || [], parent_id);
    this.setState({
      ancestors: result.ancestors,
      childs: result.childs,
      group_destination: result.parent,
      is_disabled_button: true,
      is_hide_project: false,
      label_button: 'Move',
      parent: result.parent,
      previous_id: result.previous_id,
    });
  }

  getValidGroup(
    tree_group,
    group_id,
    result = { ancestors: [], parent: { id: 'root' } }
  ) {
    if (group_id === 'root') {
      return {
        ancestors: [],
        parent: {
          id: 'root',
          name: 'Groups'
        },
        previous_id: null,
        childs: [...tree_group]
      };
    }
    for (let key_tree_group in tree_group) {
      if (tree_group.hasOwnProperty(key_tree_group)) {
        let group = tree_group[key_tree_group];
        const childs = group.childs || [];
        if (group.id === group_id) {
          return {
            ...result,
            ancestors: [
              ...result.ancestors,
              { id: group.id, name: group.name }
            ],
            parent: {
              id: group.id,
              name: group.name
            },
            previous_id: result.parent.id,
            childs: [...childs]
          };
        } else if (JSON.stringify(childs).includes(group_id)) {
          return this.getValidGroup(childs, group_id, {
            ancestors: [
              ...result.ancestors,
              { id: group.id, name: group.name }
            ],
            parent: { id: group.id, name: group.name }
          });
        }
      }
    }
    return result;
  }

  hanldeSelectGroup(group, is_hide_project) {
    let is_disabled_button = false;
    const { group_parent_id } = this.props;
    if (group.id === group_parent_id) {
      is_disabled_button = true;
    }
    this.setState({
      group_destination: group,
      is_disabled_button: is_disabled_button,
      is_hide_project: is_hide_project,
      label_button: 'Move',
    });
  }

  handleGoToGroup(group_id, is_hide_project) {
    if (!group_id) {
      return;
    }
    const { group_tree, group_infos, group_parent_id } = this.props;
    const result = this.getValidGroup(group_tree, group_id);
    let is_disabled_button = false;
    if (group_infos.type === GROUP_MANAGEMENT_TYPE_PROJECT) {
      is_disabled_button =
        group_id === group_infos.group_id || group_id === 'root';
    } else {
      is_disabled_button = group_id === group_parent_id;
    }
    this.setState({
      ancestors: result.ancestors,
      childs: result.childs || [],
      group_destination: result.parent,
      is_disabled_button: is_disabled_button,
      is_hide_project: is_hide_project,
      label_button: 'Move here',
      parent: result.parent,
      previous_id: result.previous_id,
    });
  }

  render() {
    const {
      Translate,
      action_handleMove,
      anchorEl,
      group_infos,
      group_parent_id,
      handleRequestClose = () => undefined,
      muiTheme
    } = this.props;
    if (!anchorEl) {
      return null;
    }
    const {
      ancestors,
      childs,
      group_destination,
      is_disabled_button,
      is_hide_project,
      label_button,
      parent,
      previous_id,
    } = this.state;
    return (
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onRequestClose={() => handleRequestClose()}
        open={!anchorEl ? false : true}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Paper
          style={{
            height: 300,
            overflowX: 'hidden',
            overflowY: 'auto',
            width: 250
          }}
        >
          <Menu desktop={true}>
            <MenuItem
              disabled={true}
              insetChildren={true}
              leftIcon={
                previous_id ? (
                  <IconButton
                    style={{
                      padding: 0,
                      top: -5,
                      left: 12,
                      width: 40,
                      height: 40
                    }}
                    tooltip={<Translate value="groups.back_button" />}
                    onClick={() =>
                      this.handleGoToGroup(
                        previous_id,
                        parent.id === group_parent_id || is_hide_project
                      )
                    }
                  >
                    (
                    <ArrowBack color={muiTheme.palette.secondaryTextColor} />
                    )
                  </IconButton>
                ) : null
              }
              primaryText={parent.name}
            />
            <Divider />
            {childs.map((_child, index) => {
              const is_selected = group_destination.id === _child.id;
              const icon_color = is_selected
                ? muiTheme.palette.alternateTextColor
                : muiTheme.palette.secondaryTextColor;
              const is_disabled = group_infos.id === _child.id;
              if (_child.type === GROUP_MANAGEMENT_TYPE_PROJECT) {
                return null;
              }
              return (
                <MenuItem
                  disabled={is_disabled}
                  key={`move-to-menu-item-${index}`}
                  leftIcon={<FolderIcon color={icon_color} />}
                  onClick={() =>
                    this.hanldeSelectGroup(
                      _child,
                      _child.id !== group_parent_id && is_hide_project
                    )
                  }
                  primaryText={_child.name}
                  rightIconButton={
                    !is_disabled ? (
                      <IconButton
                        tooltip={
                          <Translate
                            value="groups.go_to_group"
                            group={_child.name}
                          />
                        }
                        tooltipPosition="bottom-left"
                        style={{ padding: 0, top: -10 }}
                        onClick={() =>
                          this.handleGoToGroup(
                            _child.id,
                            _child.id !== group_parent_id && is_hide_project
                          )
                        }
                      >
                        <ArrowDropRight color={icon_color} />
                      </IconButton>
                    ) : null
                  }
                  style={
                    is_disabled
                      ? {}
                      : {
                          backgroundColor: is_selected
                            ? muiTheme.palette.primary1Color
                            : muiTheme.palette.alternateTextColor,
                          color:
                            is_selected && muiTheme.palette.alternateTextColor
                        }
                  }
                />
              );
            })}
          </Menu>
        </Paper>
        <RaisedButton
          disabled={is_disabled_button}
          label={label_button}
          onClick={() => {
            action_handleMove(
              group_infos,
              { ancestors, group_destination },
              group_parent_id,
              is_hide_project
            );
            handleRequestClose();
          }}
          primary={true}
          style={{ margin: 10 }}
        />
      </Popover>
    );
  }
}

export { PopoverMoveTo };
