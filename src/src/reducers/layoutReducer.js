import { KEY_STORAGE_THEME } from '../constants'
import { CHANGE_THEME, LAYOUT_CHANGE_VALUE_ITEM } from '../constants/actionTypes'
const initialState = {
    theme_name: localStorage.getItem(KEY_STORAGE_THEME)
}
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_THEME:
            localStorage.setItem(KEY_STORAGE_THEME, payload)
            return { ...state, theme_name: payload }
        case LAYOUT_CHANGE_VALUE_ITEM:
            return { ...state, ...payload }
        default:
            return state
    }
}
