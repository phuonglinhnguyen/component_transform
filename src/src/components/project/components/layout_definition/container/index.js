import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { URL_MODULE } from '../constant';
import { resetALL } from '../actions';
import Layouts from './layouts_container';
import Layout from './layout_container';
class Wapper extends Component {
    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(resetALL());
    }
    render() {
        return (
            <div>
                <Route
                    exact
                    path={`/projects/:projectId/${URL_MODULE}`}
                    component={Layouts}
                />
                <Route
                    exact
                    path={`/projects/:projectId/${URL_MODULE}/:layoutId`}
                    component={Layout}
                />
            </div>
        );
    }
}
export default connect()(Wapper);
