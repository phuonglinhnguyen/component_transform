// @flow
import React from 'react';

import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';

import QCField from './qc_sampling_qc_field_component';
import { BigMenuWithListItem, BigMenuPopover } from './big_menu_component';

import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import lodash from 'lodash';

import { Translate } from 'react-redux-i18n';

import * as qc_sampling_constant from '../constants/qc_sampling_constant';
import default_props from '../../../../common/default_props';

const inspections = [
  {
    key: qc_sampling_constant.INSPECTION_LEVEL_IMPORTANT_I,
    label: qc_sampling_constant.INSPECTION_LEVEL_IMPORTANT_I
  },
  {
    key: qc_sampling_constant.INSPECTION_LEVEL_IMPORTANT_II,
    label: qc_sampling_constant.INSPECTION_LEVEL_IMPORTANT_II
  },
  {
    key: qc_sampling_constant.INSPECTION_LEVEL_NORMAL_I,
    label: qc_sampling_constant.INSPECTION_LEVEL_NORMAL_I
  },
  {
    key: qc_sampling_constant.INSPECTION_LEVEL_NORMAL_II,
    label: qc_sampling_constant.INSPECTION_LEVEL_NORMAL_II
  },
  {
    key: qc_sampling_constant.INSPECTION_LEVEL_STABLE_I,
    label: qc_sampling_constant.INSPECTION_LEVEL_STABLE_I
  },
  {
    key: qc_sampling_constant.INSPECTION_LEVEL_STABLE_II,
    label: qc_sampling_constant.INSPECTION_LEVEL_STABLE_II
  }
];

class SelectZones extends React.Component {
  constructor(props) {
    super(props);

    this.actionSelectBatches = this.props.actions.actionSelectBatches.bind(
      this
    );
    this.actionSelectFields = this.props.actions.actionSelectFields.bind(this);
    this.actionSelectLayouts = this.props.actions.actionSelectLayouts.bind(
      this
    );
    this.actionSelectUsers = this.props.actions.actionSelectUsers.bind(this);
    this.getBatches = this.props.actions.getAttrBatches.bind(this);
    this.getFields = this.props.actions.getAttrFields.bind(this);
    this.getLayouts = this.props.actions.getAttrLayouts.bind(this);
    this.getUsers = this.props.actions.getAttrUsers.bind(this);
    this.handleCalculateAQLQuantity = this.props.actions.handleCalculateAQLQuantity.bind(
      this
    );
    this.handleOpenCloseBigMenus = this.props.actions.handleOpenCloseBigMenus.bind(
      this
    );
    this.loadMoreItem = this.props.actions.loadMoreItem.bind(this);
    this.modifyAQL = this.props.actions.modifyAQL.bind(this);
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

  render() {
    const {
      aql_conditions,
      filter_attr_batch,
      filter_attr_field,
      filter_attr_layout,
      filter_attr_user,
      open_big_menu,
      muiTheme
    } = this.props;
    return (
      <Paper>
        <GridList cols={1} {...default_props.grid_list} padding={10}>
          <Checkbox
            style={{ marginTop: 20 }}
            label={<Translate value={`projects.qc_sampling.apply_aql_user`} />}
            checked={
              aql_conditions[
                qc_sampling_constant.QC_CONDITION_KEY_APPLY_AQL_USER
              ] || false
            }
            onCheck={(event, isCheck) =>
              this.modifyAQL(
                isCheck,
                qc_sampling_constant.QC_CONDITION_KEY_APPLY_AQL_USER
              )
            }
          />
          <Divider />
          <BigMenuWithListItem
            anchorEl={
              open_big_menu[qc_sampling_constant.QC_CONDITION_KEY_BATCH]
            }
            cellWidth={333}
            dataSource={filter_attr_batch.datas}
            handleBigMenus={this.handleOpenCloseBigMenus}
            information={filter_attr_batch.information}
            isLoadMore={filter_attr_batch.is_load_more}
            labelName={['batch_name', 'percentage']}
            name={qc_sampling_constant.QC_CONDITION_KEY_BATCH}
            onClickItem={this.actionSelectBatches}
            onClickLoadMore={this.loadMoreItem}
            onFilterTyping={this.getBatches}
            showFilter={true}
            selectedColor={muiTheme.palette.primary1Color}
            showSelectAll={true}
            totalCells={3}
            valueFilter={filter_attr_batch.search_text}
            values={[...filter_attr_batch.datas_selected]}
          />
          <Divider />
          {aql_conditions[
            qc_sampling_constant.QC_CONDITION_KEY_APPLY_AQL_USER
          ] ? (
            <BigMenuWithListItem
              anchorEl={
                open_big_menu[qc_sampling_constant.QC_CONDITION_KEY_KEYER]
              }
              dataSource={filter_attr_user.datas}
              handleBigMenus={this.handleOpenCloseBigMenus}
              information={filter_attr_user.information}
              labelName={'username'}
              name={qc_sampling_constant.QC_CONDITION_KEY_KEYER}
              onClickItem={this.actionSelectUsers}
              onFilterTyping={this.getUsers}
              selectedColor={muiTheme.palette.primary1Color}
              showFilter={true}
              showSelectAll={true}
              totalCells={4}
              valueFilter={filter_attr_user.search_text}
              values={[...filter_attr_user.datas_selected]}
            />
          ) : (
            <BigMenuWithListItem
              anchorEl={
                open_big_menu[qc_sampling_constant.QC_CONDITION_KEY_LAYOUT]
              }
              dataSource={filter_attr_layout.datas}
              handleBigMenus={this.handleOpenCloseBigMenus}
              information={filter_attr_layout.information}
              name={qc_sampling_constant.QC_CONDITION_KEY_LAYOUT}
              selectedColor={muiTheme.palette.primary1Color}
              onClickItem={this.actionSelectLayouts}
              onFilterTyping={this.getLayouts}
              showFilter={true}
              showSelectAll={true}
              totalCells={4}
              valueFilter={filter_attr_layout.search_text}
              values={[...filter_attr_layout.datas_selected]}
            />
          )}
          <Divider />
          <QCField
            anchorEl={
              open_big_menu[qc_sampling_constant.QC_CONDITION_KEY_QC_FIELDS]
            }
            actionFilterDatas={this.getFields}
            datas={[...filter_attr_field.datas]}
            handleBigMenus={this.handleOpenCloseBigMenus}
            information={filter_attr_field.information}
            selectedColor={muiTheme.palette.primary1Color}
            is_fetching={filter_attr_field.is_fetching}
            modifyAQL={this.actionSelectFields}
            search_text={filter_attr_field.search_text}
            values={[...filter_attr_field.datas_selected]}
          />
          <GridList cols={2} cellHeight="auto">
            <TextField
              floatingLabelText={'Error threshold'}
              min={0}
              name="error_threshold"
              value={aql_conditions.error_threshold || 0}
              onChange={e => this.modifyAQL(e.target.value, 'error_threshold')}
              type="number"
              {...default_props.text_field}
            />
            <RaisedButton
              style={{ marginTop: 20 }}
              label={
                <Translate
                  value={`projects.qc_sampling.label_setting_inspection`}
                />
              }
              fullWidth={true}
              labelPosition="before"
              icon={<ArrowDown />}
              onClick={e =>
                this.handleOpenCloseBigMenus(
                  qc_sampling_constant.QC_CONDITION_KEY_INSPECTION_LEVEL,
                  e.currentTarget
                )
              }
            />
          </GridList>
        </GridList>
        <BigMenuPopover
          anchorEl={
            open_big_menu[
              qc_sampling_constant.QC_CONDITION_KEY_INSPECTION_LEVEL
            ]
          }
          dataSource={inspections}
          handleBigMenus={this.handleOpenCloseBigMenus}
          labelName={'label'}
          multiple={false}
          name={qc_sampling_constant.QC_CONDITION_KEY_INSPECTION_LEVEL}
          onClickItem={this.modifyAQL}
          style={{}}
          totalCells={1}
          values={null}
        />
      </Paper>
    );
  }
}

export default SelectZones;
