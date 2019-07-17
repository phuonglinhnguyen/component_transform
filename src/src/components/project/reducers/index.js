import { combineReducers } from "redux";
import project_item from "./project_item_reducer";
import project_list from "./project_list_reducer";
import project_group from "./project_group_reducer";
import response_evaluation from "../components/response_evaluation/reducers";
import detail_sources from "../components/detail_sources/reducer";
import upload_configuration from "../components/update_configuration/reducers";
import io_configurations from "../components/io_configuration/reducers";
// import ocr_test from "../components/ocr_test/reducers";
// import verifying_configuration from "../components/verifying_configuration/reducers";
// import rework_details from "../components/rework_details/reducers";

const project = combineReducers({
  project_item,
  project_group,
  project_list,
  response_evaluation,
  detail_sources,
  upload_configuration,
  io_configurations,
});
export default project;
