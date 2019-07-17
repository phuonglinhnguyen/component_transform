import { combineReducers } from 'redux';

import service_list from './service_list_reducer';
import service_item from './service_item_reducer';

const service_definition = combineReducers({
  service_list,
  service_item
});

export default service_definition;
