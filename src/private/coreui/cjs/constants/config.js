"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CONFIG = {
    APP_NAME: '',
    APP_VERSION: '',
    APP_URL: '',
    API_URI: '',
    API_UAC_URI: '',
    API_OAUTH_URI: ''
};
function initConfigApp(props) {
    var appName = props.appName, appVersion = props.appVersion, appURL = props.appURL, apiURL = props.apiURL, uacURL = props.uacURL, oauthURI = props.oauthURI;
    CONFIG.APP_NAME = appName || '';
    CONFIG.APP_VERSION = appVersion || '';
    CONFIG.APP_URL = appURL || '';
    CONFIG.API_URI = apiURL || '';
    CONFIG.API_UAC_URI = uacURL || '';
    CONFIG.API_OAUTH_URI = oauthURI || '';
}
exports.initConfigApp = initConfigApp;
function getAppName() {
    return String(CONFIG.APP_NAME);
}
exports.getAppName = getAppName;
function getAppVersion() {
    return String(CONFIG.APP_VERSION);
}
exports.getAppVersion = getAppVersion;
function getAppURL() {
    return String(CONFIG.APP_URL);
}
exports.getAppURL = getAppURL;
function getApiURI() {
    return String(CONFIG.API_URI);
}
exports.getApiURI = getApiURI;
function getApiUacURI() {
    return String(CONFIG.API_UAC_URI);
}
exports.getApiUacURI = getApiUacURI;
function getApiOauthURI() {
    return String(CONFIG.API_OAUTH_URI);
}
exports.getApiOauthURI = getApiOauthURI;
