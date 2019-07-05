"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var styles = function (theme) {
    return {
        container: {
            display: 'flex',
            width: '100vw',
            maxWidth: '100%',
            height: '100vh',
            maxHeight: '100%',
            flexWrap: 'wrap',
            flexDirection: 'column',
            overflow: 'hidden',
        },
        header: {
            maxHeight: theme.spacing.unit * 8 + "px",
            height: theme.spacing.unit * 8 + "px",
        },
        appBarRoot: {
            maxHeight: theme.spacing.unit * 8 + "px",
            height: theme.spacing.unit * 8 + "px",
        },
        defaultHeight: {
            maxHeight: theme.spacing.unit * 8 + "px",
            height: theme.spacing.unit * 8 + "px",
        },
        appBarGrow: {
            flexGrow: 1,
        },
        content: {
            flexGrow: '1',
            maxHeight: "calc(100% - " + theme.spacing.unit * 11 + "px)",
            maxWidth: '100%',
            overflow: 'auto'
        },
        footer: {
            maxHeight: theme.spacing.unit * 3,
            minHeight: theme.spacing.unit * 3,
            zIndex: theme.tooltip,
        },
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        cardCategory: {
            color: theme.palette.secondary.contrastText,
            margin: "0",
            fontSize: "50px",
            fontWeight: "bold",
            marginTop: "0",
            paddingTop: theme.spacing.unit,
            marginBottom: "0"
        },
        fontSmall: {
            fontSize: "20px",
        },
        cardTitle: {
            color: theme.palette.common.black,
            marginTop: "0px",
            minHeight: "auto",
            fontSize: "30px",
            fontWeight: "300",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            marginBottom: "3px",
            textDecoration: "none",
            "& small": {
                color: theme.palette.primary,
                fontSize: "25px",
                fontWeight: "400",
                lineHeight: "1"
            }
        },
        itemGrid: {
            padding: theme.spacing.unit + "px " + theme.spacing.unit * 4 + "px 0px " + theme.spacing.unit * 4 + "px",
        },
        itemCard: {
            "&:hover": {
                boxShadow: theme.overrides.shadowsHoverPri_2
            }
        },
        stats: {
            borderTop: "1px solid " + theme.palette.text.primary,
            color: theme.palette.text.primary,
            marginTop: "20px",
            "& svg": {
                position: "relative",
                top: "4px",
                marginRight: "3px",
                marginLeft: "3px",
                width: "16px",
                height: "16px"
            },
            "& .fab,& .fas,& .far,& .fal,& .material-icons": {
                fontSize: "16px",
                position: "relative",
                top: "4px",
                marginRight: "3px",
                marginLeft: "3px"
            }
        },
        linkAppToFunctions: {
            maxHeight: theme.spacing.unit * 8 + "px",
            height: theme.spacing.unit * 8 + "px",
            display: 'flex',
            flexGrow: 1
        }
    };
};
exports.default = styles;
