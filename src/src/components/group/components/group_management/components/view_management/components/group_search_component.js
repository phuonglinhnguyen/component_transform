import React from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

import SearchIcon from 'material-ui/svg-icons/action/search';

class GroupSearch extends React.Component {
  render() {
    const {
      child_projects,
      muiTheme,
      action_selectSearch = () => undefined
    } = this.props;

    return (
      <div
        style={{
          backgroundColor: '#eeeeee',
          display: 'flex',
          left: 'calc(100vw /3)',
          position: 'fixed',
          top: 8,
          width: 'calc(100vw /3)',
          zIndex: 1
        }}
      >
        <FontIcon style={{ margin: '12px 12px 0px 12px' }}>
          <SearchIcon />
        </FontIcon>
        <AutoComplete
          dataSource={child_projects}
          dataSourceConfig={{ text: 'name', value: 'name' }}
          fullWidth={true}
          name={'Search'}
          onNewRequest={chosenRequest => action_selectSearch(chosenRequest)}
        />
      </div>
    );
  }
}

export default GroupSearch;
