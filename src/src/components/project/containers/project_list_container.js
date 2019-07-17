import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProjectList from '../components/project_list';

import { Translate } from 'react-redux-i18n';

import ProcessingContainer from '../../../components/common/snackbars/containers/common_processing_container';
import muiThemeable from 'material-ui/styles/muiThemeable';
import * as project_item_actions from '../actions/project_item_action';
import * as project_group_actions from '../actions/project_group_action'
import * as project_list_actions from '../actions/project_list_action';
const ProjectListContainer = props =>
  <section className="without-tabs" role="main">
    <ProjectList {...props} />
    <ProcessingContainer muiTheme={props.muiTheme} Translate={Translate} />
  </section>;

ProjectListContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project_list: state.project.project_list,
  project_item: state.project.project_item,
  project_group: state.project.project_group
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...project_item_actions,
      ...project_list_actions,
      ...project_group_actions
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(
  muiThemeable()(ProjectListContainer)
);
