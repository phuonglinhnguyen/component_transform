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

export default class SettingDoubleTyping extends PureComponent {
    handleChangeField = (event, index, value) => {
        const { onChangeFields } = this.props;
        onChangeFields(value)
    }

    menuFieldItems = (values) => {
        const { fieldSource, fields } = this.props
        return fieldSource.map((item) => {
            let _item = fields.map[item.field_id]
            if (_item) {
                return (
                    <MenuItem
                        key={_item.name}
                        insetChildren={true}
                        checked={values && values.indexOf(item.field_id) > -1}
                        value={item.field_id}
                        primaryText={_item.name}
                    />
                )
            } else {
                return (
                    <MenuItem
                        key={item.field_id}
                        insetChildren={true}
                        checked={false}
                        value={item.field_id}
                        primaryText={`Field ${item.field_id} is deleted!`}
                    />
                )
            }
        });
    }
    render() {
        const {
            active,
            onActive = () => { },
        } = this.props;
        const { fieldMap } = this.props;
        return (
            <ListItem
                leftCheckbox={
                    <Checkbox
                        checked={active}
                        onCheck={() => onActive(!active)}
                    />}
                disabled={!active}
                primaryText="Disable Fields"
                secondaryText={`${fieldMap.length || 0} Fields`}
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
                                multiple={true}
                                hintText="Select fields"
                                value={fieldMap}
                                onChange={this.handleChangeField}
                            >
                                {this.menuFieldItems(fieldMap)}
                            </SelectField>
                        </div>
                    </div>
                </div>
            </ListItem>
        );
    }
}