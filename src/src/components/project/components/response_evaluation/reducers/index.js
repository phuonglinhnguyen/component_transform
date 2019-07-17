import { combineReducers } from 'redux';

import response_evaluation_list from './response_evaluation_list_reducer';
import response_evaluation_item from './response_evaluation_item_reducer';
import response_evaluation_dialog from './response_evaluation_dialog_reducer';

const response_evaluation = combineReducers({
  response_evaluation_list,
  response_evaluation_item,
  response_evaluation_dialog
});

export default response_evaluation;
