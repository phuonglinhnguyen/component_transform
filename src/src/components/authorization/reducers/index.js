import { combineReducers } from 'redux';
import user_role_list from './user_role_list_reducer';
import user_role_dialog from './user_role_dialog_reducer'


const user_role = combineReducers({
    user_role_list,
    user_role_dialog

});

export default user_role;
