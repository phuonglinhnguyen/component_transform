
import React, { Component } from "react";
import PropTypes from "prop-types";
import { fade } from "material-ui/utils/colorManipulator";
import { List } from "material-ui/List";
import { isEqual } from 'lodash';
import { ListItem } from "material-ui/List";
import {
    SortableContainer,
    SortableElement,
    arrayMove
} from 'react-sortable-hoc';
const SortableItem = SortableElement(({ item }) => <ListItem primaryText={item.name} />);
const SortableList = SortableContainer(({ items }) => {
    return (
        <List>
            {items.map((item, index) => (
                <SortableItem
                    key={`item-${index}`}
                    index={index}
                    item={item}
                />
            ))}
        </List>
    );
});
class MenuSortSections extends Component {
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
        } = this.props;
        return (
            <SortableList
                items={items || []}
                onSortEnd={this.onSortEnd}
            />
        );
    }
}
export default MenuSortSections;
