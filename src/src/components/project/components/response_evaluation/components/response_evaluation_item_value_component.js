import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { GridList, GridTile } from 'material-ui/GridList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as response_evaluation_constants from '../constants/response_evaluation_constants';

class ResponseEvaluationItemValue extends React.Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.modifyKey = this.modifyKey.bind(this);
    this.modifyValue = this.modifyValue.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  addItem() {
    var { values } = this.props.response_evaluation;
    values.push({ '': '' });
    this.props.modifyData(response_evaluation_constants.KEY_PROJECT_RESPONSE_EVALUATION_VALUES, values);

  }
  removeItem(index) {
    var { values } = this.props.response_evaluation;
    values = values.filter((item, idx) => idx !== index);
    this.props.modifyData(response_evaluation_constants.KEY_PROJECT_RESPONSE_EVALUATION_VALUES, values);

  }
  modifyKey(index, key) {
    var { values } = this.props.response_evaluation;
    var kArray = Object.keys(values[index]);        // Creating array of keys
    var vValue = values[index][kArray[0]];

    var item = {};
    item[key] = vValue;
    values = values.filter((item, idx) => idx !== index);

    values.splice(index, 0, item);
    this.props.modifyData(response_evaluation_constants.KEY_PROJECT_RESPONSE_EVALUATION_VALUES, values);

  }
  modifyValue(index, value) {
    var { values } = this.props.response_evaluation;
    var kArray = Object.keys(values[index]);
    var item = {};
    item[kArray[0]] = value;
    values = values.filter((item, idx) => idx !== index);
    values.splice(index, 0, item);
    this.props.modifyData(response_evaluation_constants.KEY_PROJECT_RESPONSE_EVALUATION_VALUES, values);

  }
  onBlur() {
    this.props.modifyData();
  }
  renderButton(items, index) {
    if (index === items.length - 1) {
      if (items.length === 1) {
        return <FloatingActionButton
          mini={true}
          onClick={this.addItem}
        >
          <ContentAdd />
        </FloatingActionButton>
      }
      return <div>
        <FloatingActionButton
          mini={true}
          onClick={this.addItem}
          style={{ marginRight: '4px' }}
        >
          <ContentAdd />
        </FloatingActionButton>
        <FloatingActionButton
          mini={true}
          secondary={true}
          onClick={() => this.removeItem(index)}
        >
          <ContentRemove />
        </FloatingActionButton>
      </div>

    }
    return <FloatingActionButton
      mini={true}
      secondary={true}
      onClick={() => this.removeItem(index)}
    >
      <ContentRemove />
    </FloatingActionButton>
  }

  render() {
    const { default_props, response_evaluation, response_evaluation_error, fields = [] } = this.props;
    var { values } = response_evaluation;
    var error_values = response_evaluation_error[response_evaluation_constants.KEY_PROJECT_RESPONSE_EVALUATION_VALUES];
    values = values || [];
    return (
      <div>
        {values.map((item, index) => {

          var kArray = Object.keys(item);
          var key = kArray[0];      // Creating array of keys
          var vValue = item[key];

          return <GridList key={index} {...default_props.grid_list} cols={5} >
            <GridTile cols={2}>
            
              <SelectField
                floatingLabelText="Select Field"
                floatingLabelFixed={true}

                errorText={error_values[index].key}
                value={key}
                fullWidth={true}
                onChange={(event, idx, value) =>
                  this.modifyKey(
                    index,
                    value
                  )}

              >
                {fields.map((field) => (
                  <MenuItem
                    key={field.id}
                    value={field.id}
                    primaryText={field.name}
                  />
                ))}
              </SelectField>
            </GridTile>
            <GridTile cols={2}>
              <TextField
                floatingLabelText="Value"
                floatingLabelFixed={true}
                id={`value_${index}`}

                {...default_props.text_field}
                value={vValue}
                errorText={error_values[index].value}
                onChange={event =>
                  this.modifyValue(
                    index,
                    event.target.value
                  )}

              />
            </GridTile>
            <GridTile style={{ paddingTop: '20px' }}>
              {this.renderButton(values, index)}
            </GridTile>
          </GridList>
        })}



      </div>


    );
  }
}


export default ResponseEvaluationItemValue;
