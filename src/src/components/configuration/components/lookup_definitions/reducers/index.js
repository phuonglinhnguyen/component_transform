import { combineReducers } from 'redux';

import lookup_list from './lookup_list_reducer';
import lookup_item from './lookup_item_reducer';
const lookup_definition = combineReducers({
  lookup_list,
  lookup_item,
});

export default lookup_definition;
