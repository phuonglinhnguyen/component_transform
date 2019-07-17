import React, { PureComponent } from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import ChipInput from 'material-ui-chip-input';
import clone from 'clone';
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

const lands=[
    {value:'at',title:'Austria'},
    {value:'ch',title:'Chamorro'},
    {value:'cz',title:'Czech'},
    {value:'de',title:'German'},
    {value:'dk',title:'Denmark'},
    {value:'ee',title:'Ewe'},
    {value:'es',title:'Spanish'},
    {value:'fr',title:'French'},
    {value:'hu',title:'Hungarian'},
    {value:'lt',title:'Lithuanian'},
    {value:'pl',title:'Polish'},
    {value:'ro',title:'Romanian'},
    {value:'sk',title:'Slovak'},
]

export default class SettingSpecialLand extends PureComponent {
    handleChangeField = (event, index, value) => {
        const { onChange } = this.props;
        onChange(value)
    }
    render() {
        const {
            value = [],
            isActive,
            onChange,
            onActive = () => { },
        } = this.props;
        return (
            <ListItem
                leftCheckbox={
                    <Checkbox
                        checked={isActive}
                        onCheck={() => onActive(!isActive)}
                    />}
                disabled={!isActive}
                primaryText="Special Land"
                secondaryText={value.length>0?`Land: ${value.join(', ')}`:'None'}
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
                                disabled={!isActive}
                                multiple={true}
                                hintText="Select lands"
                                value={value}
                                onChange={this.handleChangeField}
                            >
                                {lands.map((item) => {
                                    return(<MenuItem
                                        key={item.value}
                                        insetChildren={true}
                                        checked={value && value.indexOf(item.value) > -1}
                                        value={item.value}
                                        primaryText={item.value}
                                    />)
                            })}
                            </SelectField>
                        </div>
                    </div>
                </div>
            </ListItem>
        );
    }
}