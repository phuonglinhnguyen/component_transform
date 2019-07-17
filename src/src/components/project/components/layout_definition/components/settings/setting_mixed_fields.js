import React, { PureComponent } from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
const initialStyle = {
    toolbarWrapper: {
        position: 'absolute',
        right: 0,
        zIndex: 200,

    },

    toolbar: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        whiteSpace: 'nowrap',
    }
}

export default class SettingMixed extends PureComponent {
    handleChangeField = (event, index, value) => {
        const { onChangeFields } = this.props;
        onChangeFields(value)
    }

    menuFieldItems = (value) => {
        const { fieldSource, fields } = this.props
        return fieldSource.map((item) => {
            let _item = fields.map[item.field_id]
            if (_item) {
                return (
                    <MenuItem
                        key={_item.name}
                        insetChildren={true}
                        checked={value===_item.name}
                        value={_item.name}
                        primaryText={_item.name}
                    />
                )
            } else {
                return (
                    <MenuItem
                        key={item.field_id}
                        insetChildren={true}
                        checked={false}
                        value={item.name}
                        primaryText={`Field ${item.field_id} is deleted!`}
                    />
                )
            }
        });
    }
    render() {
        const {
            value,
            active,
            onActive = () => { },
        } = this.props;
        return (
            <ListItem
                leftCheckbox={
                    <Checkbox
                        checked={active}
                        onCheck={() => onActive(!active)}
                    />}
                disabled={!active}
                primaryText="Mixed"
                secondaryText={`Field control: ${value}`}
            >
                <div style={initialStyle.toolbarWrapper}>
                    <div style={initialStyle.toolbar}>
                        <div style={{
                            display: 'inline-flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            whiteSpace: 'nowrap',
                        }} >
                            <SelectField
                                style={{ left: 8 }}
                                disabled={!active}
                                multiple={false}
                                hintText="Select field"
                                value={value}
                                onChange={this.handleChangeField}
                            >
                                {this.menuFieldItems(value)}
                            </SelectField>
                        </div>
                    </div>
                </div>
            </ListItem>
        );
    }
}