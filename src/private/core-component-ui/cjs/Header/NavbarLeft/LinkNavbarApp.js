"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var Button_1 = require("@material-ui/core/Button");
var icons_1 = require("@material-ui/icons");
var Typography_1 = require("@material-ui/core/Typography");
var classnames_1 = require("classnames");
var Hidden_1 = require("@material-ui/core/Hidden");
var styles = function (theme) {
    return {
        root: {
            listStyle: "none",
            display: "flex",
            margin: "0px",
            padding: "0px",
        },
        text: {
            margin: "0px",
        },
        colorText: {
            color: theme.palette.primary.contrastText,
        },
        icon: {
            marginTop: "5px",
            height: "calc(100% - 10px)",
        },
        container: {
            display: "flex",
            alignItems: "center",
        }
    };
};
var LinkNavbarApp = /** @class */ (function (_super) {
    tslib_1.__extends(LinkNavbarApp, _super);
    function LinkNavbarApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LinkNavbarApp.prototype.render = function () {
        var _a = this.props, classes = _a.classes, datas = _a.datas;
        return (React.createElement(Hidden_1.default, { only: ["sm", "xs"] },
            React.createElement("div", { className: classes.container },
                React.createElement("ul", { className: classes.root }, datas.map(function (item, index) {
                    return (React.createElement(React.Fragment, { key: index },
                        index !== 2 ?
                            React.createElement("li", null,
                                React.createElement(Button_1.default, null,
                                    React.createElement(Typography_1.default, { variant: "h6", className: classnames_1.default(classes.text, classes.colorText) }, item))) :
                            React.createElement("li", null,
                                React.createElement(Button_1.default, { disabled: true },
                                    React.createElement(Typography_1.default, { variant: "h6", className: classnames_1.default(classes.text, classes.colorText) }, item))),
                        index !== 2 &&
                            React.createElement("li", null,
                                React.createElement(icons_1.KeyboardArrowRight, { className: classnames_1.default(classes.icon, classes.colorText) }))));
                })))));
    };
    return LinkNavbarApp;
}(React.Component));
exports.default = styles_1.withStyles(styles)(LinkNavbarApp);
