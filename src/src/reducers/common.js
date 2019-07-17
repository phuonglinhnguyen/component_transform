import { combineReducers } from "redux";
import select_project from "../components/common/select_project/reducers";
import common_processing from "../components/common/snackbars/reducers/common_processing";
import field_validation from "../components/common/field_validation/reducers/field_validation_reducer";
import user_ads from "../components/common/user_ad/reducer";
import common_dialog from "../components/common/dialog/reducers/dialog_reducer";
import notification from "../components/common/notification/reducer";
import notification_bar from "../components/common/notification/bar/reducer";

import call_ajax from "../components/common/ajax/call_ajax/reducers/call_ajax_reducer";
import working_detail from '../components/common/monitor_working_detail/reducers'

const rootReducer = combineReducers({
  common_processing,
  field_validation,
  common_dialog,
  user_ads,
  select_project,
  notification,
  notification_bar,
  ajax_call_ajax: call_ajax,
  working_detail
});

export default rootReducer;
