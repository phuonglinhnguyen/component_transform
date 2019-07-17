/**
 * @author nhhien@suho
 * @email nhhien@digi-texx.vn
 * @create date 2017-06-07 09:51:11
 * @modify date 2017-06-07 09:51:11
 * @desc [Reducer use to manager list of layouts which are definition form input]
*/

import clone from 'clone';
import { LayoutsTypes, RESET_ALL } from '../types';

const initialState = {
  didInvalidate: 0,
  isFetching: false,
  selectedId: !1,
  deletingLayout: {
  },
  cloningLayout: {
  },
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LayoutsTypes.FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case LayoutsTypes.DID_INVALIDATION:
      return {
        ...state,
        didInvalidate: state.didInvalidate + 1,
        isFetching: false,
      };
    case LayoutsTypes.RECEIVE:
      return {
        ...state,
        items: action.payload,
        didInvalidate: 0,
        isFetching: false,
      };
    case LayoutsTypes.SELECT:
      return {
        ...state,
        selectedId: action.layoutId ? action.layoutId : !1,
      };
    case LayoutsTypes.DELETING: {
      let _deletingLayout = clone(state.deletingLayout);
      _deletingLayout[action.layout.id] = !0;
      return {
        ...state,
        deletingLayout: _deletingLayout,
      };
    }
    case LayoutsTypes.DELETE_FAILED: {
      let _deletingLayout = clone(state.deletingLayout);
      _deletingLayout[action.layout.id] = undefined;
      return {
        ...state,
        deletingLayout: _deletingLayout,
      };
    }
    case LayoutsTypes.DELETE_SUCCESS:
      let _deletingLayout = clone(state.deletingLayout);
      _deletingLayout[action.layout.id] = undefined;
      let _items = clone(state.items).filter(item => item.id !== action.layout.id);
      return {
        ...state,
        deletingLayout: _deletingLayout,
        items: _items,
      };



    case LayoutsTypes.CLONING: {
      let _cloningLayout = clone(state.cloningLayout);
      _cloningLayout[action.layout.id] = !0;
      return {
        ...state,
        cloningLayout: _cloningLayout,
      };
    }
    case LayoutsTypes.CLONE_FAILED: {
      let _cloningLayout = clone(state.cloningLayout);
      _cloningLayout[action.layout.id] = undefined;
      return {
        ...state,
        cloningLayout: _cloningLayout,
      };
    }
    case LayoutsTypes.CLONE_SUCCESS:{
      let _cloningLayout = clone(state.cloningLayout);
      delete _cloningLayout[action.layoutClone.id]
      let _index = state.items.findIndex(item => item.id === action.layoutClone.id);
      let _items =clone(state.items)
      let layoutNew = action.layout[0]
      layoutNew.fields=action.layoutClone.fields
      layoutNew.sections=action.layoutClone.sections
      _items.splice(_index+1,0,layoutNew)
      return {
        ...state,
        cloningLayout: _cloningLayout,
        items: _items,
        selectedId:layoutNew.id
      };
    }
    case RESET_ALL:
    case LayoutsTypes.RESET:
      return initialState;
    default:
      return state;
  }
}
