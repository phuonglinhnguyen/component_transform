"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var classnames_1 = require("classnames");
var icons_1 = require("@material-ui/icons");
var core_1 = require("@material-ui/core");
var react_redux_i18n_1 = require("react-redux-i18n");
var theme_1 = require("../../assets/theme");
var styles = function (theme) {
    return {
        root: {
            position: 'relative',
        },
        container: {
            display: 'flex',
            zIndex: theme.zIndex.tooltip,
            position: 'absolute',
            right: "0px",
            maxWidth: "250px",
            width: "250px",
        },
        paper: {
            margin: theme.spacing.unit,
            width: "100%",
            borderRadius: '5px',
        },
        iconColor: {
            borderRadius: '25px',
            width: '40px',
            height: '40px',
            boxShadow: theme.shadows[1],
            color: theme.palette.primary.contrastText,
            "&:hover": {
                // boxShadow: theme.overrides.shadowsHover_2,
                boxShadow: '0px 3px 5px 0px rgba(0,0,0,1)',
            }
        },
        themesRoot: {
            textAlign: "center",
            width: "100%",
            fontWeight: "bold",
            fontSize: "20px"
        },
        themesContent: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: theme.spacing.unit,
            padding: theme.spacing.unit,
        },
        marginLeft: {
            marginLeft: theme.spacing.unit
        },
        hover: {
            "&:hover": {
                // boxShadow: theme.overrides.shadowsHover_1,
                // background: theme.overrides.backgroundHover_1,
                boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.3)',
                background: '#ddd',
                fontWeight: "bold",
                // color: theme.overrides.colorHover_1,
                color: '#000',
            }
        },
        buttonLogout: {
            margin: theme.spacing.unit,
            // boxShadow: theme.overrides.shadowsHoverPri_1,
            boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(" + theme_1.hexToRgb(theme.palette.primary.main) + ", 0.1)",
            // background: theme.palette.primary[theme.palette.type],
            // color: theme.palette.primary.contrastText,
            // fontWeight: "bold",
            width: "calc(100% - " + theme.spacing.unit * 2 + "px)"
        },
        userProfile: {
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            height: '50px',
            lineHeight: '50px'
        },
        diveder: {
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit,
        },
    };
};
var PopoverUserComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PopoverUserComponent, _super);
    function PopoverUserComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClickItem = function (item) { return function () {
            var _a = _this.props.onChangeTheme, onChangeTheme = _a === void 0 ? function () { return null; } : _a;
            onChangeTheme(item);
        }; };
        return _this;
    }
    PopoverUserComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, open = _a.open, themes = _a.themes, userName = _a.userName, _b = _a.onChangeTheme, onChangeTheme = _b === void 0 ? null : _b, _c = _a.onReportDate, onReportDate = _c === void 0 ? null : _c, _d = _a.onLogOut, onLogOut = _d === void 0 ? null : _d, _e = _a.onChangePassword, onChangePassword = _e === void 0 ? null : _e;
        if (!open) {
            return "";
        }
        else {
            return (React.createElement("div", { className: classes.root },
                React.createElement("div", { className: classes.container },
                    React.createElement(core_1.Fade, { in: open, style: { width: "100%" } },
                        React.createElement(core_1.Paper, { elevation: 4, className: classes.paper },
                            React.createElement("div", { style: { width: "100%" } },
                                React.createElement("ul", { style: { listStyle: "none", width: "100%", textAlign: "center", margin: '0px', padding: '0px' } },
                                    userName &&
                                        React.createElement(React.Fragment, null,
                                            React.createElement("li", null,
                                                React.createElement("div", { className: classes.userProfile },
                                                    React.createElement(react_redux_i18n_1.Translate, { value: 'popover_user.user_id', userID: userName.toUpperCase() }))),
                                            React.createElement("li", null,
                                                React.createElement(core_1.Divider, { variant: "middle", className: classes.diveder }))),
                                    onChangeTheme &&
                                        React.createElement(React.Fragment, null,
                                            React.createElement("li", null,
                                                React.createElement("div", { className: classes.themesRoot },
                                                    React.createElement(react_redux_i18n_1.Translate, { value: 'popover_user.themes' }),
                                                    React.createElement("div", { style: {
                                                            flexDirection: "column",
                                                            display: "flex",
                                                            alignItems: "center",
                                                        } },
                                                        React.createElement("div", { className: classes.themesContent }, themes.map(function (item, index) {
                                                            if (index === 0) {
                                                                return (React.createElement("div", { className: classes.iconColor, onClick: _this.handleClickItem(item.name), style: { background: item.color } }, item.active ? React.createElement(icons_1.Check, { fontSize: "large" }) : ""));
                                                            }
                                                            else {
                                                                return (React.createElement("div", { className: classnames_1.default(classes.iconColor, classes.marginLeft), onClick: _this.handleClickItem(item.name), style: { background: item.color } }, item.active ? React.createElement(icons_1.Check, { fontSize: "large", className: classes.iconColor }) : ""));
                                                            }
                                                        }))))),
                                            React.createElement("li", null,
                                                React.createElement(core_1.Divider, { variant: "middle", className: classes.diveder }))),
                                    onReportDate &&
                                        React.createElement("li", null,
                                            React.createElement(core_1.Button, { variant: "contained", className: classnames_1.default(classes.buttonLogout, classes.hover), onClick: onReportDate },
                                                React.createElement(react_redux_i18n_1.Translate, { value: 'popover_user.working_report_date' }))),
                                    onChangePassword &&
                                        React.createElement(React.Fragment, null,
                                            React.createElement("li", null,
                                                React.createElement(core_1.Button, { variant: "contained", className: classnames_1.default(classes.buttonLogout, classes.hover), onClick: onChangePassword },
                                                    React.createElement(react_redux_i18n_1.Translate, { value: 'popover_user.change_password' }))),
                                            React.createElement("li", null,
                                                React.createElement(core_1.Divider, { variant: "middle", className: classes.diveder }))),
                                    onLogOut &&
                                        React.createElement("li", null,
                                            React.createElement(core_1.Button, { variant: "contained", className: classnames_1.default(classes.buttonLogout, classes.hover), onClick: onLogOut },
                                                React.createElement(react_redux_i18n_1.Translate, { value: 'popover_user.log_out' }),
                                                React.createElement(icons_1.ArrowForward, null))))))))));
        }
    };
    return PopoverUserComponent;
}(React.Component));
exports.default = styles_1.withStyles(styles)(PopoverUserComponent);
