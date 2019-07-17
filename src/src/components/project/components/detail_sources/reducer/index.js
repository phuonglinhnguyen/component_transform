import * as types from '../constants';

const initialState = {
    is_fetching: false,
    layouts: []

};

const detail_sources = (state = initialState, action) => {
    switch (action.type) {
        case types.DETAIL_SOUCRES_LIST_LAYOUTS_REQUEST:
            return {
                ...state,
                is_fetching: true
            };
        case types.DETAIL_SOUCRES_LIST_LAYOUTS_RECEIVE:
            return {
                ...state,
                is_fetching: false,
                layouts: action.layouts
            };
        case types.DETAIL_SOUCRES_RESET_STATE:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default detail_sources;
