import Acquisition from './components/acquisitions/containers/acquisition_list_container';
import LayoutDefinition from './components/layout_definition/container';
import Project from './containers/project_container';
import ProjectItem from './containers/project_item_container';
import ProjectList from './containers/project_list_container';
import FieldItem from './components/field_value_definitions/containers/field_item_container';
import FieldList from './components/field_value_definitions/containers/field_list_container';
import WorkflowItem from './components/workflow/containers/workflow_item_container';
import WorkflowList from './components/workflow/containers/workflow_list_container';
import QCSampling from './components/qc_sampling/containers/qc_sampling_container';
import DetailsSources from './components/detail_sources/containers/details_sources_container';
import AssignUser from './components/assign_user/containers/assign_user_list_container';
import ExportConfigurationItem from './components/export_configuration/containers/export_configuration_item_container';
import ExportConfigurationList from './components/export_configuration/containers/export_configuration_list_container';
import Monitor from './components/monitor/containers/monitor_container';
import Announcement from './components/announcement/containers/announcement_container';
import ResponseEvaluationList from './components/response_evaluation/containers/response_evaluation_list_container';
import ResponseEvaluationItem from './components/response_evaluation/containers/response_evaluation_item_container';
import TasksAssignment from './components/tasks_assignment/containers/tasks_assignment_container';
import ListUploadConfiguration from './components/update_configuration/containers/list_upload_configuration';
import ItemUploadConfiguration from './components/update_configuration/containers/item_upload_configuration';
import VerifyingConfiguration from './components/verifying_configuration/containers/verifying_configuration';
import ReworkDetails from './components/rework_details/containers/rework_details_container';
import { OCRTest } from './components/ocr_test/containers'

export {
  Acquisition,
  Project,
  ProjectItem,
  ProjectList,
  FieldList,
  FieldItem,
  WorkflowItem,
  WorkflowList,
  QCSampling,
  LayoutDefinition,
  DetailsSources,
  AssignUser,
  ExportConfigurationList,
  ExportConfigurationItem,
  Monitor,
  Announcement,
  ResponseEvaluationList,
  ResponseEvaluationItem,
  TasksAssignment,
  ListUploadConfiguration,
  ItemUploadConfiguration,
  OCRTest,
  ReworkDetails,
  VerifyingConfiguration,
};
