"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouteFunc = /** @class */ (function () {
    function RouteFunc(props) {
        this.name = props.name;
        this.path = props.path;
        this.exact = props.exact;
        this.layout = props.layout;
        this.component = props.component;
        this.layoutName = props.layoutName;
        if (props.subRoutes) {
            this.subRoutes = props.subRoutes.map(function (item) { return new RouteFunc(item); });
        }
        else {
            this.subRoutes = [];
        }
    }
    return RouteFunc;
}());
exports.RouteFunc = RouteFunc;
