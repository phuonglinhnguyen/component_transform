import React from 'react';

import { CardHeader } from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import { isEqual } from 'lodash';
import {
  GROUP_STATISTIC_TOTAL_GROUPS,
  GROUP_STATISTIC_TOTAL_PROJECT,
  GROUP_STATISTIC_TOTAL_TASKS,
  GROUP_STATISTIC_TOTAL_WORKING_USER
} from '../../../constants/group_management_constant';

import GroupIcon from 'material-ui/svg-icons/file/folder-open';
import ProjectIcon from 'material-ui/svg-icons/content/inbox';
import TaskIcon from 'material-ui/svg-icons/action/assignment';
import UserIcon from 'material-ui/svg-icons/social/person-outline';

class StatisticDetails extends React.Component {
  shouldComponentUpdate(nextProps) {
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
    const { Translate, muiTheme, parent_width, statistic_detail } = this.props;
    const width_plus = window.innerWidth * parent_width / 500;
    return (
      <Paper zDepth={1} style={{ display: 'flex' }}>
        <div
          style={{
            flex: '1'
          }}
        />
        <StatisticItem
          Icon={GroupIcon}
          backgroundColor={muiTheme.palette.statistical1Color}
          secondaryTextColor={muiTheme.palette.secondaryTextColor}
          subtitle={statistic_detail[GROUP_STATISTIC_TOTAL_GROUPS] || 0}
          textColor={muiTheme.palette.textColor}
          title={<Translate value={`groups.total_groups`} />}
          width_plus={width_plus}
        />
        <StatisticItem
          Icon={ProjectIcon}
          backgroundColor={muiTheme.palette.statistical2Color}
          secondaryTextColor={muiTheme.palette.secondaryTextColor}
          subtitle={statistic_detail[GROUP_STATISTIC_TOTAL_PROJECT] || 0}
          textColor={muiTheme.palette.textColor}
          title={<Translate value={`groups.total_projects`} />}
          width_plus={width_plus}
        />
        <StatisticItem
          Icon={TaskIcon}
          backgroundColor={muiTheme.palette.statistical3Color}
          secondaryTextColor={muiTheme.palette.secondaryTextColor}
          subtitle={statistic_detail[GROUP_STATISTIC_TOTAL_TASKS] || 0}
          textColor={muiTheme.palette.textColor}
          title={<Translate value={`groups.total_tasks`} />}
          width_plus={width_plus}
        />
        <StatisticItem
          Icon={UserIcon}
          backgroundColor={muiTheme.palette.statistical4Color}
          secondaryTextColor={muiTheme.palette.secondaryTextColor}
          subtitle={statistic_detail[GROUP_STATISTIC_TOTAL_WORKING_USER] || 0}
          textColor={muiTheme.palette.textColor}
          title={<Translate value={`groups.total_working_users`} />}
          width_plus={width_plus}
          no_border={true}
        />
      </Paper>
    );
  }
}

class StatisticItem extends React.PureComponent {
  render() {
    const {
      Icon,
      backgroundColor,
      secondaryTextColor,
      subtitle,
      textColor,
      title,
      width_plus,
      no_border = false
    } = this.props;
    return (
      <div
        style={{
          margin: 10,
          display: 'flex',
          width: width_plus,
          height: width_plus / 4,
          userSelect: 'none',
          borderRight: no_border ? null : '2px solid ' + secondaryTextColor
        }}
      >
        <div
          style={{
            alignItems: 'center',
            width: width_plus / 4 + 5,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Icon
            color={backgroundColor}
            style={{
              width: width_plus / 5,
              height: width_plus / 5
            }}
          />
        </div>
        <CardHeader
          style={{ paddingTop: width_plus / 12 - 10 }}
          subtitle={subtitle}
          subtitleStyle={{
            color: textColor,
            fontSize: width_plus / 10
          }}
          textStyle={{ width: '100%' }}
          title={title}
          titleStyle={{ color: secondaryTextColor }}
        />
      </div>
    );
  }
}

export default StatisticDetails;
