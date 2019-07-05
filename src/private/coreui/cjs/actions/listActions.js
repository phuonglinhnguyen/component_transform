"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUD_CHANGE_LIST_PARAMS = '@DGS/CRUD_CHANGE_LIST_PARAMS';
exports.SET_LIST_SELECTED_IDS = '@DGS/SET_LIST_SELECTED_IDS';
exports.TOGGLE_LIST_ITEM = '@DGS/TOGGLE_LIST_ITEM';
exports.changeListParams = function (resource, params) { return ({
    type: exports.CRUD_CHANGE_LIST_PARAMS,
    payload: params,
    meta: { resource: resource },
}); };
exports.setListSelectedIds = function (resource, ids) { return ({
    type: exports.SET_LIST_SELECTED_IDS,
    payload: ids,
    meta: { resource: resource },
}); };
exports.toggleListItem = function (resource, id) { return ({
    type: exports.TOGGLE_LIST_ITEM,
    payload: id,
    meta: { resource: resource },
}); };
