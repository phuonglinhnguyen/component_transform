import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Layout from '../components/layout';

import { sidebarSelectType } from '../actions/layout_action'
import { handleLogout as handleLogoutAction } from '../../login/actions/login_action';
import { getProjectById } from '../../project/actions/project_item_action';

const LayoutContainer = (props) => (
    <Layout {...props} />
)

const mapStateToProps = state => {
    return {
        layout: state.layout,
        current_user: state.current_user,
        project_item: state.project.project_item
    }
}
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        sidebarSelectType,
        getProjectById,
        handleLogoutAction
    }, dispatch)
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutContainer)

