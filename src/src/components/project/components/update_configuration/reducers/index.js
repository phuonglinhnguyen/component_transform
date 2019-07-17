import { combineReducers } from 'redux';
import item_upload_configuration from './item_upload_configuration_reducer';
import list_upload_configuration from './list_upload_configuration_reducer';
import redirect from './goto_reducer';
const upload_configuration = combineReducers({
    item_upload_configuration,
    list_upload_configuration,
    redirect,
})
export default upload_configuration;