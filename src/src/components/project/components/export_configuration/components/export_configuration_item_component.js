import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import ExportConfigurationFormat from './export_configuration_type_export_component';
import ExportFieldMapping from './export_configuration_field_export_component';
import Dialog from '../../../../common/dialog/containers/dialog_container';

import * as export_configuration_constants from '../constants/export_configuration_constants';
import Loading from '../../../../common/loading';

import lodash from 'lodash';
import ace from 'brace';

import "brace/mode/javascript";
import "brace/snippets/javascript";
import "brace/theme/solarized_dark";
import "brace/ext/language_tools";
import "brace/ext/searchbox";

let langTools = ace.acequire('ace/ext/language_tools');
let globalCompleter = {
  getCompletions: function (editor, session, pos, prefix, callback) {
    callback(null, [
      {
        snippet: `moment(Date.now()).format('YYYYMMDD-hhmmss')`,
        meta: 'elrond',
        caption: 'current_date_time',
        score: 3
      },
      {
        snippet: `data.batch_name`,
        meta: 'elrond',
        caption: 'batch_name',
        score: 10
      }
    ]);
  }
};
langTools.addCompleter(globalCompleter);
class ExportConfigurationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _height: 0
    };
    this.deleteData = this.deleteData.bind(this);
    this.deleteExportConfiguration = this.props.actions.deleteExportConfiguration.bind(
      this
    );
    this.getExportConfiguration = this.props.actions.getExportConfiguration.bind(
      this
    );
    this.resetStateExportConfigurationItem = this.props.actions.resetStateExportConfigurationItem.bind(
      this
    );
    this.saveData = this.saveData.bind(this);
    this.setCompleter = this.props.actions.setCompleter.bind(this);
    this.setDialogCommon = this.props.actions.setDialogCommon.bind(this);
    this.updateExportConfig = this.props.actions.updateExportConfig.bind(this);
    this.updateFieldExport = this.props.actions.updateFieldExport.bind(this);
  }

  componentDidMount() {
    const {
      exportConfigId,
      projectid
    } = this.props.match.params;
    this.setCompleter(langTools);
    this.getExportConfiguration(projectid, exportConfigId);
  }

  shouldComponentUpdate(nextProps) {
    const props = { ...this.props };
    for (var key in props) {
      if (props.hasOwnProperty(key) && nextProps.hasOwnProperty(key)) {
        if (
          !lodash.isEqual(props[key], nextProps[key]) &&
          typeof props[key] !== 'function'
        ) {
          return true;
        }
      }
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    let nodeStyle = null;
    if (this.refs['paper-header']) {
      nodeStyle = ReactDOM.findDOMNode(this.refs['paper-header']);
    }
    if (nodeStyle) {
      this.setState({
        _height: window.innerHeight - nodeStyle.getBoundingClientRect().top - 5
      });
    }
  }

  componentWillUnmount() {
    this.resetStateExportConfigurationItem();
  }

  getRedirectUrl() {
    const url = this.props.match.url;
    return url.substring(0, url.lastIndexOf('/'));
  }

  saveData() {
    const {
      projectid,
      exportConfigId
    } = this.props.match.params;
    this.updateExportConfig(
      projectid,
      exportConfigId,
      this.props.export_configuration_item.data
    );
  }

  deleteData() {
    const export_configuration = this.props.export_configuration_item.data;
    const {
      exportConfigId,
      projectid
    } = this.props.match.params;
    this.setDialogCommon({
      open_dialog: true,
      title_dialog: `Delete export config ${
        export_configuration[
        export_configuration_constants.KEY_EXPORT_CONFIGURATION_NAME
        ]
        }`,
      body_dialog: (
        <this.props.Translate value={'commons.notification.are_you_sure'} />
      ),
      handleClickSubmit: () =>
        this.deleteExportConfiguration(
          projectid,
          exportConfigId,
          export_configuration[
          export_configuration_constants.KEY_EXPORT_CONFIGURATION_NAME
          ],
          this.props.history,
          this.getRedirectUrl()
        ),
      label_button_dialog: 'commons.actions.delete'
    });
  }

  render() {
    const {
      Translate,
      default_props,
      dialog,
      export_configuration_item,
      is_error,
      is_fetching,
      is_fetching_field,
      is_redirect,
      muiTheme
    } = this.props;

    const { data, originals_data } = export_configuration_item;

    const { _height } = this.state;

    if (is_error && is_redirect) {
      // return <Redirect to={this.getRedirectUrl()} />;
    }

    if (is_fetching || is_fetching_field) {
      return <Loading />;
    }

    const error_text_export_configuration_name = export_configuration_item.is_error ? (
      <Translate
        value={`projects.export_configuration.this_field_is_required`}
      />
    ) : (
        ''
      );
    const exportConfigId = this.props.match.params
      .exportConfigId;
    const label =
      exportConfigId === 'new'
        ? 'commons.actions.save_and_create'
        : 'commons.actions.update';
    return (
      <GridList cols={1} {...default_props.grid_list} padding={0}>
        <Paper zDepth={2}>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <RaisedButton
                label={<Translate value={label} />}
                onClick={this.saveData}
                primary={true}
              />
            </ToolbarGroup>
            {exportConfigId !== 'new' && (
              <ToolbarGroup lastChild={true}>
                <FlatButton
                  label={<Translate value={'commons.actions.delete'} />}
                  onClick={this.deleteData}
                />
              </ToolbarGroup>
            )}
          </Toolbar>
          <GridList cols={3} cellHeight={100}>
            <div />
            <TextField
              autoFocus
              errorText={error_text_export_configuration_name}
              floatingLabelText={
                <Translate
                  dangerousHTML
                  value="projects.export_configuration.config_name"
                />
              }
              name={`${
                export_configuration_constants.KEY_EXPORT_CONFIGURATION_NAME
                }`}
              onChange={event => {
                this.updateFieldExport(
                  {
                    [export_configuration_constants.KEY_EXPORT_CONFIGURATION_NAME]:
                      event.target.value
                  },
                  !event.target.value
                );
              }}
              style={{ marginLeft: 10 }}
              value={
                data[
                export_configuration_constants.KEY_EXPORT_CONFIGURATION_NAME
                ] || ''
              }
              {...default_props.text_field}
            />
          </GridList>
        </Paper>
        <GridList
          cols={12}
          ref={'paper-header'}
          {...default_props.grid_list}
          padding={1}
          cellHeight={_height}
        >
          <GridTile cols={9}>
            <ExportFieldMapping
              Translate={Translate}
              _height={_height}
              actions={this.props.actions}
              dialog_props={dialog.field_mapping}
              export_configuration={lodash.omit(data, ['type_exports'])}
              fields_original={originals_data.fields_original}
              muiTheme={muiTheme}
            />
          </GridTile>
          <GridTile cols={3} style={{ padding: 2 }}>
            <ExportConfigurationFormat
              Translate={Translate}
              _height={_height}
              actions={this.props.actions}
              default_props={default_props}
              dialog_props={dialog.file_exports}
              muiTheme={muiTheme}
              type_exports={[...data.type_exports]}
            />
          </GridTile>
        </GridList>
        <Dialog Translate={Translate} />
      </GridList>
    );
  }
}



export default withRouter(ExportConfigurationItem);
