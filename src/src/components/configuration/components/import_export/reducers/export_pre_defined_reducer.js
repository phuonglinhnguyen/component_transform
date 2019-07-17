import * as types from '../constants';

const initialState = {
    open_dialog: false,
    datas: [],
selected_items: [],
    is_fetching: false,
    key:''
};

const export_pre_defined = (state = initialState, action) => {
    switch (action.type) {
        case types.PRE_DEFINED_EXPORT_OPEN_DIALOG:
            return {
                ...state,
                open_dialog: true,
               datas: action.datas,
                key:action.key
            };
        case types.PRE_DEFINED_EXPORT_CLOSE_DIALOG:
            return {
                ...initialState,

            };
        case types.PRE_DEFINED_EXPORT_SAVE_DATAS:
            return {
                ...initialState

            };

        case types.PRE_DEFINED_EXPORT_CHECK_ITEMS:
            return {
                ...state,
                selected_items: action.selected_items
            };
        default:
            return state;
    }
};

export default export_pre_defined;
