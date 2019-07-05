"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var icons_1 = require("@material-ui/icons/");
var core_1 = require("@material-ui/core");
var PopoverUserComponent_1 = require("./NavbarRight/PopoverUserComponent");
var PopoverPhoneComponent_1 = require("./NavbarRight/PopoverPhoneComponent");
var DrawerComponent_1 = require("./NavbarLeft/DrawerComponent");
var LinkNavbarApp_1 = require("./NavbarLeft/LinkNavbarApp");
var dashboard_plus_1 = require("../assets/dashboard_plus");
var HeaderComponent = /** @class */ (function (_super) {
    tslib_1.__extends(HeaderComponent, _super);
    function HeaderComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            left: false,
            right: false,
            openMenuUser: false,
            openHotLine: false,
        };
        _this.toggleDrawer = function (side, open) { return function () {
            var _a;
            _this.setState((_a = {},
                _a[side] = open,
                _a.openHotLine = false,
                _a.openMenuUser = false,
                _a));
        }; };
        _this.handleClickIconUser = function (iconIndex) { return function () {
            if (iconIndex === 1) {
                _this.setState({
                    openHotLine: false,
                    openMenuUser: !_this.state.openMenuUser,
                });
            }
            else if (iconIndex === 0) {
                _this.setState({
                    openHotLine: !_this.state.openHotLine,
                    openMenuUser: false,
                });
            }
            else {
                _this.setState({
                    openHotLine: false,
                    openMenuUser: false,
                });
            }
        }; };
        _this.handleClickIconPhone = function () {
            _this.setState({ openHotLine: !_this.state.openHotLine });
        };
        return _this;
    }
    HeaderComponent.prototype.render = function () {
        var _a = this.props, classes = _a.classes, linkAppToFunctions = _a.linkAppToFunctions, themes = _a.themes, _b = _a.onChangeTheme, onChangeTheme = _b === void 0 ? function () { return null; } : _b, userName = _a.userName, dataHotLine = _a.dataHotLine, onClickItem = _a.onClickItem, appRoutes = _a.appRoutes;
        var _c = this.state, openMenuUser = _c.openMenuUser, openHotLine = _c.openHotLine;
        var sideList = (React.createElement("div", { className: classes.list },
            React.createElement(DrawerComponent_1.default, { datas: appRoutes, onClickItem: onClickItem, onClose: this.toggleDrawer })));
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: classes.appBarRoot },
                React.createElement(core_1.AppBar, { position: "static", className: classes.defaultHeight },
                    React.createElement(core_1.Toolbar, { className: classes.defaultHeight },
                        React.createElement("div", null,
                            React.createElement(core_1.IconButton, { color: "inherit", "aria-label": "Open drawer", onClick: this.toggleDrawer('left', true) },
                                React.createElement(icons_1.Menu, null))),
                        React.createElement("div", { className: classes.linkAppToFunctions },
                            React.createElement(LinkNavbarApp_1.default, { datas: linkAppToFunctions })),
                        React.createElement("div", null,
                            React.createElement(core_1.IconButton, { "aria-haspopup": "true", color: "inherit", onClick: this.handleClickIconUser(0) },
                                React.createElement(icons_1.Phone, null))),
                        React.createElement("div", null,
                            React.createElement(core_1.IconButton, { "aria-haspopup": "true", color: "inherit", onClick: this.toggleDrawer("right", true) },
                                React.createElement(icons_1.Notifications, null))),
                        React.createElement("div", null,
                            React.createElement(core_1.IconButton, { "aria-haspopup": "true", onClick: this.handleClickIconUser(1), color: "inherit" },
                                React.createElement(icons_1.AccountCircle, null)))))),
            React.createElement(PopoverUserComponent_1.default, { open: openMenuUser, themes: themes, userName: userName, onChangeTheme: onChangeTheme, onReportDate: onChangeTheme, onChangePassword: onChangeTheme, onLogOut: onChangeTheme }),
            React.createElement(PopoverPhoneComponent_1.default, { open: openHotLine, datas: dataHotLine }),
            React.createElement(core_1.SwipeableDrawer, { anchor: "left", open: this.state.left, onClose: this.toggleDrawer('left', false), onOpen: this.toggleDrawer('left', true) },
                React.createElement("div", { tabIndex: 0, role: "button", onClick: this.toggleDrawer('right', false), onKeyDown: this.toggleDrawer('right', false) }, sideList)),
            React.createElement(core_1.SwipeableDrawer, { anchor: "right", open: this.state.right, onClose: this.toggleDrawer('right', false), onOpen: this.toggleDrawer('right', true) },
                React.createElement("div", { tabIndex: 0, role: "button", onClick: this.toggleDrawer('right', false), onKeyDown: this.toggleDrawer('right', false) }, ""))));
    };
    return HeaderComponent;
}(React.Component));
exports.default = styles_1.withStyles(dashboard_plus_1.DashboardRootStyle)(HeaderComponent);
