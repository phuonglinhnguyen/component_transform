"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var withStyles_1 = require("@material-ui/core/styles/withStyles");
var core_1 = require("@material-ui/core");
var icons_1 = require("@material-ui/icons");
var Tooltip_1 = require("@material-ui/core/Tooltip");
var dashboard_plus_1 = require("../assets/dashboard_plus");
var DashboardColumn = /** @class */ (function (_super) {
    tslib_1.__extends(DashboardColumn, _super);
    function DashboardColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false,
        };
        _this.handleDrawerOpen = function () {
            _this.setState({ open: true });
        };
        _this.handleDrawerClose = function () {
            _this.setState({ open: false });
        };
        return _this;
    }
    DashboardColumn.prototype.render = function () {
        var _a;
        var _b = this.props, classes = _b.classes, theme = _b.theme, groups = _b.groups, children = _b.children, selectItemGroupTree = _b.selectItemGroupTree;
        var open = this.state.open;
        return (React.createElement("div", { className: classes.root },
            React.createElement(core_1.CssBaseline, null),
            React.createElement("div", { className: classnames_1.default(classes.buttonGroupTree, open && classes.hide), onClick: this.handleDrawerOpen },
                React.createElement(Tooltip_1.default, { title: "Group Tree", "aria-label": "Group-Tree" },
                    React.createElement(icons_1.Sort, { fontSize: 'large' }))),
            renderGroupTree({ groups: groups, open: open, onCloseDrawer: this.handleDrawerClose, selectItem: selectItemGroupTree, theme: theme, classes: classes }),
            React.createElement("main", { className: classnames_1.default(classes.content, (_a = {},
                    _a[classes.contentShift] = open,
                    _a)) },
                React.createElement(core_1.Grid, { container: true, direction: "row", justify: "flex-start", alignItems: "flex-start", className: classes.container }, getBody(children, classes)))));
    };
    return DashboardColumn;
}(React.Component));
exports.default = withStyles_1.default(dashboard_plus_1.DashboardAppStyle, { withTheme: true })(DashboardColumn);
var getBody = function (children, classes) {
    var children2 = React.Children.map(children, function (item) { return item !== null; });
    var itemCount = children2.filter(function (item) { return item === true; });
    if (itemCount.length === 3) {
        return React.Children.map(children, function (item) {
            if (item && item.key === "0") {
                return (React.createElement(core_1.Grid, { item: true, xl: 5, lg: 5, md: 4, sm: 12, xs: 12, className: classes.paddingTaskItem },
                    React.createElement(core_1.Paper, { elevation: 5 }, item)));
            }
            else if (item && item.key === "1") {
                return (React.createElement(core_1.Grid, { item: true, xl: 3, lg: 3, md: 4, sm: 12, xs: 12, className: classes.paddingTaskItem },
                    React.createElement(core_1.Paper, { elevation: 5 }, item)));
            }
            else if (item && item.key === "2") {
                return (React.createElement(core_1.Grid, { item: true, xl: 4, lg: 4, md: 4, sm: 12, xs: 12, className: classes.paddingTaskItem },
                    React.createElement(core_1.Paper, { elevation: 5 }, item)));
            }
            return null;
        });
    }
    if (itemCount.length === 2) {
        return React.Children.map(children, function (item) {
            if (item && item.key === "0") {
                return (React.createElement(core_1.Grid, { item: true, xl: 9, lg: 9, md: 8, sm: 12, xs: 12, className: classes.paddingTaskItem },
                    React.createElement(core_1.Paper, { elevation: 5 }, item)));
            }
            else if (item && item.key === "1") {
                return (React.createElement(core_1.Grid, { item: true, xl: 3, lg: 3, md: 4, sm: 12, xs: 12, className: classes.paddingTaskItem },
                    React.createElement(core_1.Paper, { elevation: 5 }, item)));
            }
            return null;
        });
    }
    if (itemCount.length === 1) {
        return React.Children.map(children, function (item) {
            if (item && item.key === "0") {
                return (React.createElement(core_1.Grid, { item: true, xl: 12, lg: 12, md: 12, sm: 12, xs: 12, className: classes.paddingTaskItem },
                    React.createElement(core_1.Paper, { elevation: 5 }, item)));
            }
            return null;
        });
    }
    return null;
};
var renderGroupTree = function (props) {
    var classes = props.classes, open = props.open, groups = props.groups, _a = props.selectItem, selectItem = _a === void 0 ? function () { return null; } : _a, _b = props.onCloseDrawer, onCloseDrawer = _b === void 0 ? function () { return null; } : _b;
    var handleClickItem = function (item) { return function () {
        selectItem(item);
    }; };
    var handleClickClose = function () {
        onCloseDrawer();
    };
    return (React.createElement(core_1.Drawer, { className: classes.drawer, variant: "persistent", anchor: "left", open: open, classes: {
            paper: classes.drawerPaper,
        } },
        React.createElement(core_1.Paper, { elevation: 5, className: classes.drawerContent },
            React.createElement("div", { className: classnames_1.default(classes.drawerHeader, classes.hoverGroupTree), onClick: handleClickClose },
                React.createElement(icons_1.ChevronLeft, null),
                React.createElement(core_1.Typography, { gutterBottom: true, variant: "h5", style: { margin: "0px", textAlign: "center" } }, "GROUP")),
            React.createElement(core_1.Divider, null),
            React.createElement(core_1.List, null,
                React.createElement(core_1.ListItem, { button: true, key: "ALL", className: classes.hoverGroupTree, onClick: handleClickItem('ALL') },
                    React.createElement(core_1.ListItemText, { primary: "ALL" })),
                groups.map(function (text) {
                    return (React.createElement(core_1.ListItem, { button: true, key: text.name, className: classes.hoverGroupTree, onClick: handleClickItem(text) },
                        React.createElement(core_1.ListItemText, { primary: text.name })));
                })))));
};
