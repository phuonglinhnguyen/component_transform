"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upperCaseFirstString = function (input) {
    var outPut = '';
    var value = APPS.filter(function (app) { return app.id === input; })[0];
    if (value && value.name) {
        var v = value.name.trim().split('-');
        v.map(function (i) {
            upperCaseCharacterFirst(i.trim());
            outPut = outPut + ' ' + upperCaseCharacterFirst(i);
        });
    }
    return outPut;
};
var upperCaseCharacterFirst = function (input) {
    var outPut = input.toUpperCase();
    if (input.length > 3) {
        var f = outPut.substr(0, 1);
        outPut = f + input.substr(1).toLowerCase();
    }
    return outPut;
};
var APPS = [
    {
        id: 'training',
        name: 'training',
    },
    {
        id: 'administrator',
        name: 'administrator',
    },
    {
        id: 'designer',
        name: 'project-designer',
    },
    {
        id: 'production-admin',
        name: 'prd-management',
    },
    {
        id: 'qc-admin',
        name: 'qc-management',
    },
    {
        id: 'quanlity-control',
        name: 'qc-execution',
    },
    {
        id: 'production',
        name: 'operator',
    }
];
