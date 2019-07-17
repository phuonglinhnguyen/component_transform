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
export default class SettingCopyField extends PureComponent {
    handleChangeField = (event, index, value) => {
        const { onChange, name } = this.props;
        onChange(name, value)
    }
    menuFieldItems = (values) => {
        const { fields } = this.props
        return fields.items.map((item) => {
            return (
                <MenuItem
                    key={item.name}
                    insetChildren={true}
                    value={item.name}
                    primaryText={item.name}
                />
            )
        });
    }
    render() {
        const {
            data,
            fields,
            name,
            onActive = () => { },
        } = this.props;
        const { fieldMap } = this.props;
        const { active, value } = data;
        return (
            <ListItem
                leftCheckbox={
                    <Checkbox
                        checked={active}
                        onCheck={() => onActive(name, !active)}
                    />}
                disabled={!active}
                primaryText="Field Auto Copy"
                secondaryText={`${value || ''}`}
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
                                hintText="Select auto copy"
                                value={value}
                                onChange={this.handleChangeField}
                            >
                                {this.menuFieldItems()}
                            </SelectField>
                        </div>
                    </div>
                </div>
            </ListItem>
        );
    }
}