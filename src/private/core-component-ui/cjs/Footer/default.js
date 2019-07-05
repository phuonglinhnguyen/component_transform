"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var Copyright_1 = require("@material-ui/icons/Copyright");
var Grid_1 = require("@material-ui/core/Grid");
var styles = function (theme) {
    return {
        container: {
            opacity: 0.9,
            filter: "alpha(opacity=10)",
            background: theme.palette.primary.main,
            color: "" + theme.palette.primary.contrastText,
            border: 0,
            fontWeight: 'bold',
            zIndex: theme.tooltip,
            boxShadow: theme.overrides.shadowsCustomFooter1,
        },
        item2: {
            whiteSpace: 'nowrap',
            color: theme.palette.primary.contrastText,
        },
        colorText: {
            color: theme.palette.primary.contrastText + " !important",
            maxHeight: theme.spacing.unit * 3,
            paddingLeft: theme.spacing.unit,
        },
    };
};
var FooterDefault = /** @class */ (function (_super) {
    tslib_1.__extends(FooterDefault, _super);
    function FooterDefault() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FooterDefault.prototype.render = function () {
        var _a = this.props, classes = _a.classes, version = _a.version, copyRight = _a.copyRight;
        return (React.createElement(React.Fragment, null,
            React.createElement(Grid_1.default, { container: true, direction: "row", justify: "flex-start", alignItems: "flex-start", className: classes.container },
                React.createElement(Grid_1.default, { item: true, xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
                    React.createElement("div", { className: classes.item2 }, version && copyRight && renderItem(version, copyRight, classes))))));
    };
    return FooterDefault;
}(React.Component));
exports.default = styles_1.withStyles(styles, { withTheme: true })(FooterDefault);
function renderItem(version, copyRight, classes) {
    return (React.createElement(Grid_1.default, { container: true, direction: "row-reverse", justify: "flex-end", alignItems: "flex-end", className: classes.colorText }, [0, 1].map(function (key) {
        if (key === 0) {
            return (React.createElement(Grid_1.default, { item: true, xl: 11, lg: 1, md: 11, sm: 8, xs: 8, className: classes.colorText },
                React.createElement("div", { style: { display: "flex" } },
                    React.createElement("div", { className: classes.colorText },
                        React.createElement(Copyright_1.default, null)),
                    React.createElement("div", { style: {
                            lineHeight: "24px",
                            textAlign: "left",
                        } }, copyRight))));
        }
        else if (key === 1) {
            return (React.createElement(Grid_1.default, { item: true, xl: 1, lg: 1, md: 1, sm: 4, xs: 4, className: classes.colorText, style: {
                    textAlign: "left",
                    lineHeight: "24px",
                } }, version));
        }
        return null;
    })));
}
