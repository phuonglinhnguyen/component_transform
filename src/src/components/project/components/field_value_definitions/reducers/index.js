import { combineReducers } from 'redux';

import field_list from './field_list_reducer';
import field_item from './field_item_reducer';
import field_dialog from './field_dialog_reducer';
import field_preview from './field_preview_reducer';

const field_definition = combineReducers({
  field_list,
  field_item,
  field_dialog,
  field_preview
});

export default field_definition;
