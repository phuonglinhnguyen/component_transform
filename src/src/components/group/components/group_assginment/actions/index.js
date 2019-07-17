import axios from 'axios';

import { TIME_OUT_SHOW_MESSAGE } from '../../../../../constants';
import * as constants from '../constants'
import {
    checkProcessing,
    handleExtractData,
    openRequestSnackbar,
    openRespondSnackbar
} from '../../../../common/snackbars/actions/common_action'
import { merge2Array } from '../../../../../utils/common/merge_deep';
import _ from 'lodash'
const receiveDatas = (user_assigneds, user_not_assigneds, user_ads) => ({
    type: constants.GROUP_ASSIGNMENT_RECEIVE_DATAS,
    user_assigneds: user_assigneds,
    user_not_assigneds: user_not_assigneds,
    user_ads: user_ads
});

export const requestDatas = () => ({
    type: constants.GROUP_ASSIGNMENT_REQUEST_DATAS
});

function getListUserADs() {
    try {
        return axios.get(`/users`);
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

// function getListUserByGroup(groupId) {
//     try {
//         return axios.get(`/users/groups/${groupId}`);
//     } catch (error) {
//         return [];
//     }
// }

/**
 * get All User In DB
 */
function getAllUserInfo() {

    try {
        return axios.get(`/users/alls`);
    } catch (error) {

        console.log(error);
        return null;
    }

}
function getUserAssignedsAncestors(userAds, userInfos, groupInfos) {
    const ancestors = groupInfos.ancestors;
    if (ancestors && ancestors.length > 0) {
        var userAssigneds = userInfos.filter(user =>
            user.groups && user.groups.find(groupItem => ancestors.find(item => item === groupItem)));
        return userAssigneds || [];
    }
    return [];
}
function getAncestorAssignedUser(user, group) {
    const ancestors = group.ancestors || [];
    const groups = user.groups || [];
    const intersection = _.intersection(ancestors, groups);

    return intersection && intersection.length > 0 && intersection[0];
}
function getUserAssigneds(users, groupInfo, groups) {

    const groupId = groupInfo.id;

    var userAssigneds = users.filter(user => {
        if (user.groups && user.groups.find(groupItem => groupItem === groupId)) {
            return true;
        } else {
            let ancestorAssigned = getAncestorAssignedUser(user, groupInfo);
            if (ancestorAssigned) {
        
                user[constants.KEY_GROUP_ASSIGNMENT_PARENT_NAME] = groups[ancestorAssigned].name;
                return true;
            }
            return false;

        }
        return false;
    }
    );
    userAssigneds = userAssigneds || [];
    // userAssigneds = merge2Array(userAssigneds, userAds, 'username');
    return userAssigneds;
}
function getUserNOTAssigneds(users, userAssigneds) {


    const userNotAssigned = users.filter(function (user) {
        return !userAssigneds.find(item => item.username === user.username)
    })
    return userNotAssigned;
}
function getAllGroupInfos(group, groupInfos) {
    
    
    if (!groupInfos.hasOwnProperty(group.id)) {
        groupInfos[group.id] = group;
    }
  
    if (group.childs && group.childs.length > 0) {
        for (var child of group.childs) {
            getAllGroupInfos(child, groupInfos);
        }
    }

}
function getGroupTree(groupTree) {
    var groupInfos = {};
    for (var group of groupTree) {
        getAllGroupInfos(group, groupInfos);
    }
   
    return groupInfos;
}

export const getListDatas = (groupId) => async (dispatch, getState) => {
    dispatch(requestDatas());

    try {
        const { user_ads } = getState().group_assignment;
        const groupInfo = getState().groups.group_item.group_infos;
        const groupTree = getState().groups.group_management.group_tree;

        if (!user_ads || user_ads.length === 0) {
            Promise.all([getListUserADs(), getAllUserInfo()])
                .then(results => {

                    var userADs = results[0] && results[0].data ? results[0].data : [];
                    var userInfos = results[1] && results[1].data ? results[1].data : [];
                    const users = merge2Array(userADs, userInfos, 'username');
                    const groups = getGroupTree(groupTree);
                    const userAssigned = getUserAssigneds(users, groupInfo, groups);
                    const userNotAssigned = getUserNOTAssigneds(users, userAssigned)

                    dispatch(receiveDatas(userAssigned, userNotAssigned, userADs))
                })




        } else {


            const responseUserInfos = await getAllUserInfo();

            const userInfos = responseUserInfos.data;

            const users = merge2Array(user_ads, userInfos, 'username');
            const groups = getGroupTree(groupTree);
            const userAssigned = getUserAssigneds(users, groupInfo, groups);
            const userNotAssigned = getUserNOTAssigneds(users, userAssigned)

            dispatch(receiveDatas(userAssigned, userNotAssigned, user_ads))
        }

    } catch (error) {
        console.log(error)
        dispatch(receiveDatas([], [], []))
    }

}



export const assignUsers = (groupId, users) => (dispatch, getState) => {
    if (checkProcessing(getState())) {
        return;
    }

    var assign_users = [];
    for (const user of users) {
        assign_users.push(
            user.username
        )
    }

    dispatch(openRequestSnackbar('commons.notification.working'));

    return axios.patch(`users/groups/${groupId}?action=assign,username`,
        { users: assign_users })
        .then(handleExtractData)
        .then(res => {

            var str = users.reduce((prevVal, elem) => `${prevVal} ${elem.username} ,`, "");
            str = str.substr(0, str.length - 1);
            const userStr = users.length > 1 ? 'Users' : 'User'
            setTimeout(function () {
                dispatch(
                    openRespondSnackbar(
                        'commons.notification.assign_success',
                        false,
                        `${users.length} ${userStr} ${str} `
                    )
                );
                dispatch(updateUserSuccess(constants.GROUP_ASSIGNMENT_ASSIGN_SUCESS))

            }, TIME_OUT_SHOW_MESSAGE);
        })
        .catch(error => {
            setTimeout(function () {
                dispatch(
                    openRespondSnackbar(
                        error,
                        true,
                        `Assign Users `
                    )
                );
            }, TIME_OUT_SHOW_MESSAGE);
        });
};

export const unAssignUsers = (groupId, users) => (dispatch, getState) => {
    if (checkProcessing(getState())) {
        return;
    }
    var un_assign_users = [];
    for (const user of users) {
        un_assign_users.push(
            user.username
        )
    }
    dispatch(openRequestSnackbar('commons.notification.working'));

    return axios.patch(`users/groups/${groupId}?action=unassign,username`,
        { users: un_assign_users })
        .then(handleExtractData)
        .then(res => {
            var str = users.reduce((prevVal, elem) => `${prevVal} ${elem.username} ,`, "");
            str = str.substr(0, str.length - 1);
            const userStr = users.length > 1 ? 'Users' : 'User'
            setTimeout(function () {
                dispatch(
                    openRespondSnackbar(
                        'commons.notification.unassign_success',
                        false,
                        `${users.length} ${userStr} ${str} `
                    )
                );


                dispatch(updateUserSuccess(constants.GROUP_ASSIGNMENT_UN_ASSIGN_SUCESS));


            }, TIME_OUT_SHOW_MESSAGE);
        })
        .catch(error => {
            setTimeout(function () {
                dispatch(
                    openRespondSnackbar(
                        error,
                        true,
                        `UnAssign Users`
                    )
                );
            }, TIME_OUT_SHOW_MESSAGE);
        });
};
const updateUserSuccess = (type) => async (dispatch, getState) => {
    const responseUserInfos = await getAllUserInfo();
    const userInfos = responseUserInfos.data;
    const { user_ads } = getState().group_assignment;
    const groupInfo = getState().groups.group_item.group_infos;
    const groupTree = getState().groups.group_management.group_tree;
    const users = merge2Array(user_ads, userInfos, 'username');
    const groups = getGroupTree(groupTree);
    const userAssigned = getUserAssigneds(users, groupInfo, groups);
    const userNotAssigned = getUserNOTAssigneds(users, userAssigned)
    dispatch({
        type: type,
        user_assigneds: userAssigned,
        user_not_assigneds: userNotAssigned,


    });
}
export const groupAssignmentResetState = () => ({ type: constants.GROUP_ASSIGNMENT_RESET_STATE })







