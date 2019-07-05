"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var drawerWidth = 240;
var styles = function (theme) {
    return {
        buttonGroupTree: {
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", 'sans-serif'",
            fontWeight: '300px',
            lineHeight: '0.1em',
            position: 'fixed',
            top: '107px',
            left: '0px',
            width: theme.spacing.unit * 5,
            background: "rgba(0, 0, 0, 0.3)",
            zIndex: theme.zIndex.appBar,
            borderRadius: '0px 8px 8px 0px',
            textAlign: 'center',
        },
        container: {
            width: "100%",
            height: "auto",
        },
        root: {
            display: 'flex',
        },
        menuButton: {
            marginLeft: 12,
            marginRight: 20,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            maxHeight: "calc(100% - " + theme.spacing.unit * 8 + "px)",
            background: "none",
        },
        drawerPaper: {
            width: drawerWidth,
            marginTop: theme.spacing.unit * 8,
            maxHeight: "calc(100% - " + theme.spacing.unit * 8 + "px)",
            background: "none",
            borderRight: "0px",
        },
        drawerHeader: tslib_1.__assign({ display: 'flex', alignItems: 'center' }, theme.mixins.toolbar),
        drawerContent: {
            margin: theme.spacing.unit + "px " + theme.spacing.unit + "px " + theme.spacing.unit * 4 + "px " + theme.spacing.unit + "px",
            width: "calc(100% - " + theme.spacing.unit * 2 + "px)",
            height: "calc(100% - " + theme.spacing.unit * 5 + "px)",
        },
        content: {
            flexGrow: 1,
            maxHeight: "calc(100% - " + theme.spacing.unit * 11 + "px)",
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        paddingTaskItem: {
            padding: theme.spacing.unit
        },
        hoverGroupTree: {
            margin: theme.spacing.unit,
            width: "calc(100% - " + theme.spacing.unit * 2 + "px)",
            borderRadius: "3px",
            "&:hover": {
                boxShadow: theme.overrides.shadowsHover_1,
                background: theme.overrides.backgroundHover_1,
                fontWeight: "bold",
            }
        },
    };
};
exports.default = styles;
