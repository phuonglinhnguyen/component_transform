"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var icons_1 = require("@material-ui/icons");
var Lodash = require("lodash");
var styles = function (theme) {
    return {
        hover: {
            margin: theme.spacing.unit,
            width: "calc(100% - " + theme.spacing.unit * 2 + "px)",
            borderRadius: "3px",
            "&:hover": {
                boxShadow: theme.overrides.shadowsHover_1,
                background: theme.overrides.backgroundHover_1,
                fontWeight: "bold",
            }
        },
        wapperIcon: {
            margin: "0px",
            color: theme.palette.primary[theme.palette.type],
            fontWeight: "bold",
        }
    };
};
var DrawerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DrawerComponent, _super);
    function DrawerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClickItem = function (item) { return function () {
            var _a = _this.props.onClickItem, onClickItem = _a === void 0 ? function () { return null; } : _a;
            onClickItem(item);
        }; };
        _this.handleClickClose = function () {
            var _a = _this.props.onClose, onClose = _a === void 0 ? function () { return null; } : _a;
            onClose('left', false);
        };
        return _this;
    }
    DrawerComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, datas = _a.datas;
        var datas2 = Lodash.orderBy(datas, "label", 'asc');
        var itemHome = datas2.filter(function (item) { return item.name === "home"; })[0];
        return (React.createElement(React.Fragment, null,
            React.createElement(core_1.List, null,
                React.createElement(core_1.ListItem, { button: true, className: classes.hover, onClick: this.handleClickClose },
                    React.createElement(core_1.ListItemIcon, { className: classes.wapperIcon },
                        React.createElement(icons_1.ChevronLeft, { fontSize: "large" })),
                    React.createElement(core_1.ListItemText, { primary: "Close" })),
                React.createElement(core_1.Divider, null),
                React.createElement(core_1.ListItem, { button: true, key: itemHome.name, onClick: this.handleClickItem(itemHome), className: classes.hover },
                    React.createElement(core_1.ListItemIcon, { className: classes.wapperIcon }, itemHome.navbarIcon),
                    React.createElement(core_1.ListItemText, { primary: itemHome.sidebarName })),
                React.createElement(core_1.Divider, null),
                datas2.filter(function (i) { return i.name !== 'home'; }).map(function (item) {
                    return (React.createElement(React.Fragment, { key: item.name },
                        React.createElement(core_1.ListItem, { button: true, key: item.name, onClick: _this.handleClickItem(item), className: classes.hover },
                            React.createElement(core_1.ListItemIcon, { className: classes.wapperIcon }, item.navbarIcon),
                            React.createElement(core_1.ListItemText, { primary: item.sidebarName })),
                        React.createElement(core_1.Divider, null)));
                }))));
    };
    return DrawerComponent;
}(React.Component));
exports.default = styles_1.withStyles(styles)(DrawerComponent);
