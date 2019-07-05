"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageOption = /** @class */ (function () {
    function PageOption(props) {
        this.actions = props.actions || {};
        this.resources = props.resources || [];
        this.context = props.context || 'registration';
        this.mapState = props.mapState;
    }
    return PageOption;
}());
exports.PageOption = PageOption;
