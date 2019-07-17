import { combineReducers } from 'redux';

import export_configuration_list from './export_configuration_list_reducer';
import export_configuration_item from './export_configuration_item_reducer';
import export_configuration_dialog from './export_configuration_dialog_reducer';

const export_configuration_definition = combineReducers({
  export_configuration_list,
  export_configuration_item,
  export_configuration_dialog
});

export default export_configuration_definition;
