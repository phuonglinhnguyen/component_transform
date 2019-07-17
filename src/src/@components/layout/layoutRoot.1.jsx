import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {
    MuiThemeProvider,
    createMuiTheme,
    withStyles,
} from '@material-ui/core/styles';
import { Backspace as BackspaceIcon } from '@material-ui/icons'
import Hidden from '@material-ui/core/Hidden';
import compose from 'recompose/compose';
import { Button } from '@material-ui/core'
import AppBar from './AppBar';
import Menu from './Menu';
import defaultTheme from '../defaultTheme';
import Sidebar from './sideBar';
import { push, } from 'connected-react-router'
import { withRouter } from 'react-router'
import { API_ENDPOINT, APP_NAME } from "../../constants"
import axios from "axios";
import {functions} from '../../constants/functions'


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
        fontWeight: 'bold'
    }
});

const Layout = (props) => {
    const { themes, classes, user, loading, changeTheme,
        onLogout,
        title,
        subtitle,
        toggleSidebar, children, dispatch } = props;
    return (
        <div className={classnames(classes.root)} >

            <AppBar
                title={
                    <div 
                    style={{flex:'1 1 auto',boxSizing:"border-box",width:'400px',height:'54px'}} 
                 >
                        <div 
                           style={{flex:'1 1 auto',boxSizing:"border-box",width:'350px',height:'48px'}} 
                        >
                            <span style={{color:'red', margin:0, fontSize:14, display:"block"}}>
                                {title}
                            </span>
                            <span  style={{ margin:0, fontSize:10, display:"block"}}>
                                {subtitle}
                            </span>
                        </div>

                        <Button className={classnames(classes.title)}
                            onClick={event => {
                                event.preventDefault();
                                event.stopPropagation();
                                dispatch(push('/'))
                            }}
                        >
                            <BackspaceIcon />
                        </Button>
                    </div>
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
        </div>
    )
}


const EnhancedLayout = compose(
    connect(),
    withRouter,
    withStyles(styles),
)(Layout);
class LayoutWithTheme extends Component {
    constructor(props) {
        super(props);
        this.theme = createMuiTheme(props.theme);
        this.state = {
            title: 'SAGA_122_161117_002_505213',
            subtitle: 'FUNCTION'
        }
    }
    componentWillMount(){
        let projectId =this.props.location.pathname.split('/')[2];
             this.setProjectName(projectId)
        let func_name =this.props.location.pathname.split('/')[3];
        let _func = Object.values(functions).filter(item=>item.path.includes(func_name))[0];
        func_name=_func?_func.title:func_name
        this.setState({subtitle:func_name})
    }
    setProjectName= async(projectId)=>{
       let res  = await  axios.get(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}`)
        this.setState({title:res.data.name})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.theme !== this.props.theme) {
            this.theme = createMuiTheme(nextProps.theme);
        }
        if(nextProps.location.pathname !== this.props.location.pathname){
            let projectId =nextProps.location.pathname.split('/')[2];
             this.setProjectName(projectId)
            let func_name =nextProps.location.pathname.split('/')[3];
            let _func = Object.values(functions).filter(item=>item.path.includes(func_name))[0];
            func_name=_func?_func.title:func_name;

            this.setState({subtitle:func_name})
        }
        // nextProps.location.pathname.split('/').length > 3 ?
        //  console.log(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${nextProps.location.pathname.split('/')[2]}`) 
        //  : console.log("ABC")

        // nextProps.location.pathname.split('/').length > 2 ? console.log(getProjectName()) : console.log("ABCCCCCCCCCCCC");

        //     function getProjectName() { 
        //         return 
        //         axios(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${nextProps.location.pathname.split('/')[2]}`,
        //             {
        //                 method: "GET"
        //             }
        //         )
        //             .then(project => project);
        //     }

        // nextProps.dispatch(getProjectById)


    }
    render() {
        const { theme, ...rest } = this.props;
        const { title, subtitle } = this.state;
        return (
            <MuiThemeProvider theme={this.theme}>
                <EnhancedLayout {...rest}
                    title={title}
                    subtitle={subtitle}

                />
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
