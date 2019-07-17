import { fields, validation_config } from '../constants';
export const UPLOAD_LIST_ACTION = {
    FETCHING: 'UPLOAD_LIST_PETCHING',
    DID_INVALIDATION: 'UPLOAD_LIST_DID_INVALIDATION',
    RECEIVE: 'UPLOAD_LIST_RECEIVE',
    RESET: 'UPLOAD_LIST_RESET'
}
export const UPLOAD_ACTION = {
    FETCHING: 'UPLOAD_PETCHING',
    DID_INVALIDATION: 'UPLOAD_DID_INVALIDATION',
    RECEIVE: 'UPLOAD_RECEIVE',
    UPDATING: 'UPLOAD_UPDATING',
    UPDATED: 'UPLOAD_UPDATED',
    ADDING: 'UPLOAD_ADDING',
    ADDED: 'UPLOAD_ADDED',
    DELETING: 'UPLOAD_DELETING',
    DELETED_INVALIDATION: 'UPLOAD_DELETED_INVALIDATION',
    RESET_ITEM: 'UPLOAD_RESET_ITEM',
    CHANGE_FIELD_VALUE: 'UPLOAD_CHANGE_FIELD_VALUE',

    CONNECTING:'UPLOAD_CONNECTING',
    CONNECT_FAILED:'UPLOAD_CONNECT_FAILED',
    CONNECT_SUCCESS:'UPLOAD_CONNECT_SUCCESS',
    CONNECT_RESET:'UPLOAD_CONNECT_RESET',
}

export const GOTO = {
    LIST: 'GOTO_LIST',
    RESET: 'GOTO_RESET',
}



export const parseListToObject = (key: string, items = []) => {
    let rs = {};
    if (items) {
        items.forEach(item => {
            rs[item[key]] = item;
        });
    }
    return rs;
};

export const fieldMap = parseListToObject('name', fields);
export const getFieldValidate = (type) => {
    let fieldsValidation = [];
    validation_config.configuration.forEach(name => {
        fieldsValidation.push(fieldMap[name])
    })
    switch (type) {
        case 'FS':
            validation_config.connection.FS.forEach(name => {
                fieldsValidation.push(fieldMap[name])
            })
            break;
        case 'FTP':
        case 'SFTP':
        case 'IMAP':
        case 'POP3':
            validation_config.connection.FTP.forEach(name => {
                fieldsValidation.push(fieldMap[name])
            })
            break;
        case 'SOAP':
        case 'RESTFUL':
            validation_config.connection.SOAP.forEach(name => {
                fieldsValidation.push(fieldMap[name])
            })
            break;
        default: break;

    }
    return fieldsValidation;
}