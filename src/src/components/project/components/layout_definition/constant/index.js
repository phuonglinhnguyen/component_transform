import {API_ENDPOINT} from '../../../../../constants';
export const URL_API = API_ENDPOINT;
export const URL_MODULE = 'layout-definitions';
export const NAME_STORE = 'layout_definitions';
export const NAMESPACE_MODULE = 'LAYOUT_DEFINITION';
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT';
export const UPDATE_SECTION = 'UPDATE_SECTION';
export const UPDATE_SECTION_TO_STORE = 'UPDATE_SECTION_TO_STORE';

export const MAX_TRY_RELOAD = 2;
export const TIME_TRY_RELOAD = [
    0, 1 * 1000,
    5 * 1000,
    10 * 1000,
    30 * 1000
]
export const TIME_TRY_LOAD = 5 * 1000;

export const ACTION_CREATE = 'create';

export const SETTING_TITLE = {
    'omr': 'projects.layout_definitions.title.setting.omr',
    'source_refer': 'projects.layout_definitions.title.setting.source_refer',
    'multiple': 'projects.layout_definitions.title.setting.multiple',
    'is_multiple': 'projects.layout_definitions.title.setting.is_multiple',
    'double_typing': 'projects.layout_definitions.title.setting.double_typing',
}