"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var actions_1 = require("../../actions");
var utils_1 = require("../../utils");
exports.default = (function (dataProvider) { return function (_a) {
    var dispatch = _a.dispatch, getState = _a.getState;
    return function (next) { return function (action) {
        if (!dataProvider) {
            console.warn('api needed dataProvider');
            return function () { return null; };
        }
        if (action.type.indexOf('@DGS/API') > -1
            && ['LOADING', 'FAILURE', 'SUCCESS'].every(function (item) { return (action.type.indexOf(item) === -1); })) {
            if (actions_1.isRefresh()) {
                dispatch(actions_1.addAwaitRefresh(action));
            }
            else {
                var type_1 = action.type, payload_1 = action.payload, _a = action.meta, fetchMeta = _a.fetch, onSuccess_1 = _a.onSuccess, onFailure_1 = _a.onFailure, meta_1 = tslib_1.__rest(_a, ["fetch", "onSuccess", "onFailure"]);
                var restType_1 = fetchMeta;
                dispatch({ type: actions_1.FETCH_START });
                dispatch({ type: type_1 + "/LOADING" });
                dataProvider(restType_1, meta_1.resource, payload_1).then(function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var onSuccessIn;
                    return tslib_1.__generator(this, function (_a) {
                        response = utils_1.convertHTTPResponse(response, meta_1);
                        onSuccessIn = onSuccess_1;
                        if (typeof onSuccess_1 === 'function') {
                            onSuccessIn = onSuccess_1({ dispatch: dispatch, getState: getState, result: response });
                            if (onSuccessIn instanceof Promise) {
                                onSuccessIn = {};
                            }
                        }
                        dispatch({
                            type: type_1 + "/SUCCESS",
                            payload: response,
                            requestPayload: payload_1,
                            meta: tslib_1.__assign({}, meta_1, onSuccessIn, { fetchResponse: restType_1, fetchStatus: actions_1.FETCH_END }),
                        });
                        dispatch({ type: actions_1.FETCH_END });
                        return [2 /*return*/];
                    });
                }); }).catch(function (error) {
                    if (error.status === 401) {
                        dispatch(actions_1.addAwaitRefresh(action));
                        dispatch({ type: actions_1.FETCH_END });
                    }
                    else {
                        // if (error.status === 404) {
                        //     let onSuccessIn = onSuccess;
                        //     if (typeof onSuccess === 'function') {
                        //         onSuccessIn = onSuccess({ dispatch, getState, result: [] })
                        //         if (onSuccessIn instanceof Promise) {
                        //             onSuccessIn = {}
                        //         }
                        //     }
                        //     dispatch({
                        //         type: `${type}/SUCCESS`,
                        //         payload: { json: [] },
                        //         requestPayload: payload,
                        //         meta: {
                        //             ...meta,
                        //             ...onSuccessIn,
                        //             fetchResponse: restType,
                        //             fetchStatus: FETCH_END,
                        //         }
                        //     })
                        // } else {
                        var onFailureIn = onFailure_1;
                        if (typeof onFailure_1 === 'function') {
                            onFailureIn = onFailure_1({ dispatch: dispatch, getState: getState, result: error });
                            if (onFailureIn instanceof Promise) {
                                onFailureIn = {};
                            }
                        }
                        dispatch({
                            type: type_1 + "/FAILURE",
                            error: error.message ? error.message : error,
                            payload: error.body ? error.body : null,
                            requestPayload: payload_1,
                            meta: tslib_1.__assign({}, meta_1, onFailure_1, { fetchResponse: restType_1, fetchStatus: actions_1.FETCH_ERROR })
                        });
                        // }
                        dispatch({ type: actions_1.FETCH_END });
                    }
                });
            }
        }
        else {
            return next(action);
        }
    }; };
}; });
