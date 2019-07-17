import React from 'react';

import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

import FieldDetails from './field_detail_component';
import { DialogFieldMapping } from './body_dialogs_component';

import default_props from '../../../../common/default_props';
import lodash from 'lodash';

class ExportFieldMapping extends React.Component {
  constructor(props) {
    super(props);

    this.onClickTransferField = this.props.actions.onClickTransferField.bind(
      this
    );
    this.updateFieldExport = this.props.actions.updateFieldExport.bind(this);
    this.setDialog = this.props.actions.setDialog.bind(this);
    this.modifyFieldExport = this.props.actions.modifyFieldExport.bind(this);
    this.resetDialog = this.props.actions.resetDialog.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const props = { ...this.props };

    for (var key in props) {
      if (props.hasOwnProperty(key) && nextProps.hasOwnProperty(key)) {
        if (
          !lodash.isEqual(props[key], nextProps[key]) &&
          key !== 'actions' &&
          typeof key !== 'function'
        ) {
          return true;
        }
      }
    }
    return false;
  }

  renderGroupButton(export_configuration) {
    return (
      <GridTile rows={4}>
        <RaisedButton
          label={'>>>'}
          primary={true}
          onClick={() =>
            this.onClickTransferField(
              [...export_configuration.fields_project],
              true
            )}
          fullWidth={true}
          style={{ margin: 4, marginTop: 20 }}
        />
        <RaisedButton
          label={'<<<'}
          primary={true}
          onClick={() =>
            this.onClickTransferField(
              [...export_configuration.fields_export],
              false
            )}
          fullWidth={true}
          style={{ margin: 4 }}
        />
      </GridTile>
    );
  }

  render() {
    const {
      Translate,
      _height,
      dialog_props,
      export_configuration,
      muiTheme
    } = this.props;
    return (
      <GridList
        cols={1}
        {...default_props.grid_list}
        padding={0}
        cellHeight={_height}
      >
        <Subheader>
          {<Translate value={'projects.export_configuration.field_mapping'} />}
        </Subheader>
        <GridList
          cols={13}
          {...default_props.grid_list}
          padding={10}
          cellHeight={'auto'}
        >
          <GridTile cols={6} style={{ padding: 2 }}>
            <FieldDetails
              actionEditItem={() => undefined}
              actionSelectItem={v => this.onClickTransferField([v], true)}
              actionUpdateFields={() => undefined}
              datas={export_configuration.fields_project}
              muiTheme={muiTheme}
              name={'fields_project'}
              title={
                <Subheader inset={true}>
                  {
                    <Translate
                      value={'projects.export_configuration.field_definition'}
                    />
                  }
                </Subheader>
              }
            />
          </GridTile>
          {this.renderGroupButton(export_configuration)}
          <GridTile cols={6} style={{ padding: 2 }}>
            <FieldDetails
              actionEditItem={this.setDialog}
              actionSelectItem={v => this.onClickTransferField([v], false)}
              actionUpdateFields={this.updateFieldExport}
              datas={export_configuration.fields_export}
              has_add_button={true}
              is_sort={true}
              muiTheme={muiTheme}
              name={'fields_export'}
              title={
                <Subheader inset={true}>
                  {
                    <Translate
                      value={'projects.export_configuration.field_exports'}
                    />
                  }
                </Subheader>
              }
            />
          </GridTile>
        </GridList>
        <DialogFieldMapping
          data={dialog_props.data}
          datas={export_configuration.fields_export}
          handleClickSubmit={this.modifyFieldExport}
          index={dialog_props.index}
          open_dialog={dialog_props.open_dialog}
          resetDialog={this.resetDialog}
        />
      </GridList>
    );
  }
}

export default ExportFieldMapping;
