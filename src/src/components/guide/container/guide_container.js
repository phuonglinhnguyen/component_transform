import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GuideComponent from '../components/gui_component';

import UploadProcessing from '../../common/snackbars/containers/common_processing_container';

import { Translate } from 'react-redux-i18n';
import { getList as getListProjects } from '../../project/actions/project_list_action'
import { getProjectGuides, download } from '../../production_administration/components/project_guide/action/project_guide_actions'
import muiThemeable from 'material-ui/styles/muiThemeable';

const GuideContainer = props =>
    <section className="without-tabs" role="main">

        <UploadProcessing muiTheme={props.muiTheme} Translate={Translate} />

        <GuideComponent muiTheme={props.muiTheme} Translate={Translate} {...props} />
    </section>;

const mapStateToProps = state => {

    return {
        project_guide: state.production_admin.project_guide,
        project_list: state.project.project_list,

    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            getListProjects,
            getProjectGuides,
            download
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(
    muiThemeable()(GuideContainer)
);
