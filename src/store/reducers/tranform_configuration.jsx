import * as actions from '../actions/tranform_configuration';
import {cloneDeep} from 'lodash'
const initialState = {
    // data: ['1','2'],
}
export default {
    name: actions.NAME_REDUCER,
    reducer: (state = { ...cloneDeep(initialState) }, { type, payload }: any): any => {
        switch (type) {
            case actions.TRANFORM_CONFIGURATION_GET_DATA:
                return {
                    ...state,
                    ...payload
                }
            case actions.TRANFORM_CONFIGURATION_UNMOUNT:
                return cloneDeep(initialState);
            default:
                return state;
        }
    }
}