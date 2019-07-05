interface IAction {
    type: string;
    payload: any;
    meta: any;
}
declare const _default: (previousState: boolean | undefined, { type, meta }: IAction) => boolean | {
    redirect: any;
};
export default _default;
