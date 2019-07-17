import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router'


class FieldsComponent extends Component {
    componentDidMount() {
        const project_id = this.props.match.params.projectid;
        this.props.actions.getList(project_id);
    }
    onDesignButton() {
        const project_id = this.props.match.params.projectid;
        this.props.history.push(
            '/projects/' + project_id + "/field-value-definitions"
        );
    }
    render() {
        const { fields = [] } = this.props.field_list;
        var str = fields.reduce((prevVal, elem) => `${prevVal} ${elem.name} ,`, "");
        str = str.substr(0, str.length - 1);
        return (
            <div>
                <Card>
                    <CardTitle
                        title="Keying fields"
                    />
                    <CardText style={{ wordBreak: "break-all" }}>
                        {fields.length > 0 ?
                            `${fields.length} defined fields:${str}` :
                            'No fields defined. Please click Define to add new keying fields.'}
                    </CardText>
                    <CardActions>
                        <FlatButton label="Define" onClick={this.onDesignButton.bind(this)} primary={true} />

                    </CardActions>

                </Card>
            </div>
        );

    }
}


export default withRouter(FieldsComponent);
