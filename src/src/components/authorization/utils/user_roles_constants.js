
import * as constants from '../../../constants'

/**user role list */
export const USER_ROLE_LIST_REQUEST = 'USER_ROLE_LIST_REQUEST';
export const USER_ROLE_LIST_RECEIVE = 'USER_ROLE_LIST_RECEIVE';
export const USER_ROLE_LIST_RESET_STATE = 'USER_ROLE_LIST_RESET_STATE';
export const USER_ROLE_SELECT_USERS = 'USER_ROLE_SELECT_USERS';
export const USER_ROLE_SELECT_ROLES = 'USER_ROLE_SELECT_ROLES';
export const USER_ROLE_INSERT_ROLES = 'USER_ROLE_INSERT_ROLES';
export const USER_ROLE_MERGE_DATA_INTO_LIST = 'USER_ROLE_MERGE_DATA_INTO_LIST';

/**dialog */
/**user role */
export const USER_ROLE_DIALOG_SAVE_ROLE = 'USER_ROLE_DIALOG_SAVE_ROLE';
export const USER_ROLE_DIALOG_OPEN = 'USER_ROLE_DIALOG_OPEN';
export const USER_ROLE_DIALOG_CLOSE = 'USER_ROLE_DIALOG_CLOSE';
export const USER_ROLE_DIALOG_RESET_STATE = 'USER_ROLE_DIALOG_RESET_STATE';

export const USER_ROLE_KEY_USERNAME = 'username';
export const USER_ROLE_KEY_GROUP = 'group';
export const USER_ROLE_KEY_DISPLAY_NAME = 'display_name';
export const USER_ROLE_KEY_ROLES = 'roles';

export const USER_ROLE_TITLE_USERNAME = 'Username';
export const USER_ROLE_TITLE_GROUP = 'Group';
export const USER_ROLE_TITLE_DISPLAY_NAME = 'Display Name';
export const USER_ROLE_TITLE_ROLES = 'Roles';
/**role */

export const ROLES = [
    constants.ROLE_PROJECT_MANAGER,
    constants.ROLE_DESIGNER,
    constants.ROLE_DPO,
    constants.ROLE_QC,
    constants.ROLE_TEAM_LEADER,
    constants.ROLE_QC_LEADER,
    constants.ROLE_DIGIPAY_ADMIN];