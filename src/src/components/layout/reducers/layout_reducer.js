import * as types from '../constants/layout_constant'

const initialState = {

    key: '',
    tabRoutes: [],
    activeTabIndex: -1,

}

const layout = (state = initialState, action) => {
    switch (action.type) {
        case types.LAYOUT_SIDEBAR_SELECT:
            return {
                ...state,
                tabRoutes: action.tabRoutes,
                key: action.key,

            };
        case types.LAYOUT_ACTIVE_TAB:
            return {
                ...state,
                activeTabIndex: action.activeTabIndex
            };
        default:
            return state;
    }
}

export default layout;
