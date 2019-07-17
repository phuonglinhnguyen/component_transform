import React from "react";
import { connect } from "react-redux";

import Project from "../components/project";

import ProcessingContainer from "../../../components/common/processing/container/processing_container";

const ProjectContainer = props => (
  <React.Fragment>
    <Project {...props} />
    <ProcessingContainer />
  </React.Fragment>
);

const mapStateToProps = state => ({
  project_breadcrumbs: state.project.project_breadcrumbs,
  project_list: state.project.project_list,
  current_user: state.current_user
});

export default connect(mapStateToProps)(ProjectContainer);
