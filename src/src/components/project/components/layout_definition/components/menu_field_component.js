
import React, { Component } from "react";
import PropTypes from "prop-types";
import { fade } from "material-ui/utils/colorManipulator";
import { List } from "material-ui/List";
import { isEqual } from 'lodash';
import FieldItem from './field_item';
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc';
const SortableItem = SortableElement(FieldItem);
const SortableList = SortableContainer(({ colorWarning, onSelectOption, changePositionOption, selectedOptionIndex, onSelect, addNodeField, items, selectedIndex, selectedItemStyle, fields, fieldsChoose, onChangeItem, changePosition, changeSettingField, sections }) => {
  return (
    <List>
      {items.map((item, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          item={item}
          fields={fields}
          sections={sections}
          selected={selectedIndex === index}
          selectedOptionIndex={selectedOptionIndex}
          selectedItemStyle={selectedItemStyle}
          fieldsChoose={fieldsChoose}
          onSelect={() => {
            onSelect(index)
          }
          }
          onSelectOption={(optionIndex) => onSelectOption(index, optionIndex)}
          changePositionOption={(optionIndex, hasPosition) => { changePositionOption(index, optionIndex, hasPosition) }}
          changeSettingField={settings => changeSettingField(index, settings)}
          onChangeItem={(fieldId, previousId) => onChangeItem(index, fieldId, previousId)}
          changePosition={() => changePosition(index)}
          addNodeField={node => addNodeField(index, node)}
          colorWarning={colorWarning}
        />
      ))}
    </List>
  );
});
class MenuField extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (!isEqual(this.props, nextProps)
      || !isEqual(this.state, nextState)
      || !isEqual(this.context, nextContext)
    );
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { items, onSortEnd } = this.props;
    let arrayNew = arrayMove(items, oldIndex, newIndex);
    if (!isEqual(arrayNew, items)) {
      onSortEnd(arrayNew);
    }
  };
  render() {

    const {
      items,
      fields,
      fieldsChosen,
      onChangeItem,
      changePosition,
      selectedIndex,
      selectedOptionIndex,
      addNodeField,
      changePositionOption,
      onSelectOption,
      onSelectItem,
      changeSettingField,
      sections
    } = this.props;
    let _fieldsChoose = fields.items.filter(item => !fieldsChosen[item.id]);

    const styles = {};
    const textColor = this.context.muiTheme.baseTheme.palette.textColor;
    styles.backgroundColor = fade(textColor, 0.2);
    const colorWarning = this.context.muiTheme.layout_definition.warning_position.color;
    return (
      <SortableList
        items={items || []}
        fieldsChoose={_fieldsChoose}
        selectedIndex={selectedIndex}
        selectedOptionIndex={selectedOptionIndex}
        fields={fields}
        sections={sections}
        selectedItemStyle={styles}
        onChangeItem={(index, fieldId, previousId) => {
          onChangeItem(index, fieldId, previousId, fields.map[fieldId].argument_details)
        }
        }
        colorWarning={colorWarning}
        onSelectOption={onSelectOption}
        changePositionOption={changePositionOption}
        changePosition={changePosition}
        changeSettingField={changeSettingField}
        onSortEnd={this.onSortEnd}
        addNodeField={addNodeField}
        onSelect={onSelectItem}
        shouldCancelStart={e => {
          if (e.target.tagName.toLowerCase() !== 'div' && e.target.tagName.toLowerCase() !== 'span') {
            return true;
          }
        }}
      />
    );
  }
}
export default MenuField;
