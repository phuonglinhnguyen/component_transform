// import SFTPUploader from '@dgtx/upload';
// import FTPUploader from '@dgtx/upload/src/uploaders/ftp_uploader';

// const connections = {
//     sftp: SFTPUploader,
//     ftp: FTPUploader,
// }

export const CONNECT_TYPE_SUPPORT = ['sftp', 'ftp'];

export const getConnection = (config) => {
    let connection //= connections[config.type];
    if (connection) {
        return connection();
    }
    return {};
}
export const isTypeConnectionSupported = (type) => {
    return CONNECT_TYPE_SUPPORT.includes(type)
}
export default {
    CONNECT_TYPE_SUPPORT,
    isTypeConnectionSupported,
    getConnection,
}