import {
    Signin,
    Register,
    Dashboard,
    Loading,
    Page404,
    Manager,
    LayoutPrevious,
    GeneralConfigurationPage,
    TranformConfigurationPage,
    ExportConfigurationPage
} from '../views'
import DetailsSources from '../components/project/components/detail_sources/containers/details_sources_container'
import ResponseEvaluationList from '../components/project/components/response_evaluation/containers/response_evaluation_list_container'
import ResponseEvaluationItem from '../components/project/components/response_evaluation/containers/response_evaluation_item_container'
import FieldList from '../components/project/components/field_value_definitions/containers/field_list_container'
import FieldItem from '../components/project/components/field_value_definitions/containers/field_item_container'
import LayoutDefinition from '../components/project/components/layout_definition/container'
import WorkflowList from '../components/project/components/workflow/containers/workflow_list_container'
import WorkflowItem from '../components/project/components/workflow/containers/workflow_item_container'
import ExportConfigurationList from '../components/project/components/export_configuration/containers/export_configuration_list_container'
import ExportConfigurationItem from '../components/project/components/export_configuration/containers/export_configuration_item_container'
import ListUploadConfiguration from '../components/project/components/update_configuration/containers/list_upload_configuration'
import ItemUploadConfiguration from '../components/project/components/update_configuration/containers/item_upload_configuration'
import DashboardPredefine from '../views/dashboard_predefine/dashboard'


import {PatternLists, PatternItem, ValidationLists, ValidationItem, LookupLists, LookupItem,
    ErrorLists,ErrorItem,TransformRuleLists, TransformRuleItem, ServiceLists, ServiceItem} from '../components/configuration'
import RuleTransform from '../components/project/components/field_value_definitions/components/field_item_rule_transform_component';

export default (key) => {
    if (key === 'public') {
        return [
            {
                name: 'signin',
                exact: true,
                path: '/signin',
                component: Signin
            },
            {
                name: 'register',
                exact: true,
                path: '/register',
                component: Register
            }
        ]
    }
    //#region
    /**
     * @distribution 
     * @author tretv
     * @description: 2018/09/20 17:05 PM
     * 
     */
    //#endregion
    return (apps) => {
        
        return [
            {
                name: 'export_config',
                path: "/projects/:projectid/export-config",
                exact: true,
                component: ExportConfigurationPage
            },
            {
                name: 'tranform_config',
                path: "/projects/:projectid/tranform-config",
                exact: true,
                component: TranformConfigurationPage
            },
            {
                name: 'export_general_config',
                path: "/projects/:projectid/export-general-config",
                exact: true,
                component: GeneralConfigurationPage
            },
            {
                exact: true,
                name: 'pre_defined',
                path: "/pre-defined",
                component: LayoutPrevious()(DashboardPredefine)
            },
            {
                exact: true,
                name: 'validation_definitions_list',
                path: "/pre-defined/validation-definitions",
                component: LayoutPrevious()(ValidationLists)
            },
            {
                exact: true,
                name: 'validation_definitions_item',
                path: "/pre-defined/validation-definitions/:validationDefinitionId",
                component: LayoutPrevious()(ValidationItem)
            },
          
            {
                exact: true,
                name: 'pattern_definitions_list',
                path: "/pre-defined/pattern-definitions",
                component: LayoutPrevious()(PatternLists)
            },
            {
                exact: true,
                name: 'pattern_definitions_item',
                path: "/pre-defined/pattern-definitions/:patternDefinitionId",
                component: LayoutPrevious()(PatternItem)
            },
            {
                exact: true,
                name: 'pattern_definitions_new',
                path: "/pre-defined/pattern-definitions/new",
                component: LayoutPrevious()(PatternItem)
            },            {
                exact: true,
                name: 'lookup_definitions_list',
                path: "/pre-defined/lookup-definitions",
                component: LayoutPrevious()(LookupLists)
            },
            {
                exact: true,
                name: 'lookup_definitions_item',
                path: "/pre-defined/lookup-definitions/:lookupDefinitionId",
                component: LayoutPrevious()(LookupItem)
            },
            {
                exact: true,
                name: 'lookup_definitions_new',
                path: "/pre-defined/lookup-definitions/new",
                component: LayoutPrevious()(LookupItem)
            }, 
            
            {
                exact: true,
                name: 'error_definitions_list',
                path: "/pre-defined/error-definitions",
                component: LayoutPrevious()(ErrorLists)
            },
            {
                exact: true,
                name: 'error_definitions_item',
                path: "/pre-defined/error-definitions/:errorDefinitionId",
                component: LayoutPrevious()(ErrorItem)
            },
            {
                exact: true,
                name: 'error_definitions_new',
                path: "/pre-defined/error-definitions/new",
                component: LayoutPrevious()(ErrorItem)
            },  
            
            {
                exact: true,
                name: 'rule_definitions_list',
                path: "/pre-defined/transform-rule-definitions",
                component: LayoutPrevious()(TransformRuleLists)
            },
            {
                exact: true,
                name: 'rule_definitions_item',
                path: "/pre-defined/transform-rule-definitions/:ruleDefinitionId",
                component: LayoutPrevious()(TransformRuleItem)
            },
            {
                exact: true,
                name: 'rule_definitions_new',
                path: "/pre-defined/transform-rule-definitions/new",
                component: LayoutPrevious()(TransformRuleItem)
            },  
            
            {
                exact: true,
                name: 'service_definitions_list',
                path: "/pre-defined/service-definitions",
                component: LayoutPrevious()(ServiceLists)
            },
            {
                exact: true,
                name: 'service_definitions_item',
                path: "/pre-defined/service-definitions/:serviceDefinitionId",
                component: LayoutPrevious()(ServiceItem)
            },
            {
                exact: true,
                name: 'service_definitions_new',
                path: "/pre-defined/service-definitions/new",
                component: LayoutPrevious()(ServiceItem)
            },
            {
                exact: true,
                name: 'detail_sources',
                path: "/projects/:projectid/detail-sources",
                component: LayoutPrevious()(DetailsSources)
            },
            
            {
                exact: true,
                name: 'response_evaluations_list',
                path: "/projects/:projectid/response-evaluations",
                component: LayoutPrevious()(ResponseEvaluationList)
            }, {
                exact: true,
                name: 'response_evaluations_item',
                path: "/projects/:projectid/response-evaluations/:responseEvaluationId",
                component: LayoutPrevious()(ResponseEvaluationItem)
            }, {
                exact: true,
                name: 'field_list',
                path: '/projects/:projectid/field-value-definitions',
                component: LayoutPrevious()(FieldList)
            }, {
                exact: true,
                name: 'field_item',
                path: '/projects/:projectid/field-value-definitions/:fieldId',
                component: LayoutPrevious()(FieldItem)
            }, {
                exact: true,
                name: 'layout_definitions',
                path: '/projects/:projectid/layout-definitions',
                component: LayoutPrevious()(LayoutDefinition)
            }, {
                exact: true,
                name: 'layout_definitions_create',
                path: '/projects/:projectid/layout-definitions/:layoutId',
                component: LayoutPrevious()(LayoutDefinition)
            }, {
                exact: true,
                name: 'export_configs_list',
                path: '/projects/:projectid/export-configs',
                component: LayoutPrevious()(ExportConfigurationList)
            }, {
                exact: true,
                name: 'export_configs_item',
                path: '/projects/:projectid/export-configs/:exportConfigId',
                component: LayoutPrevious()(ExportConfigurationItem)
            }, {
                exact: true,
                name: 'export_configs_new',
                path: '/projects/:projectid/export-configs/new',
                component: LayoutPrevious()(ExportConfigurationItem)
            }, {
                exact: true,
                name: 'workflow_list',
                path: '/projects/:projectid/workflow',
                component: LayoutPrevious()(WorkflowList)
            }, {
                exact: true,
                name: 'workflow_item',
                path: '/projects/:projectid/workflow/:workflow_id',
                component: LayoutPrevious()(WorkflowItem)
            },
            {
                exact: true,
                name: 'workflow_item_design',
                path: '/projects/:projectid/workflow/:workflow_id/design',
                component: LayoutPrevious()(WorkflowItem)
            },
            {
                exact: true,
                name: 'workflow_item_migration',
                path: '/projects/:projectid/workflow/:workflow_id/migration',
                component: LayoutPrevious()(WorkflowItem)
            },
            {
                exact: true,
                name: 'workflow_item_monitor',
                path: '/projects/:projectid/workflow/:workflow_id/monitor',
                component: LayoutPrevious()(WorkflowItem)
            },
            {
                exact: true,
                name: 'upload_configs_list',
                path: '/projects/:projectid/upload-configurations',
                component: LayoutPrevious()(ListUploadConfiguration)
            }, {
                exact: true,
                name: 'upload_configs_item',
                path: '/projects/:projectid/upload-configurations/:config_id',
                component: LayoutPrevious()(ItemUploadConfiguration)
            },
            { 
                name: 'project_item', 
                path: '/projects/:projectid', 
                exact: true, 
                component: Dashboard 
            }, 
            {
                name: 'dashboard-item',
                path: '/projects/:projectId',
                exact: true,
                component: Dashboard
            },
            {
                name: 'dashboard',
                path: '/',
                exact: true,
                component: Dashboard
            },
            {
                name: 'page404',
                component: Page404
            },
        ]
    }
};

