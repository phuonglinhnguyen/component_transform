import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProjectItem from '../components/project_item';
import DialogContainer from '../../common/dialog/containers/dialog_container';

import { Translate } from 'react-redux-i18n';

import * as project_item_actions from '../actions/project_item_action';
import * as project_group_actions from '../actions/project_group_action'
import * as project_list_actions from '../actions/project_list_action';
import { setDialog, resetDialog } from '../../common/dialog/actions/dialog_common_action';
import muiThemeable from 'material-ui/styles/muiThemeable';

const ProjectItemContainer = props =>
  <div>
    <ProjectItem {...props} detailSource={true} />
    <DialogContainer Translate={Translate} />
  </div>;

ProjectItemContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project_breadcrumbs: state.project.project_breadcrumbs,
  project_item: state.project.project_item,
  project_group: state.project.project_group
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {

      ...project_item_actions,
      ...project_list_actions,
      ...project_group_actions,
      setDialog,
      resetDialog
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(
  muiThemeable()(ProjectItemContainer)
);
