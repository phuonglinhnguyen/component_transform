"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var withStyles_1 = require("@material-ui/core/styles/withStyles");
var styles = function (theme) {
    return {
        cardCategory: {
            color: theme.palette.text.primary,
            margin: "0",
            fontSize: "50px",
            fontWeight: "bold",
            marginTop: "0",
            paddingTop: theme.spacing.unit,
            marginBottom: "0",
        },
        cardTitle: {
            fontSize: "20px",
            fontWeight: "300",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            lineHeight: "25px",
        },
        itemCard: {
            border: "0",
            margin: theme.spacing.unit * 3,
            borderRadius: "40px",
            width: "calc(100% - " + theme.spacing.unit * 6 + "px)",
            height: "calc(100% - " + theme.spacing.unit * 6 + "px)",
            padding: "0px " + theme.spacing.unit * 2 + "px 0px " + theme.spacing.unit * 2 + "px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            minWidth: "0",
            wordWrap: "break-word",
            fontSize: ".875rem",
            boxShadow: theme.overrides.shadowsHoverPri_1,
            background: theme.palette.primary[theme.palette.type],
            color: theme.palette.primary.contrastText,
            "&:hover": {
                boxShadow: theme.overrides.shadowsHover_1,
                background: theme.overrides.backgroundHover_1,
                color: theme.overrides.colorHover_1,
                fontWeight: "bold",
            }
        },
        taskFocused: {
            boxShadow: theme.overrides.shadowsHover_2,
            background: theme.palette.secondary[theme.palette.type] + " !important",
            color: theme.palette.secondary.contrastText,
            fontWeight: "bold",
        },
        taskFocused2: {
            background: theme.palette.secondary[theme.palette.type] + " !important",
            color: theme.palette.secondary.contrastText + " !important",
            fontWeight: "bold",
        },
        cardItemCount: {
            width: "110px",
            height: "25px",
            borderRadius: "25px",
            float: "right",
            textAlign: "center",
            lineHeight: "25px",
            fontSize: "x-large",
            fontWeight: "bold",
            background: theme.overrides.backgroundHover_1,
            color: theme.overrides.colorHover_1,
        },
        header: {
            padding: "10px",
            float: "left"
        }
    };
};
var TaskItem = function (props) {
    var classes = props.classes, item = props.item, _a = props.onClickTask, onClickTask = _a === void 0 ? function () { return null; } : _a;
    var handleOnClick = function () {
        onClickTask(item);
    };
    return (React.createElement("div", { className: item.selected ? classnames_1.default(classes.itemCard, classes.taskFocused) : classes.itemCard, onClick: handleOnClick },
        React.createElement("div", { className: classes.header },
            item && item.instances &&
                React.createElement("div", { className: item.selected ? classnames_1.default(classes.cardItemCount, classes.taskFocused2) : classes.cardItemCount }, item.instances),
            item && React.createElement("h3", { className: classes.cardTitle }, (item.name && item.name) || item))));
};
exports.default = withStyles_1.default(styles)(TaskItem);
