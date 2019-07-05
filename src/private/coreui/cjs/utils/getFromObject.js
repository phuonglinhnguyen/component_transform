"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getDataObjectArray = function (name, entity) {
    var current = name[0], next = name.slice(1);
    if (!entity) {
        return null;
    }
    if (current.indexOf(',') > -1) {
        var namesIn = current.split(',');
        var result_1 = {};
        if (!next.length) {
            namesIn.forEach(function (attr) {
                result_1[attr] = entity[attr];
            });
        }
        else {
            namesIn.forEach(function (attr) {
                result_1[attr] = getDataObjectArray(next, entity[attr]);
            });
        }
        return result_1;
    }
    if (!!next.length && !entity[current]) {
        return null;
    }
    return getDataObjectArray(next, entity[current]);
};
exports.getDataObject = function (name, entity) {
    if (!entity) {
        return null;
    }
    var namesIn = typeof name === 'string' ? name.split('.') : name;
    if (namesIn.join('').indexOf(',') > -1) {
        return getDataObjectArray(namesIn, entity);
    }
    try {
        var result = entity;
        for (var i = 0; i < namesIn.length && result; ++i) {
            result = result[namesIn[i]];
        }
        return result;
    }
    catch (error) {
        return null;
    }
};
exports.setDataObject = function (name, value, entity) {
    if (name.indexOf('.') > -1) {
        var i = name.indexOf('.');
        var p = name.substr(0, i);
        var nameIn = name.substr(i + 1);
        if (!entity[p]) {
            entity[p] = {};
        }
        exports.setDataObject(nameIn, value, entity[p]);
    }
    else {
        entity[name] = value;
    }
};
