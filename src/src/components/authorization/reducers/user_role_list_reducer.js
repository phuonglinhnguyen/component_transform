import * as types from '../utils/user_roles_constants';


const initialState = {
    is_fetching: false,
    user_roles: [],
    selected_users: [],
    selected_roles: []


};

const user_role_list = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_ROLE_LIST_REQUEST:
            return {
                ...state,
                is_fetching: true
            };
        case types.USER_ROLE_LIST_RECEIVE:
            return {
                ...state,
                is_fetching: false,
                user_roles: action.user_roles
            };
        case types.USER_ROLE_SELECT_ROLES:
            return {
                ...state,
                selected_roles: action.selected_roles

            };
        case types.USER_ROLE_SELECT_USERS:
            return {
                ...state,
                selected_users: action.selected_users

            };
        case types.USER_ROLE_INSERT_ROLES:


            return {
                ...state,
                selected_roles: [],
                selected_users: []


            };
        case types.USER_ROLE_MERGE_DATA_INTO_LIST:


            return {
                ...state,
                user_roles: action.user_roles

            };

        default:
            return state;
    }
};
export default user_role_list;
