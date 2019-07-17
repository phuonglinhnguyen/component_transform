import { combineReducers } from 'redux';

import error_list from './error_list_reducer';
import error_item from './error_item_reducer';

const error_definition = combineReducers({
  error_list,
  error_item,
});

export default error_definition;
