import * as types from '../utils/user_roles_constants';


const initialState = {
    open: false,
    user: null,
    user_saved: null

};

const user_role_dialog = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_ROLE_DIALOG_OPEN:
            return {
                ...state,
                open: true,
                user: action.user
            };
        case types.USER_ROLE_DIALOG_SAVE_ROLE:
            return {
                ...state,

                user_saved: action.user_saved
            };
        case types.USER_ROLE_DIALOG_CLOSE:
            return {
                ...state,
                open: false,
                user: null,

            };
        case types.USER_ROLE_DIALOG_RESET_STATE:
            return {
                ...state,
                open: false,
                user: null
            };

        default:
            return state;
    }
};
export default user_role_dialog;
