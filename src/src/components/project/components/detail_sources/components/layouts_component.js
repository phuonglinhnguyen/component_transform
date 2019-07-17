import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router'

class LayoutsComponent extends Component {
    componentWillUnmount() {
        this.props.actions.resetStateDetailSources();
    }

    componentDidMount() {
        const project_id = this.props.match.params.projectid;
        this.props.actions.getListLayouts(project_id);
    }
    onDesignButton() {
        const project_id = this.props.match.params.projectid;
        this.props.history.push(
            '/projects/' + project_id + "/layout-definitions"
        );
    }
    render() {
        var items = this.props.layouts;
        if (!items || !(items instanceof Array)) {
            items = [];
        }
        var str = items.reduce((prevVal, elem) => `${prevVal} ${elem.name} ,`, "");
        str = str.substr(0, str.length - 1);
        return (
            <Card>
                <CardTitle
                    title="Forms and sections"
                />
                <CardText style={{ wordBreak: "break-all" }}>
                    {items.length > 0 ?
                        `${items.length} forms : ${str}` :
                        'No forms designed. Please click Design to add new forms.'
                    }
                </CardText>
                <CardActions>
                    <FlatButton label="Design" onClick={this.onDesignButton.bind(this)} primary={true} />
                </CardActions>
            </Card>
        );

    }
}

export default withRouter(LayoutsComponent);
