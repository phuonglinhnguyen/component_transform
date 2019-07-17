import layout from './layoutReducer'
import {
    combineReducers
  } from 'redux';
  import {
    i18nReducer
  } from 'react-redux-i18n';
  

  import common from './common';
  import user_role_management from '../components/authorization/reducers';
  
  import layout_header_information from '../components/layout/components/layout_header_information/reducer';
  import layout_header_notification from '../components/layout/components/layout_header_icon_right_notification/reducer'; 
  
  import login from '../components/login/reducers/login_reducer';
  
  import * as configuration from '../components/configuration/reducers';
  
  // import * as prd from '../components/production/reducers';
  import * as groups from '../components/group/reducers';
  
  // import  training from '../components/training/reducer'
  /**
   * REPORT 
   */
  // import report from './report';
  
  /*
   * PROJECT
   */
  import project from '../components/project/reducers';
  // import acquisition from '../components/project/components/acquisitions/reducers/acquisition_reducer';
  import layout_definitions from '../components/project/components/layout_definition/reducer';
  // import keying from '../components/production/components/key/reducers';
  // import keyings from '../components/production/components/keys/reducers';
  import field_definition from '../components/project/components/field_value_definitions/reducers';
  import export_configuration from '../components/project/components/export_configuration/reducers';
  // import field_tooltip from '../components/production/components/tooltip/reducers/tooltip_reducers';
  // import export_data from '../components/production_administration/components/export_data/reducers';
  
  // import tasks_assignment from '../components/project/components/tasks_assignment/reducers/index';
  import qc_sampling from '../components/project/components/qc_sampling/reducers/index';
  // import assign_user from '../components/project/components/assign_user/reducers';
  import workflow from '../components/project/components/workflow/reducers';
  // import project_monitor from '../components/project/components/monitor/reducers';
  // import announcement from '../components/project/components/announcement/reducers';
  // import production_admin from '../components/production_administration/reducers';
  // import report_detail from '../components/report_detail/reducer';
  // import digipay from '../components/digipay/reducer';

  import processing from '../components/common/processing/reducer/processing_reducer';
  import reducer_plus from '../store/reducers'
  const rootReducer = {
    i18n: i18nReducer,
    ...reducer_plus,
    /**
     * Snackbar....
     */
    common,
    /**
     * REPORT
     */
    current_user: login,
  
    /**
     * Project
     */
    project,
    layout_definitions,
    field_definition,
    export_configuration,
    workflow,
    qc_sampling,
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
    layout,
    layout_header_information,
    layout_header_notification,
  };
  
  export default rootReducer;