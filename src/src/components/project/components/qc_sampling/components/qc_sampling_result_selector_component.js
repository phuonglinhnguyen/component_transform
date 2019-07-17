// @flow
import React from 'react';

import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import TableX from '../../../../common/table-x/components/table';

import lodash from 'lodash';

import { Translate } from 'react-redux-i18n';

class SelectZones extends React.Component {
  constructor(props) {
    super(props);

    this.handleCalculateAQLQuantity = this.props.actions.handleCalculateAQLQuantity.bind(
      this
    );
  }
  shouldComponentUpdate(nextProps) {
    return !lodash.isEqual(this.props, nextProps);
  }

  render() {
    const {
      sampling_results,
      is_calculated,
      datas,
      header,
      muiTheme
    } = this.props;
    const { is_calculating, is_sampling } = sampling_results;
    return (
      <Paper>
        <Toolbar style={{ backgroundColor: muiTheme.palette.backgroundColor }}>
          <ToolbarGroup firstChild={true}>
            {is_calculated ? (
              <Subheader>
                {<Translate value={`productions.production_start.results`} />}
              </Subheader>
            ) : (
              <Subheader inset={true}>
                {<Translate value={`productions.production_start.preview`} />}
              </Subheader>
            )}
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            {is_calculated ? (
              <RaisedButton
                primary={true}
                label={<Translate value={'commons.actions.get_sample'} />}
                onClick={() => this.props.actions.handleGetSample()}
              />
            ) : (
              <RaisedButton
                primary={true}
                onClick={() => this.handleCalculateAQLQuantity()}
                label={<Translate value={'commons.actions.calculate_aql'} />}
              />
            )}
          </ToolbarGroup>
        </Toolbar>
        {is_calculating || is_sampling ? (
          <LinearProgress mode="indeterminate" />
        ) : null}
        <TableX
          selectable={false}
          multiSelectable={false}
          muiTheme={muiTheme}
          datas={is_calculated ? [...sampling_results.results] : [...datas]}
          columns={is_calculated ? sampling_results.headers : header}
          paging={true}
          pagingPosition={'bottom'}
          search_keys={['batch_name', 'keyer', 'inspection']}
          tableActions={null}
          tableStyle={{
            bodyStyle: { maxHeight: '57vh' }
          }}
          searchHintText="Search"
        />
      </Paper>
    );
  }
}

export default SelectZones;
