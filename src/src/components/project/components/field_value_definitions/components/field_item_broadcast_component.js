import React from 'react';
import PropTypes from 'prop-types';

import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import { GridList, GridTile } from 'material-ui/GridList';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import { Card, CardActions, CardTitle } from 'material-ui/Card';

import Add from 'material-ui/svg-icons/content/add';

import * as field_constants from '../constants/field_constants';
import * as lookup_constants from '../../../../configuration/components/lookup_definitions/constants/lookup_constants';

class FieldItemBroadcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp_data: {}
    };
    this.handleRequestAdd = this.handleRequestAdd.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
  }

  onSelectNewData(temp_data, key, value) {
    temp_data[key] = value;
    this.setState({
      temp_data: temp_data
    });
    if (key === field_constants.KEY_FIELD_WILL_BE_BROADCASTED) {
      this.refs[key].focus();
    }
  }

  checkValidWhenAdd(datas, data, keyField, keyColumn) {
    if (Object.keys(data).length === 0 || !data[keyField]) {
      return false;
    } else if (!data[keyColumn]) {
      return false;
    } else if (
      datas.filter(
        v => v[keyField] === data[keyField] && v[keyColumn] === data[keyColumn]
      ).length !== 0
    ) {
      return false;
    } else {
      return true;
    }
  }

  handleRequestAdd(datas, key, value, keyField, keyColumn) {
    this.refs[keyField].focus();
    if (!this.checkValidWhenAdd(datas, value, keyField, keyColumn)) {
      return;
    }
    datas.push(value);
    this.props.modifyData(key, datas);
    let tmp_data = { ...value };
    tmp_data[keyField] = '';
    tmp_data[keyColumn] = '';
    this.setState({
      temp_data: tmp_data
    });
  }

  handleRequestDelete = (datas, masterKey, value) => {
    datas.splice(value, 1);
    this.props.modifyData(masterKey, datas);
  };

  render() {
    let {
      field,

      list_field = [],

      Translate,
      default_props,
      muiTheme
    } = this.props;

    const original_list_columns =
      field[field_constants.KEY_LOOKUP_SOURCE][
        lookup_constants.KEY_LOOKUP_RELATED_COLUMNS
      ] || [];
    const datas = field[field_constants.KEY_LOOKUP_BROADCAST];
    const { temp_data } = this.state;

    let name = field_constants.KEY_LOOKUP_BROADCAST;
    let dataFieldNameConfig = {
      text: field_constants.KEY_FIELD_NAME,
      value: field_constants.KEY_FIELD_NAME
    };

    if (
      !Array.isArray(original_list_columns) ||
      original_list_columns.length === 0
    ) {
      return (
        <Card style={{ boxShadow: 'none' }}>
          <CardTitle
            style={{ padding: '7px 0px 0px 16px' }}
            title={
              <Translate
                value={`projects.field_value_definitions.lookup_broadcast`}
                nodata={''}
              />
            }
            titleStyle={{ fontSize: 16 }}
            subtitle={
              <Translate
                value={`projects.field_value_definitions.lookup_broadcast_no_column`}
              />
            }
          />
        </Card>
      );
    }

    const keyField = field_constants.KEY_FIELD_WILL_BE_BROADCASTED;
    const keyColumn = field_constants.KEY_COLUMNS_BROADCAST_VALUE;

    const itemMenuColumns = original_list_columns.map((v, i) => (
      <MenuItem key={`${v}_${i}`} value={v} primaryText={v} />
    ));

    return (
      
      <Card style={{ boxShadow: 'none' }}>
        <CardTitle
          title={
            <Translate
              value={`projects.field_value_definitions.lookup_broadcast`}
              nodata={''}
            />
          }
          style={{ padding: '7px 0px 0px 16px' }}
          titleStyle={{ fontSize: 16 }}
          showExpandableButton={true}
          actAsExpander={true}
          iconstyle={{ color: muiTheme.palette.accent3Color }}
        />
        <CardActions expandable={true}>
          <GridList {...default_props.grid_list} padding={20} cols={5}>
            <GridTile cols={2}>
              <AutoComplete
                hintText={'Type field name'}
                {...default_props.auto_complete}
                style={{ display: 'table', position: 'fixed', width: 'auto' }}
                key={`${keyField}`}
                ref={`${keyField}`}
                dataSource={list_field}
                searchText={temp_data[keyField]}
                dataSourceConfig={dataFieldNameConfig}
                popoverProps={{ canAutoPosition: true }}
                floatingLabelText={
                  <Translate
                    value={`projects.field_value_definitions.${keyField}`}
                  />
                }
                onUpdateInput={searchText =>
                  this.onSelectNewData(temp_data, keyField, searchText)
                }
                onNewRequest={chosenRequest =>
                  this.onSelectNewData(
                    temp_data,
                    keyField,
                    chosenRequest[dataFieldNameConfig.text]
                  )
                }
              />
            </GridTile>
            <GridTile cols={2}>
              <SelectField
                {...default_props.select_field}
                value={temp_data[keyColumn]}
                floatingLabelText={
                  <Translate
                    value={`projects.field_value_definitions.${keyColumn}`}
                  />
                }
                onChange={(event, index, value) =>
                  this.onSelectNewData(temp_data, keyColumn, value)
                }
              >
                {itemMenuColumns}
              </SelectField>
            </GridTile>
            <RaisedButton
              style={{ marginTop: 25, minWidth: 45 }}
              onClick={() =>
                this.handleRequestAdd(
                  datas,
                  name,
                  temp_data,
                  keyField,
                  keyColumn
                )
              }
              icon={<Add />}
              primary={true}
            />
          </GridList>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            {datas && datas.length > 0
              ? datas.map((v, i) => (
                  <Chip
                    key={i}
                    {...default_props.chip}
                    onRequestDelete={() =>
                      this.handleRequestDelete(datas, name, i)
                    }
                  >
                    {`${v[keyField]} - ${v[keyColumn]}`}
                  </Chip>
                ))
              : null}
          </div>
          <br />
        </CardActions>
      </Card>
    );
  }
}
FieldItemBroadcast.propTypes = {
  handleRequestAdd: PropTypes.func,
  handleRequestDelete: PropTypes.func
};

export default FieldItemBroadcast;
