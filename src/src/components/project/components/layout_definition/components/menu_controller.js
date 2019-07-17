import React from 'react'
import Toolbar from './menu_toolbar';
import { Translate } from 'react-redux-i18n';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ListSection from './list_section_component';
import SettingList from './settings/setting_list';
import PopupSortSection from './sort_sections'
import { validateSections, validateSectionsComflict } from '../actions/common_action';
import LayoutType from './layout_type_component'
const _style = {
    full: {
        width: 'calc(100% )',
        height: 'calc(100% - 32px )',
        position: 'relative',
    },
}

export const MenuController = (props) => {
    const {
        info,
        height,
        fields,
        layout,
        sections,
        layoutActions,
        notifyActions,
        sectionActions,
    } = props
    let loading = fields.isFetching || sections.isFetching;
    let layoutError = '';
    layoutError = layout.required ? <Translate value="error_text.field_required" /> : layout.layoutSaveError ? <Translate value={`layout_definitions.error${layout.layoutSaveError}`} /> : '';
    return (
        <div style={_style.full}>
            <SettingList sections={sections} sectionActions={sectionActions} fields={fields} />
            <Toolbar onSave={() => {
                if (!layout.item.name || layout.item.name.length === 0) {
                    layoutActions.changeName('')
                    notifyActions.warning('', 'projects.layout_definitions.message.warning.required_layout_name', { i18: !0 });
                } else {
                    let validateSection = validateSections(sections.items);
                    if (validateSection > -1) {
                        sectionActions.chooseSection(validateSection);
                        notifyActions.warning('', 'projects.layout_definitions.message.warning.required_section_name', { i18: !0 });
                    } else if (validateSectionsComflict(sections.items)) {
                        notifyActions.error('', 'projects.layout_definitions.message.error.comflict_section_name', { i18: !0 });
                    } else {
                        layoutActions.saveLayout(info);
                    }
                }
            }}
                info={info}
                isSaving={layout.isSaving} />
            <TextField
                style={{ marginLeft: 16, width: 'calc(100% - 32px)' }}
                errorText={layoutError}
                value={layout.item.name || ''}
                hintText={
                    <Translate value="projects.layout_definitions.hint_text.layout_name" />
                }
                fullWidth={true}
                underlineStyle={{ borderColor: 'gray' }}
                onBlur={event => {
                    let val = event.target.value;
                    layoutActions.changeName(val)
                }}
                onKeyDown={event => {
                    event.stopPropagation();
                }}
                onChange={event => {
                    let val = event.target.value;
                    layoutActions.changeName(val)
                }}
                name="name"
            />

            <TextField
                style={{ marginLeft: 16, width: 'calc(100% - 32px)' }}
                value={layout.item.hot_key || ''}
                underlineStyle={{ borderColor: 'gray' }}
                hintText={
                    <Translate value="projects.layout_definitions.hint_text.layout_hot_key" />
                }
                fullWidth={true}
                onBlur={event => {
                    let val = event.target.value;
                    layoutActions.changeHotkey(val)
                }}
                onKeyDown={event => {
                    event.stopPropagation();
                }}
                onChange={event => {
                    let val = event.target.value;
                    layoutActions.changeHotkey(val)
                }}
                name="hot_key"
            />
            <div style={{ position: 'relative', width: '100%' }}>
                <LayoutType onChange={(event, val) => {
                     layoutActions.changeProp('type', val) 
                     }} value={layout.item.type} />
                <div style={{ position: 'absolute', top: -4, right: 16 }}>
                    <PopupSortSection items={sections.items} onSortSections={sectionActions.sortSections} />
                </div>
            </div>
            {!loading ?
                <ListSection
                    layoutType={layout.item.type}
                    height={height - 231}
                    fields={fields}
                    sections={sections}
                    sectionActions={sectionActions}
                />
                : ''}
        </div>
    )
}

export default MenuController