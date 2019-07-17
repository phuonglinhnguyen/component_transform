import { getConnection, isTypeConnectionSupported } from './upload_connections';
import { NotifyActions } from '../../../../common/notification';

import { UPLOAD_ACTION } from './index';

export const testConnection = (config) => (dispatch) => {
    if (isTypeConnectionSupported(config.type)) {
        let connection = getConnection(config)
        dispatch({ type: UPLOAD_ACTION.CONNECTING });
        connection.check_connection(config, (error, result) => {
            if (error) {
                dispatch({ type: UPLOAD_ACTION.CONNECT_FAILED })
            } else {
                dispatch({ type: UPLOAD_ACTION.CONNECT_SUCCESS })
            }
        })
    } else {
        NotifyActions.warning('', 'projects.upload_configuration.warning.connect_type_not_support', { i18: !0 });
    }
}
export const resetTestConnection = () => ({ type: UPLOAD_ACTION.CONNECT_RESET });

export default {
    testConnection,
    resetTestConnection,
}

