import {
  combineReducers
} from 'redux';
import {
  i18nReducer
} from 'react-redux-i18n';


import common from './common';
import user_role_management from '../components/authorization/reducers';

import layout from '../components/layout/reducers/layout_reducer';

import layout_header_information from '../components/layout/components/layout_header_information/reducer';
import layout_header_notification from '../components/layout/components/layout_header_icon_right_notification/reducer'; 

import login from '../components/login/reducers/login_reducer';

import * as configuration from '../components/configuration/reducers';

import * as prd from '../components/production/reducers';
import * as groups from '../components/group/reducers';

import  training from '../components/training/reducer'
/**
 * REPORT 
 */
import report from './report';

/*
 * PROJECT
 */
import project from '../components/project/reducers';
import acquisition from '../components/project/components/acquisitions/reducers/acquisition_reducer';
import layout_definitions from '../components/project/components/layout_definition/reducer';
import keying from '../components/production/components/key/reducers';
import keyings from '../components/production/components/keys/reducers';
import field_definition from '../components/project/components/field_value_definitions/reducers';
import export_configuration from '../components/project/components/export_configuration/reducers';
import field_tooltip from '../components/production/components/tooltip/reducers/tooltip_reducers';
import export_data from '../components/production_administration/components/export_data/reducers';

import tasks_assignment from '../components/project/components/tasks_assignment/reducers/index';
import qc_sampling from '../components/project/components/qc_sampling/reducers/index';
import assign_user from '../components/project/components/assign_user/reducers';
import workflow from '../components/project/components/workflow/reducers';
import project_monitor from '../components/project/components/monitor/reducers';
import announcement from '../components/project/components/announcement/reducers';
import production_admin from '../components/production_administration/reducers';
import report_detail from '../components/report_detail/reducer';
import digipay from '../components/digipay/reducer';

/*
 * END
 */

/*
 * WHAT THE FUCK
 */
import processing from '../components/common/processing/reducer/processing_reducer';

const rootReducer = combineReducers({
  i18n: i18nReducer,
  /**
   * Snackbar....
   */
  common,
  /**
   * REPORT
   */
  report,
  current_user: login,

  /*
  
  */
  digipay,
  report_detail,

  /**
   * Project
   */
  project,
  acquisition,
  layout_definitions,
  field_definition,
  export_configuration,
  keying,
  keyings,
  tasks_assignment,
  qc_sampling: qc_sampling,
  assign_user,
  workflow,
  project_monitor,
  announcement,
  export_data,
  // END

  /**
   * Config
   */
  config_validation_definition: configuration.validation_definition,
  config_pattern_definition: configuration.pattern_definition,
  config_lookup_definition: configuration.lookup_definition,
  config_error_definition: configuration.error_definition,
  config_user_role: user_role_management,
  config_service_definition: configuration.service_definitions,
  config_transform_rule_definition: configuration.transform_rule_definition,
  config_import_export_pre_defined: configuration.import_export_pre_defined,
  /**
   * production
   */
  production: prd.production,
  /**
   * GROUP MANAGEMENT
   */
  groups: groups.groups,
  group_assignment: groups.group_assignment,
  /**
   *  ?????? what the fuck
   *
   *
   * FUCK CODE
   */
  processing,
  field_tooltip,
  layout,
  production_admin,
  layout_header_information,
  layout_header_notification,
  training
});

export default rootReducer;