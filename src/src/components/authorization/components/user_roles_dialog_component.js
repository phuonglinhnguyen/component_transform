import React, { Component } from 'react';
import { CardActions, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import * as constants from '../utils/user_roles_constants'
import _ from 'lodash'
import Checkbox from 'material-ui/Checkbox';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
class UserRolesDialogComponent extends Component {
    componentWillUnmount() {
        this.props.actions.dialogResetState();
    }
    componentWillReceiveProps(nextProps) {
        const { user_role_dialog } = nextProps;
        this.setState({
            open: user_role_dialog.open,
            roles: [...(user_role_dialog.user && user_role_dialog.user.roles) || []]
        })
        this.onSaveEnable = this.onSaveEnable.bind(this);
    }
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            roles: []
        }
    }
    handleRequestClose = () => {

        // this.setState({
        //     open: false,
        // });
        this.props.actions.dialogResetState();
    };
    handleSaveRole = () => {
        const { roles } = this.state;

        this.props.actions.dialogSaveUserRole(this.props.user_role_dialog.user, roles)
    }

    onCheck(event, isInputChecked) {
        const value = event.target.value;
        var roles = this.state.roles;
        if (isInputChecked) {
            roles.push(value);
        } else {
            roles = roles.filter(function (i) {

                return i !== value
            });
        }

        this.setState({ roles: roles });
    }
    onSaveEnable() {
        const { roles } = this.state;
        const current_roles = (this.props.user_role_dialog.user
            && this.props.user_role_dialog.user.roles)
            || [];
        return _.difference(current_roles, roles).length > 0 || _.difference(roles, current_roles).length > 0;

    }
    render() {
        const { user } = this.props.user_role_dialog;
        return (
            <Dialog
                open={this.state.open}
                title={user && `Add Role for User ${user.username}`}
                onRequestClose={this.handleRequestClose}
            >
                <CardText>
                    <Menu>


                        {constants.ROLES.map((role, index) =>
                            <MenuItem  key={index}>
                                <Checkbox
                                   
                                    checked={this.state.roles.find(item => item === role) ? true : false}
                                    value={role}
                                    label={role}
                                    onCheck={this.onCheck.bind(this)} />
                            </MenuItem>

                        )}
                    </Menu>
                </CardText>
                <CardActions>
                    <RaisedButton
                        disabled={!(this.onSaveEnable())}
                        primary={true} label="Save"
                        onClick={this.handleSaveRole.bind(this)} />
                    <RaisedButton label="Cancel" onClick={this.handleRequestClose} />
                </CardActions>


            </Dialog >

        );
    }

}


export default UserRolesDialogComponent;
