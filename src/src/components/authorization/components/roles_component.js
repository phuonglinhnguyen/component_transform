import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import * as constants from '../utils/user_roles_constants'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import _ from 'lodash'
class RolesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
        }
        this.onCheckHeader = this.onCheckHeader.bind(this);
        this.onCheckRow = this.onCheckRow.bind(this);
        this.isCheckRow = this.isCheckRow.bind(this);
        this.getSelectedData = this.getSelectedData.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ selected: [] })
    }
    onCheckHeader(isInputChecked) {
        var { selected } = this.state;
        if (isInputChecked) {
            _.forEach(constants.ROLES, function (data) {
                var index = selected.findIndex(row => data === row);
                if (index === -1) {
                    selected.push(data)
                }
            });
        } else {
            _.forEach(constants.ROLES, function (data) {
                var index = selected.findIndex(row => data === row);
                if (index !== -1) {
                    selected.splice(index, 1);
                }
            });
        }
        this.setState({ selected: selected });
        // if (this.props.onCheckAll) {
        //     this.props.onCheckAll(constants.ROLES, isInputChecked)
        // }

    }
    onCheckRow(data, isInputChecked) {
        var { selected } = this.state;

        var index = selected.findIndex(row => data === row);

        if (index === -1) {
            selected.push(data)
        } else {
            selected.splice(index, 1);
        }

        this.setState({ selected: selected });
        // if (this.props.onCheckRow) {
        //     this.props.onCheckRow(data, isInputChecked)
        // }


    }
    isCheckRow(data) {
        const { selected } = this.state;

        if (selected.findIndex(row => data === row) === -1) {
            return false;
        }

        return true;

    }
    getSelectedData() {
        return this.state.selected;
    }

    render() {
        return (
            <Table selectable={false}
            >
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn><Checkbox checked={this.state.selected.length === constants.ROLES.length} onCheck={(event, isChecked) => this.onCheckHeader(isChecked)} /></TableHeaderColumn>
                        <TableHeaderColumn>Role</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {constants.ROLES.map((role, index) =>
                        <TableRow style={this.isCheckRow(role) ? { backgroundColor: '#e0e0e0' } : {}} key={index}  >
                            <TableRowColumn><Checkbox checked={this.isCheckRow(role)} onCheck={(event, isChecked) => this.onCheckRow(role, isChecked)} /></TableRowColumn>
                            <TableRowColumn>{role}</TableRowColumn>
                        </TableRow>
                    )}
                </TableBody>


            </Table>


        );
    }

}


export default RolesComponent;
