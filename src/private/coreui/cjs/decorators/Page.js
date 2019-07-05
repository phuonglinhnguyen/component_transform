"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var actions_1 = require("../actions");
var utils_1 = require("../utils");
var PageOption_1 = require("./PageOption");
exports.PageDecorator = function (option) { return function (Target) {
    var optionIn = new PageOption_1.PageOption(option);
    var actions = tslib_1.__assign({ registerResource: actions_1.registerResource, unregisterResource: actions_1.unregisterResource }, optionIn.actions);
    var mapStateToProps = function (state, ownProps) {
        var mapState = (typeof optionIn.mapState === 'function') ? option.mapState(state, ownProps) : ownProps;
        return tslib_1.__assign({ user: state.user.user, option: optionIn }, mapState);
    };
    var mapDispatchToProps = function (dispatch) { return redux_1.bindActionCreators(actions, dispatch); };
    var Page = /** @class */ (function (_super) {
        tslib_1.__extends(Page, _super);
        function Page(props) {
            var _this = _super.call(this, props) || this;
            _this.componentWillMount = function () {
                var _a = _this.props, registerResource = _a.registerResource, option = _a.option;
                if (option.context === 'registration') {
                    registerResource(option.resources, _this.guid);
                }
            };
            _this.componentWillUnmount = function () {
                var _a = _this.props, unregisterResource = _a.unregisterResource, option = _a.option;
                if (option.context === 'registration') {
                    unregisterResource(option.resources, _this.guid);
                }
            };
            _this.render = function () {
                return React.createElement(Target, tslib_1.__assign({}, _this.props));
            };
            _this.guid = utils_1.guid();
            return _this;
        }
        return Page;
    }(React.Component));
    return react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Page);
}; };
