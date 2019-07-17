import React from 'react';

import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';

import * as field_constants from '../constants/field_constants';
import * as validation_constants from '../../../../configuration/components/validation_definitions/constants/validation_constants';

import ValidationInfos from '../../../../configuration/components/validation_definitions/components/validation_item_infos_component';

class FieldItemInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDialog: false,
      argument_selected: ''
    };
  }

  handleChangeData(name, value) {
    const validation = { ...this.props.field.validation };
    validation[name] = value;
    this.props.modifyData(field_constants.KEY_VALIDATION, validation);
  }

  openDialog(v) {
    this.setState({
      isOpenDialog: true,
      argument_selected: v
    });
  }

  handleUpdateFieldName(validation, masterKey, name, argument, value) {
    const validation_arguments = { ...validation[name] };
    validation_arguments[argument] = value;
    validation[name] = validation_arguments;
    this.props.modifyData(masterKey, validation);
    this.setState({
      isOpenDialog: false,
      argument_selected: ''
    });
  }

  render() {
    const {
      field,
      Translate,
      default_props,

      list_field = [],
      list_validation = [],

      modifyData
    } = this.props;

    const { isOpenDialog, argument_selected } = this.state;

    const dataFieldNameConfig = {
      text: field_constants.KEY_FIELD_NAME,
      value: field_constants.KEY_FIELD_NAME
    };

    const data_validation = { ...field[field_constants.KEY_VALIDATION] };
    return (
      <div >
        <ValidationInfos
          default_props={default_props}
          validation_constants={validation_constants}
          label_error={''}
          validation={data_validation}
          Translate={Translate}
          modifyData={this.handleChangeData.bind(this)}
          is_inherited={true}
          list_validation={list_validation}
          field_constants={field_constants}
          actionSelectData={modifyData.bind(this)}
          actionClickChip={this.openDialog.bind(this)}
        />
        <Dialog
          modal={false}
          open={isOpenDialog}
          onRequestClose={() =>
            this.setState({ isOpenDialog: false, argument_selected: '' })
          }
        >
          <AutoComplete
            {...default_props.auto_complete}
            autoFocus={isOpenDialog}
            hintText={
              <Translate
                value={'projects.field_value_definitions.type_name_of_field'}
              />
            }
            dataSource={list_field}
            dataSourceConfig={dataFieldNameConfig}
            floatingLabelText={
              <Translate
                value={'projects.field_value_definitions.button_add_field'}
              />
            }
            onNewRequest={chosenRequest =>
              this.handleUpdateFieldName(
                data_validation,
                field_constants.KEY_VALIDATION,
                validation_constants.KEY_VALIDATION_ARGUMENTS,
                argument_selected,
                chosenRequest.name
              )
            }
          />
        </Dialog>
      </div>
    );
  }
}

export default FieldItemInfo;
