import React from 'react';

// import GroupSearchComponent from './group_search_component';
import ProjectZoneComponent from './project_zone_component';
import StatisticComponent from './statistic_detail_component_2';

import { isEqual } from 'lodash';

var timeoutKeyCode;
class ViewManagement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      str_keysearch: ''
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    if (!this.props.action_getStatus()) {
      return;
    }
    clearTimeout(timeoutKeyCode);
    const keyCode = event.key;
    let value = `${this.state.str_keysearch}${keyCode}`;
    this.setState({
      str_keysearch: value
    });
    this.props.action_filterProject(value);
    timeoutKeyCode = setTimeout(() => {
      this.props.action_filterProject(value, true);
      this.setState({
        str_keysearch: ''
      });
    }, 2500);
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyDown);
  }

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
      action_changeOrderSetting,
      action_clickOutside,
      action_getStatus,
      action_redirectProject,
      action_selectProject,
      child_projects = [],
      history,
      id_selected,
      is_open_details,
      is_open_group_tree,
      muiTheme,
      order_by,
      order_key,
      statistic_detail
    } = this.props;
    const { str_keysearch } = this.state;
    // if (child_projects.length === 0 && child_groups.length === 0) {
    //   return (
    //     <div
    //       style={{
    //         height: 800,
    //         display: 'flex',
    //         flexWrap: 'Wrap',
    //         alignItems: 'center',
    //         justifyContent: 'center'
    //       }}
    //     >
    //       {'Use the "New" button to add'}
    //     </div>
    //   );
    // }
    let details = is_open_details ? 20 : 0;
    let group_tree = is_open_group_tree ? 15 : 0;

    return (
      <div>
        <SearchTextComponent str_keysearch={str_keysearch} />
        {/* <GroupSearchComponent muiTheme={muiTheme} child_projects={child_projects}/> */}
        <StatisticComponent
          Translate={Translate}
          parent_width={100 - details - group_tree}
          muiTheme={muiTheme}
          statistic_detail={statistic_detail}
        />
        <ProjectZoneComponent
          Translate={Translate}
          action_clickOutside={e => {
            if (
              action_getStatus() &&
              (e.clientX < window.innerWidth * 4 / 5 || !is_open_details) &&
              e.clientY > 116
            ) {
              action_clickOutside();
            }
          }}
          action_changeOrderSetting={action_changeOrderSetting}
          action_redirectProject={url => action_redirectProject(url, history)}
          action_selectProject={action_selectProject}
          datas={child_projects}
          id_selected={id_selected}
          muiTheme={muiTheme}
          order_by={order_by}
          order_key={order_key}
        />
      </div>
    );
  }
}

class SearchTextComponent extends React.Component {
  render() {
    const { str_keysearch } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          left: 'calc(100vw /3)',
          position: 'fixed',
          top: 0,
          color: 'aliceblue',
          width: 'calc(100vw /3)',
          textDecoration: 'underline',
          zIndex: 1111,
          fontSize: 50
        }}
      >
        <div>{str_keysearch}</div>
      </div>
    );
  }
}

export default ViewManagement;
