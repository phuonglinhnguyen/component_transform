import clone from 'clone';
import { FieldsTypes, RESET_ALL } from '../types';
const initial = {
  didInvalidate: 0,
  isFetching: false,
};
export default (state = clone(initial), action) => {
  switch (action.type) {
    case RESET_ALL:
    case FieldsTypes.RESET:
      return clone(initial);
    case FieldsTypes.FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case FieldsTypes.RECEIVE:
      return {
        items: action.items,
        map: action.map,
        projectId: action.projectId,
        didInvalidate: 0,
        isFetching: false,
      };
    case FieldsTypes.DID_INVALIDATION:
      let _i = state.didInvalidate + 1;
      return {
        ...state,
        isFetching:false,
        didInvalidate: _i
      };

    default:
      return state;
  }
};
