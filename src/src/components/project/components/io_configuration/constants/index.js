export const IO_SUPPORT = {
  FIELD_VALUE_DEFINITIONS: 'field_value_definitions',
  LAYOUT_DEFINITIONS: 'layout_definitions',
  SECTION_DEFINITIONS: 'section_definitions',
  ACQUISITORS: 'acquisitors',
  UPLOAD_CONFIGURATIONS: 'upload_configurations',
  DESIGN_WORKFLOWS: 'project_workflow',
  RESPONSE_EVALUATIONS: 'response_evaluations',
  PROJECT_USERS: 'project_users',
  EXPORT_CONFIGURATIONS: 'export_configurations'
}
export const IO_TITLE = {
  [IO_SUPPORT.FIELD_VALUE_DEFINITIONS]: `projects.io_configuration.title.${IO_SUPPORT.FIELD_VALUE_DEFINITIONS}`,
  [IO_SUPPORT.SECTION_DEFINITIONS]: `projects.io_configuration.title.${IO_SUPPORT.SECTION_DEFINITIONS}`,
  [IO_SUPPORT.LAYOUT_DEFINITIONS]: `projects.io_configuration.title.${IO_SUPPORT.LAYOUT_DEFINITIONS}`,
  [IO_SUPPORT.ACQUISITORS]: `projects.io_configuration.title.${IO_SUPPORT.ACQUISITORS}`,
  [IO_SUPPORT.RESPONSE_EVALUATIONS]: `projects.io_configuration.title.${IO_SUPPORT.RESPONSE_EVALUATIONS}`,
  [IO_SUPPORT.UPLOAD_CONFIGURATIONS]: `projects.io_configuration.title.${IO_SUPPORT.UPLOAD_CONFIGURATIONS}`,
  [IO_SUPPORT.DESIGN_WORKFLOWS]: `projects.io_configuration.title.${IO_SUPPORT.DESIGN_WORKFLOWS}`,
  [IO_SUPPORT.PROJECT_USERS]: `projects.io_configuration.title.${IO_SUPPORT.PROJECT_USERS}`,
  [IO_SUPPORT.EXPORT_CONFIGURATIONS]: `projects.io_configuration.title.${IO_SUPPORT.EXPORT_CONFIGURATIONS}`,
}
export const IO_SUBTITLE = {
  [IO_SUPPORT.FIELD_VALUE_DEFINITIONS]: `projects.io_configuration.sub_title.${IO_SUPPORT.FIELD_VALUE_DEFINITIONS}`,
  [IO_SUPPORT.SECTION_DEFINITIONS]: `projects.io_configuration.sub_title.${IO_SUPPORT.SECTION_DEFINITIONS}`,
  [IO_SUPPORT.LAYOUT_DEFINITIONS]: `projects.io_configuration.sub_title.${IO_SUPPORT.LAYOUT_DEFINITIONS}`,
  [IO_SUPPORT.ACQUISITORS]: `projects.io_configuration.sub_title.${IO_SUPPORT.ACQUISITORS}`,
  [IO_SUPPORT.RESPONSE_EVALUATIONS]: `projects.io_configuration.sub_title.${IO_SUPPORT.RESPONSE_EVALUATIONS}`,
  [IO_SUPPORT.UPLOAD_CONFIGURATIONS]: `projects.io_configuration.sub_title.${IO_SUPPORT.UPLOAD_CONFIGURATIONS}`,
  [IO_SUPPORT.DESIGN_WORKFLOWS]: `projects.io_configuration.sub_title.${IO_SUPPORT.DESIGN_WORKFLOWS}`,
  [IO_SUPPORT.PROJECT_USERS]: `projects.io_configuration.sub_title.${IO_SUPPORT.PROJECT_USERS}`,
  [IO_SUPPORT.EXPORT_CONFIGURATIONS]: `projects.io_configuration.sub_title.${IO_SUPPORT.EXPORT_CONFIGURATIONS}`,
}
export const IO_HIDDEN = []

export const MAX_TRY_RELOAD = 2;
export const TIME_TRY_RELOAD = [0, 1 * 1000, 5 * 1000, 10 * 1000, 30 * 1000]
export const TIME_TRY_LOAD = 5 * 1000;