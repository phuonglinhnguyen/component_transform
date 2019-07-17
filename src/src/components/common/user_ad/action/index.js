import axios from 'axios';


import { API_ENDPOINT } from '../../../../constants';
import * as constants from '../constants'
import {
    
    handleExtractData,
    openRespondSnackbar
  } from '../../snackbars/actions/common_action';

const receiveList = users => ({
    type: constants.USER_AD_LIST_RECEIVE,
    users: users
});

export const requestList = () => ({
    type: constants.USER_AD_LIST_REQUEST
});

export const resetState = () => ({
    type: constants.USER_AD_LIST_RESET_STATE
});


export const getListUserADs = (callback) => (dispatch, getState) => {
    const user_ads = getState().common.user_ads;
    if (user_ads.is_fetching) {
        return;
    }


    dispatch({
        type: constants.USER_AD_LIST_REQUEST
    });
    return axios(`${API_ENDPOINT}/users`, {
        method: 'GET'
    })
        .then(handleExtractData)
        .then(res => {

            dispatch(receiveList(res));
            if (callback) {
                callback(res);
            }
        })
        .catch(error => {
            dispatch(receiveList([]));
            dispatch(openRespondSnackbar(error, true));
        });
};


