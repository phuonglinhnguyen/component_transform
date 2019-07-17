import React, { Component } from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { CardTitle } from 'material-ui/Card';
import _ from 'lodash'
class HeaderInfoComponent extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps);
    }
    componentWillUnmount() {
        this.props.actions.resetState();
    }
    componentWillMount() {

        const { pathname, current_user } = this.props;
        const username = current_user.user && current_user.user.username;
        this.props.actions.getHeaderTitle(username, pathname);
    }
    componentWillReceiveProps(nextProps) {

        if (!_.isEqual(nextProps.pathname, this.props.pathname) ||
            !_.isEqual(nextProps.current_user, this.props.current_user) ||
            (!nextProps.is_error && !_.isEqual(nextProps.project_name, this.props.project_name))
        ) {
            const { pathname, current_user } = nextProps;
            const username = current_user.user && current_user.user.username;

            this.props.actions.getHeaderTitle(username, pathname);
        }
    }

    getSubtitle(subtitle, doc_info, muiTheme) {
        return <span>
            <span style={{ color: muiTheme.palette.alternateTextColor }}>{subtitle}</span>
            {doc_info.batch_name &&
                <span> Batch Name:  <font style={{ color: muiTheme.palette.alternateTextColor }}>{doc_info.batch_name}</font> </span>}
            {doc_info.doc_name &&
                <span> Doc Name:  <font style={{ color: muiTheme.palette.alternateTextColor }}>{doc_info.doc_name}</font> </span>}
        </span>
    }

    render() {
        const { title, subtitle, doc_info } = this.props.layout_header_information;
        const { muiTheme } = this.props

        return (
            title ?
                <CardTitle
                    title={title}
                    subtitle={this.getSubtitle(subtitle, doc_info, muiTheme)}
                    style={{ padding: subtitle ? 4 : 16 }}
                    titleStyle={{ textTransform: 'capitalize', color: muiTheme.palette.alternateTextColor }}
                    subtitleStyle={{
                        lineHeight: 'initial', textTransform: 'capitalize',
                    }} /> :
                < div ></div>
        )





    }
}
export default muiThemeable()(HeaderInfoComponent);