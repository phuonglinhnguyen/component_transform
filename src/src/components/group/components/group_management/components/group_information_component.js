import React from 'react';

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import { isEqual } from 'lodash';

import { GROUP_MANAGEMENT_TYPE_PROJECT } from '../constants/group_management_constant';

class GroupItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      is_editable: false,
      priority_editable: ''
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    for (let key in nextProps) {
      if (nextProps.hasOwnProperty(key)) {
        if (
          !key.includes('action') &&
          !isEqual(this.props[key], nextProps[key])
        ) {
          return true;
        }
      }
    }
    for (let key_state in nextState) {
      if (!isEqual(this.state[key_state], nextState[key_state])) {
        return true;
      }
    }
    return false;
  }

  modifyPriority(priority) {
    this.setState({
      priority_editable: priority
    });
  }

  renderTaskInfo(task_infos) {
    if (task_infos.length === 0) {
      return;
    }
    return (
      <Card style={{ boxShadow: 'none' }}>
        <CardHeader
          actAsExpander={true}
          style={{ padding: '6px 0px 0px 12px' }}
          title="- Task details"
        />
        <CardText expandable={true} style={{ padding: '0px 0px 0px 12px' }}>
          {task_infos.map((_task, index) => {
            return this.renderInfo(`+ ${_task.name}`, _task.instances, index);
          })}
        </CardText>
      </Card>
    );
  }

  renderUserOnline(user_infos) {
    if (user_infos.length === 0) {
      return;
    }
    return (
      <Card style={{ boxShadow: 'none' }}>
        <CardHeader
          actAsExpander={true}
          style={{ padding: '6px 0px 0px 12px' }}
          title="- User online"
        />
        <CardText expandable={true} style={{ padding: '0px 0px 0px 12px' }}>
          {user_infos.map((_user, index) => {
            return <div key={`user_infos-${index}`}>{` + ${_user.name}`}</div>;
          })}
        </CardText>
      </Card>
    );
  }

  renderInfo(label, value, key = '') {
    const { muiTheme } = this.props;
    if (value === undefined) {
      return null;
    }
    return (
      <div
        key={key + label}
        style={{ margin: 10, display: 'flex', flexWrap: 'wrap', fontSize: 14 }}
      >
        <div
          style={{
            color: muiTheme.palette.secondaryTextColor,
            flex: '0 0 60%'
          }}
        >{`${label}`}</div>
        <div style={{ flex: '0 0 40%', textAlign: 'right' }}>{` ${value}`}</div>
      </div>
    );
  }

  renderEditableInfo(label, group_infos, key = '') {
    const { muiTheme, action_changePriorityProject } = this.props;
    const { is_editable, priority_editable = '' } = this.state;
    if (is_editable) {
      return (
        <TextField
          autoFocus
          name="priority-project"
          onBlur={() => {
            this.setState({
              is_editable: false,
              priority_editable: ''
            });
            const priority_number = parseInt(priority_editable, 10);
            if (priority_number !== group_infos.priority && priority_editable) {
              action_changePriorityProject(group_infos.id, priority_number);
            }
          }}
          onChange={e => this.modifyPriority(e.target.value)}
          type="number"
          value={priority_editable}
        />
      );
    }
    return (
      <div
        key={key + label}
        style={{ margin: 10, display: 'flex', flexWrap: 'wrap', fontSize: 14 }}
      >
        <div
          style={{
            alignItems: 'center',
            color: muiTheme.palette.secondaryTextColor,
            display: 'flex',
            flex: '0 0 60%'
          }}
        >{`Priority : `}</div>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flex: '0 0 20%'
          }}
        >
          {`${group_infos.priority}`}
        </div>
        <IconButton
          onClick={() =>
            this.setState({
              is_editable: true,
              priority_editable: group_infos.priority || '0'
            })
          }
        >
          <EditIcon color={muiTheme.palette.secondaryTextColor} />
        </IconButton>
      </div>
    );
  }

  render() {
    const {
      group_infos = {} //muiTheme
    } = this.props;
    return (
      <div style={{ margin: 15 }}>
        {group_infos.type === GROUP_MANAGEMENT_TYPE_PROJECT &&
          this.renderEditableInfo('Priority', group_infos)}
        {this.renderInfo('Type', group_infos.type)}
        {this.renderInfo('Location', group_infos.location)}
        {this.renderInfo('Total field', group_infos.total_field)}
        {this.renderInfo('Total layout', group_infos.total_layout)}
        {this.renderTaskInfo(group_infos.task_infos || [])}
        {this.renderUserOnline(group_infos.user_online || [])}
      </div>
    );
  }
}

export default GroupItem;
