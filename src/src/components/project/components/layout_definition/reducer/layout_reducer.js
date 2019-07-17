import clone from 'clone';
import { LayoutTypes, RESET_ALL } from '../types';
const initial = {
  didInvalidate: 0,
  isFetching: false,
  item: {},
  isSaving: !1,
  required: !1,
  saveDidInvalidate: !1,
};
export default (state = clone(initial), action) => {
  switch (action.type) {
    case RESET_ALL:
    case LayoutTypes.RESET:
      return clone(initial);
    case LayoutTypes.FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case LayoutTypes.RECEIVE:
      return {
        item: action.item,
        didInvalidate: 0,
        isFetching: false,
      };
    case LayoutTypes.DID_INVALIDATE:
      let _i = state.didInvalidate + 1;
      return {
        ...state,
        isFetching: false,
        didInvalidate: _i
      };
    case LayoutTypes.CHANGE_NAME:
      {
        let _item = clone(state.item);
        _item.name = action.name;
        return {
          ...state,
          item: _item,
          required: _item.name.length === 0,
          layoutSaveError: null,
        };
      }
      case LayoutTypes.CHANGE_PROP:
      {
        let _item = clone(state.item);
        _item[action.name] = action.value ;
        return {
          ...state,
          item: _item,
          required: _item.name.length === 0,
          layoutSaveError: null,
        };
      }
      case LayoutTypes.CHANGE_HOT_KEY:
      {
        let _item = clone(state.item);
        _item.hot_key = action.hot_key;

        return {
          ...state,
          item: _item,
        };
      }
    case LayoutTypes.REQUIRED_NAME:
      {
        return {
          ...state,
          required: action.isRequired,
        };
      }
    case LayoutTypes.SAVING:
      return {
        ...state,
        isSaving: !0,
        saveDidInvalidate: !1,
        layoutSaveError: null,
      };
    case LayoutTypes.SAVE_LAYOUT_FAILED:
      return {
        ...state,
        isSaving: !1,
        layoutSaveError: action.error,
      };
    case LayoutTypes.SAVE_LAYOUT_SUCCESS:
      return {
        ...state,
        isSaving: !1,
        layoutSaveError: null,
      };
    default:
      return state;
  }
};
