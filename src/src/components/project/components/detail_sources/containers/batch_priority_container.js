import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import BatchPriorityComponent from "../components/batch_priority_component";

import { getProjectById, updateProject } from "../../../actions/project_item_action";

const BatchPriorityContainer = props =>
    <BatchPriorityComponent {...props} />


BatchPriorityContainer.propTypes = {
    actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project_item: state.project.project_item
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            getProjectById, updateProject
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(BatchPriorityContainer);
