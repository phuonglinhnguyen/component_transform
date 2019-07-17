import {
    //PATHNAME_AUTHORIZATION,
    PATHNAME_CONFIGURATION,
    // PATHNAME_GROUPS,
    // PATHNAME_HOME,
    PATHNAME_PRODUCTION,
    PATHNAME_PROJECTS,
    ROLE_ADMIN,
    ROLE_DESIGNER,
    ROLE_DPO,
    ROLE_PROJECT_MANAGER,
    ROLE_QC,
    ROLE_QC_LEADER,
    ROLE_TEAM_LEADER,
    ROLE_GUEST,
    PATHNAME_HOME,
    PATHNAME_DIGIPAY,
    ROLE_DIGIPAY_ADMIN
} from './index'

export const menu_roles = {
    design: [ROLE_ADMIN, ROLE_DESIGNER],
    production_admin: [ROLE_ADMIN, ROLE_PROJECT_MANAGER, ROLE_QC_LEADER],
    authorization: [ROLE_ADMIN],
    group_management: [ROLE_ADMIN, ROLE_PROJECT_MANAGER, ROLE_DESIGNER],
    production: [
        ROLE_ADMIN,
        ROLE_DPO,
        ROLE_PROJECT_MANAGER,
        ROLE_QC,
        ROLE_QC_LEADER,
        ROLE_TEAM_LEADER
    ],
    pre_defined: [ROLE_ADMIN, ROLE_DESIGNER]
};

export const default_home_page = {
    [ROLE_ADMIN]: {
        priority: 1,
        path: PATHNAME_HOME
    },
    [ROLE_PROJECT_MANAGER]: {
        priority: 2,
        path: PATHNAME_PROJECTS
    },
    [ROLE_DESIGNER]: {
        priority: 3,
        path: PATHNAME_CONFIGURATION
    },
    [ROLE_TEAM_LEADER]: {
        priority: 4,
        path: PATHNAME_PRODUCTION
    },
    [ROLE_QC_LEADER]: {
        priority: 5,
        path: PATHNAME_PRODUCTION
    },
    [ROLE_DPO]: {
        priority: 6,
        path: PATHNAME_PRODUCTION
    },
    [ROLE_QC]: {
        priority: 7,
        path: PATHNAME_PRODUCTION
    },
    [ROLE_DIGIPAY_ADMIN]: {
        priority: 7,
        path: PATHNAME_DIGIPAY
    },
    [ROLE_GUEST]: {
        priority: 8,
        path: PATHNAME_HOME
    }


}