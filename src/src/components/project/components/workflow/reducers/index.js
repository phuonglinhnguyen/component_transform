import { combineReducers } from "redux";

import workflow_list from "./workflow_list_reducer";

import workflow_item from "./workflow_item_reducer";
import workflow_item_monitor from "./workflow_item_monitor_reducer";
import workflow_item_history from "./workflow_item_history_reducer";
import workflow_item_config from "./workflow_item_config_reducer";
import workflow_item_migration from "./workflow_item_migration_reducer";

const workflow = combineReducers({
  list: workflow_list,
  item: workflow_item,
  item_history: workflow_item_history,
  item_config: workflow_item_config,
  item_monitor: workflow_item_monitor,
  item_migration: workflow_item_migration
});

export default workflow;
