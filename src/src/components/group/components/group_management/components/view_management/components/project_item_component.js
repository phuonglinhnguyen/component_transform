import React from 'react';

import Avatar from 'material-ui/Avatar';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import { ListItem } from 'material-ui/List';

import PriorityIcon from 'material-ui/svg-icons/content/report';
import TaskIcon from 'material-ui/svg-icons/action/assignment';
import UserIcon from 'material-ui/svg-icons/social/person-outline';

import { isEqual } from 'lodash';
const styles = {
  card_title: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: '6px 0px 6px 16px'
  },
  avatar_style: {
    margin: '-1px 8px 0px -9px'
  },
  padding: '16px 16px 0px 64px'
};
class ProjectItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  handleExpandChange = expanded => {
    this.setState({ expanded: expanded });
  };

  shouldComponentUpdate(nextProps, nextState) {
    for (let key_state in nextState) {
      if (nextState.hasOwnProperty(key_state)) {
        if (!isEqual(this.state[key_state], nextState[key_state])) {
          return true;
        }
      }
    }
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
    return false;
  }
  render() {
    const {
      Translate,
      action_redirectProject,
      action_selectProject,
      data,
      is_selected,
      muiTheme
    } = this.props;
    const { expanded } = this.state;
    const {
      primary1Color,
      alternateTextColor,
      secondaryTextColor,
      textColor
    } = muiTheme.palette;
    return (
      <Card
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
        containerStyle={{
          boxShadow: is_selected ? `#bdbdbd 0px 0px 12px 3px` : null
        }}
        style={{
          border: data.highlight ? '3px solid #FF5722' : null,
          backgroundColor: is_selected ? primary1Color : alternateTextColor,
          cursor: 'pointer',
          margin: 10,
          transition: '0s',
          width: 350,
          userSelect: 'none'
        }}
        onDoubleClick={() => {
          action_redirectProject(
            `/production-admin/${data.id}/project-monitor`
          );
        }}
        onClick={() => action_selectProject(data.id)}
      >
        <CardHeader
          avatar={
            <Avatar
              backgroundColor={alternateTextColor}
              color={primary1Color}
              style={{ margin: '-11px 8px 0px 0px' }}
            >
              {data.name.substring(0, 1)}
            </Avatar>
          }
          actAsExpander={true}
          showExpandableButton={true}
          style={{ padding: '16px 16px 5px 8px' }}
          title={data.name}
          subtitle={
            expanded ? (
              ''
            ) : (
              <Translate
                value="groups.total_tasks_unexpand"
                total={data.total_task}
                dangerousHTML
              />
            )
          }
          titleStyle={{
            color: is_selected ? alternateTextColor : textColor,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: 250
          }}
          subtitleStyle={{
            color: is_selected ? alternateTextColor : secondaryTextColor
          }}
        />
        <CardActions expandable={true} style={styles.card_title}>
          <ListItem
            disabled={true}
            leftIcon={<TaskIcon color={primary1Color} />}
            primaryText={
              <Translate
                value="groups.remaining_tasks"
                total={data.total_task}
                dangerousHTML
              />
            }
            style={{ color: secondaryTextColor }}
          />
          <ListItem
            disabled={true}
            leftIcon={<PriorityIcon color={primary1Color} />}
            primaryText={
              <Translate
                value="groups.priority_status"
                total={data.priority}
                dangerousHTML
              />
            }
            style={{ color: secondaryTextColor }}
          />
          <ListItem
            disabled={true}
            leftIcon={<UserIcon color={primary1Color} />}
            primaryText={
              <Translate
                value="groups.online_users"
                total={data.user_online.length || 0}
                dangerousHTML
              />
            }
            style={{ color: secondaryTextColor }}
          />
        </CardActions>
      </Card>
    );
  }
}

export default ProjectItem;
