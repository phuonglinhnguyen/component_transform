import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router'
import { push as pushPath} from 'connected-react-router'
import {
  redirectApp,
  crudGetOne,
  crudGetList,
  getResources,
  PageDecorator,
  getDataObject
} from '@dgtx/coreui'

import { Dashboard } from '../../@components';
import {
  USER_ROLE_MANAGEMENT,
  USERS, PROJECT_FUNCTIONS
} from '../../providers';
import dashboardReducer from './reducer'
// import usersReducer from './users.reducer'
import {
  initDataDashboard,
  changeGroup,
  changeProject,
  changeGroupName,
  changeProjectName,
  changeGroupNameForProject,
  showCreateGroup,
  showCreateProject,
  showEditGroup,
  showEditProject,
  hideDialog,
  changeData,
  onSubmit,
  onClickFunc,
  onCancelConfirm,
  onSubmitConfirm,
  checkProjectEdit,
  showDialogConfirm,
  toggerSiderbar,
} from './Dashboard.actionsCreator'
import { getFunction } from '../../constants/functions';

const resources = [
  { name: 'group' },
  { name: 'project' },
  // { name: USERS, reducer: usersReducer },
  { name: USER_ROLE_MANAGEMENT },
  { name: PROJECT_FUNCTIONS },
  dashboardReducer
]
const getTaskInfo = (tasks, info) => {
  return tasks.map(({ name, form_uri = '' }) => {
    let form_uris = form_uri.split('/')
    let task_id = form_uris[form_uris.length - 1]
    if (info[task_id]) {
      return { ...info[task_id], name, form_uri }
    } else {
      return { name, form_uri }
    }
  })
}
class DashboardContainer extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { crudGetOne, changeGroup, crudGetList, user, match } = this.props;
    crudGetList('group', {});
    changeGroup('all', { group_id: 'all' });
    if(match.params.projectId){
      changeProject(match.params.projectId);
    }
  }
  componentWillReceiveProps = (nextProps) => {
    const { initDataDashboard, core,changeProject } = this.props; 


    if (core.loading > 0 && nextProps.core.loading === 0 && core.resources.dashboard.data && !core.resources.dashboard.data.inited) {
      let projectid =nextProps.match.params.projectid||'' 
      initDataDashboard(core.resources, projectid); 
      changeProject(projectid) 
    }
  }
  hanbleChangeProject=(item)=>{ 
    const {pushPath,changeProject} =this.props; 
    if(item)
    pushPath(`/projects/${item}`);
    else  pushPath('/');
    changeProject(item); 
  } 
  render() {
    const {
      muiTheme,
      history
    } = this.context;
    const { core,
      actions,
      changeGroup,
      pushPath,
      changeProject,
      changeGroupName,
      changeProjectName,
      changeGroupNameForProject,
      showCreateGroup,
      showCreateProject,
      showEditGroup,
      showEditProject,
      hideDialog,
      changeData,
      onCancelConfirm,
      onSubmitConfirm,
      onClickFunc,
      showDialogConfirm,
      toggerSiderbar,
      onSubmit,
      dispatch
    } = this.props;
    const { dashboard, user, users, group, project, task_info, project_functions } = core.resources;
    const { group_id, group_data = {}, project_id = '',  } = dashboard && dashboard.data || {}

    const groups = group && group.list ? group.list.ids.map(id => {
      return group.data[id]
    }) : []
    
    let listColumnsSortDefault = {
      listtypeSort: ['asc','asc'],
      listColumnsName: ['priority', 'name']
    } 
    let projects = project && project.data && project.list.ids.map(id => project.data[id]) || [];
    let functions = getFunction((project_functions &&  Object.keys(project_functions.data).map(key=>project_functions.data[key]) || []).map(item => item.item))
    return (
      <React.Fragment>
        <Dashboard
          task_id={''}
          group_id={group_id}
          users={users}
          groups={groups}
          project_id={project_id}
          projects={projects}
          resources={core.resources}
          project_guide={{}}
          functions={functions}
          dashboard={dashboard}
          changeGroup={changeGroup}
          changeProject={this.hanbleChangeProject} 
          changeGroupName={changeGroupName}
          changeProjectName={changeProjectName}
          changeGroupNameForProject={changeGroupNameForProject}
          showCreateGroup={showCreateGroup}
          showCreateProject={showCreateProject}
          showEditGroup={showEditGroup}
          showEditProject={showEditProject}
          hideDialog={hideDialog}
          muiTheme={muiTheme}
          changeData={changeData}
          showDialogConfirm={showDialogConfirm}
          onCancelConfirm={onCancelConfirm}
          onSubmitConfirm={onSubmitConfirm}
          checkProjectEdit={checkProjectEdit}
          onSubmit={onSubmit}
          onClickFunc={onClickFunc}
          toggerSiderbar={toggerSiderbar}
          listColumnsSortDefault = {listColumnsSortDefault}
        />
      </React.Fragment>
    )
  }
}

export default  PageDecorator({
  resources: resources,
  actions: {
    pushPath,
    crudGetOne,
    crudGetList,
    initDataDashboard,
    changeGroup,
    changeProject,
    changeGroupName,
    changeProjectName,
    changeGroupNameForProject,
    showCreateGroup,
    showCreateProject,
    showEditGroup,
    showEditProject,
    hideDialog,
    changeData,
    onSubmit,
    onCancelConfirm,
    onSubmitConfirm,
    onClickFunc,
    showDialogConfirm,
    toggerSiderbar,
    pushPath,
  },
  mapState:(state)=>({
    core:state.core
  })
})(DashboardContainer)
 



