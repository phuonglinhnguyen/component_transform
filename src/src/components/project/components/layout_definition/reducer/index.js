import { combineReducers } from 'redux';
import layouts from './layouts_reducer';
import layout from './layout_reducer';
import sections from './sections_reducer';
import fields from './fields_reducer';
import images from './images_reducer';
import redirect from './redirect_reducer';
export default combineReducers({
  layouts,
  layout,
  sections,
  fields,
  images,
  redirect,
});
