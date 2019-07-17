import React from 'react';
import { isEqual } from 'lodash'
import PropTypes from 'prop-types';
import { Translate, I18n } from 'react-redux-i18n';
import { orange, red, teal } from '@material-ui/core/colors'
import { getDataObject } from '@dgtx/coreui'
import { Table } from '../../@components/@Table'
import { orderBy as orderByFn } from 'lodash'

import {
  Card,
  Chip,
  Subheader,
  TextField,
  Button,
} from '@material-ui/core'

class ProjectList extends React.Component {

  getColor = (priority) => {
    if (priority < 2) {
      return { color: red[500] };
    } else if (priority < 5) {

      return { color: orange[500] }
    }
    return { color: teal[500] };
  }

  render() {
    const {
      project_id,
      projects = [],
      group_id,
      muiTheme,
      resources,
      groupName = '',
      projectName = '',
      showGroup,
      dashboard,
      changeProjectName,
      changeProject,
      showCreateProject,
      listColumnsSortDefault
    } = this.props;



    let datas = projectName ? projects.filter(item => !!item.name.toLowerCase().includes(projectName.toLowerCase())) : projects
    

    return (
      <React.Fragment>
        <Table
          datas={datas}
          createData={data => ({
            id: data.id,
            name: data.name,
            customer: data.customer,
            priority: data.priority,
            active: data.active ? <p style={{ color: 'green' }}>Active</p> : <p style={{ color: 'red' }}>Inactive</p>,
          })}
          columns={[
            { id: 'name', numeric: false, disablePadding: true, label: I18n.t("dashboard.project_table.column.project_name"), visible: true },
            { id: 'customer', numeric: false, disablePadding: true, label: I18n.t("dashboard.project_table.column.customer"), visible: !project_id },
            { id: 'layouts', numeric: false, disablePadding: true, label: I18n.t("dashboard.project_table.column.total_layout"), visible: false },
            { id: 'fields', numeric: false, disablePadding: true, label: I18n.t("dashboard.project_table.column.total_field"), visible: false },
            { id: 'priority', numeric: false, disablePadding: true, label: I18n.t("dashboard.project_table.column.priority"), visible: !project_id },
            { id: 'active', numeric: false, disablePadding: true, label: I18n.t("dashboard.project_table.column.status"), visible: true },
          ]}
          item_id={project_id}
          group_id={group_id}
          group_id={group_id}
          muiTheme={muiTheme}
          groupName={getDataObject('data.groupName', dashboard)}
          resources={resources}
          project={projects.filter(item => project_id === item.id)[0] || {}}
          onChange={changeProject}
          dashboard={dashboard}
          changeProjectName={changeProjectName}
          onCreate={showCreateProject}
          listColumnsSortDefault = {listColumnsSortDefault}
        />
      </React.Fragment>
    );
  }
}


export default ProjectList;
