import React, { Component } from 'react';
import { connect } from 'react-redux'
import ExportConfiguration from '../components/export_configuration'
import ioExportAction from '../action_creators/io_export_action_creators';
import { bindActionCreators } from 'redux';
import { saveFileJSON } from '../../../../../utils/common/file_io';

class IOConfigurationExport extends Component {

    componentWillMount() {
        const { actions, io_configurations_export, match } = this.props;
        const info = { io_configurations_export, projectId: match.params.projectid };
        actions.fetchCountIfNeeded(info);
    }
    componentWillReceiveProps(nextProps) {
        const { actions, io_configurations_export, match } = nextProps;
        const info = { io_configurations_export, projectId: match.params.projectid };
        actions.fetchCountIfNeeded(info);
        let ioThis = this.props.io_configurations_export;
        if (ioThis.isFetchingExport && !io_configurations_export.isFetchingExport && io_configurations_export.dataExport) {
            saveFileJSON(`${info.projectId}_configurations.json`, io_configurations_export.dataExport);
            actions.downloadedExport();
        }
    }
    componentWillUnmount() {
        const { actions } = this.props;
        actions.reset();
    }

    render() {
        return (
            <ExportConfiguration {...this.props} projectId={this.props.match.params.projectid} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        io_configurations_export: state.project.io_configurations.io_configurations_export,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({ ...ioExportAction }, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IOConfigurationExport)