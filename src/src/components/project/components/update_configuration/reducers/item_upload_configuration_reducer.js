import { UPLOAD_ACTION } from '../actions/index';
import clone from 'clone';
const initialState = {
    isFetching: !1,
    didInvalidate: 0,
    deleting: !1,
    adding: !1,
    updating: !1,
    item: {
        'type': 'SFTP',
        'zip': 0,
        'encrypt': 0,
        'overwrite':0,
    },

}
export default function (state = clone(initialState), action) {
    switch (action.type) {
        case UPLOAD_ACTION.FETCHING:
            return {
                ...state,
                isFetching: !0
            };
        case UPLOAD_ACTION.DID_INVALIDATION:
            let _i = state.didInvalidate + 1;
            return {
                ...state,
                isFetching: !1,
                didInvalidate: _i
            };
        case UPLOAD_ACTION.RECEIVE:
            return {
                item: action.payload,
                didInvalidate: 0,
                isFetching: !1,
            };
        case UPLOAD_ACTION.CHANGE_FIELD_VALUE:
            let _item = clone(state.item);
            _item[action.field_name] = action.field_value;
            return {
                ...state,
                item: _item,
                connection: null,
            };
        case UPLOAD_ACTION.UPDATING:
            return {
                ...state,
                updating: !0,
                connection: null,
            }
        case UPLOAD_ACTION.UPDATED:
            return {
                ...state,
                updating: !1,
                connection: null,
            }
        case UPLOAD_ACTION.ADDING:
            return {
                ...state,
                adding: !0,
            }
        case UPLOAD_ACTION.ADDED:
            return {
                ...state,
                adding: !1,
            }
        case UPLOAD_ACTION.DELETING:
            return {
                ...state,
                deleting: !0,
                connection: null,
            }
        case UPLOAD_ACTION.DELETED_INVALIDATION:
            return {
                ...state,
                deleting: !1,
            }
        case UPLOAD_ACTION.CONNECTING:
            return {
                ...state,
                connection: {
                    connecting: !0
                },
            }
        case UPLOAD_ACTION.CONNECT_SUCCESS:
            if (state.connection) {
                return {
                    ...state,
                    connection: {
                        connect_success: !0,
                    },
                }
            } else {
                return state;
            }

        case UPLOAD_ACTION.CONNECT_FAILED:
            if (state.connection) {
                return {
                    ...state,
                    connection: {
                        connect_failed: !0,
                    },
                }
            } else {
                return state;
            }

        case UPLOAD_ACTION.CONNECT_RESET:
            return {
                ...state,
                connection: null,
            }
        case UPLOAD_ACTION.RESET_ITEM: {
            return {
                isFetching: !1,
                didInvalidate: 0,
                deleting: !1,
                adding: !1,
                updating: !1,
                item: {
                    'type': 'SFTP',
                    'overwrite': 0,
                    'zip': 0,
                    'encrypt': 0,
                },
            };
        }
        default:
            return state;
    }
}
