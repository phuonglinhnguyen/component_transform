import { ICurrentUser, CurrentUserEntity } from '../models';
declare class CurrentUserState {
    user: ICurrentUser;
    isInited: boolean;
    isChecking: boolean;
    isAuthenticated: boolean;
    isRefreshing: boolean;
    constructor(props?: ICurrentUser);
}
declare const _default: (state: CurrentUserState | undefined, action: {
    type: string;
    payload?: ICurrentUser | undefined;
}) => CurrentUserEntity | {
    isInited: boolean;
    isAuthenticated: boolean;
    user: ICurrentUser | undefined;
    isChecking: boolean;
    isRefreshing: boolean;
};
export default _default;
