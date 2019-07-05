"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataFetchActions_1 = require("./dataFetchActions");
exports.CRUD_GET_LIST = '@DGS/API/CRUD/GET_LIST';
exports.CRUD_GET_LIST_LOADING = '@DGS/API/CRUD/GET_LIST/LOADING';
exports.CRUD_GET_LIST_FAILURE = '@DGS/API/CRUD/GET_LIST/FAILURE';
exports.CRUD_GET_LIST_SUCCESS = '@DGS/API/CRUD/GET_LIST/SUCCESS';
exports.CRUD_GET_ONE = '@DGS/API/CRUD/GET_ONE';
exports.CRUD_GET_ONE_LOADING = '@DGS/API/CRUD/GET_ONE/LOADING';
exports.CRUD_GET_ONE_FAILURE = '@DGS/API/CRUD/GET_ONE/FAILURE';
exports.CRUD_GET_ONE_SUCCESS = '@DGS/API/CRUD/GET_ONE/SUCCESS';
exports.CRUD_GET_MANY = '@DGS/API/CRUD/GET_MANY';
exports.CRUD_GET_MANY_LOADING = '@DGS/API/CRUD/GET_MANY/LOADING';
exports.CRUD_GET_MANY_FAILURE = '@DGS/API/CRUD/GET_MANY/FAILURE';
exports.CRUD_GET_MANY_SUCCESS = '@DGS/API/CRUD/GET_MANY/SUCCESS';
exports.CRUD_GET_COUNT = '@DGS/API/CRUD/GET_COUNT';
exports.CRUD_GET_COUNT_LOADING = '@DGS/API/CRUD/GET_COUNT/LOADING';
exports.CRUD_GET_COUNT_FAILURE = '@DGS/API/CRUD/GET_COUNT/FAILURE';
exports.CRUD_GET_COUNT_SUCCESS = '@DGS/API/CRUD/GET_COUNT/SUCCESS';
exports.CRUD_GET_MANY_REFERENCE = '@DGS/API/CRUD/GET_MANY_REFERENCE';
exports.CRUD_GET_MANY_REFERENCE_LOADING = '@DGS/API/CRUD/GET_MANY_REFERENCE/LOADING';
exports.CRUD_GET_MANY_REFERENCE_FAILURE = '@DGS/API/CRUD/GET_MANY_REFERENCE/FAILURE';
exports.CRUD_GET_MANY_REFERENCE_SUCCESS = '@DGS/API/CRUD/GET_MANY_REFERENCE/SUCCESS';
exports.CRUD_CREATE = '@DGS/API/CRUD/CREATE';
exports.CRUD_CREATE_LOADING = '@DGS/API/CRUD/CREATE/LOADING';
exports.CRUD_CREATE_FAILURE = '@DGS/API/CRUD/CREATE/FAILURE';
exports.CRUD_CREATE_SUCCESS = '@DGS/API/CRUD/CREATE/SUCCESS';
exports.CRUD_UPDATE = '@DGS/API/CRUD/UPDATE';
exports.CRUD_UPDATE_LOADING = '@DGS/API/CRUD/UPDATE/LOADING';
exports.CRUD_UPDATE_FAILURE = '@DGS/API/CRUD/UPDATE/FAILURE';
exports.CRUD_UPDATE_SUCCESS = '@DGS/API/CRUD/UPDATE/SUCCESS';
exports.CRUD_UPDATE_OPTIMISTIC = '@DGS/API/CRUD/UPDATE/OPTIMISTIC';
exports.CRUD_UPDATE_MANY = '@DGS/API/CRUD/UPDATE/MANY';
exports.CRUD_UPDATE_MANY_LOADING = '@DGS/API/CRUD/UPDATE/MANY/LOADING';
exports.CRUD_UPDATE_MANY_FAILURE = '@DGS/API/CRUD/UPDATE/MANY/FAILURE';
exports.CRUD_UPDATE_MANY_SUCCESS = '@DGS/API/CRUD/UPDATE/MANY/SUCCESS';
exports.CRUD_UPDATE_MANY_OPTIMISTIC = '@DGS/API/CRUD/UPDATE/MANY/OPTIMISTIC';
exports.CRUD_DELETE = '@DGS/API/CRUD/DELETE';
exports.CRUD_DELETE_LOADING = '@DGS/API/CRUD/DELETE/LOADING';
exports.CRUD_DELETE_FAILURE = '@DGS/API/CRUD/DELETE/FAILURE';
exports.CRUD_DELETE_SUCCESS = '@DGS/API/CRUD/DELETE/SUCCESS';
exports.CRUD_DELETE_OPTIMISTIC = '@DGS/API/CRUD/DELETE/OPTIMISTIC';
exports.CRUD_DELETE_MANY = '@DGS/API/CRUD/DELETE/MANY';
exports.CRUD_DELETE_MANY_LOADING = '@DGS/API/CRUD/DELETE/MANY/LOADING';
exports.CRUD_DELETE_MANY_FAILURE = '@DGS/API/CRUD/DELETE/MANY/FAILURE';
exports.CRUD_DELETE_MANY_SUCCESS = '@DGS/API/CRUD/DELETE/MANY/SUCCESS';
exports.CRUD_DELETE_MANY_OPTIMISTIC = '@DGS/API/CRUD/DELETE/MANY/OPTIMISTIC';
exports.crudGetList = function (resource, params, options) { return ({
    type: exports.CRUD_GET_LIST,
    payload: params,
    meta: {
        resource: resource,
        fetch: dataFetchActions_1.GET_LIST,
        keyId: options && options.keyId || undefined,
        onSuccess: options && options.onSuccess || {},
        onFailure: options && options.onFailure ? options.onFailure : {
            notification: {
                body: 'dgs.notification.http_error',
                level: 'warning'
            }
        },
        refresh: options && options.refresh || true
    }
}); };
exports.crudGetMany = function (resource, params, options) { return ({
    type: exports.CRUD_GET_MANY,
    payload: params,
    meta: {
        resource: resource,
        fetch: dataFetchActions_1.GET_MANY,
        keyId: options && options.keyId || undefined,
        onSuccess: options && options.onSuccess,
        onFailure: options && options.onFailure ? options.onFailure : {
            notification: {
                body: 'dgs.notification.items_doesnt_exist',
                level: 'warning'
            }
        },
        refresh: options ? options.refresh : true
    }
}); };
exports.crudGetCount = function (resource, params, options) { return ({
    type: exports.CRUD_GET_COUNT,
    payload: params,
    meta: {
        resource: resource,
        fetch: dataFetchActions_1.GET_COUNT,
        keyId: options && options.keyId || undefined,
        onSuccess: options && options.onSuccess,
        onFailure: options && options.onFailure ? options.onFailure : {
            notification: {
                body: 'dgs.notification.items_doesnt_exist',
                level: 'warning'
            }
        },
        refresh: options ? options.refresh : true
    }
}); };
exports.crudGetOne = function (resource, params, options) { return ({
    type: exports.CRUD_GET_ONE,
    payload: params,
    meta: {
        resource: resource,
        fetch: dataFetchActions_1.GET_ONE,
        keyId: options && options.keyId || undefined,
        onSuccess: options && options.onSuccess,
        onFailure: options && options.onFailure ? options.onFailure : {
            notification: {
                body: 'dgs.notification.item_doesnt_exist',
                level: 'warning'
            }
        },
        refresh: options ? options.refresh : true
    }
}); };
exports.crudCreate = function (resource, params, options) {
    if (options === void 0) { options = { redirectTo: 'edit' }; }
    return ({
        type: exports.CRUD_CREATE,
        payload: params,
        meta: {
            resource: resource,
            fetch: dataFetchActions_1.CREATE,
            keyId: options && options.keyId || undefined,
            onSuccess: options && options.onSuccess ? options.onSuccess : {
                notification: {
                    body: 'dgs.notification.created',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1,
                    },
                },
                getResult: options.onSuccess && options.onSuccess ? options.onSuccess.getResult && options.onSuccess.getResult : null,
                redirectTo: options.onSuccess ? options.onSuccess.redirectTo : null,
                basePath: options.onSuccess ? options.onSuccess.basePath : null,
            },
            onFailure: options && options.onFailure ? options.onFailure : {
                notification: {
                    body: 'dgs.notification.http_error',
                    level: 'warning',
                },
            },
        },
    });
};
exports.crudUpdate = function (resource, params, options) { return ({
    type: exports.CRUD_UPDATE,
    payload: params,
    meta: {
        resource: resource,
        fetch: dataFetchActions_1.UPDATE,
        keyId: options && options.keyId || undefined,
        onSuccess: options && options.onSuccess ? options.onSuccess : {
            notification: {
                body: 'dgs.notification.updated',
                level: 'info',
                messageArgs: {
                    smart_count: 1,
                }
            }
        },
        onFailure: options && options.onFailure ? options.onFailure : {
            notification: {
                body: 'dgs.notification.http_error',
                level: 'warning',
            },
        },
    },
}); };
exports.crudDelete = function (resource, params, options) { return ({
    type: exports.CRUD_DELETE,
    payload: params,
    meta: {
        resource: resource,
        fetch: dataFetchActions_1.DELETE,
        keyId: options && options.keyId || undefined,
        onSuccess: options && options.onSuccess ? options.onSuccess : {
            notification: {
                body: 'dgs.notification.deleted',
                level: 'info',
                messageArgs: {
                    smart_count: 1,
                }
            }
        },
        onFailure: options && options.onFailure ? options.onFailure : {
            notification: {
                body: 'dgs.notification.http_error',
                level: 'warning',
            },
        },
    },
}); };
