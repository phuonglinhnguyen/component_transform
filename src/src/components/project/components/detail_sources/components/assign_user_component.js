import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import { withRouter } from 'react-router'

class AssignUserComponent extends Component {
    handleAssignUserButton() {
        const project_id = this.props.match.params.projectid;
        this.props.history.push(
            '/production-admin/' + project_id + "/assign-users"
        );
    }
    renderChip(users) {
        return (
            users.map((user) =>
                <Chip style={{ "cursor": "pointer" }}
                    key={user.id}
                    onRequestDelete={() => this.handleRequestDelete(user.id)}
                    onClick={this.handleUserClick}
                >
                    {user.username}
                </Chip>

            ));
    }
    render() {
        const { project_users = [] } = this.props.assign_user_list;
        var str = project_users.reduce((prevVal, elem) => `${prevVal} ${elem.username} ,`, "");
        str = str.substr(0, str.length - 1);
        return (


            <Card>
                <CardTitle
                    title="Users"
                    subtitle={`Total ${project_users.length} users`}
                />
                <CardText style={{ wordBreak: "break-all" }}>
                    {project_users.length > 0 ?
                        `${project_users.length} assigned users: ${str}` :
                        'No users assigned. Please click Manage project users to add new user to this project.'

                    }
                </CardText>
                <CardActions>
                    <FlatButton
                        onClick={this.handleAssignUserButton.bind(this)}
                        label="Manage project users"
                        primary={true} />
                </CardActions>
            </Card>
        );
    }
}



export default withRouter(AssignUserComponent);
