"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var withStyles_1 = require("@material-ui/core/styles/withStyles");
var core_1 = require("@material-ui/core");
var red_1 = require("@material-ui/core/colors/red");
var lodash_1 = require("lodash");
var TablePlusHeader_1 = require("./TablePlusHeader");
var TablePlusToolbar_1 = require("./TablePlusToolbar");
function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function stableSort(array, cmp) {
    var stabilizedThis = array.map(function (el, index) { return [el, index]; });
    stabilizedThis.sort(function (a, b) {
        var order = cmp(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map(function (el) { return el[0]; });
}
function getSorting(order, orderBy) {
    return order === 'desc' ? function (a, b) { return desc(a, b, orderBy); } : function (a, b) { return -desc(a, b, orderBy); };
}
var styles = function (theme) {
    return {
        root: {
            width: '100%',
            height: '100%',
            // overflowX: 'visible',
            overflow: "auto",
        },
        iconHover: {
            '&:hover': {
                color: red_1.default[800],
            },
        },
        spacer: {
            flex: '1 1 auto',
        },
        icons: {
            marginRight: 10,
        }
    };
};
var TablePlusComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TablePlusComponent, _super);
    function TablePlusComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            order: 'asc',
            orderBy: '',
            selected: [],
            data_view: [],
            dataBegin: [],
            page: 0,
            rowsPerPage: 20,
            columns: [],
            keySearchs: [],
            onSelectedUser: 'TeamMember',
            checkSelectAll: 0,
        };
        _this.componentWillMount = function () {
            var _a = _this.props, _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.columns, columns = _c === void 0 ? [] : _c, _d = _a.rowsPerPage, rowsPerPage = _d === void 0 ? 5 : _d;
            _this.setState({
                data_view: data,
                dataBegin: data,
                columns: columns,
                rowsPerPage: rowsPerPage
            });
        };
        _this.componentWillReceiveProps = function (nextProps) {
            if (!lodash_1.isEqual(_this.props.data, nextProps.data)) {
                _this.setState({
                    data_view: nextProps.data || [],
                    dataBegin: nextProps.data || [],
                    columns: nextProps.columns || [],
                    selected: nextProps.selected ? nextProps.selected : _this.state.selected,
                });
            }
            else {
                _this.setState({
                    columns: nextProps.columns || [],
                    selected: nextProps.selected ? nextProps.selected : _this.state.selected,
                });
            }
        };
        _this.handleRequestSort = function (event, property) {
            var orderBy = property;
            var order = 'desc';
            if (_this.state.orderBy === property && _this.state.order === 'desc') {
                order = 'asc';
            }
            _this.setState({ order: order, orderBy: orderBy });
        };
        // select all row in table
        _this.handleSelectAllClick = function () {
            var _a = _this.state, rowsPerPage = _a.rowsPerPage, page = _a.page, data_view = _a.data_view, checkSelectAll = _a.checkSelectAll;
            var _b = _this.props.onSelect, onSelect = _b === void 0 ? function () { return null; } : _b;
            var ids = [];
            var endSelect = 0;
            var beginSelect = 0;
            var checkSelectAll2 = checkSelectAll + 1;
            if (data_view.length <= rowsPerPage) {
                checkSelectAll2 = checkSelectAll2 + 1;
            }
            // check 1 page
            if (checkSelectAll2 === 1) {
                endSelect = rowsPerPage * (page + 1);
                if (page === 0) {
                    beginSelect = 0;
                    endSelect = rowsPerPage;
                }
                else {
                    beginSelect = endSelect - rowsPerPage;
                }
                ids = data_view.filter(function (item, index) { return index < endSelect && index >= beginSelect; })
                    .map(function (item) { return item.id; });
            }
            // check ALL page
            else if (checkSelectAll2 === 2) {
                ids = data_view.map(function (n) { return n.id; });
            }
            // UNcheck ALL page
            else {
                checkSelectAll2 = 0;
            }
            onSelect(ids);
            _this.setState({
                selected: ids,
                checkSelectAll: checkSelectAll2
            });
        };
        // select one by one row in table
        _this.handleClick = function (id) { return function () {
            var selected = _this.state.selected;
            var _a = _this.props.onSelect, onSelect = _a === void 0 ? function () { return null; } : _a;
            var selectedIndex = selected.indexOf(id);
            var newSelected = [];
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id);
            }
            else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            }
            else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            }
            else if (selectedIndex > 0) {
                newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
            }
            onSelect(newSelected);
            _this.setState({ selected: newSelected });
            _this.isSelected(id);
        }; };
        _this.handleClickRow = function (item, indexItem) { return function (event) {
            var _a = _this.props.onClickRow, onClickRow = _a === void 0 ? function () { return null; } : _a;
            onClickRow(event, item, indexItem);
        }; };
        _this.handleChangePage = function (event, page) {
            _this.setState({ page: page });
        };
        _this.handleChangeRowsPerPage = function (event) {
            _this.setState({ rowsPerPage: event.target.value });
        };
        _this.isSelected = function (id) { return _this.state.selected.indexOf(id) !== -1; };
        // search
        _this.handleSearch = function (event) {
            var dataBegin = _this.state.dataBegin;
            var _a = _this.props.onSearch, onSearch = _a === void 0 ? function () { return null; } : _a;
            _this.setState({
                keySearchs: event.target.value
            });
            if (event.target.value) {
                var data = onSearch(dataBegin, event.target.value);
                _this.setState({ data_view: data });
            }
            else {
                var data = _this.state.dataBegin;
                _this.setState({ data_view: data });
            }
        };
        _this.onClickEdit = function (id) { return function () {
            var _a = _this.props.onClickEdit, onClickEdit = _a === void 0 ? function () { return null; } : _a;
            onClickEdit(id);
        }; };
        _this.handleClickCell = function (row, col, indexItem) { return function () {
            var _a = _this.props.onClickCell, onClickCell = _a === void 0 ? function () { return null; } : _a;
            onClickCell(row, col, indexItem);
        }; };
        _this.getStyleCell = function (row, col) {
            var _a = _this.props.onGetStyleCell, onGetStyleCell = _a === void 0 ? function () { return null; } : _a;
            return onGetStyleCell(row, col);
        };
        return _this;
    }
    TablePlusComponent.prototype.render = function () {
        var _this = this;
        var _a = this.state, keySearchs = _a.keySearchs, order = _a.order, orderBy = _a.orderBy, selected = _a.selected, rowsPerPage = _a.rowsPerPage, page = _a.page, columns = _a.columns, data_view = _a.data_view;
        var _b = this.props, classes = _b.classes, buttonActionInToolbar = _b.buttonActionInToolbar, selectView = _b.selectView, viewActionInRows = _b.viewActionInRows, buttonActionsInRow = _b.buttonActionsInRow, nameTable = _b.nameTable, rowsPerPageOptions = _b.rowsPerPageOptions, isHover = _b.isHover, 
        // width_default,
        width_item = _b.width_item, height_table = _b.height_table, iconTable = _b.iconTable, refName = _b.refName, shadows = _b.shadows;
        var emptyRows = rowsPerPage - Math.min(rowsPerPage, data_view.length - page * rowsPerPage);
        var widthItem = width_item || 200;
        // let widthBody: any = columns.length * 8;
        var widthBody = 0;
        columns.map(function (col) {
            widthBody = widthBody + (col.width || widthItem);
        });
        return (React.createElement(core_1.Paper, { className: classes.root, elevation: shadows ? shadows : 0 },
            viewActionInRows.toolbar ?
                React.createElement(TablePlusToolbar_1.default, { numSelected: selected.length, keySearchs: keySearchs, onSearch: this.handleSearch, buttonActions: buttonActionInToolbar, selectView: selectView, viewActionToolbar: viewActionInRows, nameTable: nameTable, iconTable: iconTable })
                : '',
            React.createElement("div", { style: {
                    overflowX: "auto",
                    height: '100%',
                    minWidth: widthBody,
                } },
                React.createElement(core_1.Table, { style: {
                        minWidth: widthBody,
                        width: '100%',
                    } },
                    React.createElement(TablePlusHeader_1.default, { numSelected: selected.length, order: order, orderBy: orderBy, onSelectAllClick: this.handleSelectAllClick, onRequestSort: this.handleRequestSort, rowCount: data_view.length, columns: columns, viewActionInColumns: viewActionInRows, widthItem: widthItem })),
                React.createElement("div", { style: {
                        minWidth: widthBody,
                        // maxWidth: widthBody,
                        width: '100%',
                        maxHeight: height_table,
                        overflowY: 'auto',
                        overflowX: 'hidden'
                    }, ref: refName || '' },
                    React.createElement(core_1.Table, { style: {
                            minWidth: widthBody,
                            width: '100%',
                            // maxWidth: widthBody,
                            maxHeight: height_table,
                            overflowY: 'auto',
                            overflowX: 'hidden'
                        } },
                        React.createElement(core_1.TableBody, null,
                            stableSort(data_view, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(function (n, indexItem) {
                                if (viewActionInRows.checkbox) {
                                    var isSelected_1 = _this.isSelected(n.id);
                                    return (React.createElement("div", { style: tslib_1.__assign({}, n.styleRow) },
                                        React.createElement(core_1.TableRow, { style: { background: 'none' }, hover: isHover || false, selected: isSelected_1, onClick: _this.handleClick(n.id), role: "checkbox", "aria-checked": isSelected_1, tabIndex: -1, key: n.id }, columns.map(function (col) { return (col.id === 'checkbox' ?
                                            React.createElement(core_1.TableCell, { style: tslib_1.__assign({ width: '9px', padding: '0px', height: "calc(100% - 1px)" }, col.styleRowBody), id: n.id + "-" + col.id },
                                                React.createElement("div", { style: tslib_1.__assign({ minHeight: '48px', lineHeight: '48px' }, _this.getStyleCell(n, col)) },
                                                    React.createElement(core_1.Checkbox, { checked: isSelected_1 })))
                                            :
                                                col.Action ?
                                                    React.createElement(core_1.TableCell, { style: tslib_1.__assign({ minWidth: widthItem, width: '100%', height: "calc(100% - 1px)" }, col.styleRowBody), onClick: _this.handleClickCell(n, col, indexItem), id: n.id + "-" + col.id },
                                                        React.createElement("div", { style: tslib_1.__assign({ minHeight: '48px', lineHeight: '48px' }, _this.getStyleCell(n, col)) }, buttonActionsInRow && buttonActionsInRow[col.id] && buttonActionsInRow[col.id](n, col, indexItem))) :
                                                    React.createElement(core_1.TableCell, { style: tslib_1.__assign({ minWidth: widthItem, width: '100%', height: "calc(100% - 1px)" }, col.styleRowBody), onClick: _this.handleClickCell(n, col, indexItem), id: n.id + "-" + col.id },
                                                        React.createElement("div", { style: tslib_1.__assign({ minHeight: '48px', lineHeight: '48px' }, _this.getStyleCell(n, col)) }, n[col.id]))); }))));
                                }
                                else {
                                    return (React.createElement("div", { style: tslib_1.__assign({}, n.styleRow) },
                                        React.createElement(core_1.TableRow, { style: { background: 'none' }, tabIndex: -1, key: n.id, hover: isHover || false, onClick: _this.handleClickRow(n, indexItem) }, columns.map(function (col) { return (col.Action ?
                                            React.createElement(core_1.TableCell, { style: tslib_1.__assign({ minWidth: widthItem, width: '100%', height: "calc(100% - 1px)" }, col.styleRowBody), onClick: _this.handleClickCell(n, col, indexItem), id: n.id + "-" + col.id },
                                                React.createElement("div", { style: tslib_1.__assign({ minHeight: '48px', lineHeight: '48px' }, _this.getStyleCell(n, col)) }, buttonActionsInRow && buttonActionsInRow[col.id] && buttonActionsInRow[col.id](n, col, indexItem))) :
                                            React.createElement(core_1.TableCell, { style: tslib_1.__assign({ minWidth: widthItem, width: '100%', height: "calc(100% - 1px)" }, col.styleRowBody), onClick: _this.handleClickCell(n, col, indexItem), id: n.id + "-" + col.id },
                                                React.createElement("div", { style: tslib_1.__assign({ minHeight: '48px', lineHeight: '48px' }, _this.getStyleCell(n, col)) }, n[col.id]))); }))));
                                }
                            }),
                            emptyRows > 0 && (React.createElement(core_1.TableRow, { style: { height: 49 * emptyRows } },
                                React.createElement(core_1.TableCell, { colSpan: 6 }))))))),
            React.createElement(core_1.TablePagination, { component: "div", count: data_view.length, rowsPerPage: rowsPerPage, page: page, backIconButtonProps: {
                    'aria-label': 'Previous Page',
                }, nextIconButtonProps: {
                    'aria-label': 'Next Page',
                }, onChangePage: this.handleChangePage, onChangeRowsPerPage: this.handleChangeRowsPerPage, rowsPerPageOptions: (rowsPerPageOptions && rowsPerPageOptions) || [20, 50, 100] })));
    };
    return TablePlusComponent;
}(React.Component));
exports.default = withStyles_1.default(styles)(TablePlusComponent);
