import axios from 'axios';
import * as types from '../constants';
import {  API_ENDPOINT } from '../../../../constants';
import {
   handleExtractData,
   openRespondSnackbar
} from '../../../common/snackbars/actions/common_action';



const receiveList = list => ({
    type: types.SELECT_PROJECT_LIST_RECEIVE_DATAS,
    projects: list
});



export const requestList = () => ({
    type: types.SELECT_PROJECT_LIST_REQUEST
});

export const getList = () => (dispatch, getState) => {
    const select_project = getState().common.select_project;
    if (select_project.is_fetching) {
        return;
    }

    dispatch(requestList());
    return axios(`${API_ENDPOINT}/projects`, {
        method: 'GET'
    })
        .then(handleExtractData)
        .then(res => {
            dispatch(receiveList(res));
        })
        .catch(error => {
            dispatch(receiveList([]));
            dispatch(openRespondSnackbar(error + '', true));
        });
};

export const resetStateSelectProject = () => ({
    type: types.SELECT_PROJECT_RESET_STATE
});

export const selectProjectItem = (project) => ({
    type: types.SELECT_PROJECT_SELECT_ITEM,
    project: project
});

