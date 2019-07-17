import { combineReducers } from 'redux';
import io_configurations_export from './io_configurations_export';
import projects from './projects';
import io_configurations_import from './io_configurations_import';
const io_configurations = combineReducers({
  io_configurations_export,
  io_configurations_import,
  projects
});

export default io_configurations;
