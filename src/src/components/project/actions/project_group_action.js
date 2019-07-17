import axios from 'axios';
import * as types from '../constants/project_constant';
// import { TIME_OUT_SHOW_MESSAGE, API_ENDPOINT } from '../../../constants';
// import XClient from '../../common/api';

import {
  // checkProcessing,
  // sendHttpRequest,
  // receiveHttpResponse,
  handleExtractData,
  // openRespondSnackbar
} from '../../common/snackbars/actions/common_action';


export const requestGroupList = () => ({
  type: types.PROJECT_GROUP_REQUEST
});
export const receiveGroupList = (list) => {
  return {
    type: types.PROJECT_GROUP_RECEIVE,
    groups: list
  };
};

export const getListGroups = () => (dispatch, getState) => {
  const project_group = getState().project.project_group;
  if (project_group.is_fetching) {
    return;
  }

  dispatch(requestGroupList());
  return axios.get('/groups')
    .then(handleExtractData)
    .then(res => {

      dispatch(receiveGroupList(res));
    })
    .catch(error => {
      dispatch(receiveGroupList([]));

    });
};

export const resetStateProjectGroup = () => ({
  type: types.PROJECT_GROUP_RESET_STATE
});


