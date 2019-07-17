import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { menu_roles } from '../../../constants'
import _ from 'lodash'
class ProjectItemView extends React.Component {
  onDesignButton() {
    const project = this.props.data;
    const project_id=project.project_id||project.id
    this.props.history.push(
      `/projects/${project_id}`
    );
  }
  onMonitorButton() {
    const project = this.props.data;
    const project_id=project.project_id||project.id
    this.props.history.push(
      `/production-admin/${project_id}`
    );
  }
  render() {
    const { data, current_user } = this.props;
   
    const width = 400;
    const titleStyle = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap', 
      width: width - 50
    }
    const group_name=`${data.group_name?`Group:${data.group_name}`:' '}`;
    return (
      <Card style={{ width: width,margin:15 }}>
        <CardHeader
          subtitle={group_name}
          titleStyle={titleStyle}
          subtitleStyle={titleStyle}
          title={data.name}
        />
        <CardActions>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              {
                _.intersection(menu_roles.design, current_user.user.roles).length > 0 &&
                <FlatButton
                  onClick={this.onDesignButton.bind(this)}
                  label="Design"
                  primary={true}
                  labelPosition="before"
                />
              }
              {
                _.intersection(menu_roles.production_admin, current_user.user.roles).length > 0 &&
                <FlatButton
                  onClick={this.onMonitorButton.bind(this)}
                  labelPosition="before"
                  label="Production Admin"

                  primary={true}
                />
              }
            </ToolbarGroup>


          </Toolbar>
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(ProjectItemView);
