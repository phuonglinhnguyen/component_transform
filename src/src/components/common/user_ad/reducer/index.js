import * as types from '../constants';


const initialState = {
    is_fetching: false,
    users: [],


};

const user_ads = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_AD_LIST_REQUEST:
            return {
                ...state,
                is_fetching: true
            };
        case types.USER_AD_LIST_RECEIVE:
            return {
                ...state,
                is_fetching: false,
                users: action.users
            };
        case types.USER_AD_LIST_RESET_STATE:
            return {
                ...initialState
            };
        default:
            return state;
    }
};
export default user_ads;
