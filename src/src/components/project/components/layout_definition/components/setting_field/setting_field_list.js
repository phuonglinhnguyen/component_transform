import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import IconButton from "material-ui/IconButton";
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import SettingAutoCopy from './setting_auto_copy'
import SettingShortCutCopy from './setting_shortcut_copy'
import SettingShortCutCopyField from './setting_shortcut_copy_field'
import SettingShortCutFocus from './setting_shortcut_focus'
import SettingShortCutFocusField from './setting_shortcut_focus_field'
import SettingDynamicByField from './setting_dynamic_by_field'
const style = {
  root: {
    display: 'block',
    width: '100%',
    maxHeight: '690px',
    overflowY: 'auto',
    overflowX: 'visable',
    paddingBottom: 16
  },
  result: {
    display: 'block',
    width: '100%',
    marginBottom: 16
  },
  title: {
    position: 'relative',
    fontSize: 14,
    fontWeight: 500,
    paddingFeft: '0',
    paddingRight: 45,
    verticalAlign: 'middle',
    letterSpacing: 0
  },
  value: {
    position: 'absolute',
    right: '16',
    top: '0'
  },
  valueText: {
    position: 'relative',
    padding: '0px 6px'
  }
};

const initialState = (settings = []) => {
  let state = {}
  settings.forEach(name => {
    state[name] = {
      active: false,
      value: null,
    }
  })
}
const settings = [
  'copy_field',
  'dynamic_by_field',
  'shortcut_copy',
  'shortcut_copy_field',
  'shortcut_focus',
  'shortcut_focus_field'
]

export default class FieldSettings extends React.Component {
  state = initialState(settings)
  componentWillMount() {
    const { field } = this.props;
    this.initSection(field);
  }
  initSection = (field) => {
    let state = {};
    settings.forEach(key => {
      state[key] = {
        active: !!field[key],
        value: field[key]
      }
    })
    this.setState(state)
  }
  componentWillReceiveProps(nextProps) {
    const { field } = nextProps;
    this.initSection(field);
  }
  setActive = (name, active) => {
    this.setState({ [name]: { active, value: null } })
  }
  handleChangeValue = (name, value) => {
    this.setState({ [name]: { active: true, value } })
  }
  handleClose = (e) => {
    this.props.onClose()
  }
  setConfig = () => {
    let _setting = {}
    Object.keys(this.state).forEach(name => {
      _setting[name] = this.state[name] ? this.state[name].value : undefined;
    })
    this.props.changeSettingField(_setting)
    this.handleClose()
  }
  handleToggleDialogChild = (state, cb) => {
    this.setState({ openDialogChild: state }, cb)
  }
  render() {
    const { fields, open, field, sections } = this.props;
    const { dynamic_by_field, copy_field, shortcut_copy, shortcut_copy_field, shortcut_focus, shortcut_focus_field,openDialogChild } = this.state;
    return (
      <Dialog
        title="Settings Field"
        modal={false}
        open={open&&!openDialogChild}
        actions={[
          <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
          <FlatButton label={'apply'} primary={true} onClick={this.setConfig} />
        ]}
        onRequestClose={this.handleClose}>
        <SettingDynamicByField
          name='dynamic_by_field'
          data={dynamic_by_field}
          fields={fields}
          onToggleDialogChild={this.handleToggleDialogChild}
          sections={sections}
          onActive={this.setActive}
          onChange={this.handleChangeValue}
        />
        <SettingAutoCopy
          name='copy_field'
          data={copy_field}
          fields={fields}
          onActive={this.setActive}
          onChange={this.handleChangeValue}
        />
        <SettingShortCutCopy
          name='shortcut_copy'
          data={shortcut_copy}
          fields={fields}
          field={field}
          onActive={this.setActive}
          onChange={this.handleChangeValue}
        />
        <SettingShortCutCopyField
          name='shortcut_copy_field'
          data={shortcut_copy_field}
          fields={fields}
          field={field}
          onActive={this.setActive}
          onChange={this.handleChangeValue}
        />
        <SettingShortCutFocus
          name='shortcut_focus'
          data={shortcut_focus}
          fields={fields}
          field={field}
          onActive={this.setActive}
          onChange={this.handleChangeValue}
        />
        <SettingShortCutFocusField
          name='shortcut_focus_field'
          data={shortcut_focus_field}
          fields={fields}
          field={field}
          onActive={this.setActive}
          onChange={this.handleChangeValue}
        />
      </Dialog>
    );
  }
}
