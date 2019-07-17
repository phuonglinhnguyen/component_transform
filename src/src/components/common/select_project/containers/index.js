import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SelectProjectComponent from "../components";
import { getList, resetStateSelectProject, selectProjectItem } from "../actions/select_project_action";

import ProcessingComponent from '../../../common/snackbars/containers/common_processing_container';



import { Translate } from 'react-redux-i18n';
import muiThemeable from 'material-ui/styles/muiThemeable';
const SelectProjectContainer = props =>
    <div>
        <ProcessingComponent muiTheme={props.muiTheme} Translate={Translate} />
        <SelectProjectComponent {...props} />
    </div>;

SelectProjectContainer.propTypes = {
    actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    select_project: state.common.select_project

});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            getList, resetStateSelectProject, selectProjectItem

        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(SelectProjectContainer));
