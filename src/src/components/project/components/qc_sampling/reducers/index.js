import { combineReducers } from 'redux';

import filter_attr_batch from './attr_batch_reducer';
import filter_attr_user from './attr_user_reducer';
import filter_attr_field from './attr_field_reducer';
import filter_attr_layout from './attr_layout_reducer';
import qc_sampling from './qc_sampling_reducer';

const filter_attribute = combineReducers({
  filter_attr_batch,
  filter_attr_layout,
  filter_attr_user,
  filter_attr_field
});

const index = combineReducers({
  qc_sampling,
  filter_attribute
});

export default index;
