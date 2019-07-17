import React, { PureComponent } from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { TextField } from 'material-ui';
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
export default class SettingShortFocus extends PureComponent {
    handleChangeField = (event) => {
        const { onChange, name } = this.props;
        onChange(name, event.target.value)
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
                primaryText="Shortcut Focus"
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
                            <TextField
                                style={{ top: -0, left: 8 }}
                                disabled={!active}
                                onChange={this.handleChangeField}
                                name='shortcut'
                                value={value}
                                // floatingLabelText="shortcut"
                                hintText="e.g: f1"
                                // floatingLabelFixed={true}
                            />
                        </div>
                    </div>
                </div>
            </ListItem>
        );
    }
}