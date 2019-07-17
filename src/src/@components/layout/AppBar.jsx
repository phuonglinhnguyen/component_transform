import * as  React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import compose from 'recompose/compose';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Badge from '@material-ui/core/Badge';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuUser from './menuUser'
import Sidebar from './sideBar';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconInfo from '@material-ui/icons/Info';
import packageJson from '../../../package.json'


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NavigationClose from '@material-ui/icons/Navigation';
import { Home as HomeIcon } from '@material-ui/icons';

import { redirectApp } from '@dgtx/coreui'
import { PopoverUser } from '@dgtx/core-component-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const styles = theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        zIndex: 1300,
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
    toolbar: {
        paddingRight: 16,
    },
    menuButton: {
        marginLeft: '0.5em',
        marginRight: '0.5em',
    },
    menuButtonIconClosed: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transform: 'rotate(0deg)',
    },
    menuButtonIconOpen: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        transform: 'rotate(180deg)',
    },
    title: {
        flex: 1,
    },

    logout: {
        color: theme.palette.secondary.contrastText,
    },
    popup: {
        marginTop: 8,
        borderTopLeftRadius: 0, borderTopRightRadius: 0,
        minWidth: 300,
        maxWidth: 350,
        overflow: 'auto',
        height: "auto",
        boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px -4px 10px"
    },
    progress: { margin: '0px auto' },
    poperUser: {
        top: '48px',
        position: 'absolute',
        display: 'flex',
        zIndex: theme.zIndex.tooltip,
        width: "100%",
        right: '0px'
    }
});


class AppBar extends React.Component {
    state = {
        anchorEl: null,
    };
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render = () => {
        const { classes,
            className,
            title,
            onLogout,
            toggleSidebar,
            loading,
            user,
            themes,
            changeTheme,
            ...rest } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (<MuiAppBar
            className={classNames(classes.appBar, className)}
            position="absolute"
            {...rest}
        >
            {/* <Sidebar/> */}
            <Toolbar disableGutters className={classes.toolbar}>
                {/* <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={()=>{
                        redirectApp('home')
                    }}
                    className={classNames(classes.menuButton)}
                >
                    <HomeIcon
                        classes={classes.menuButtonIconOpen}
                    />
                </IconButton> */}
                <Typography
                    variant="title"
                    color="inherit"
                    className={classes.title}
                >
                    {typeof title === 'string' ? title : React.cloneElement(title)}
                </Typography>
                {loading > 0 && (<div>
                    <CircularProgress className={classes.progress} color="secondary" />
                </div>)}
                <div>
                    {/* <IconButton
                        aria-owns={open ? 'menu-list-grow' : null}
                        aria-haspopup="true"
                        // onClick={this.handleMenu}
                        color="inherit"
                    >
                            <PhoneIcon />
                    </IconButton> */}
                    {/* <IconButton
                        aria-owns={open ? 'menu-list-grow' : null}
                        aria-haspopup="true"
                        // onClick={this.handleMenu}
                        color="inherit"
                    >
                            <NotificationsIcon  />
                    </IconButton> */}
                    {/* <IconButton
                        aria-owns={open ? 'menu-list-grow' : null}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton> */}
                    {/* <Tooltip title="App Version" placement="bottom">

                                <Button variant="contained" size="small"
                                    color="secondary">
                                    {` Ver. ${packageJson.version}`}
                                </Button>
                            </Tooltip> */}

                    <FormControlLabel
                        control={
                            <AccountCircle />
                        }
                        label={<span style={{
                            height: '64px',
                            // margin: '-8px 0 0 0',
                            color: 'white',
                            position: 'relative',
                            paddingLeft: '8px',
                            verticalAlign: 'middle',
                            letterSpacing: '0px',
                            textTransform: 'uppercase',
                            fontWeight: '500px',
                            fontSize: '14px',
                            fontWeight: '700',

                        }}>{user.displayName}</span>}
                        style={{ margin: '0px' }}
                        onClick={this.handleMenu}
                    />

                    {/* <Popper
                        placement='bottom-end'
                        open={open} anchorEl={anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'bottom end' : 'bottom end' }}
                            >
                                <Paper className={classes.popup}>
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <MenuUser onLogout={onLogout} user={user} />
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper> */}
                    <PopoverUser
                        open={open}
                        anchorEl={anchorEl}
                        onRequestClose={this.handleClose}
                        // themes={themes}
                        userName={user.username}
                        // onChangeTheme={onChangeTheme}
                        // onReportDate={onChangeTheme}
                        // onChangePassword={this.handleClickDialog}
                        onLogOut={onLogout}
                        // anchorOrigin={{
                        //     vertical: 'bottom',
                        //     // horizontal: 'center',
                        // }}
                        // transformOrigin={{
                        //     vertical: 'top',
                        //     // horizontal: 'center',
                        // }}
                        className={classes.poperUser}
                    />
                </div>
            </Toolbar>
        </MuiAppBar>)
    }
}
const enhance = compose(
    connect(
        state => ({
            locale: state.i18n.locale, // force redraw on locale change
        }),

    ),
    withStyles(styles)
);
export default enhance(AppBar);