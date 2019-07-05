"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var core_1 = require("@material-ui/core");
var EnhancedTableHead = /** @class */ (function (_super) {
    tslib_1.__extends(EnhancedTableHead, _super);
    function EnhancedTableHead() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.createSortHandler = function (property) { return function (event) {
            _this.props.onRequestSort(event, property);
        }; };
        return _this;
    }
    EnhancedTableHead.prototype.render = function () {
        var _this = this;
        var _a = this.props, columns = _a.columns, _b = _a.onSelectAllClick, onSelectAllClick = _b === void 0 ? function () { return null; } : _b, order = _a.order, orderBy = _a.orderBy, numSelected = _a.numSelected, rowCount = _a.rowCount, viewActionInColumns = _a.viewActionInColumns, widthItem = _a.widthItem;
        return (React.createElement(core_1.TableHead, null,
            React.createElement(core_1.TableRow, null, columns.map(function (col) {
                if (viewActionInColumns.checkbox && col.id === "checkbox") {
                    return (React.createElement(core_1.TableCell, { style: tslib_1.__assign({ minWidth: widthItem, width: '100%', height: "calc(100% - 1px)" }, col.styleHeader) },
                        React.createElement(core_1.Checkbox, { indeterminate: numSelected > 0 && numSelected < rowCount, checked: numSelected, onChange: onSelectAllClick })));
                }
                else {
                    return (React.createElement(core_1.TableCell, { style: tslib_1.__assign({ minWidth: widthItem, width: '100%', height: "calc(100% - 1px)" }, col.styleHeader), key: col.id, numeric: col.numeric, padding: col.disablePadding ? 'none' : 'default', sortDirection: orderBy === col.id ? order : false },
                        React.createElement(core_1.Tooltip, { title: col.sort ? "Sort" : '', placement: col.numeric ? 'bottom-end' : 'bottom-start', enterDelay: 300 },
                            React.createElement(core_1.TableSortLabel, { active: orderBy === col.id, direction: order, onClick: col.sort ? _this.createSortHandler(col.id) : '' }, col.label))));
                }
            }, this))));
    };
    return EnhancedTableHead;
}(React.Component));
exports.default = EnhancedTableHead;
