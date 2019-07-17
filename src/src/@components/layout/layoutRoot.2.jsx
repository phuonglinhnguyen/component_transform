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
import { withRouter,matchPath } from 'react-router'
import { API_ENDPOINT, APP_NAME } from "../../constants"
import axios from "axios";
import { functions } from '../../constants/functions'



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
        match,
        toggleSidebar, children, dispatch ,
        location, } = props;

        
        return (
        <div className={classnames(classes.root)} >

            <AppBar
                title={<Button className={classnames(classes.title)}
                    onClick={event => {
                        event.preventDefault();
                        event.stopPropagation();
                        dispatch(push('/')
                    }}
                   }   >
                    
                        {/* {props.location.pathname !== "/" ? ( (title&&(subtitle!==''))? ("Project: "+ (title? title:'') +", Function: "+ (subtitle? subtitle:'')) : '') : 'PRODUCTION DESIGNER'} */}
                    {(props.location.pathname !== "/" && props.location.pathname.split('/').length > 3 ) ? (title? title : 'PRODUCTION DESIGNER')  : 'PRODUCTION DESIGNER'}

                </Button>}
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
            title: '',
            subtitle: ''
        }
    }

                
    getProjectName = async (projectId) => {
        try{
        let res = await axios.get(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}`)
        this.setState({ title: res.data.name })
        }
        catch(err){
            
        }
    }

    componentWillMount() {
        if (this.props.location.pathname !== '/' && this.props.location.pathname.split('/').length > 3) {
            let projectId = this.props.location.pathname.split('/')[2];
            this.getProjectName(projectId)
            let func_name = this.props.location.pathname.split('/')[3];
            let _func = Object.values(functions).filter(item => item.path.includes(func_name))[0];
            func_name = _func ? _func.title : func_name
            func_name = (func_name === '') ? '' : func_name
            this.setState({ subtitle: func_name })
        }
    }

    
    componentWillReceiveProps(nextProps) {
        if (nextProps.theme !== this.props.theme) {
            this.theme = createMuiTheme(nextProps.theme);
        }
        if (nextProps.location.pathname !== this.props.location.pathname && nextProps.location.pathname.split('/').length > 3) {
            let projectId = nextProps.location.pathname.split('/')[2];
            this.getProjectName(projectId)
            let func_name = nextProps.location.pathname.split('/')[3];
            let _func = Object.values(functions).filter(item => item.path.includes(func_name))[0];
            func_name = _func ? _func.title : func_name;
            this.setState({ subtitle: func_name })
        }
    }

    render() {
        const { theme, ...rest } = this.props;
        const { title, subtitle } = this.state;
        return (
            <MuiThemeProvider theme={this.theme}>
                <EnhancedLayout {...rest}
                    title={title}
                    subtitle={subtitle} />
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
