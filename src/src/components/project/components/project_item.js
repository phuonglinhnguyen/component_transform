import React from 'react';

import ProjectItemEdit from './project_item_edit';
import ProjectItemView from './project_item_view';
import ProjectItemSource from './project_item_detail_source'
class ProjectItemInfo extends React.Component {

  componentDidMount() {
    this.getProjectItem(this.props);
  }
  getProjectItem(props) {
    const { data } = props;

    if (!data) {
      const { project } = props.project_item;
      const { projectid } = props.match.params;
      if (!project || project.id !== projectid) {
        props.actions.getProjectById(props.match.params.projectid)
      }

    }
  }

  render() {
    const data = this.props.data || this.props.project_item.project;
    const dataModify = this.props.dataModify || this.props.project_item.project_modify;
  
    return dataModify && (data.id === '0' || dataModify.id === data.id)
      ? <ProjectItemEdit {...this.props} data={dataModify} dataModify={dataModify} />
      : (this.props.detailSource ?
        <ProjectItemSource {...this.props} data={data} dataModify={dataModify} /> :
        <ProjectItemView {...this.props} data={data} dataModify={dataModify} />
      );
  }
}

export default ProjectItemInfo;
