import React from 'react';
import ReactDOM from 'react-dom';

import { GridList } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

import lodash from 'lodash';

import { DialogFileFormat } from './body_dialogs_component';
import ExportItem from './export_type_component';

import * as export_constants from '../constants/export_configuration_constants';

class ExportConfigurationFormat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body_height: 0
    };
    this.actionAddNewType = this.props.actions.actionAddNewType.bind(this);
    this.actionDeleteTypeReport = this.props.actions.actionDeleteTypeReport.bind(
      this
    );
    this.actionEditFileExport = this.props.actions.actionEditFileExport.bind(
      this
    );
    this.resetDialog = this.props.actions.resetDialog.bind(this);
    this.setDialog = this.props.actions.setDialog.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const props = { ...this.props };
    if (!lodash.isEqual(this.state, nextState)) {
      return true;
    }
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
    if (this.refs['paper-body']) {
      nodeStyle = ReactDOM.findDOMNode(this.refs['paper-body']);
    }
    if (nodeStyle) {
      this.setState({
        body_height: window.innerHeight - nodeStyle.getBoundingClientRect().top
      });
    }
  }

  render() {
    const {
      Translate,
      _height,
      default_props,
      dialog_props,
      muiTheme,
      type_exports,
      actions
    } = this.props;

    const { body_height } = this.state;
    return (
      <GridList cols={1} padding={0} cellHeight={'auto'}>
        <Paper
          style={{ height: _height, overflow: 'hidden' }}
          transitionEnabled={false}
          zDepth={1}
        >
          <Subheader inset={true}>
            {<Translate value="projects.export_configuration.export_setting" />}
          </Subheader>
          <RaisedButton
            label={<Translate value="commons.actions.new" />}
            onClick={event =>
              this.setDialog({
                file_exports: {
                  open_dialog: true,
                  index: -1,
                  data: { type: export_constants.PARAMETER_FORMAT_TYPE_DB3 }
                }
              })}
            primary={true}
            style={{ margin: 10 }}
          />
          <Paper
            className={'ios-overflow-y'}
            ref={'paper-body'}
            style={{
              height: body_height,
              overflowY: 'scroll',
              overflowX: 'hidden'
            }}
            zDepth={0}
          >
            <GridList {...default_props.grid_list} cols={1} padding={0}>
              {type_exports.map((v, i) => {
                return (
                  <ExportItem
                    Translate={Translate}
                    colorRemoveIcon={muiTheme.palette.accent1Color}
                    muiTheme={muiTheme}
                    data={v}
                    default_props={default_props}
                    handleModify={this.actionEditFileExport}
                    handleSelection={this.actionDeleteTypeReport}
                    index={i}
                    key={i}
                    actions={actions}
                  />
                );
              })}
            </GridList>
          </Paper>
        </Paper>
        <DialogFileFormat
          data={dialog_props.data}
          datas={type_exports}
          handleClickSubmit={this.actionAddNewType}
          index={dialog_props.index}
          open_dialog={dialog_props.open_dialog}
          resetDialog={this.resetDialog}
        />
      </GridList>
    );
  }
}

export default ExportConfigurationFormat;
