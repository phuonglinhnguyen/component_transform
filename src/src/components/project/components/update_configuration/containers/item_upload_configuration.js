import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Translate } from "react-redux-i18n";
import { isEqual } from 'lodash';
import Button from '@material-ui/core/Button';

import Wrapper from '../../../../common/layout/wrapper';
import FormValdation from '../../../../common/form_validation';
import Form from '../components/form_configuration';
import _itemUploadConfigurationActions from '../actions/item_upload_configuration_actions';
import { getFieldValidate } from '../actions';
import { Notification, NotifyActions } from '../../../../common/notification';
import Loading from '../../../../common/loading';
import { testConnection, resetTestConnection } from '../actions/upload_connection_actions';
const FormVali = FormValdation(Form);
class ItemUploadContainer extends Component {
    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
    };
    shouldComponentUpdate(nextProps) {
        let shouldUpdate = !isEqual(this.props, nextProps);
        return shouldUpdate;
    }
    componentWillMount() {
        const { actions, item_upload_configuration, match } = this.props;
        const { config_id } = match.params;
        if (config_id !== 'create') {
            actions.fetchIfNeeded({ item_upload_configuration, config_id });
        }
    }
    componentWillReceiveProps(nextProps) {
        const { actions, item_upload_configuration, match, redirect, history } = nextProps;
        const { config_id, projectid } = match.params;
        if (redirect.goto.length) {
            history.push(`/projects/${projectid}/upload-configurations`)
        } else
            if (config_id !== 'create') {
                // actions.fetchIfNeeded({ item_upload_configuration, config_id });
            }
    }
    componentWillUnmount() {
        const { actions, notifyActions } = this.props;
        actions.reset();
        actions.resetGoto();
        notifyActions.removeMessage();
    }
    render() {
        const { item_upload_configuration, actions, notifyActions, connectionActions, match } = this.props;
        const { projectid } = match.params
        const { muiTheme } = this.context;
        let type = item_upload_configuration.item['type'];
        let fieldsValidation = getFieldValidate(type);
        if (item_upload_configuration.isFetching) {
            return <div > <Notification /><Loading /></div>
        } else
            return (
                <Wrapper muiTheme={muiTheme} offset={{ top: 112 }} >
                    <Notification />

                    <FormVali
                        muiTheme={muiTheme}
                        recordsInput={[item_upload_configuration.item]}
                        fieldsValidation={fieldsValidation}
                        onChangeField={actions.changeField}
                        saveConfig={actions.saveConfig}
                        updateConfig={actions.updateConfig}
                        deleteConfig={actions.deleteConfig}
                        notifyActions={notifyActions}
                        item_upload_configuration={item_upload_configuration}
                        testConnection={connectionActions.testConnection}
                        projectId={projectid}
                        Translate={Translate}
                    />
                </Wrapper>
            );
    }
}
function mapStateToProps(state) {
    const { item_upload_configuration, redirect } = state.project.upload_configuration;
    const pathname = state.router.location.pathname;

    return {
        item_upload_configuration,
        redirect,
        pathname,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ..._itemUploadConfigurationActions }, dispatch),
        notifyActions: bindActionCreators({ ...NotifyActions }, dispatch),
        connectionActions: bindActionCreators({ testConnection, resetTestConnection }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemUploadContainer);
