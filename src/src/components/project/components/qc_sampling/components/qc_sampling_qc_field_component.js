// @flow
import React from 'react';

import { GridList } from 'material-ui/GridList';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import wrapState from '../../../../../components/common/selectable_list_new';

import { BigMenuWithListItem } from './big_menu_component';

import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc';

import lodash from 'lodash';

import * as qc_sampling_constant from '../constants/qc_sampling_constant';

let SelectableList = makeSelectable(List);
SelectableList = wrapState(SelectableList);

const SortableItem = SortableElement(({ value }) => (
  <ListItem
    disabled={true}
    style={{
      backgroundColor: '#FFF',
      width: 200,
      cursor: 'pointer',
      borderRight: '1px solid #EFEFEF'
    }}
  >
    {value}
  </ListItem>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <SelectableList
      defaultValue={0}
      style={{
        padding: 0,
        backgroundColor: '#E0E0E0',
        display: 'flex',
        overflowX: 'auto',
        borderTop: '1px solid #EFEFEF'
      }}
    >
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={`${value.name} (${index + 1})`}
        />
      ))}
    </SelectableList>
  );
});

class QCField extends React.Component {
  shouldComponentUpdate(nextProps) {
    const props = { ...this.props };

    if (nextProps.is_fetching) {
      return false;
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

  onSortEnd = ({ oldIndex, newIndex }) => {
    let items = arrayMove(this.props.values, oldIndex, newIndex);
    this.props.modifyAQL(
      items,
      qc_sampling_constant.QC_CONDITION_KEY_QC_FIELDS
    );
  };
  render() {
    const {
      datas = [],
      search_text = '',
      values = [],
      anchorEl = null,
      actionFilterDatas = null,
      handleBigMenus = null,
      modifyAQL = null,
      information
    } = this.props;

    return (
      <GridList cols={1} cellHeight="auto">
        <BigMenuWithListItem
          showFilter={true}
          onFilterTyping={actionFilterDatas.bind(this)}
          showSelectAll={true}
          totalCells={4}
          dataSource={datas}
          name={qc_sampling_constant.QC_CONDITION_KEY_QC_FIELDS}
          valueFilter={search_text}
          values={[...values]}
          onClickItem={modifyAQL.bind(this)}
          information={information}
          anchorEl={anchorEl}
          handleBigMenus={handleBigMenus.bind(this)}
        />
        <SortableList items={values} onSortEnd={this.onSortEnd} axis={'x'} />
      </GridList>
    );
  }
}

export default QCField;
