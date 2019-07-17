import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import NavMain from './nav_main';

import { I18n } from 'react-redux-i18n';

class Sidebar extends React.Component {
  handleSelectNavMain(value) {
    this.props.history.push(value);
  }
  render() {
    return (
      <aside>
        <NavMain
          I18n={I18n}
          handleSelectNavMain={this.handleSelectNavMain.bind(this)}
          {...this.props}
        />
      </aside>
    );
  }
}

Sidebar.propTypes = {
  location: PropTypes.object,
  sidebarColor: PropTypes.string,
  handleSelectNavMain: PropTypes.func,

};

export default withRouter(Sidebar);
