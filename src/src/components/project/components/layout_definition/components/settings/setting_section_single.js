import React from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField'

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


export default (props) => {
    const { isMultiple, onChange, onActive, fieldId, autoIncrement, fieldSource, autoIncrementStart, fields} = props;
    return (
        <ListItem
            leftCheckbox={
                <Checkbox checked={isMultiple}
                    onCheck={() => onActive(!isMultiple)} />}
            primaryText="Section Multiple"
            secondaryText={isMultiple
                ? 'Multiple'
                : 'Single'}
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
                            style={{ width: 150 }}
                            disabled={!isMultiple}
                            multiple={false}
                            floatingLabelText="FieldID"
                            hintText="FieldID"
                            value={fieldId}
                            onChange={(event, index, value) => {
                                onChange({ name: 'fieldId', value })
                            }}
                        >
                            <MenuItem
                                value={null}
                                primaryText=""
                            />
                            {fieldSource.map((item) => {
                                let _item = fields.map[item.field_id]
                                if (_item) {
                                    return (
                                        <MenuItem
                                            key={_item.name}
                                            value={_item.name}
                                            primaryText={_item.field_display}
                                        />
                                    )
                                } else {
                                    return (
                                        <MenuItem
                                            key={item.field_id}
                                            value={item.field_id}
                                            primaryText={`Field ${item.field_id} is deleted!`}
                                        />
                                    )
                                }
                            })
                            }
                        </SelectField>
                        <SelectField
                            style={{ width: 100 }}
                            disabled={!isMultiple}
                            multiple={false}
                            floatingLabelText="AutoIncrement"
                            hintText="AutoIncrement"
                            value={autoIncrement}
                            onChange={(event, index, value) => {
                                onChange({ name: 'autoIncrement', value })
                            }}
                        >
                            <MenuItem
                                value={''}
                                primaryText=""
                            />
                            <MenuItem
                                value={'section'}
                                primaryText="Section"
                            />
                            <MenuItem
                                value={'layout'}
                                primaryText="Layout"
                            />
                        </SelectField>
                        <TextField
                            style={{ top: -24, left: 8, width: 100 }}
                            disabled={!isMultiple}
                            onChange={event => {
                                let { value } = event.target;
                                onChange({ name: 'autoIncrementStart', value })

                            }}
                            name='record'
                            value={autoIncrementStart}
                            type='number'
                            floatingLabelText="AutoIncrement Start"
                            hintText="e.g: 1"
                            floatingLabelFixed={true}
                        /><br />

                    </div>
                </div>
            </div>
        </ListItem>

    );
}