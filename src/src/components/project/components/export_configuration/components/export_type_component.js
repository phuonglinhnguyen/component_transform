import React from 'react';

import { GridList, GridTile } from 'material-ui/GridList';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';

import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';

import {
  AutoCompleteType,
  BooleanType,
  TextFieldNormal,
  TextFieldPassword
} from './export_type_config_components';

import lodash from 'lodash';
import { getDataObject } from '@dgtx/coreui';
import FieldExportTypeConfigDetails from './export_type_config_detail_component';
import Subheader from 'material-ui/Subheader';
import ExportTypeDialog from './export_type_dialog';


const renderAttributeRoot = (data, attrsRoot, muiTheme, updateFieldTypeRootConfig, handleClickAddEdit, Translate) => {
  if (attrsRoot) {
    return (
      <React.Fragment>
        <GridTile cols={12} style={{ padding: 0 }}>
          <FieldExportTypeConfigDetails
            actionEditItem={handleClickAddEdit}
            actionSelectItem={undefined}
            actionUpdateFields={updateFieldTypeRootConfig}
            datas={attrsRoot}
            has_add_button={true}
            is_sort={true}
            muiTheme={muiTheme}
            name={'type_exports'}
            type={data.type}
            defaultHeight={300}
            title={
              <Subheader inset={true}>
                {
                  <Translate
                    value={'projects.export_configuration.export_setting_attrs'}
                  />
                }
              </Subheader>
            }
          />
        </GridTile>
      </React.Fragment>
    )
  }
}
class ExportItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: false,
      setExportTypeDialog: false,
      dataExportTypeDialog: {},
      titleExportTypeDialog: ""
    };
    this.handleVisibility = this.handleVisibility.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
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
    if (!lodash.isEqual(this.state, nextState)) {
      return true;
    }
    return false;
  }

  handleVisibility = (visibility, ref_name) => {
    if (this.refs[ref_name]) {
      const input = this.refs[ref_name];
      const strLength = input.props.value.length;
      setTimeout(function () {
        input.focus();
        input.input.setSelectionRange(strLength, strLength);
      }, 0);
    }
    this.setState({
      visibility: !visibility
    });
  };

  handleExportTypeDialog = (data) => {
    const { actions } = this.props;
    if (data) {
      actions && actions.addFieldTypeRootConfig(data);
    }
    this.setState({
      setExportTypeDialog: false
    })
  }

  handleClickAddEdit = (field_mapping) => {
    let dataExportTypeDialog = {};
    let setExportTypeDialog = false;
    let titleExportTypeDialog = "";

    let field = Object.values(field_mapping)[0];
    dataExportTypeDialog = {
      index: field.index,
      name: getDataObject("name", field.data) ? field.data.name : "",
      value: getDataObject("value", field.data) ? field.data.value : "",
      type: getDataObject("type", field) ? field.type : ""
    }
    setExportTypeDialog = getDataObject("open_dialog", field) ? field["open_dialog"] : "";
    titleExportTypeDialog = getDataObject("title", field) ? field["title"] : "";
    this.setState({
      setExportTypeDialog,
      dataExportTypeDialog,
      titleExportTypeDialog
    })
  }

  render() {
    const {
      Translate,
      colorRemoveIcon,
      data,
      default_props,
      handleModify,
      handleSelection,
      index,
      muiTheme,
      actions
    } = this.props;
    const config_with_ace = ['folder_name_pattern','file_name_pattern', 'export_template'];
    const { visibility, setExportTypeDialog, dataExportTypeDialog, titleExportTypeDialog } = this.state;
    let attrsRoot = getDataObject("root.attrs", data.config) || [];
    return (
      <React.Fragment>
        <GridList cols={12} cellHeight="auto" padding={0}>
          <IconButton tooltip={'Delete'} onClick={() => handleSelection(index)}>
            <RemoveCircle color={colorRemoveIcon} />
          </IconButton>
          <ExportTypeDialog
            open={setExportTypeDialog}
            datas={dataExportTypeDialog}// cau truc: [{index: -1, name: "", value: ""},...]
            title={titleExportTypeDialog}
            onSubmit={this.handleExportTypeDialog}
            multiLine={true}
          />
          <GridTile cols={11} style={{ padding: 2 }}>

            <Card>
              <CardHeader
                actAsExpander={true}
                showExpandableButton={true}
                subtitle={
                  <Translate
                    value="projects.export_configuration.export_setting_type"
                    name={data.type}
                  />
                }
                title={
                  <Translate
                    value="projects.export_configuration.export_setting_name"
                    name={data.name}
                  />
                }
              />
              <CardText expandable={true}>
                {Object.keys(data.config).map((key_config, i) => {
                  if (key_config === 'root') {
                    return (
                      <React.Fragment>
                        <TextFieldNormal
                          Translate={Translate}
                          action_handleModify={handleModify}
                          config_name={"root.name"}
                          config_value={data.config[key_config]["name"]}
                          default_props={default_props}
                          is_open_ace={config_with_ace.indexOf("root") !== -1}
                          key={`${key_config}-${i}`}
                          multiLine={key_config === 'export_template'}
                          type_index={index}
                        />
                        {renderAttributeRoot(data, attrsRoot, muiTheme, actions.updateFieldTypeRootConfig, this.handleClickAddEdit, Translate)}
                      </React.Fragment>
                    )
                  }
                  if (key_config === 'password') {
                    return (
                      <TextFieldPassword
                        Translate={Translate}
                        action_handleModify={handleModify}
                        action_handleVisibility={this.handleVisibility}
                        config_index={i}
                        config_name={key_config}
                        config_value={data.config[key_config]}
                        default_props={default_props}
                        key={`${key_config}-${i}`}
                        type_index={index}
                        type_name={data.name}
                        visibility={visibility}
                      />
                    );
                  } else if (key_config === 'is_single_record') {
                    return (
                      <BooleanType
                        Translate={Translate}
                        action_handleModify={handleModify}
                        config_name={key_config}
                        config_value={data.config[key_config]}
                        default_props={default_props}
                        key={`${key_config}-${i}`}
                        type_index={index}
                      />
                    );
                  } else if (key_config === 'delimiter') {
                    return (
                      <AutoCompleteType
                        Translate={Translate}
                        action_handleModify={handleModify}
                        config_name={key_config}
                        config_value={data.config[key_config]}
                        default_props={default_props}
                        key={`${key_config}-${i}`}
                        type_index={index}
                      />
                    );
                  }
                  else {

                    // else {
                    return (
                      <TextFieldNormal
                        Translate={Translate}
                        action_handleModify={handleModify}
                        config_name={key_config}
                        config_value={data.config[key_config]}
                        default_props={default_props}
                        is_open_ace={config_with_ace.indexOf(key_config) !== -1}
                        key={`${key_config}-${i}`}
                        multiLine={key_config === 'export_template'}
                        type_index={index}
                      />
                    );
                    // }
                  }
                })
                }

              </CardText>
            </Card>
          </GridTile>
        </GridList>
      </React.Fragment>
    );
  }
}

export default ExportItem;
