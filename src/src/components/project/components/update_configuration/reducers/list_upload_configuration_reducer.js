import { UPLOAD_LIST_ACTION } from '../actions/index';
import clone from 'clone';
const initialState = {
    didInvalidate: 0,
    isFetching: false,
    deleting: {},
    items: [],
    projecId: undefined,
}

export default function (state = clone(initialState), action) {
    switch (action.type) {
        case UPLOAD_LIST_ACTION.FETCHING:
            return {
                ...state,
                isFetching: true,
            };
        case UPLOAD_LIST_ACTION.DID_INVALIDATION:
            return {
                ...state,
                didInvalidate: state.didInvalidate + 1,
                isFetching: !1,
            };
        case UPLOAD_LIST_ACTION.RECEIVE:
            return {
                ...state,
                items: action.payload,
                projecId: action.projectId,
                didInvalidate: 0,
                isFetching: false,
            };
        case UPLOAD_LIST_ACTION.RESET:
            return clone(initialState);
        default:
            return state;
    }
}
