"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classnames_1 = require("classnames");
var Lodash = require("lodash");
var styles_1 = require("@material-ui/core/styles");
var icons_1 = require("@material-ui/icons");
var core_1 = require("@material-ui/core");
var Card_1 = require("../Card/Card");
var CardHeader_1 = require("../Card/CardHeader");
var CardIcon_1 = require("../Card/CardIcon");
var CardFooter_1 = require("../Card/CardFooter");
var dashboard_plus_1 = require("../assets/dashboard_plus");
var DashboardRoot = /** @class */ (function (_super) {
    tslib_1.__extends(DashboardRoot, _super);
    function DashboardRoot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DashboardRoot.prototype.render = function () {
        var _a = this.props, classes = _a.classes, AppRoutes = _a.AppRoutes, _b = _a.onClickItem, onClickItem = _b === void 0 ? function () { return null; } : _b;
        var data = Lodash.orderBy(AppRoutes, "sidebarName", 'asc');
        var handleClickItem = function (item) { return function () {
            onClickItem(item);
        }; };
        return (React.createElement(React.Fragment, null,
            React.createElement(core_1.Grid, { container: true, direction: "row", justify: "flex-start", alignItems: "flex-start", spacing: 0 }, data.filter(function (i) { return i.name !== 'home'; }).map(function (item) {
                return (React.createElement(core_1.Grid, { key: item.name, item: true, xl: 4, lg: 4, md: 4, sm: 6, xs: 12, className: classes.itemGrid },
                    React.createElement(Card_1.default, { onClick: handleClickItem(item), className: classes.itemCard },
                        React.createElement(CardHeader_1.default, { icon: true },
                            item.navbarIcon &&
                                React.createElement(CardIcon_1.default, null, item.navbarIcon),
                            React.createElement(core_1.Hidden, { only: ["sm", "xs"] },
                                React.createElement("p", { className: classnames_1.default(classes.cardCategory) }, item.sidebarName)),
                            React.createElement(core_1.Hidden, { only: ["xl", "lg", "md"] },
                                React.createElement("p", { className: classnames_1.default(classes.cardCategory, classes.fontSmall) }, item.sidebarName))),
                        React.createElement(CardFooter_1.default, null,
                            React.createElement("div", { className: classes.stats },
                                React.createElement(icons_1.Update, null),
                                "More Infomations")))));
            }))));
    };
    return DashboardRoot;
}(React.Component));
exports.default = styles_1.withStyles(dashboard_plus_1.DashboardRootStyle, { withTheme: true })(DashboardRoot);
