import React from 'react';
import PropTypes from 'prop-types';

import Subheader from 'material-ui/Subheader';

import TransformRulePreview from './transform_rule_item_preview_component';
import TransformRuleInfos from './transform_rule_item_infos_component';
import ActionButtonsComponent from '../../common/action_buttons';
import ConfirmDialogComponent from '../../common/confirm_dialog';
import LoadingComponent from '../../../../common/ajax/load_page/circle';
import CallAjaxContainer from '../../../../common/ajax/call_ajax/containers/call_ajax_container';

import * as transform_rule_constants from '../constants/transform_rule_constants';
import { Translate } from 'react-redux-i18n';

class TransformRuleItem extends React.Component {
  constructor(props) {
    super(props);

    this.modifyData = this.modifyData.bind(this);
    this.saveData = this.saveData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  componentDidMount() {
    this.props.actions.getTransformRuleById(this.props.match.params.ruleDefinitionId);
  }

  componentWillUnmount() {
    this.props.actions.resetStateTransformRuleItem();
  }

  getRedirectUrl() {
    const url = this.props.match.url;
    return url.substring(0, url.lastIndexOf('/'));
  }

  modifyData(name, value) {
    this.props.actions.modifyTransformRule(name, value);
  }

  saveData() {
    const transformRuleId = this.props.match.params.ruleDefinitionId;
    if (transformRuleId === 'new') {
      this.props.actions.createTransformRule(this.props.transform_rule_item.data);
    } else {
      this.props.actions.patchTransformRule(
        this.props.transform_rule_item.data,
        transformRuleId
      );
    }
  }

  deleteData() {
    const redirect_url = this.getRedirectUrl();
    const { history } = this.props;

    this.props.actions.deleteTransformRule(() => {
      history.push(redirect_url);
    });
  }

  render() {
    const {
      ajax_call_ajax,
      transform_rule_item,

      actions,
      default_props
    } = this.props;

    if (transform_rule_item.is_fetching) {
      return <LoadingComponent />;
    }

    const {
      is_create,
      is_error,
      title_confirm,
      show_confirm,

      data,

      error_field_name
    } = transform_rule_item;

    const label = is_create
      ? 'commons.actions.save_and_create'
      : 'commons.actions.update';
    return (
      <div style={{width: "100%"}} className="two_column">
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
            <TransformRuleInfos
              default_props={default_props}
              transform_rule_constants={transform_rule_constants}
              label_error={error_field_name}
              transform_rule={data}
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
                value={`configurations.transform_rule_definitions.transform_rule_preview`}
              />
            }
          </Subheader>
          <TransformRulePreview
            default_props={default_props}
            muiTheme={this.props.muiTheme}
            Translate={Translate}
            transform_rule={data}
            error={null}
          />
        </div>
      </div>
    );
  }
}


export default TransformRuleItem;
