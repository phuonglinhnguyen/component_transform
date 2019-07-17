import React from 'react';
import PropTypes from 'prop-types';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';

import ActionBuild from 'material-ui/svg-icons/action/build';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';

import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Panorama from 'material-ui/svg-icons/image/panorama';
import FolderIcon from 'material-ui/svg-icons/file/folder';

import * as constants from '../../constants/index';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import _ from 'lodash';

class NavMain extends React.Component {
  handleSelectNavMain(value) {
    this.props.handleSelectNavMain(value);
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <NavigationMenu />
          </IconButton>
        }
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem
          leftIcon={
            <ActionDashboard
            />
          }
          onClick={() => this.handleSelectNavMain('/home')}
          primaryText='1'
        />
       
      </IconMenu>
    );
  }
}

NavMain.propTypes = {
  handleSelectNavMain: PropTypes.func
};

export default NavMain;
