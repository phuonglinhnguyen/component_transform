"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var CssBaseline_1 = require("@material-ui/core/CssBaseline");
var styles_1 = require("@material-ui/core/styles");
var styles_2 = require("@material-ui/core/styles");
var Header_1 = require("../Header");
var Footer_1 = require("../Footer");
var dashboard_plus_1 = require("../assets/dashboard_plus");
var LayoutDefault = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutDefault, _super);
    function LayoutDefault() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutDefault.prototype.render = function () {
        var _a = this.props, classes = _a.classes, theme = _a.theme, linkAppToFunctions = _a.linkAppToFunctions, themes = _a.themes, onChangeTheme = _a.onChangeTheme, userName = _a.userName, version = _a.version, copyRight = _a.copyRight, dataHotLine = _a.dataHotLine, appRoutes = _a.appRoutes, onClickItemApp = _a.onClickItemApp;
        return (React.createElement(React.Fragment, null,
            React.createElement(styles_2.MuiThemeProvider, { theme: styles_2.createMuiTheme(theme) },
                React.createElement(CssBaseline_1.default, null),
                React.createElement("div", { className: classes.container, style: { background: theme.overrides.backgroundBody, } },
                    React.createElement("div", { className: classes.header },
                        React.createElement(Header_1.HeaderDefault, { linkAppToFunctions: linkAppToFunctions, userName: userName, themes: themes, onChangeTheme: onChangeTheme, dataHotLine: dataHotLine, appRoutes: appRoutes, onClickItem: onClickItemApp })),
                    React.createElement("div", { className: classes.content }, this.props.children),
                    React.createElement("div", { className: classes.footer },
                        React.createElement(Footer_1.FooterDefault, { version: version, copyRight: copyRight }))))));
    };
    return LayoutDefault;
}(React.Component));
exports.default = styles_1.withStyles(dashboard_plus_1.DashboardRootStyle, { withTheme: true })(LayoutDefault);
