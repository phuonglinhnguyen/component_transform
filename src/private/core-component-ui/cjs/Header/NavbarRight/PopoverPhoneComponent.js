"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var icons_1 = require("@material-ui/icons");
var core_1 = require("@material-ui/core");
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
        },
        paper: {
            margin: theme.spacing.unit,
        },
        diveder: {
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit,
        },
        title: {
            background: theme.palette.primary.main,
            width: "100%",
        },
        colorText: {
            fontWeight: "bold",
            width: "100%",
            color: theme.palette.primary.contrastText,
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
        }
    };
};
var PopoverPhoneComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PopoverPhoneComponent, _super);
    function PopoverPhoneComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopoverPhoneComponent.prototype.render = function () {
        var _a = this.props, classes = _a.classes, open = _a.open, datas = _a.datas;
        if (!open) {
            return "";
        }
        else {
            return (React.createElement("div", { className: classes.root },
                React.createElement("div", { className: classes.container },
                    React.createElement(core_1.Fade, { in: open },
                        React.createElement(core_1.Paper, { elevation: 4, className: classes.paper },
                            React.createElement("div", null,
                                React.createElement("ul", { style: { listStyle: "none" } },
                                    React.createElement("li", null, renderItemOne(datas.item11.lengths, "item11", datas, classes)),
                                    React.createElement("li", null,
                                        React.createElement(core_1.Divider, { variant: "middle", className: classes.diveder })),
                                    React.createElement("li", null, renderItemOne(datas.item12.lengths, "item12", datas, classes)),
                                    React.createElement("li", null,
                                        React.createElement(core_1.Divider, { variant: "middle", className: classes.diveder })),
                                    React.createElement("li", null, renderItemOne(datas.item12.lengths, "item12", datas, classes)),
                                    React.createElement("li", null,
                                        React.createElement(core_1.Divider, { variant: "middle", className: classes.diveder })))))))));
        }
    };
    return PopoverPhoneComponent;
}(React.Component));
exports.default = styles_1.withStyles(styles)(PopoverPhoneComponent);
function renderItemOne(itemLength, itemName, datas, classes) {
    return (React.createElement(core_1.Grid, { container: true, direction: "column", justify: "center", alignItems: "center", style: { textAlign: 'center' } }, itemLength.map(function (item, index) {
        if (index === 0 && item.length > 0) {
            return (React.createElement(core_1.Grid, { item: true, xl: 12, lg: 12, md: 12, sm: 12, xs: 12, className: classes.title },
                React.createElement(core_1.Hidden, { only: ["sm", "xs"] },
                    React.createElement(core_1.Typography, { variant: "h6", gutterBottom: true, className: classes.colorText }, datas[itemName][item])),
                React.createElement(core_1.Hidden, { only: ["xl", "lg", "md"] },
                    React.createElement(core_1.Typography, { variant: "body1", gutterBottom: true, className: classes.colorText }, datas[itemName][item]))));
        }
        else {
            if (item.length > 0) {
                if (item === "mail") {
                    return (React.createElement(core_1.Grid, { item: true, xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
                        React.createElement(core_1.Hidden, { only: ["sm", "xs"] },
                            React.createElement(core_1.Typography, { variant: "subtitle1", gutterBottom: true },
                                React.createElement(core_1.FormControlLabel, { value: datas[itemName][item], control: React.createElement(icons_1.MailOutline, { style: { marginRight: '8px' } }), label: datas[itemName][item], style: { margin: '0px' } }))),
                        React.createElement(core_1.Hidden, { only: ["xl", "lg", "md"], style: { textAlign: "right" } },
                            React.createElement(core_1.Typography, { variant: "caption", gutterBottom: true },
                                React.createElement(core_1.FormControlLabel, { value: datas[itemName][item], control: React.createElement(icons_1.MailOutline, null), label: datas[itemName][item], style: { margin: '0px' } })))));
                }
                else if (item === "hotlineOne" || item === "hotlineTwo") {
                    return (React.createElement(core_1.Grid, { item: true, xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
                        React.createElement(core_1.Hidden, { only: ["sm", "xs"] },
                            React.createElement(core_1.Typography, { variant: "subtitle1", gutterBottom: true },
                                React.createElement(core_1.FormControlLabel, { value: datas[itemName][item], control: React.createElement(icons_1.LocalPhone, null), label: datas[itemName][item], style: { margin: '0px' } }))),
                        React.createElement(core_1.Hidden, { only: ["xl", "lg", "md"] },
                            React.createElement(core_1.Typography, { variant: "caption", gutterBottom: true },
                                React.createElement(core_1.FormControlLabel, { value: datas[itemName][item], control: React.createElement(icons_1.LocalPhone, null), label: datas[itemName][item], style: { margin: '0px' } })))));
                }
            }
        }
        return null;
    })));
}
