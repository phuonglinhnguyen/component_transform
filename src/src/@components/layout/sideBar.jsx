import React from 'react';
import PropTypes from 'prop-types';
import NavMain from './navMain';
import { getHistoryApp } from '@dgtx/coreui';

class Sidebar extends React.Component {

  handleSelectNavMain(value) {
    getHistoryApp().push(value);
  }
  render() {
    return (
      <aside>
        <NavMain
          handleSelectNavMain={this.handleSelectNavMain.bind(this)}
          {...this.props}
        />
      </aside>
    );
  }
}

Sidebar.propTypes = {
  location: PropTypes.object,
  handleSelectNavMain: PropTypes.func,
};

export default Sidebar;
