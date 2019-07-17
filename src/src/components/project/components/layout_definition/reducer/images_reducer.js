import clone from 'clone';
import { ImagesTypes, RESET_ALL } from '../types';

const initialState = {
    items: [],
    selectedIndex: -1,
}

export default function (state = clone(initialState), action) {
    switch (action.type) {
        case RESET_ALL:
        case ImagesTypes.RESET:
            return clone(initialState);
        case ImagesTypes.ADD:
            {
                let _items = clone(state.items);
                if (action.image) {
                    _items.push(action.image);
                }
                return {
                    ...state,
                    items: _items,
                    selectedIndex: state.selectedIndex + 1,
                }
            }
        case ImagesTypes.DELETE:
            {
                let _items = clone(state.items);
                _items.splice(action.imageIndex);
                let _length = _items.length;;

                return {
                    ...state,
                    items: _items,
                    selectedIndex: action.imageIndex > _length - 1 ? _length - 1 : action.imageIndex,
                }
            }
        case ImagesTypes.SELECT:
            {
                return { ...state, selectedIndex: action.imageIndex }
            }
        default:
            return state;
    }
}
