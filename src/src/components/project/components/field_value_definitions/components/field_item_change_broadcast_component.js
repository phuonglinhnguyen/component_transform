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
      temp_data: ""
    };
    this.handleRequestAdd = this.handleRequestAdd.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
  }

  onSelectNewData(value) {
    this.setState({
      temp_data: value
    });
    this.refs[field_constants.KEY_FIELDS_CHANGE_BROADCAST].focus();
  }

  checkValidWhenAdd(datas, value) {
    const {field}= this.props;
    if(!value.length){
      return ;
    }
    if(value===field.name){
      return;
    }
    if(datas.includes(value)){
      return ;
    }
    return true;
  }

  handleRequestAdd = (datas, value) => {
    this.refs[field_constants.KEY_FIELDS_CHANGE_BROADCAST].focus();
    if (!this.checkValidWhenAdd(datas, value)) {
      return;
    }
    datas.push(value);
    this.props.modifyData(field_constants.KEY_FIELDS_CHANGE_BROADCAST, datas);
    this.setState({
      temp_data: ''
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
    const { temp_data } = this.state;
    let name = field_constants.KEY_FIELDS_CHANGE_BROADCAST;
    const datas = field[field_constants.KEY_FIELDS_CHANGE_BROADCAST]||[];
    let dataFieldNameConfig = {
      text: field_constants.KEY_FIELD_NAME,
      value: field_constants.KEY_FIELD_NAME
    };
    return (
      <Card style={{ boxShadow: 'none' }}>
        <CardTitle
          title={
            <Translate
              value={`projects.field_value_definitions.change_broadcast`}
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
                key={field_constants.KEY_FIELDS_CHANGE_BROADCAST}
                ref={field_constants.KEY_FIELDS_CHANGE_BROADCAST}
                dataSource={list_field}
                searchText={temp_data}
                dataSourceConfig={dataFieldNameConfig}
                popoverProps={{ canAutoPosition: true }}
                floatingLabelText={
                  <Translate
                    value={`projects.field_value_definitions.${field_constants.KEY_FIELDS_CHANGE_BROADCAST}`}
                  />
                }
                onUpdateInput={searchText =>
                  this.onSelectNewData(searchText)
                }
                onNewRequest={chosenRequest =>
                  this.onSelectNewData(
                    chosenRequest[dataFieldNameConfig.text]
                  )
                }
              />
            </GridTile>
            <RaisedButton
              style={{ marginTop: 25, minWidth: 45 }}
              onClick={() =>
                this.handleRequestAdd(
                  datas,
                  temp_data,
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
                  {v}
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
