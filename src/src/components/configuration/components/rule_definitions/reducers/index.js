import { combineReducers } from 'redux';

import transform_rule_list from './transform_rule_list_reducer';
import transform_rule_item from './transform_rule_item_reducer';

const transform_rule_definition = combineReducers({
  transform_rule_list,
  transform_rule_item
});

export default transform_rule_definition;
