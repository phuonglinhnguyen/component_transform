"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var PropTypes = require("prop-types");
var classnames_1 = require("classnames");
var withStyles_1 = require("@material-ui/core/styles/withStyles");
var styles = function (theme) {
    return {
        cardIcon: {
            borderRadius: "35px",
            padding: "15px",
            marginRight: "15px",
            float: "left",
            background: theme.overrides.backgroundWhite,
            color: theme.palette.secondary[theme.palette.type],
        },
    };
};
function CardIcon(_a) {
    var _b;
    var props = tslib_1.__rest(_a, []);
    var classes = props.classes, children = props.children, className = props.className, rest = tslib_1.__rest(props, ["classes", "children", "className"]);
    var cardIconClasses = classnames_1.default((_b = {},
        _b[classes.cardIcon] = true,
        _b[className] = className !== undefined,
        _b));
    return (React.createElement("div", tslib_1.__assign({ className: cardIconClasses }, rest), children));
}
CardIcon.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};
exports.default = withStyles_1.default(styles)(CardIcon);
