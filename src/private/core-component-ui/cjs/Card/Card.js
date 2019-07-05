"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var PropTypes = require("prop-types");
var classnames_1 = require("classnames");
var withStyles_1 = require("@material-ui/core/styles/withStyles");
var styles = function (theme) {
    return {
        card: {
            border: "0",
            marginBottom: "30px",
            marginTop: "30px",
            borderRadius: "6px",
            color: theme.palette.primary[theme.palette.type],
            background: theme.palette.common.white,
            width: "100%",
            boxShadow: theme.shadows[1],
            position: "relative",
            display: "flex",
            flexDirection: "column",
            minWidth: "0",
            wordWrap: "break-word",
            fontSize: ".875rem"
        }
    };
};
function Card(_a) {
    var _b;
    var props = tslib_1.__rest(_a, []);
    var classes = props.classes, className = props.className, children = props.children, rest = tslib_1.__rest(props, ["classes", "className", "children"]);
    var cardClasses = classnames_1.default((_b = {},
        _b[classes.card] = true,
        _b[className] = className !== undefined,
        _b));
    return (React.createElement("div", tslib_1.__assign({ className: cardClasses }, rest), children));
}
Card.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};
exports.default = withStyles_1.default(styles)(Card);
