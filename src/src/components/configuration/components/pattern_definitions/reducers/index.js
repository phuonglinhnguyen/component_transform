import { combineReducers } from 'redux';

import pattern_list from './pattern_list_reducer';
import pattern_item from './pattern_item_reducer';

const pattern_definition = combineReducers({
  pattern_list,
  pattern_item,
});

export default pattern_definition;
