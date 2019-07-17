import { combineReducers } from 'redux';

import validation_list from './validation_list_reducer';
import validation_item from './validation_item_reducer';

const validation_definition = combineReducers({
  validation_list,
  validation_item
});

export default validation_definition;
