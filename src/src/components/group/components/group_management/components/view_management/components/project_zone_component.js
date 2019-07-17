import React from 'react';

import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Subheader from 'material-ui/Subheader';

import ArrowDownIcon from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUpIcon from 'material-ui/svg-icons/navigation/arrow-upward';
import ProjectItem from './project_item_component';

import { isEqual } from 'lodash';

import ClickOutside from 'react-click-outside';

import {
  GROUP_MANAGEMENT_ORDER_BY_ASC,
  GROUP_MANAGEMENT_ORDER_BY_DESC,
  GROUP_MANAGEMENT_ORDER_KEY_CREATED_DATE,
  GROUP_MANAGEMENT_ORDER_KEY_NAME,
  GROUP_MANAGEMENT_ORDER_KEY_PRIORITY,
  GROUP_MANAGEMENT_ORDER_KEY_TOTAL_TASK,
} from '../../../constants/group_management_constant';

class ProjectZone extends React.Component {
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
      action_changeOrderSetting,
      action_clickOutside,
      action_redirectProject,
      action_selectProject,
      datas = [],
      id_selected,
      muiTheme,
      order_by,
      order_key
    } = this.props;
    if (datas.length === 0) {
      return null;
    }
    const reverse_order =
      order_by === GROUP_MANAGEMENT_ORDER_BY_ASC
        ? GROUP_MANAGEMENT_ORDER_BY_DESC
        : GROUP_MANAGEMENT_ORDER_BY_ASC;
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        <Subheader style={{ flex: '1 1 80%', userSelect: 'none' }}>
          <Translate value={'groups.title_project'} />
        </Subheader>
        <div style={{ flex: '1 1 20%', display: 'flex' }}>
          <SelectField
            fullWidth={true}
            floatingLabelText=""
            value={order_key || GROUP_MANAGEMENT_ORDER_KEY_NAME}
            onChange={(event, index, value) =>
              action_changeOrderSetting(order_by, value)
            }
          >
            <MenuItem
              value={GROUP_MANAGEMENT_ORDER_KEY_NAME}
              primaryText={<Translate value={'groups.sort_key_name'} />}
            />
            <MenuItem
              value={GROUP_MANAGEMENT_ORDER_KEY_PRIORITY}
              primaryText={<Translate value={'groups.sort_key_priority'} />}
            />
            <MenuItem
              value={GROUP_MANAGEMENT_ORDER_KEY_CREATED_DATE}
              primaryText={<Translate value={'groups.sort_key_created_date'} />}
            />
            <MenuItem
              value={GROUP_MANAGEMENT_ORDER_KEY_TOTAL_TASK}
              primaryText={<Translate value={'groups.sort_key_remain_task'} />}
            />
          </SelectField>
          <IconButton
            onClick={() => action_changeOrderSetting(reverse_order, order_key)}
            tooltip={<Translate value={'groups.reverse_sort_button'} />}
            tooltipPosition="bottom-left"
          >
            {order_by === GROUP_MANAGEMENT_ORDER_BY_ASC ? (
              <ArrowUpIcon color={muiTheme.palette.secondaryTextColor} />
            ) : (
              <ArrowDownIcon color={muiTheme.palette.secondaryTextColor} />
            )}
          </IconButton>
        </div>
        {datas.map((data, index) => {
          if (!data.show) {
            return null;
          }
          return (
            <ClickOutside
              key={`key-group-item-${index}`}
              onClickOutside={e => {
                if (id_selected === data.id) {
                  action_clickOutside(e);
                }
              }}
              style={{ height: '100%' }}
            >
              <ProjectItem
                Translate={Translate}
                action_redirectProject={action_redirectProject}
                action_selectProject={action_selectProject}
                data={data}
                is_selected={id_selected === data.id}
                key={`key-group-item-${index}`}
                muiTheme={muiTheme}
              />
            </ClickOutside>
          );
        })}
      </div>
    );
  }
}

export default ProjectZone;
