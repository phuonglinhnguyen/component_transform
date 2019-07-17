// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import { GridList } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

import QCSamplingFilter from './qc_sampling_conditions_selector_component';
import QCSamplingReview from './qc_sampling_result_selector_component';

import Loading from '../../../../common/loading';
import default_props from '../../../../common/default_props';

import lodash from 'lodash';

class SelectZones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body_height: 0
    };
  }
  componentDidMount() {
    this.props.actions.getFilterAttributes(this.props.match.params.projectid);
  }
  componentWillReceiveProps() {
    let nodeStyle = null;
    if (this.refs['main-page']) {
      nodeStyle = ReactDOM.findDOMNode(this.refs['main-page']);
    }
    if (nodeStyle) {
      this.setState({
        body_height:
          window.innerHeight - nodeStyle.getBoundingClientRect().top - 2
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    const props = { ...this.props };

    for (var key in props) {
      if (props.hasOwnProperty(key) && nextProps.hasOwnProperty(key)) {
        if (
          !lodash.isEqual(props[key], nextProps[key]) &&
          typeof props[key] !== 'function' &&
          key !== 'actions'
        ) {
          return true;
        }
      }
    }
    return false;
  }

  componentWillUnmount() {
    this.props.actions.resetQCSamplingState();
  }

  render() {
    const {
      sampling_results,
      actions,
      muiTheme,
      is_fetching,
      is_calculated,
      aql_conditions
    } = this.props;
    const { body_height } = this.state;
    if (is_fetching || sampling_results.is_sampling) {
      return <Loading />;
    }
    return (
      <Paper
        ref="main-page"
        style={{
          backgroundColor: muiTheme.palette.background1Color,
          height: body_height
        }}
      >
        <GridList {...default_props.grid_list} padding={20}>
          <QCSamplingFilter
            {...lodash.omit(this.props, ['sampling_results'])}
            is_calculating={sampling_results.is_calculating}
            is_sampling={sampling_results.is_sampling}
            muiTheme={muiTheme}
          />
          <QCSamplingReview
            is_calculated={is_calculated}
            datas={aql_conditions.condition_preview}
            muiTheme={muiTheme}
            header={aql_conditions.condition_header}
            sampling_results={sampling_results}
            actions={actions}
          />
        </GridList>
      </Paper>
    );
  }
}

export default SelectZones;
