import * as types from '../constants';


const initialState = {
    is_fetching: false,
    user_assigneds: [],
    user_not_assigneds: [],
    user_ads: [],


};

const group_assignment = (state = initialState, action) => {
    switch (action.type) {
        case types.GROUP_ASSIGNMENT_REQUEST_DATAS:
            return {
                ...state,
                is_fetching: true,

            };
        case types.GROUP_ASSIGNMENT_RECEIVE_DATAS:
            return {
                ...state,
                is_fetching: false,
                user_assigneds: action.user_assigneds,
                user_not_assigneds: action.user_not_assigneds,
                user_ads: action.user_ads

            };

        case types.GROUP_ASSIGNMENT_RESET_STATE:
            return {
                ...initialState

            };
        case types.GROUP_ASSIGNMENT_ASSIGN_SUCESS:
            return {
                ...state,
            
                user_assigneds: action.user_assigneds,
                user_not_assigneds: action.user_not_assigneds,
               

            };
            case types.GROUP_ASSIGNMENT_UN_ASSIGN_SUCESS:
            return {
                ...state,
            
                user_assigneds: action.user_assigneds,
                user_not_assigneds: action.user_not_assigneds,
               

            };

        default:
            return state;
    }
};
export default group_assignment;
