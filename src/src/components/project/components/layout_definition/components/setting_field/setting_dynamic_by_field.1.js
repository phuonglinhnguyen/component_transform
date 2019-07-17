import React, { PureComponent } from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField'
import { COMPONENT_CHECKBOX, COMPONENT_COMBOBOX, COMPONENT_RADIO } from '../../../../../../constants/previous';
const initialStyle = {
    toolbarWrapper: {
        position: 'absolute',
        right: 0,
        zIndex: 2000,
    },
    toolbar: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        whiteSpace: 'nowrap',
    }
}


const RuleValue = ({ active, field, value, onChange }) => {
    if (field && [COMPONENT_CHECKBOX, COMPONENT_COMBOBOX, COMPONENT_RADIO].includes(field.control_type)) {
        return (
            <SelectField
                style={{ left: 8 }}
                disabled={!active}
                multiple={true}
                hintText="Select value"
                value={value}
                onChange={onChange}
            >
                {
                    field.argument_details.map(item => {
                        return (<MenuItem
                            key={item}
                            checked={value && value.includes(item)}
                            insetChildren={true}
                            value={item}
                            primaryText={item}
                        />)
                    })
                }
            </SelectField>
        )
    }
    return (
        <TextField
            onChange={event => onChange(null, null, event.target.value)}
            style={{ top: 0, left: 8 }}
            disabled={!active}
            name='value'
            value={value}
            floatingLabelText="Value"
            hintText="e.g: Field value1;Field value2"
            floatingLabelFixed={true}
        />
    )
}

export default class SettingDynamicByField extends PureComponent {
    handleChangeField = (nameAttr) => (event, index, valueField) => {
        const { onChange, name, data } = this.props;
        onChange(name, { ...data.value, [nameAttr]: valueField })
    }
    menuFieldItems = (section) => {
        const { sections, fields } = this.props;
        if(section){
            return sections.items.filter(item=>item.name===section)[0].fields.map((item) => {
                let _field = fields.map[item.field_id]
                return (
                    <MenuItem
                        key={_field.name}
                        insetChildren={true}
                        value={_field.name}
                        primaryText={_field.name}
                    />
                )
            });
        }
        return [];
    }
    render() {
        const {
            data,
            fields,
            name,
            sections,
            onActive = () => { },
        } = this.props;
        const { fieldMap } = this.props;
        const { active, value } = data;
        let field;
        if (value && value.field) {
            field = fields.items.filter(item => item.name === value.field)[0]
        }
        return (
            <div
                style={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    display: 'block',
                    fontSize: '16px',
                    minHeight: '40px',
                    lineHeight: '16px',
                    position: 'relative',
                    width: 'calc(100% - 90px)',
                    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                    marginLeft: '0px',
                    padding: '16px 16px 8px 72px',
                    cursor: 'pointer',
                }}
            >
                <div>Dynamic by Field</div>
                <div style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    overflow: 'visible',
                    display: 'block',
                    height: 'auto',
                    width: '24px',
                    top: '12px',
                    left: '16px',
                }}>
                    <Checkbox
                        checked={active}
                        onCheck={() => onActive(name, !active)}
                    />
                </div>
                <div style={{
                    display: 'inline-flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    whiteSpace: 'nowrap',
                    width: '100%'
                }} >
                    <SelectField
                        style={{ left: 8 }}
                        disabled={!active}
                        multiple={false}
                        hintText="Effect"
                        floatingLabelText="Effect"
                        value={value ? value.effect : null}
                        onChange={this.handleChangeField('effect')}
                    >
                        <MenuItem
                            key={'visible'}
                            insetChildren={true}
                            value={'visible'}
                            primaryText={'Visible/Invisible'}
                        />
                        <MenuItem
                            key={'enable'}
                            insetChildren={true}
                            value={'enable'}
                            primaryText={"Enable/Disable"}
                        />
                    </SelectField>
                    <SelectField
                        style={{ left: 8 }}
                        disabled={!active}
                        multiple={false}
                        hintText="Rule"
                        floatingLabelText="Rule"
                        value={value ? value.rule : null}
                        onChange={this.handleChangeField('rule')}
                    >
                        <MenuItem
                            key={'must_equal'}
                            insetChildren={true}
                            value={'must_equal'}
                            primaryText={'Must Equal'}
                        />
                        <MenuItem
                            key={'contain'}
                            insetChildren={true}
                            value={'contain'}
                            primaryText={"Contain"}
                        />
                    </SelectField>
                </div>
                <div style={{
                    display: 'inline-flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    whiteSpace: 'nowrap',
                    width: '100%'
                }} >
                    <SelectField
                        style={{ left: 8 }}
                        disabled={!active}
                        multiple={false}
                        hintText="Lookup Section"
                        floatingLabelText="Lookup Section"
                        value={value ? value.section : null}
                        onChange={this.handleChangeField('section')}
                    >
                        {sections.items.map(item => (
                            <MenuItem
                                key={item.name}
                                insetChildren={true}
                                value={item.name}
                                primaryText={item.name}
                            />
                        ))}
                    </SelectField>
                    <SelectField
                        style={{ left: 8 }}
                        disabled={!active}
                        multiple={false}
                        hintText="Lookup field"
                        floatingLabelText="Lookup field"
                        value={value ? value.field : null}
                        onChange={this.handleChangeField('field')}
                    >
                        {this.menuFieldItems(value&&value.section)}
                    </SelectField>
                    <RuleValue active={active} field={field} onChange={this.handleChangeField('value')} value={value ? value.value : ''} />
                </div>
            </div>
        );
    }
}