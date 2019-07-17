import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LayoutsComponent from '../components/layouts_component';

import {
    getListLayouts,
    resetStateDetailSources
} from '../action';

const LayoutsContainer = props =>
    <LayoutsComponent {...props} />



LayoutsContainer.propTypes = {
    actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    layouts: state.project.detail_sources.layouts
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            getListLayouts,
            resetStateDetailSources
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(
    (LayoutsContainer)
);
