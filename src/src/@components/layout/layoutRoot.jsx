import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {
    MuiThemeProvider,
    createMuiTheme,
    withStyles,
} from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import compose from 'recompose/compose';
import { Button } from '@material-ui/core'
import AppBar from './AppBar';
import Menu from './Menu';
import defaultTheme from '../defaultTheme';
import Sidebar from './sideBar';
import { push } from 'connected-react-router'
import { withRouter, matchPath } from 'react-router'
import BreadCrumd from './BreadCrumd';
import { redirectApp } from '@dgtx/coreui';
import { API_ENDPOINT, APP_NAME } from "../../constants"
import axios from "axios";
import { functions } from '../../constants/functions'

import NotificationConnector from '../Notification/NotificationConnector';
import { APP_VERSION } from '../../constants'
import { upperCaseFirstString } from '@dgtx/core-component-ui';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: theme.palette.background.default,
    },
    mainConent: {
        overflow: 'auto',
        width: '100vw',
        height: '100vh',
        position: 'relative',
        zIndex: 10,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        // fontStyle: 'italic'

    }
});

const Layout = (props) => {
    const { themes, classes, user, loading, changeTheme,
        onLogout, title, subtitle,
        toggleSidebar, children,
        breadCrumd = [{
            id: 'all',
            path: 'home'
        }],

        dispatch } = props;
    return (
        <div className={classnames(classes.root)} >

            <AppBar
                // title={<Button className={classnames(classes.title)}
                //     onClick={event => {
                //         event.preventDefault();
                //         event.stopPropagation();
                //         dispatch(push('/'))
                //     }}   >

                //         {/* {props.location.pathname !== "/" ? ( (title&&(subtitle!==''))? ("Project: "+ (title? title:'') +", Function: "+ (subtitle? subtitle:'')) : '') : 'PRODUCTION DESIGNER'} */}
                //     {props.location.pathname !== "/" ? (title? title : '')  : 'PRODUCTION DESIGNER'}

                // </Button>}
                title={<BreadCrumd
                    items={breadCrumd}
                    onSelect={item => {
                        if (item.id !== 'all') {
                            dispatch(push(item.path))
                        } else {
                            redirectApp('home')
                        }
                    }}
                />
                }
                loading={loading}
                user={user}
                themes={themes}
                changeTheme={changeTheme}
                toggleSidebar={toggleSidebar}
                onLogout={onLogout}
            />
            <div className={classnames(classes.mainConent, 'cool_scroll_smart')}>
                {children}
            </div>
            <p style={{
                position: 'fixed',
                bottom: '-10px',
                left: '0px',
                fontSize: '10px',
                zIndex: 10,
            }
            }>
                <span>Version: </span>
                <span style={{ color: 'rgba(0,0,0,0.6)' }} >{APP_VERSION}</span>
            </p>
        </div>
    )
}


const EnhancedLayout = compose(
    connect(),
    withRouter,
    withStyles(styles)
)(Layout);
class LayoutWithTheme extends Component {
    constructor(props) {
        super(props);
        this.theme = createMuiTheme(props.theme);
        this.state = {
            breadCrumd: [{
                id: 'all',
                path: 'home'
            },
            {
                id: 'app',
                name: upperCaseFirstString(APP_NAME),
                path: '/'
            }]
        }
    }


    // getProjectName = async (projectId) => {
    //     try {
    //         let res = await axios.get(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}`)
    //         this.setState({ title: res.data.name })
    //     }
    //     catch (err) {

    //     }
    // }

    componentWillMount = () => {
        const { location, getProjectById } = this.props;
        let pathname = location.pathname
        let _breachCrumd = [{
            id: 'all',
            path: 'home'
        },
        {
            id: 'app',
            name: upperCaseFirstString(APP_NAME),
            path: '/'
        }]
        let rprojectFunc = matchPath(pathname, {
            path: '/projects/:projectId/:funcName'
        })
        let rproject = matchPath(pathname, {
            path: '/projects/:projectId'
        })
        if (rproject) {
            getProjectById(rproject.params.projectId)
        }
        let predefineds = matchPath(pathname, {
            path: '/pre-defined'
        })
        let predefined = matchPath(pathname, {
            path: '/pre-defined/:funcName'
        })
        if (predefineds) {
            _breachCrumd.push(
                {
                    id: 'projectid',
                    name: 'pre-defined',
                    path: `/pre-defined`
                })
        }
        if (predefined) {

            _breachCrumd.push(
                {
                    id: 'projectid',
                    name: predefined.params.funcName.replace(/-/g, " "),
                    path: `/pre-defined/${predefined.params.funcName}`
                })

        }
        this.setState({
            breadCrumd: _breachCrumd
        })

    }
    // componentWillMount() {
    //     if (this.props.location.pathname !== '/' && this.props.location.pathname.split('/').length > 2) {
    //         let projectId = this.props.location.pathname.split('/')[2];
    //         this.getProjectName(projectId)
    //         let func_name = this.props.location.pathname.split('/')[3];
    //         let _func = Object.values(functions).filter(item => item.path.includes(func_name))[0];
    //         func_name = _func ? _func.title : func_name
    //         func_name = (func_name === '') ? '' : func_name
    //         this.setState({ subtitle: func_name })
    //     }
    // }


    componentWillReceiveProps(nextProps) {
        const { project, getProjectById, functions } = nextProps;
        if (nextProps.theme !== this.props.theme) {
            this.theme = createMuiTheme(nextProps.theme);
        }
        if (nextProps.location.pathname !== this.props.location.pathname || this.props.project.name !== project.name) {
            let _breachCrumd = [{
                id: 'all',
                path: 'home'
            },
            {
                id: 'app',
                name: upperCaseFirstString(APP_NAME),
                path: '/'
            }]
            let rprojectFunc = matchPath(nextProps.location.pathname, {
                path: '/projects/:projectId/:funcName'
            })
            let rproject = matchPath(nextProps.location.pathname, {
                path: '/projects/:projectId'
            })


            let predefined = matchPath(nextProps.location.pathname, {
                path: '/pre-defined/:funcName'
            })

            if (rproject && rproject.params.projectId) {
                if (project.id !== rproject.params.projectId) {
                    getProjectById(rproject.params.projectId)
                }
                let project_name = project.name //|| rproject.params.projectId; 
                _breachCrumd.push(
                    {
                        id: 'projectid',
                        name: project_name,
                        path: `/projects/${rproject.params.projectId}`
                    })
            }
            if (rprojectFunc && rprojectFunc.params.funcName) {
                let _func = Object.values(functions).filter(item => item.path.includes(rprojectFunc.params.funcName))[0] || {}
                _breachCrumd.push(
                    {
                        id: 'projectid',
                        name: _func.title || rprojectFunc.params.funcName.replace(/-/g, " "),
                        path: `/projects/${rproject.params.projectId}/${rprojectFunc.params.funcName}`
                    })
            }

            let predefineds = matchPath(nextProps.location.pathname, {
                path: '/pre-defined'
            })
            if (predefineds) {
                _breachCrumd.push(
                    {
                        id: 'projectid',
                        name: 'pre-defined',
                        path: `/pre-defined`
                    })
            }
            if (predefined) {

                _breachCrumd.push(
                    {
                        id: 'projectid',
                        name: predefined.params.funcName.replace(/-/g, " "),
                        path: `/pre-defined/${predefined.params.funcName}`
                    })

            }
            this.setState({
                breadCrumd: _breachCrumd
            })
        }
    }

    render() {
        const { theme, ...rest } = this.props;
        const { breadCrumd } = this.state;

        return (
            <MuiThemeProvider theme={this.theme}>
                <EnhancedLayout {...rest}
                    breadCrumd={breadCrumd} />
                <NotificationConnector />
            </MuiThemeProvider>
        );
    }
}
LayoutWithTheme.propTypes = {
    theme: PropTypes.object,
};
LayoutWithTheme.defaultProps = {
    theme: defaultTheme,
};
export default LayoutWithTheme;