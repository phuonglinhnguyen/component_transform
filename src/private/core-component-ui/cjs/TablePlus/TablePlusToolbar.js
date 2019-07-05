"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var withStyles_1 = require("@material-ui/core/styles/withStyles");
var core_1 = require("@material-ui/core");
var colorManipulator_1 = require("@material-ui/core/styles/colorManipulator");
var Search_1 = require("@material-ui/icons/Search");
var icons_1 = require("@material-ui/icons");
var styles = function (theme) {
    return {
        root: {
            maxHeight: "48px",
            minHeight: "48px"
        },
        highlight: theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: colorManipulator_1.lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
        spacer: {
            flex: '1 1 auto',
            maxHeight: "48px",
        },
        actions: {
            color: theme.palette.text.secondary,
        },
        title: {
            flex: '1 1 auto',
        },
        icons: {
            marginRight: 10,
        }
    };
};
var EnhancedTableToolbar = function (props) {
    var _a;
    var buttonActions = props.buttonActions, selectView = props.selectView, keySearchs = props.keySearchs, numSelected = props.numSelected, classes = props.classes, _b = props.onSearch, onSearch = _b === void 0 ? function () { return null; } : _b, viewActionToolbar = props.viewActionToolbar, iconTable = props.iconTable, nameTable = props.nameTable;
    return (React.createElement(core_1.Toolbar, { className: classnames_1.default(classes.root, (_a = {},
            _a[classes.highlight] = numSelected > 0,
            _a)) },
        React.createElement("div", { className: classes.spacer },
            React.createElement(core_1.Grid, { container: true },
                nameTable &&
                    React.createElement(core_1.Grid, { style: { flexGrow: 1 } },
                        React.createElement(core_1.FormControlLabel, { style: { margin: "0px" }, control: iconTable ? React.createElement(icons_1.TableChart, { className: classes.icons }) : React.createElement(core_1.Typography, null), label: typeof nameTable === 'string' ? React.createElement(core_1.Typography, { color: "inherit", variant: "h5" }, nameTable) : nameTable })),
                viewActionToolbar.search ?
                    (React.createElement(core_1.Grid, { item: true },
                        React.createElement("div", { style: { maxHeight: "50px", display: "flex", alignItems: "flex-end" } },
                            React.createElement("div", null,
                                React.createElement(core_1.TextField, { id: "name", label: "Search", type: "search", value: keySearchs, onChange: onSearch, placeholder: "Search" })),
                            React.createElement("div", null,
                                React.createElement(Search_1.default, null))))) : '',
                React.createElement(core_1.Grid, { item: true },
                    React.createElement("div", { className: classes.title }, numSelected > 0 ? (React.createElement(core_1.Typography, { color: "inherit", variant: "subheading" },
                        numSelected,
                        " selected")) : '')))),
        React.createElement("div", { className: classes.actions }, numSelected > 0 ? (React.createElement("div", null, buttonActions ? buttonActions : '')) :
            selectView ? selectView : '')));
};
exports.default = withStyles_1.default(styles)(EnhancedTableToolbar);
