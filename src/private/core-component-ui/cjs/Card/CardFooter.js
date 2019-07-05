"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var PropTypes = require("prop-types");
var classnames_1 = require("classnames");
var withStyles_1 = require("@material-ui/core/styles/withStyles");
var styles = function (theme) {
    return {
        cardFooter: {
            padding: "0",
            paddingTop: "10px",
            margin: "0 15px 10px",
            borderRadius: "0",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            backgroundColor: "transparent",
            border: "0"
        }
    };
};
function CardFooter(_a) {
    var _b;
    var props = tslib_1.__rest(_a, []);
    var classes = props.classes, className = props.className, children = props.children, rest = tslib_1.__rest(props, ["classes", "className", "children"]);
    var cardFooterClasses = classnames_1.default((_b = {},
        _b[classes.cardFooter] = true,
        _b[className] = className !== undefined,
        _b));
    return (React.createElement("div", tslib_1.__assign({ className: cardFooterClasses }, rest), children));
}
CardFooter.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};
exports.default = withStyles_1.default(styles)(CardFooter);
