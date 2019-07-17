import axios from 'axios';
import _ from 'lodash'

import { API_ENDPOINT, TIME_OUT_SHOW_MESSAGE } from '../../../constants';
import * as constants from '../utils/user_roles_constants'
import {
    checkProcessing,
    handleExtractData,
    openRequestSnackbar,
    openRespondSnackbar
} from '../../common/snackbars/actions/common_action'


const receiveList = user_roles => ({
    type: constants.USER_ROLE_LIST_RECEIVE,
    user_roles: user_roles
});

export const requestList = () => ({
    type: constants.USER_ROLE_LIST_REQUEST
});

export const resetListState = () => ({
    type: constants.USER_ROLE_LIST_RESET_STATE
});


export const getListUserRoles = () => (dispatch, getState) => {
    const user_role_list = getState().config_user_role.user_role_list;
    if (user_role_list.is_fetching) {
        return;
    }

    dispatch(requestList());
    return axios(`/users/alls`, {
        method: 'GET'
    })
        .then(handleExtractData)
        .then(res => {
            var user_roles = res.filter(res => res.roles && res.roles.length > 0);
            dispatch(receiveList(user_roles));
        })
        .catch(error => {
            dispatch(receiveList([]));
            dispatch(openRespondSnackbar(error, true));
        });
};
export const checkUsers = (users, isChecked) => (dispatch, getState) => {
    const user_role_list = getState().config_user_role.user_role_list;

    var { selected_users } = user_role_list;
    if (isChecked) {
        _.forEach(users, function (user) {
            var index = selected_users.findIndex(data => data.username === user.username);
            if (index === -1) {
                selected_users.push(user);
            }
        });
    } else {
        _.forEach(users, function (user) {
            var index = selected_users.findIndex(data => data.username === user.username);
            if (index !== -1) {
                selected_users.splice(index, 1);
            }
        });
    }

    dispatch({
        type: constants.USER_ROLE_SELECT_USERS,
        selected_users: selected_users
    });
}
export const checkRoles = (roles, isChecked) => (dispatch, getState) => {
    const user_role_list = getState().config_user_role.user_role_list;

    var { selected_roles } = user_role_list;
    if (isChecked) {
        _.forEach(roles, function (role) {
            var index = selected_roles.findIndex(data => data === role);
            if (index === -1) {
                selected_roles.push(role);
            }
        });
    } else {
        _.forEach(roles, function (role) {
            var index = selected_roles.findIndex(data => data === role);
            if (index !== -1) {
                selected_roles.splice(index, 1);
            }
        });
    }

    dispatch({
        type: constants.USER_ROLE_SELECT_ROLES,
        selected_roles: selected_roles
    });
}
export const saveUserRoles = (selected_users, selected_roles, current_user_name) => (dispatch, getState) => {
    if (checkProcessing(getState())) {
        return;
    }
    var users = [];
    // const { selected_users, selected_roles } = getState().config_user_role.user_role_list
    _.forEach(selected_users, function (user) {
        users.push(user.username)

    });
    dispatch(openRequestSnackbar('commons.notification.working'));

    return axios.put(`${API_ENDPOINT}/users/roles/?action=assign,username`, {
        users: users,
        roles: selected_roles
    })
        .then(handleExtractData)
        .then(res => {
            setTimeout(function () {
                dispatch(
                    openRespondSnackbar(
                        'commons.notification.create_success',
                        false,
                        `Save User Roles  `
                    )
                );
              dispatch({ type: constants.USER_ROLE_INSERT_ROLES });
                dispatch(mergeDataIntoList(res));

            }, TIME_OUT_SHOW_MESSAGE);
        })
        .catch(error => {
            setTimeout(function () {
                dispatch(
                    openRespondSnackbar(
                        error,
                        true,
                        `Save User Roles `
                    )
                );
            }, TIME_OUT_SHOW_MESSAGE);
        });
};
const findUserIndex = (user_role, user_roles) =>
    user_roles.findIndex(usr => usr.username === user_role.username);
export const mergeDataIntoList = user_roles_merge => (dispatch, getState) => {

    const user_role_list = getState().config_user_role.user_role_list;
    var user_roles = [...user_role_list.user_roles];
    for (var user_role of user_roles_merge) {
        const index = findUserIndex(user_role, user_roles)
        if (index === -1) {
            user_roles.push(user_role);
        } else {
            user_roles[index] = user_role;
        }
    }
    dispatch({
        type: constants.USER_ROLE_MERGE_DATA_INTO_LIST,
        user_roles: user_roles
    });
}


