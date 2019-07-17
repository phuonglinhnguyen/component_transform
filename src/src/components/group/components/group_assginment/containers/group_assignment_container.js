import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import GroupAssignmentComponent from "../components/group_assignment_component";
import * as actions from "../actions";
import ProcessingComponent from '../../../../common/snackbars/containers/common_processing_container';


import { Translate } from 'react-redux-i18n';
import muiThemeable from 'material-ui/styles/muiThemeable';

const GroupAssignmentContainer = props =>
  <div>
    <ProcessingComponent muiTheme={props.muiTheme} Translate={Translate} />
    <GroupAssignmentComponent {...props} />
  </div>;

GroupAssignmentContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group_assignment: state.group_assignment,

});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...actions
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(GroupAssignmentContainer));
