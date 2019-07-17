import React from 'react';

import PropTypes from 'prop-types';
import { Redirect,withRouter } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import { GridList, GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

import FieldItemInfo from './field_item_info_component';
import FieldItemLookupSource from './field_item_lookup_source_component';
import FieldItemValidation from './field_item_validation_component';
import FieldItemRuleTransform from './field_item_rule_transform_component';
import FieldItemPreview from './field_item_preview_component';
import FieldItemLookupBroadcast from './field_item_broadcast_component';
import FieldItemFieldChangeBroadcast from './field_item_change_broadcast_component';
import FieldItemHandleBroadcast from './field_item_handle_broadcast_component';

import FieldDialog from '../containers/field_dialog_container';

import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowRightIcon from 'material-ui/svg-icons/av/play-arrow';

import default_props from '../../../../common/default_props';
import * as field_constant from '../constants/field_constants';
const styles = {
  icon_item: {
    height: 16,
    width: 16
  },
  icon_button: {
    height: 50,
    padding: 16,
    top: 10,
    width: 50
  },
  divider: {
    color: '#F5F5F5'
  },
  list_item: {
    borderTop: 'solid 1px #E0E0E0'
  }
};

class FieldItem extends React.Component {
  constructor(props) {
    super(props);

    this.modifyData = this.modifyData.bind(this);
    this.saveData = this.saveData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.handleChangeFieldRelated = this.props.actions.handleChangeFieldRelated.bind(
      this
    );
    this.handleOnChangeFieldTest = this.props.actions.handleOnChangeFieldTest.bind(
      this
    );
    this.handleFocusOut = this.props.actions.handleFocusOut.bind(this);
    this.changeView = this.props.actions.changeView.bind(this);
  }

  getRedirectUrl() {
    const url = this.props.match.url;
    return url.substring(0, url.lastIndexOf('/'));
  }

  componentDidMount() {
    const fieldId = this.props.match.params.fieldId;
    if (fieldId === 'new') {
      this.props.actions.getRelatedParameter(this.props.match.params.projectid);
    } else {
      this.props.actions.getFieldById(
        fieldId,
        this.props.match.params.projectid
      );
    }
  }

  componentWillUnmount() {
    this.props.actions.resetFieldItemWhenUnmount();
  }

  modifyData(key, value) {
    const field = { ...this.props.field_item.field };
    let is_error = this.props.field_item.is_error;

    field[key] = value;
    if (key === field_constant.KEY_FIELD_NAME && !value) {
      is_error = true;
    } else if (key === field_constant.KEY_FIELD_NAME && value.length > 0) {
      is_error = false;
    }
    this.props.actions.modifyField(field, is_error);
  }

  saveData() {
    const fieldId = this.props.match.params.fieldId;
    const projectId = this.props.match.params.projectid;
    let field = { ...this.props.field_item.field };

    if (fieldId === 'new') {
      field.project_id = projectId;
      this.props.actions.insertField(field);
    } else {
      this.props.actions.updateField(field, fieldId);
    }
  }

  deleteData() {
    const { field } = this.props.field_item;
    this.props.actions.setDialog({
      open_dialog: true,
      title_dialog: `Delete #Field ${field[field_constant.KEY_FIELD_NAME]}`,
      handleClickSubmit: () => {
        this.props.actions.deleteField(
          field.id,
          field[field_constant.KEY_FIELD_NAME],
          this.props.history,
          this.getRedirectUrl(),
          this.props.match.params.projectid
                );
        this.props.actions.resetDialog();
      },
      body_dialog: (
        <span>
          <this.props.Translate value={'commons.notification.are_you_sure'} />
        </span>
      ),
      label_button_dialog: 'commons.actions.delete'
    });
  }

  renderScript() {
    return (
      <GridList cols={1} cellHeight="auto">
        <TextField floatingLabelText={'input script here'} />
        <SelectField floatingLabelText="Separated by">
          <MenuItem value={1} primaryText=";" />
          <MenuItem value={2} primaryText="," />
        </SelectField>
      </GridList>
    );
  }

  render() {
    const { field, is_fetching, view_mode } = this.props.field_item;

    const {
      I18n,
      Translate,

      is_error,
      is_redirect,
      field_preview,

      list_field,
      list_pattern,
      list_validation,
      list_lookup,
      rule_transforms,

      lookup_selector,
      muiTheme
    } = this.props;

    if (is_error && is_redirect) {
      return <Redirect to={this.getRedirectUrl()} />;
    }

    if (is_fetching) {
      return <div />;
    }
    const fieldId = this.props.match.params.fieldId;
    const label =
      fieldId === 'new'
        ? 'commons.actions.save_and_create'
        : 'commons.actions.update';
    const error_text_field_name = this.props.field_item.is_error
      ? I18n.t('projects.field_value_definitions.this_field_is_required')
      : '';
    return (
      <GridList cols={12} cellHeight={'auto'} style={{ marginTop: 5}}>
        <GridTile cols={4} />
        <GridTile cols={4} rows={3}>
          <div
            style={{
              display: 'flex',
              marginBottom: 10
            }}
          >
            <div style={{ flex: 2, marginLeft: 20 }}>
              <RaisedButton
                onClick={this.saveData}
                label={<Translate value={label} />}
                primary={true}
              />
            </div>
            <div
              style={{ paddingLeft: 2, alignItems: 'right', marginRight: 20 }}
            >
              {fieldId === 'new' ? (
                <div />
              ) : (
                  <RaisedButton
                    onClick={this.deleteData}
                    secondary={true}
                    label={<Translate value={'commons.actions.delete'} />}
                  />
                )}
            </div>
          </div>
          <Paper style={{ margin: 2 }} zDepth={2}>
            {view_mode === 0 && (
              <div>
                <TextField
                  autoFocus
                  errorText={error_text_field_name}
                  {...default_props.text_field}
                  style={{ margin: 10, width: '90%', marginLeft: 30 }}
                  hintText={
                    <Translate value="projects.field_value_definitions.field_name_hint" />
                  }
                  floatingLabelText={
                    <Translate
                      dangerousHTML
                      value="projects.field_value_definitions.field_name"
                    />
                  }
                  value={field[field_constant.KEY_FIELD_NAME]}
                  onChange={e =>
                    this.modifyData(
                      field_constant.KEY_FIELD_NAME,
                      e.target.value
                    )
                  }
                  name={`${field_constant.KEY_FIELD_NAME}`}
                />
                <ListItem
                  style={styles.list_item}
                  disableKeyboardFocus={true}
                  hoverColor={'transparent'}
                  rightIconButton={
                    <IconButton
                      iconStyle={styles.icon_item}
                      style={styles.icon_button}
                      onClick={e => this.changeView(1)}
                    >
                      <ArrowRightIcon color={muiTheme.palette.accent3Color} />
                    </IconButton>
                  }
                  innerDivStyle={{ padding: '16px 0px 0px 16px' }}
                  onClick={e => this.changeView(1)}
                  primaryText={
                    <Translate
                      value={`projects.field_value_definitions.view_mode_1`}
                    />
                  }
                  secondaryText={
                    field[field_constant.KEY_CONTROL_TYPE] || 'Not defined yet'
                  }
                  secondaryTextLines={2}
                />
                <ListItem
                  style={styles.list_item}
                  disableKeyboardFocus={true}
                  hoverColor={'transparent'}
                  innerDivStyle={{ padding: '16px 0px 0px 16px' }}
                  rightIconButton={
                    <IconButton
                      iconStyle={styles.icon_item}
                      style={styles.icon_button}
                      onClick={e => this.changeView(2)}
                    >
                      <ArrowRightIcon color={muiTheme.palette.accent3Color} />
                    </IconButton>
                  }
                  onClick={e => this.changeView(2)}
                  primaryText={
                    <Translate
                      value={`projects.field_value_definitions.view_mode_2`}
                    />
                  }
                  secondaryText={
                    field[field_constant.KEY_LOOKUP_SOURCE].lookup_field ||
                    'Not defined yet'
                  }
                  secondaryTextLines={2}
                />
                <Divider style={styles.divider} />
                <FieldItemLookupBroadcast
                  Translate={Translate}
                  default_props={default_props}
                  field={field}
                  list_field={list_field}
                  modifyData={this.modifyData}
                  muiTheme={muiTheme}
                />
                  <Divider style={styles.divider} />
                  <FieldItemFieldChangeBroadcast
                    Translate={Translate}
                    default_props={default_props}
                    field={field}
                    list_field={list_field}
                    modifyData={this.modifyData}
                    muiTheme={muiTheme}
                />
                 <FieldItemHandleBroadcast
                  I18n={I18n}
                  Translate={Translate}
                  default_props={default_props}
                  field={field}
                  list_field={list_field || []}
                  modifyData={this.modifyData}
                  muiTheme={muiTheme}
                />
                <ListItem
                  style={styles.list_item}
                  disableKeyboardFocus={true}
                  hoverColor={'transparent'}
                  rightIconButton={
                    <IconButton
                      iconStyle={styles.icon_item}
                      style={styles.icon_button}
                      onClick={e => this.changeView(4)}
                    >
                      <ArrowRightIcon color={muiTheme.palette.accent3Color} />
                    </IconButton>
                  }
                  innerDivStyle={{ padding: '16px 0px 0px 16px' }}
                  onClick={e => this.changeView(4)}
                  primaryText={
                    <Translate
                      value={`projects.field_value_definitions.view_mode_4`}
                    />
                  }
                  secondaryText={
                    !field[field_constant.KEY_VALIDATION].content
                      ? 'Empty validation'
                      : 'Click to edit'
                  }
                  secondaryTextLines={2}
                />
                <ListItem
                  style={styles.list_item}
                  disableKeyboardFocus={true}
                  hoverColor={'transparent'}
                  rightIconButton={
                    <IconButton
                      iconStyle={styles.icon_item}
                      style={styles.icon_button}
                      onClick={e => this.changeView(5)}
                    >
                      <ArrowRightIcon color={muiTheme.palette.accent3Color} />
                    </IconButton>
                  }
                  innerDivStyle={{ padding: '16px 0px 0px 16px' }}
                  onClick={e => this.changeView(5)}
                  primaryText={
                    <Translate
                      value={`projects.field_value_definitions.view_mode_5`}
                    />
                  }
                  secondaryText={
                    !field[field_constant.KEY_RULE_TRANSFORM].content
                      ? 'Empty rule transform'
                      : 'Click to edit'
                  }
                  secondaryTextLines={2}
                />
              </div>
            )}
            {view_mode !== 0 && (
              <div
                style={{
                  display: 'flex',
                  marginBottom: 10
                }}
              >
                <IconButton onClick={() => this.changeView(0)}>
                  <ArrowBackIcon color="rgba(0, 0, 0, 0.54)" />
                </IconButton>
                <Subheader>
                  <Translate
                    value={`projects.field_value_definitions.view_mode_${
                      view_mode
                      }`}
                  />
                </Subheader>
              </div>
            )}
            {view_mode === 1 && (
              <FieldItemInfo
                I18n={I18n}
                field={field}
                Translate={Translate}
                list_field={list_field}
                list_pattern={list_pattern}
                is_error={this.props.field_item.is_error}
                default_props={default_props}
                modifyData={this.modifyData}
                project_id={this.props.match.params.projectid}
              />
            )}
            {view_mode === 2 && (
              <FieldItemLookupSource
                I18n={I18n}
                list_lookup={list_lookup}
                list_fields={list_field}
                lookup_source={field[field_constant.KEY_LOOKUP_SOURCE]}
                Translate={Translate}
                modifyData={this.modifyData}
                default_props={default_props}
              />
            )}
            {view_mode === 4 && (
              <FieldItemValidation
                I18n={I18n}
                Translate={Translate}
                default_props={default_props}
                field={field}
                list_field={list_field || []}
                list_validation={list_validation || []}
                modifyData={this.modifyData}
              />
            )}
            {view_mode === 5 && (
              <FieldItemRuleTransform
                I18n={I18n}
                Translate={Translate}
                default_props={default_props}
                field={field}
                list_field={list_field || []}
                list_rule_transform={rule_transforms || []}
                modifyData={this.modifyData}
              />
            )}
          </Paper>
        </GridTile>
        <GridTile cols={2}>
          <FieldItemPreview
            field={field}
            field_preview={field_preview}
            Translate={Translate}
            default_props={default_props}
            lookup_selector={lookup_selector}
            handleChangeFieldRelated={this.handleChangeFieldRelated}
            handleOnChangeFieldTest={this.handleOnChangeFieldTest}
            handleFocusOut={this.handleFocusOut}
          />
        </GridTile>
        <FieldDialog />
      </GridList>
    );
  }
}


export default withRouter(FieldItem);
