import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../../../common/loading';
import { withRouter } from 'react-router'

import DashboardCard from '../../../../common/dashboard/chip';

import * as export_configuration_constants from '../constants/export_configuration_constants';

class ExportConfigurationList extends React.Component {
  componentWillMount() {
    this.props.actions.getList(this.props.match.params.projectid);
  }

  componentWillUnmount() {
    this.props.actions.resetStateExportConfigurationList();
    this.props.actions.closeSnackbar();
  }

  addItem(data , index) {
    const { history, match } = this.props;
    if(index === undefined){
      history.push(`${match.url}/new`);
    }else{
      history.push(`${match.url}/${index}`);
    }
  }

  render() {
    const { I18n, Translate, datas, is_fetching, muiTheme } = this.props;

    if (is_fetching) {
      return <div > <Loading /></div>
    }

    return (
      <DashboardCard
        I18n={I18n}
        Translate={Translate}
        muiTheme={muiTheme}
        addItem={this.addItem.bind(this)}
        datas={datas}
        deleteItem={() => undefined}
        label_button_add="projects.export_configuration.create_new_config"
        label_text_search="commons.hint_text.search"
        label_total="projects.export_configuration.configs_available"
        key_value={export_configuration_constants.KEY_EXPORT_CONFIGURATION_NAME}
      />
    );
  }
}
ExportConfigurationList.propTypes = {
  I18n: PropTypes.object,
  Translate: PropTypes.func,

  datas: PropTypes.array
};


export default withRouter(ExportConfigurationList);
