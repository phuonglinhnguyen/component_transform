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
            zIndex: theme.zIndex.tooltip,
            position: 'absolute',
            right: "0px",
        },
        container: {
            display: 'flex',
        },
        paper: {
            margin: theme.spacing.unit,
        },
        polygon: {
            fill: theme.palette.common.white,
            stroke: theme.palette.divider,
            strokeWidth: 1,
        },
        iconColor: {
            borderRadius: '25px',
            width: '40px',
            height: '40px',
            boxShadow: theme.overrides.shadowsCustom_1,
            "&:hover": {
                borderRadius: '25px',
                boxShadow: theme.overrides.shadowsCustom_1,
            }
        },
        themesRoot: {
            textAlign: "center"
        },
        themesContent: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: theme.spacing.unit,
            padding: theme.spacing.unit,
        },
        userProfile: {
            width: "calc(100%)"
        },
        marginLeft: {
            marginLeft: theme.spacing.unit
        },
        hover: {
            marginBottom: theme.spacing.unit,
            "&:hover": {
                boxShadow: [1],
            }
        }
    };
};
var PopoverNotificationsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PopoverNotificationsComponent, _super);
    function PopoverNotificationsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopoverNotificationsComponent.prototype.render = function () {
        var _a = this.props, classes = _a.classes, open = _a.open, datas = _a.datas;
        return (React.createElement("div", { className: classes.root },
            React.createElement("div", { className: classes.container },
                React.createElement(core_1.Fade, { in: open },
                    React.createElement(core_1.Paper, { elevation: 4, className: classes.paper },
                        React.createElement("div", null,
                            React.createElement("ul", { style: { listStyle: "none" } },
                                React.createElement("li", null, renderItemOne(datas.item11.lengths, "item11", datas)))))))));
    };
    return PopoverNotificationsComponent;
}(React.Component));
exports.default = styles_1.withStyles(styles)(PopoverNotificationsComponent);
function renderItemOne(itemLength, itemName, datas) {
    return (React.createElement(core_1.Grid, { container: true, direction: "column", justify: "center", alignItems: "center", style: { textAlign: 'center' } }, itemLength.map(function (item, index) {
        if (index === 0 && item.length > 0) {
            return (React.createElement(core_1.Grid, { item: true, xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
                React.createElement(core_1.Hidden, { only: ["sm", "xs"] },
                    React.createElement(core_1.Typography, { variant: "h6", gutterBottom: true }, datas["" + itemName].item)),
                React.createElement(core_1.Hidden, { only: ["xl", "lg", "md"] },
                    React.createElement(core_1.Typography, { variant: "body1", gutterBottom: true, style: { fontWeight: "bold" } }, datas["" + itemName].item))));
        }
        else {
            if (item.length > 0) {
                if (item === "mail") {
                    return (React.createElement(core_1.Grid, { item: true, xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
                        React.createElement(core_1.Hidden, { only: ["sm", "xs"] },
                            React.createElement(core_1.Typography, { variant: "subtitle1", gutterBottom: true },
                                React.createElement(core_1.FormControlLabel, { value: datas["" + itemName].item, control: React.createElement(icons_1.MailOutline, null), label: datas["" + itemName].item, style: { margin: '0px' } }))),
                        React.createElement(core_1.Hidden, { only: ["xl", "lg", "md"], style: { textAlign: "right" } },
                            React.createElement(core_1.Typography, { variant: "caption", gutterBottom: true },
                                React.createElement(core_1.FormControlLabel, { value: datas["" + itemName].item, control: React.createElement(icons_1.MailOutline, null), label: datas["" + itemName].item, style: { margin: '0px' } })))));
                }
                else if (item === "hotlineOne" || item === "hotlineTwo") {
                    return (React.createElement(core_1.Grid, { item: true, xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
                        React.createElement(core_1.Hidden, { only: ["sm", "xs"] },
                            React.createElement(core_1.Typography, { variant: "subtitle1", gutterBottom: true },
                                React.createElement(core_1.FormControlLabel, { value: datas["" + itemName].item, control: React.createElement(icons_1.LocalPhone, null), label: datas["" + itemName].item, style: { margin: '0px' } }))),
                        React.createElement(core_1.Hidden, { only: ["xl", "lg", "md"] },
                            React.createElement(core_1.Typography, { variant: "caption", gutterBottom: true },
                                React.createElement(core_1.FormControlLabel, { value: datas["" + itemName].item, control: React.createElement(icons_1.LocalPhone, null), label: datas["" + itemName].item, style: { margin: '0px' } })))));
                }
            }
        }
        return null;
    })));
}
