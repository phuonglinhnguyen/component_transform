"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_router_1 = require("react-router");
var react_redux_1 = require("react-redux");
var connected_react_router_1 = require("connected-react-router");
var actions_1 = require("../actions");
var redux_1 = require("redux");
var utils_1 = require("../utils");
var renderRouter_1 = require("./renderRouter");
var CoreRouter = /** @class */ (function (_super) {
    tslib_1.__extends(CoreRouter, _super);
    function CoreRouter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            children: []
        };
        _this.initializeResources = function (nextProps) {
            _this.initializeResourcesAsync(nextProps);
        };
        _this.initializeResourcesAsync = function (props) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var routeProvider, addAwaitRefresh, userLogout, setUserCurrent, self, apps, routes, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        routeProvider = props.routeProvider, addAwaitRefresh = props.addAwaitRefresh, userLogout = props.userLogout, setUserCurrent = props.setUserCurrent;
                        self = this;
                        if (!utils_1.getUserMetaData()) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, actions_1.getApps()];
                    case 2:
                        apps = _a.sent();
                        routes = routeProvider('private')(apps);
                        setUserCurrent(utils_1.getUserMetaData());
                        this.setState({ children: routes });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        try {
                            addAwaitRefresh(function (dispatch) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var apps, routes;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, actions_1.getApps()];
                                        case 1:
                                            apps = _a.sent();
                                            routes = routeProvider('private')(apps);
                                            setUserCurrent(utils_1.getUserMetaData());
                                            self.setState({ children: routes });
                                            dispatch(connected_react_router_1.push(''));
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        catch (error) {
                            userLogout();
                        }
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        userLogout();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    CoreRouter.prototype.componentWillMount = function () {
        this.initializeResources(this.props);
    };
    CoreRouter.prototype.render = function () {
        var _a = this.props, pages = _a.pages, rootLayout = _a.rootLayout;
        var children = this.state.children;
        if (children.length === 0) {
            return React.createElement(react_router_1.Route, { path: "/", key: "loading", component: pages.Loading });
        }
        var RootLayout = rootLayout || React.Fragment;
        return (React.createElement(RootLayout, tslib_1.__assign({}, this.props),
            React.createElement(react_router_1.Switch, null, renderRouter_1.renderRouter(children, pages))));
    };
    return CoreRouter;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        user: state.user
    };
};
var mapDispatchToProps = function (dispatch) { return redux_1.bindActionCreators({
    userLogout: actions_1.userLogout, addAwaitRefresh: actions_1.addAwaitRefresh, setUserCurrent: actions_1.setUserCurrent
}, dispatch); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CoreRouter);
