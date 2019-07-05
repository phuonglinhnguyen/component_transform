"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var middlewares_1 = require("./middlewares");
var reducers_1 = require("./reducers");
var resourceManager_1 = require("./middlewares/resourceManager");
exports.default = (function (props, history) {
    var _a = props.middlewares, middlewares = _a === void 0 ? [] : _a, _b = props.middlewaresDev, middlewaresDev = _b === void 0 ? [] : _b, reducers = props.reducers, dataProvider = props.dataProvider, compose = props.compose;
    var appliedMid = redux_1.applyMiddleware.apply(void 0, [redux_thunk_1.default].concat((middlewares || []), [resourceManager_1.default,
        middlewares_1.createAPIMiddleware(dataProvider)], middlewaresDev, [middlewares_1.notification]));
    var rootReducer = reducers_1.default(reducers, history);
    return redux_1.createStore(rootReducer, compose ? compose(appliedMid) : appliedMid);
});
