import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Translate } from 'react-redux-i18n';
import { isEqual } from 'lodash';
import Wrapper from '../../../../common/layout/wrapper';
import _ListUpdateConfigurationActions from '../actions/list_upload_configuration_actions';
import DashboardCard from '../../../../common/dashboard/chip';
import Loading from '../../../../common/loading';

class ListUploadConfiguration extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };
  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = !isEqual(this.props, nextProps);
    return shouldUpdate;
  }
  componentWillMount() {
    const { fetchIfNeeded, list_upload_configuration, match } = this.props;
    const { projectid } = match.params;
    fetchIfNeeded({ list_upload_configuration, projectId: projectid });
  }
  componentWillReceiveProps(nextProps) {
    const { fetchIfNeeded, list_upload_configuration, match } = nextProps;
    const { projectid } = match.params;
    // fetchIfNeeded({ list_upload_configuration, projectId: projectid });
  }
  componentWillUnmount() {
    const { reset } = this.props;
    reset();
  }
  handleBtnChange = (data) => {
      const { history, match } = this.props;
      const { projectid, projectId } = match.params;
      history.push(
        `/projects/${projectid || projectId}/upload-configurations/${data?data.id:'create'}`
      );
  };
  render() {
    const { list_upload_configuration } = this.props;
    if (list_upload_configuration.isFetching) {
      return <Loading />;
    } else
      return (
        <Wrapper muiTheme={this.context.muiTheme}>
          <DashboardCard
            key_value="name"
            label_total="projects.upload_configuration.upload_configuration_available"
            label_button_add="projects.upload_configuration.create_new_upload_configuration"
            addItem={this.handleBtnChange}
            datas={list_upload_configuration.items}
            Translate={Translate}
            muiTheme={this.context.muiTheme}
          />
        </Wrapper>
      );
  }
}

function mapStateToProps(state) {
  const { list_upload_configuration } = state.project.upload_configuration;
  return {
    list_upload_configuration
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ..._ListUpdateConfigurationActions }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(
  ListUploadConfiguration
);
