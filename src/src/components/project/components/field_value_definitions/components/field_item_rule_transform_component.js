import React from 'react';

import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';

import * as field_constants from '../constants/field_constants';
import * as rule_transform_constants from '../../../../configuration/components/rule_definitions/constants/transform_rule_constants';

import RuleTransformInfos from '../../../../configuration/components/rule_definitions/components/transform_rule_item_infos_component';

class RuleTransform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDialog: false,
      argument_selected: ''
    };
  }

  handleChangeData(name, value) {
    const rule_transform = { ...this.props.field.rule_transform };
    rule_transform[name] = value;
    this.props.modifyData(field_constants.KEY_RULE_TRANSFORM, rule_transform);
  }

  openDialog(v) {
    this.setState({
      isOpenDialog: true,
      argument_selected: v
    });
  }

  handleUpdateFieldName(rule_transform, masterKey, name, argument, value) {
    const rule_transform_arguments = { ...rule_transform[name] };
    rule_transform_arguments[argument] = value;
    rule_transform[name] = rule_transform_arguments;
    this.props.modifyData(masterKey, rule_transform);
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
      list_rule_transform = [],

      modifyData
    } = this.props;

    const { isOpenDialog, argument_selected } = this.state;

    const dataFieldNameConfig = {
      text: field_constants.KEY_FIELD_NAME,
      value: field_constants.KEY_FIELD_NAME
    };

    const data_rule_transform = {
      ...field[field_constants.KEY_RULE_TRANSFORM]
    };
    return (
      <div>
        <RuleTransformInfos
          default_props={default_props}
          transform_rule_constants={rule_transform_constants}
          transform_rule={data_rule_transform}
          label_error={''}
          Translate={Translate}
          modifyData={this.handleChangeData.bind(this)}
          is_inherited={true}
          list_transform_rule={list_rule_transform}
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
                data_rule_transform,
                field_constants.KEY_RULE_TRANSFORM,
                rule_transform_constants.KEY_TRANSFORM_RULE_ARGUMENTS,
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

export default RuleTransform;
