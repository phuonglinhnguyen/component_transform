import { GOTO } from '../actions/redirect_action';
const gotoInitialState = {
    goto: '',
}
export default (state = gotoInitialState, action) => {
    switch (action.type) {
        case GOTO.LIST:
            return {
                goto: action.type
            }
        case GOTO.RESET:
            return gotoInitialState;
        default:
            return state;
    }
}