import { combineReducers } from 'redux';

import group_management from './group_management_reducer';
import group_item from './group_item_reducer';

export default combineReducers({
    group_management,
    group_item
});
