"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
function keycode(searchInput) {
    // Keyboard Events
    if (searchInput && 'object' === typeof searchInput) {
        var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode;
        if (hasKeyCode) {
            searchInput = hasKeyCode;
        }
    }
    // Numbers
    if ('number' === typeof searchInput) {
        return actions_1.names[searchInput];
    }
    // Everything else (cast to string)
    var search = String(searchInput);
    // check codes
    var foundNamedKeyCodes = actions_1.codes[search.toLowerCase()];
    if (foundNamedKeyCodes) {
        return foundNamedKeyCodes;
    }
    // check aliases
    var foundNamedKeyAliases = actions_1.aliases[search.toLowerCase()];
    if (foundNamedKeyAliases) {
        return foundNamedKeyAliases;
    }
    // weird character?
    if (search.length === 1) {
        return search.charCodeAt(0);
    }
    return undefined;
}
exports.keycode = keycode;
function isEventKey(event, nameOrCode) {
    if (event && 'object' === typeof event) {
        var keyCode = event.which || event.keyCode || event.charCode;
        if (keyCode === null || keyCode === undefined) {
            return false;
        }
        if (typeof nameOrCode === 'string') {
            // check codes
            var foundNamedKeyCodes = actions_1.codes[nameOrCode.toLowerCase()];
            if (foundNamedKeyCodes) {
                return foundNamedKeyCodes === keyCode;
            }
            // check aliases
            var foundNamedKeyAliases = actions_1.aliases[nameOrCode.toLowerCase()];
            if (foundNamedKeyAliases) {
                return foundNamedKeyAliases === keyCode;
            }
        }
        else if (typeof nameOrCode === 'number') {
            return nameOrCode === keyCode;
        }
    }
    return false;
}
exports.isEventKey = isEventKey;
