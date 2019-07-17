import * as types from '../constants';

const initialState = {
    is_fetching: false,
    projects: [],
    selected_project: null
};

const select_project = (state = initialState, action) => {
    switch (action.type) {
        case types.SELECT_PROJECT_LIST_REQUEST:
            return {
                ...state,
                is_fetching: true
            };
        case types.SELECT_PROJECT_LIST_RECEIVE_DATAS:
            return {
                ...state,
                projects: action.projects,
                selected_project: action.projects.length > 0 && action.projects[0],
                is_fetching: false
            };
        case types.SELECT_PROJECT_SELECT_ITEM:
            return {
                ...state,
                selected_project: action.project,
            };
        case types.SELECT_PROJECT_RESET_STATE:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default select_project;
