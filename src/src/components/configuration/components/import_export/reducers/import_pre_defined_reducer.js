import * as types from '../constants';

const initialState = {
    open_dialog: false,
    datas: [],
  selected_items: [],
    file: null,
    error_text: '',
    key:''
};

const import_pre_defined = (state = initialState, action) => {
    switch (action.type) {
        case types.PRE_DEFINED_IMPORT_OPEN_DIALOG:
            return {
                ...state,
                open_dialog: true,
                key:action.key
            };
        case types.PRE_DEFINED_IMPORT_CLOSE_DIALOG:
            return {
                ...initialState
            };
        case types.PRE_DEFINED_IMPORT_CHANGE_FILE:
            return {
                ...state,
                file: action.file,
                datas: action.datas,
              error_text: action.error_text,
                selected_items:[]
            };
        case types.PRE_DEFINED_IMPORT_CHECK_ITEMS:
            return {
                ...state,
                selected_items: action.selected_items
            };
        case types.PRE_DEFINED_IMPORT_SAVE_DATAS:
            return {
                ...initialState,
              
            };
        default:
            return state;
    }
};

export default import_pre_defined;
