import axios from 'axios';
import * as types from '../constants';
import { API_ENDPOINT, APP_NAME } from '../../../../../constants';
import {
    handleExtractData,
    handleError
} from '../../../../common/snackbars/actions/common_action';

const setListLayouts = layouts => ({
    type: types.DETAIL_SOUCRES_LIST_LAYOUTS_RECEIVE,
    layouts: layouts
});

const requestListLayouts = () => ({
    type: types.DETAIL_SOUCRES_LIST_LAYOUTS_REQUEST
});
export const getProjectLayouts = (projectId) =>
    axios.get(
        `${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/layout-definitions?includes=${types.PROJECT_LAYOUT_ATTRIBUTE_INCLUDES}`)

export const getListLayouts = projectId => (dispatch, getState) => {
    const detail_sources = getState().project.detail_sources;

    if (detail_sources.is_fetching) {
        return;
    }

    dispatch(requestListLayouts());

    return getProjectLayouts(projectId)
        .then(res => {
            dispatch(setListLayouts(handleExtractData(res)));
        })
        .catch(error => {
            dispatch(setListLayouts([]));
            dispatch(handleError(error));
        });
};

export const resetStateDetailSources = () => ({
    type: types.DETAIL_SOUCRES_RESET_STATE
});


export default {
    resetStateDetailSources,
    getListLayouts,
}
