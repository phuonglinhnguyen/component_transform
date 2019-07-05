"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORE_RESOURCE = '@DGS/CORE_RESOURCE';
exports.REGISTER_RESOURCE = '@DGS/CORE_RESOURCE/REGISTER';
exports.UNREGISTER_RESOURCE = '@DGS/CORE_RESOURCE/UNREGISTER';
exports.registerResource = function (resources, guid) { return ({
    type: exports.REGISTER_RESOURCE,
    payload: resources,
    guid: guid,
}); };
exports.unregisterResource = function (resourceNames, guid) { return ({
    type: exports.UNREGISTER_RESOURCE,
    payload: resourceNames,
    guid: guid,
}); };
