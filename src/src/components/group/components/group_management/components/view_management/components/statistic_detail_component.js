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
    const {
      Translate,
      statistic_detail,
      muiTheme,
      is_open_details
    } = this.props;
    const width_plus = is_open_details ? 100 : 0;
    return (
        <div style={{ display: 'flex' , margin : '20px 40px 10px 40px'}}>
        <StatisticItem
          Icon={GroupIcon}
          alternateTextColor={muiTheme.palette.alternateTextColor}
          backgroundColor={muiTheme.palette.statistical1Color}
          secondaryTextColor={muiTheme.palette.secondaryTextColor}
          subtitle={statistic_detail[GROUP_STATISTIC_TOTAL_GROUPS] || 0}
          textColor={muiTheme.palette.textColor}
          title={<Translate value={`groups.total_groups`} />}
          width_plus={width_plus}
        />
        <StatisticItem
          Icon={ProjectIcon}
          alternateTextColor={muiTheme.palette.alternateTextColor}
          backgroundColor={muiTheme.palette.statistical2Color}
          secondaryTextColor={muiTheme.palette.secondaryTextColor}
          subtitle={statistic_detail[GROUP_STATISTIC_TOTAL_PROJECT] || 0}
          textColor={muiTheme.palette.textColor}
          title={<Translate value={`groups.total_projects`} />}
          width_plus={width_plus}
        />
        <StatisticItem
          Icon={TaskIcon}
          alternateTextColor={muiTheme.palette.alternateTextColor}
          backgroundColor={muiTheme.palette.statistical3Color}
          secondaryTextColor={muiTheme.palette.secondaryTextColor}
          subtitle={statistic_detail[GROUP_STATISTIC_TOTAL_TASKS] || 0}
          textColor={muiTheme.palette.textColor}
          title={<Translate value={`groups.total_tasks`} />}
          width_plus={width_plus}
        />
        <StatisticItem
          Icon={UserIcon}
          alternateTextColor={muiTheme.palette.alternateTextColor}
          backgroundColor={muiTheme.palette.statistical4Color}
          secondaryTextColor={muiTheme.palette.secondaryTextColor}
          subtitle={statistic_detail[GROUP_STATISTIC_TOTAL_WORKING_USER] || 0}
          textColor={muiTheme.palette.textColor}
          title={<Translate value={`groups.total_working_users`} />}
          width_plus={width_plus}
        />
        </div>
    );
  }
}

class StatisticItem extends React.PureComponent {
  render() {
    const {
      Icon,
      alternateTextColor,
      backgroundColor,
      secondaryTextColor,
      subtitle,
      textColor,
      title,
      width_plus
    } = this.props;
    return (
      <div
        style={{
          margin: 10,
          display: 'flex',
          width: 290 + width_plus,
          height: 100 + width_plus / 2,
          userSelect: 'none'
        }}
      >
        <div
          style={{
            backgroundColor: backgroundColor,
            alignItems: 'center',
            width: 100 + width_plus / 2,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Icon
            color={alternateTextColor}
            style={{
              width: 50 + width_plus / 10,
              height: 50 + width_plus / 10
            }}
          />
        </div>
        <CardHeader
          style={{ padding: 10 }}
          subtitle={subtitle}
          subtitleStyle={{
            color: textColor,
            fontSize: 30 + width_plus / 10,
            marginTop: 5
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
