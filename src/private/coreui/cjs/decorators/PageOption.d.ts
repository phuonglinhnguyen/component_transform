export interface IResource {
    name: string;
    reducer?: any;
    options?: any;
}
export interface IPageOption {
    context?: string;
    resources?: IResource[];
    actions?: any;
    mapState?: any;
}
export declare class PageOption implements IPageOption {
    context?: string;
    resources?: IResource[];
    actions: any;
    mapState?: any;
    constructor(props: IPageOption);
}
