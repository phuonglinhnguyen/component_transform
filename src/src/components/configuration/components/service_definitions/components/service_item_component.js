import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';

import ServiceInfos from './service_item_infos_component';
import ActionButtonsComponent from '../../common/action_buttons';
import ConfirmDialogComponent from '../../common/confirm_dialog';
import LoadingComponent from '../../../../common/ajax/load_page/circle';
import CallAjaxContainer from '../../../../common/ajax/call_ajax/containers/call_ajax_container';

import * as service_constants from '../constants/service_constants';
import { Translate } from 'react-redux-i18n';

class ServiceItem extends React.Component {
  constructor(props) {
    super(props);

    this.modifyData = this.modifyData.bind(this);
    this.saveData = this.saveData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.deleteParameter = this.props.actions.deleteParameter.bind(this);
  }

  componentDidMount() {
    this.props.actions.getServiceById(this.props.match.params.serviceDefinitionId);
  }

  componentWillUnmount() {
    this.props.actions.resetStateServiceItem();
  }

  getRedirectUrl() {
    const url = this.props.match.url;
    return url.substring(0, url.lastIndexOf('/'));
  }

  modifyData(name, value) {
    this.props.actions.modifyService(name, value);
  }

  saveData() {
    const serviceId = this.props.match.params.serviceDefinitionId;
    if (serviceId === 'new') {
      this.props.actions.createService(this.props.service_item.data);
    } else {
      this.props.actions.patchService(this.props.service_item.data, serviceId);
    }
  }

  deleteData() {
    const redirect_url = this.getRedirectUrl();
    const { history } = this.props;

    this.props.actions.deleteService(() => {
      history.push(redirect_url);
    });
  }

  render() {
    const {
      ajax_call_ajax,
      service_item,

      actions,
      default_props,
      muiTheme
    } = this.props;

    if (service_item.is_fetching) {
      return <LoadingComponent />;
    }

    const {
      is_create,
      is_error,
      title_confirm,
      show_confirm,

      data,

      error_field_name
    } = service_item;

    const label = is_create
      ? 'commons.actions.save_and_create'
      : 'commons.actions.update';
    return (
      <div
        className="special_scroll"
        style={{
          width: "100%",
          display: 'flex',
          overflowY: 'auto',
          height: 'calc(100vh - 112px)'
        }}
      >
        <div style={{ flex: '0 0 15%' }} />
        <div style={{ flex: '0 0 70%' }}>
          <ActionButtonsComponent
            ajax_call_ajax={ajax_call_ajax}
            saveData={() => {
              if (this.refs['service_infos'].getStatusError()) {
                return;
              }
              this.saveData();
            }}
            deleteData={actions.showConfirmDelete}
            is_error={is_error}
            edit_label={<Translate value={label} />}
            delete_label={<Translate value={'commons.actions.delete'} />}
            render_delete_button={!is_create}
          />
          <Paper>
            <ServiceInfos
              ref="service_infos"
              default_props={default_props}
              service_constants={service_constants}
              label_error={error_field_name}
              service={data}
              Translate={Translate}
              muiTheme={muiTheme}
              action_modifyData={this.modifyData}
              action_deleteParameter={this.deleteParameter}
            />
          </Paper>
          <CallAjaxContainer />
          <ConfirmDialogComponent
            open={show_confirm}
            title={title_confirm}
            actionDelete={this.deleteData}
            hideDialog={actions.hideConfirmDelete}
          />
        </div>
      </div>
    );
  }
}


export default ServiceItem;
