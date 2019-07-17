import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { TextField, RaisedButton, Chip } from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';

const initialStyle = {
    toolbar: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        whiteSpace: 'nowrap',
    }
}
export default class SettingShortCutCopyField extends Component {
    state = {
        shortcut: '',
        error: '',
        field_name: ''
    }
    handleChangeField = (event, index, value) => {
        this.setState({ field_name: value })
        // onChange(name, value)
    }
    handleChangeShortCut = (event) => {
        let shortcut = event.target.value;
        const {
            data,
        } = this.props;
        const value = data.value || [];
        let _shortcut = value.find(item => item.shortcut === shortcut.toLowerCase())
        if (_shortcut) {
            this.setState({ error: true, shortcut: shortcut })
        } else {
            this.setState({ error: false, shortcut: shortcut })
        }
    }
    handleAddViewConfig = () => {
        const {
            data,
            name,
            onChange,
        } = this.props;
        const { active, value = [] } = data;
        const { shortcut, field_name } = this.state;
        let _shortcut = value && value.find(item => item.shortcut === shortcut.toLowerCase())
        if (_shortcut) {
            this.setState({ error: true })
        } else {
            if (shortcut.trim() && field_name.trim()) {
                let _value = [...(value || []), { shortcut, field_name }];
                onChange(name, _value)
                this.setState({ shortcut: '', field_name: '' })
            }
        }

    }
    menuFieldItems = (values) => {
        const { fields, data, field } = this.props
        const value = data.value || [];
        let fieldsSelected = value.map(item => item.field_name);

        fieldsSelected.push(fields.map[field.field_id].name)
        return fields.items.filter(item => !fieldsSelected.includes(item.name)).map((item) => {
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
            onChange,
            onActive = () => { },
        } = this.props;
        const { fieldMap } = this.props;
        const { shortcut, field_name, error } = this.state;
        const { active, value } = data;
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
                    padding: '16px 16px 0px 72px',
                    cursor: 'pointer',
                }}
            // leftCheckbox={
            // }
            // disabled={!active}
            // primaryText="Field Shortcut Copy"
            // secondaryText={`${value || ''}`}
            >
                <div>Field Shortcut Copy</div>
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
                        hintText="Select auto copy"
                        value={field_name}
                        onChange={this.handleChangeField}
                    >
                        {this.menuFieldItems()}
                    </SelectField>
                    <TextField
                        style={{ top: -24, left: 8 }}
                        disabled={!active}
                        onChange={this.handleChangeShortCut}
                        name='shortcut'
                        value={shortcut}
                        floatingLabelText="shortcut"
                        hintText="e.g: f1"
                        errorText={error ? 'Shortcut has used' : ''}
                        floatingLabelFixed={true}
                    />
                    <RaisedButton
                        style={{ marginTop: 5, minWidth: 45, height: 45  }}
                        onClick={() => this.handleAddViewConfig()}
                        icon={<Add />}
                        primary={true}
                    />
                </div>
                <div>
                    {value ? value.map((item, id) => {
                        return (<Chip
                            onRequestDelete={_ => {
                                let _value = [...value]
                                _value.splice(id, 1)
                                onChange(name, _value);
                            }}
                        >
                            <span style={{ fontSize: '1.1em', display: 'inline-block', marginRight: 8 }}>
                                {item.shortcut.toUpperCase()}
                            </span>
                            {item.field_name}
                        </Chip>
                        )
                    }) : ''}

                </div>
            </div>
        );
    }
}