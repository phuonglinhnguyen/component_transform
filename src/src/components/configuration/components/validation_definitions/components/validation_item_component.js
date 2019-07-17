import React from 'react';
import PropTypes from 'prop-types';

import Subheader from 'material-ui/Subheader';

import ValidationPreview from './validation_item_preview_component';
import ValidationInfos from './validation_item_infos_component';
import ActionButtonsComponent from '../../common/action_buttons';
import ConfirmDialogComponent from '../../common/confirm_dialog';
import LoadingComponent from '../../../../common/ajax/load_page/circle';
import CallAjaxContainer from '../../../../common/ajax/call_ajax/containers/call_ajax_container';

import * as validation_constants from '../constants/validation_constants';
import { Translate } from 'react-redux-i18n';

class ValidationItem extends React.Component {
  constructor(props) {
    super(props);

    this.modifyData = this.modifyData.bind(this);
    this.saveData = this.saveData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  componentDidMount() {
    this.props.actions.getValidationById(this.props.match.params.validationDefinitionId);
  }

  componentWillUnmount() {
    this.props.actions.resetStateValidationItem();
  }

  getRedirectUrl() {
    const url = this.props.match.url;
    return url.substring(0, url.lastIndexOf('/'));
  }

  modifyData(name, value) {
    this.props.actions.modifyValidation(name, value);
  }

  saveData() {
    const validationId = this.props.match.params.validationDefinitionId;
    if (validationId === 'new') {
      this.props.actions.createValidation(this.props.validation_item.data);
    } else {
      this.props.actions.patchValidation(
        this.props.validation_item.data,
        validationId
      );
    }
  }

  deleteData() {
    const redirect_url = this.getRedirectUrl();
    const { history } = this.props;

    this.props.actions.deleteValidation(() => {
      history.push(redirect_url);
    });
  }

  render() {
    const {
      ajax_call_ajax,
      validation_item,

      actions,
      default_props
    } = this.props;

    if (validation_item.is_fetching) {
      return <LoadingComponent />;
    }

    const {
      is_create,
      is_error,
      title_confirm,
      show_confirm,

      data,

      error_field_name
    } = validation_item;

    const label = is_create
      ? 'commons.actions.save_and_create'
      : 'commons.actions.update';
    return (
      <div className="two_column" style={{width: "100%"}}>
        <div className="column_left">
          <ActionButtonsComponent
            ajax_call_ajax={ajax_call_ajax}
            saveData={this.saveData}
            deleteData={actions.showConfirmDelete}
            is_error={is_error}
            edit_label={<Translate value={label} />}
            delete_label={<Translate value={'commons.actions.delete'} />}
            render_delete_button={!is_create}
          />

          <div className="data_content">
            <ValidationInfos
              default_props={default_props}
              validation_constants={validation_constants}
              label_error={error_field_name}
              validation={data}
              Translate={Translate}
              modifyData={this.modifyData}
            />
          </div>

          <CallAjaxContainer />

          <ConfirmDialogComponent
            open={show_confirm}
            title={title_confirm}
            actionDelete={this.deleteData}
            hideDialog={actions.hideConfirmDelete}
          />
        </div>
        <div className="column_right">
          <Subheader>
            {
              <Translate
                value={`configurations.validation_definitions.validation_preview`}
              />
            }
          </Subheader>
          <ValidationPreview
            default_props={default_props}
            muiTheme={this.props.muiTheme}
            Translate={Translate}
            validation={data}
            error={null}
          />
        </div>
      </div>
    );
  }
}


export default ValidationItem;
