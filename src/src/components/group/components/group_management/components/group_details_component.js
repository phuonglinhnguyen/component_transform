import React from 'react';

import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ListItem from 'material-ui/List/ListItem';
import { Tabs, Tab } from 'material-ui/Tabs';

import InformationComponent from './group_information_component';

import CloseIcon from 'material-ui/svg-icons/navigation/close';
import FolderIcon from 'material-ui/svg-icons/file/folder';

import { isEqual } from 'lodash';
import { GROUP_MANAGEMENT_TYPE_GROUP } from '../constants/group_management_constant';

class DetailZone extends React.Component {
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

  renderLoading() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: 20 }}>
        <div>
          <CircularProgress />
          <br />
          <span>{'Loading...'}</span>
        </div>
      </div>
    );
  }

  render() {
    const {
      action_changePriorityProject,
      action_redirectGroup,
      action_toggleDetails,
      group_infos = {},
      is_getting_info,
      muiTheme
    } = this.props;

    return (
      <div>
        <ListItem
          disabled={true}
          leftAvatar={
            <Avatar
              backgroundColor={muiTheme.palette.alternateTextColor}
              color={muiTheme.palette.background4Color}
              icon={<FolderIcon />}
            />
          }
          style={{
            marginBottom: 10,
            marginTop: 10,
            padding: '17px 0px 0px 50px',
            width: 300
          }}
          rightIconButton={
            <IconButton
              onClick={() => action_toggleDetails(false)}
              style={{ right: -30 }}
            >
              <CloseIcon
                color={muiTheme.palette.secondaryTextColor}
                hoverColor={muiTheme.palette.textColor}
              />
            </IconButton>
          }
        >
          <FlatButton
            className="hover_button"
            disableTouchRipple={true}
            hoverColor="rgba(0, 0, 0, 0)"
            label={group_infos.name || 'Groups'}
            labelStyle={{
              textTransform: 'none',
              wordBreak: 'break-word',
              fontSize: 20,
              textAlign: 'left',
              float: 'left',
              textDecoration: 'inherit'
            }}
            onClick={() => {
              if (group_infos.type === GROUP_MANAGEMENT_TYPE_GROUP) {
                action_redirectGroup(group_infos.id || 'root');
              }
            }}
            style={{ maxWidth: 300, height: '100%', lineHeight: '25px' }}
            tooltip={group_infos.name || 'Groups'}
          />
        </ListItem>
        <Tabs
          inkBarStyle={{ backgroundColor: muiTheme.palette.primary1Color }}
          tabItemContainerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        >
          <Tab label="Details" style={{ color: 'rgba(0, 0, 0, 0.87)' }}>
            {is_getting_info ? (
              this.renderLoading()
            ) : (
              <InformationComponent
                action_changePriorityProject={action_changePriorityProject}
                group_infos={group_infos}
                muiTheme={muiTheme}
              />
            )}
          </Tab>
          <Tab label="Activity" style={{ color: 'rgba(0, 0, 0, 0.87)' }}>
            {is_getting_info ? (
              this.renderLoading()
            ) : (
              <div>
                <p>This is another example tab.</p>
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default DetailZone;
