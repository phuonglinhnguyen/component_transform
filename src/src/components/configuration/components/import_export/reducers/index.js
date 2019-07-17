import { combineReducers } from 'redux';

import export_pre_defined from './export_pre_defined_reducer';
import import_pre_defined from './import_pre_defined_reducer';

const import_export_pre_defined = combineReducers({
  export_pre_defined,
  import_pre_defined
});

export default import_export_pre_defined;
