import React from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
export default (props) => {
    const { isActive, onChange } = props;
    return (
        <ListItem
            leftCheckbox={
                <Checkbox checked={isActive}
                    onCheck={() => onChange(!isActive)} />}
            primaryText="Status"
            secondaryText={isActive
                ? 'Active'
                : 'InActive'}
        >
        </ListItem>

    );
}