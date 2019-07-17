import React from 'react';

import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card';
class ProjectItemSource extends React.Component {


  onEditButton() {
    const project = this.props.data;

    this.props.actions.startModifyProject(project);
  }
  handleActiveButton = (event, isActive) => {
    const { data, actions } = this.props;
    event.preventDefault();
    actions.setDialog({
      open_dialog: true,
      title_dialog: isActive ? "Deactive project" : 'Active project',
      body_dialog: `Are you sure ${isActive ? 'deactive' : 'active'} project :${data.name} ?`,
      handleClickSubmit: () => {
        actions.resetDialog();
        setTimeout(() => {
          actions.setActiveProject(data.id, !isActive)
        }, 50)
      },
      label_button_dialog: `commons.actions.${isActive ? 'deactive' : 'active'}`
    });
  }

  render() {
    const { data= {} } = this.props;
    // const titleStyle = { ...style, width: width - 50 }
    let isActive = data ? data.active : false
    const name = data.name ? data.name : ''
    const group_name=`${data.group_name?`Group:${data.group_name}`:' '}`;
    const { is_fetching } = this.props.project_item;
    // <div style={{ backgroundColor: '#3498DB' }}>
    return (
      <Card>
        <div>
          <CardTitle
            subtitle={group_name}
            title={name}

          />
          <CardText >
            <Subheader>Priority : {data.priority}</Subheader>
            <Subheader>Project Folder : {data.folder}</Subheader>
            <Subheader>State : {data.active ? 'Active' : 'Inactive'}</Subheader>
          </CardText>
        </div>
        <CardActions>
          <FlatButton
            onClick={this.onEditButton.bind(this)}
            label="Edit"
            primary={true}
            disabled={is_fetching}
          />
          <FlatButton
            onClick={(event) => this.handleActiveButton(event, isActive)}
            label={isActive ? "Deactive project" : 'Active project'}
            primary={true}
            disabled={is_fetching}
          />

        </CardActions>
      </Card>
    );
  }
}


export default ProjectItemSource;
