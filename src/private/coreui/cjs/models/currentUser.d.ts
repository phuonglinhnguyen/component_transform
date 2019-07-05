export interface ICurrentUser {
    username: string;
    displayName: string;
    email: string;
}
export declare class CurrentUserEntity implements ICurrentUser {
    displayName: string;
    email: string;
    username: string;
    constructor(props?: ICurrentUser);
}
