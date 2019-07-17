import axios from 'axios';
import * as constants from '../utils/user_roles_constants';
import { API_ENDPOINT, TIME_OUT_SHOW_MESSAGE } from '../../../constants';
import {
  checkProcessing,
  handleExtractData,
  openRequestSnackbar,
  openRespondSnackbar
} from '../../common/snackbars/actions/common_action'

import { mergeDataIntoList } from './user_role_list_action'


export const dialogOpen = (user) => (dispatch, getState) => {
  dispatch({
    type: constants.USER_ROLE_DIALOG_OPEN,
    user: user
  })
};
export const dialogResetState = () => (dispatch, getState) => {
  dispatch({
    type: constants.USER_ROLE_DIALOG_RESET_STATE

  })
};

export const dialogClose = () => (dispatch, getState) => {
  dispatch({
    type: constants.USER_ROLE_DIALOG_CLOSE
  })
};

export const dialogSaveUserRole = (user, roles) => (dispatch, getState) => {
  if (checkProcessing(getState())) {
    return;
  }
  var user_role = [{
    id: user.id,
    username: user.username,
    roles: roles
  }]
  dispatch(openRequestSnackbar('commons.notification.working'));
  return axios.put(`${API_ENDPOINT}/users/roles?action=assign,username`, {
    users: [user.username],
    roles: roles
  })
    .then(handleExtractData)
    .then(res => {

      setTimeout(function () {
        dispatch(
          openRespondSnackbar(
            `${roles.join(',')} for User ${user.username}`,
            false,
            `${roles.length > 0 ? 'Add Roles' : 'Remove Roles'} `
          )
        );
        dispatch({
          type: constants.USER_ROLE_DIALOG_SAVE_ROLE,
          user_saved: {
            username: user.username,
            roles: roles
          }
        });
        dispatch(dialogClose());
      

        dispatch(mergeDataIntoList(user_role));

      }, TIME_OUT_SHOW_MESSAGE);
    })
    .catch(error => {
      setTimeout(function () {
        dispatch(
          openRespondSnackbar(
            error,
            true,
            `Add Role for User ${user.username} `
          )
        );
      }, TIME_OUT_SHOW_MESSAGE);
    });
};
