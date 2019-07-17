import React, { useState, useEffect } from 'react';
import clone from 'clone'
import Checkbox from 'material-ui/Checkbox';
import { RaisedButton, Chip } from 'material-ui';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Add from 'material-ui/svg-icons/content/add';
import DialogGroupField from './dynamic_fields/dialog_cru_group'
import { EFFECT_TITLE_SHORT } from './dynamic_fields/constant'
import ListGroupsDynamic from './ListGroupsDynamic';
export const EFFECT_FIELD_KEY = {
    VISIBLE: 'visible',
    INVISIBLE: 'invisible',
    ENABLE: 'enable',
    DISABLE: 'disable',
}
export const EFFECT_FIELD_TITLE = {
    [EFFECT_FIELD_KEY.VISIBLE]: "Invisible > Visible",
    [EFFECT_FIELD_KEY.INVISIBLE]: "Visible > Invisible",
    [EFFECT_FIELD_KEY.ENABLE]: "Disable > Enable",
    [EFFECT_FIELD_KEY.DISABLE]: "Enable > Disable",
}



const SettingDynamicByField = (props) => {
    const {
        data,
        fields,
        name,
        onChange,
        sections,
        onActive = () => { },
        fieldMap,
    } = props;
    let group = [];
    const { active, value } = data;
    const [groupId, setGroupId] = useState(-1);
    const [openDialog, setOpenDialog] = useState(false)
    useEffect(() => {
        setGroupId(-1)
    }, [-1])
    if (groupId > -1) {
        group = data && data.value && data.value.groups && data.value.groups[groupId] || []
    }


    const handleChangeEffect = (event, index, value) => {
        onChange(name, {
            ...data.value,
            effect: value,
        })
    }
    const updateGroupField = (id, datas) => {
        let groups = data.value && data.value.groups || [];
        if (id === -1) {
            groups.push(datas)
        } else {
            groups.splice(id, 1, datas)
        }
        setOpenDialog(false);
        onChange(name, {
            ...data.value,
            groups
        })
    }
    const handleDeleteGroup = (id) => () => {
        let groups = clone(data.value.groups)
        groups.splice(id, 1)
        onChange(name, {
            ...data.value,
            groups
        })
    }
    const handleClickGroup = (id) => () => {
        setGroupId(id)
        setOpenDialog(true)
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
                cursor: 'pointer',
                position: 'absolute',
                overflow: 'visible',
                display: 'block',
                height: 'auto',
                top: '-30px',
                right: '16px',
            }}>
                <DialogGroupField
                    fieldList={fields.items}
                    fieldMap={fields.map}
                    sections={sections.items}
                    group={group}
                    groupId={groupId}
                    open={openDialog}
                    updateGroupField={updateGroupField}
                    onClose={() => setOpenDialog(false)} />

                <SelectField
                    style={{ left: 8 }}
                    disabled={!active}
                    multiple={false}
                    hintText="Effect"
                    floatingLabelText="Effect"
                    value={value && value.effect}
                    onChange={handleChangeEffect}
                >
                    <MenuItem
                        insetChildren={true}
                        value={EFFECT_FIELD_KEY.VISIBLE}
                        primaryText={EFFECT_FIELD_TITLE[EFFECT_FIELD_KEY.VISIBLE]}
                    />
                    <MenuItem
                        insetChildren={true}
                        value={EFFECT_FIELD_KEY.INVISIBLE}
                        primaryText={EFFECT_FIELD_TITLE[EFFECT_FIELD_KEY.INVISIBLE]}
                    />
                    <MenuItem
                        insetChildren={true}
                        value={EFFECT_FIELD_KEY.ENABLE}
                        primaryText={EFFECT_FIELD_TITLE[EFFECT_FIELD_KEY.ENABLE]}
                    />
                    <MenuItem
                        insetChildren={true}
                        value={EFFECT_FIELD_KEY.DISABLE}
                        primaryText={EFFECT_FIELD_TITLE[EFFECT_FIELD_KEY.DISABLE]}
                    />
                </SelectField>
            </div>
            <div style={{ marginTop: 40, position: "relative" }}>
                <RaisedButton
                    disabled={!active}
                    style={{ position: 'absolute', right: 15, top: -25, minWidth: 45, height: 45 }}
                    onClick={handleClickGroup(-1)}
                    icon={<Add />}
                    primary={true}
                />
                <ListGroupsDynamic groups={value && value.groups || []} onClickItem={handleClickGroup} onDeleteItem={handleDeleteGroup} />
            </div>
        </div>
    );
}

export default React.memo(SettingDynamicByField)