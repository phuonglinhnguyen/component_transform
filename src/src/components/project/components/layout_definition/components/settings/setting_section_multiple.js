import React, { PureComponent } from 'react';
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


export default class SettingLoadDataSource extends PureComponent {
    onChange = (event) => {
        const { onChange } = this.props;
        let val = event.target.value;
        onChange(val)
    }
    handleChangeMask = (event, index, value) => {
        const { onChangeMask } = this.props;
        onChangeMask(value)
    }
    render() {
        const {
            recordNo=0,
            mask,
            isMultiple,
            onActive = () => { },
            } = this.props;
        return (
            <ListItem
                leftCheckbox={
                    <Checkbox
                        checked={isMultiple}
                        onCheck={() => onActive(!isMultiple)}
                    />}
                disabled={!isMultiple}
                primaryText="Section Multiple Records"
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
                                hintText="Select type"
                                value={mask}
                                onChange={this.handleChangeMask}
                            >
                             <MenuItem
                                value={null}
                                primaryText=""
                            />
                              <MenuItem
                                value={'define_mask'}
                                primaryText="Define mask"
                            />
                             <MenuItem
                                value={'require_mask'}
                                primaryText="Render by mask"
                            />
                            </SelectField>
                             <TextField
                             style={{top:-24, left:8}}
                             disabled={!isMultiple}
                             
                                onChange={this.onChange}
                                name='record'
                                value={recordNo}
                                type='number'
                                floatingLabelText="Number of records"
                                hintText="e.g: 10"
                                floatingLabelFixed={true}
                                /><br />
                        </div>
                    </div>
                </div>
            </ListItem>
        );
    }
}