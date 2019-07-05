import * as React from 'react';
export interface LayoutDefautProps {
    classes: any;
    datas: any;
    onClickItem?: (...args: any[]) => void | any;
    onClose?: (...args: any[]) => void | any;
}
declare const _default: React.ComponentType<Pick<LayoutDefautProps, "onClose" | "datas" | "onClickItem"> & import("@material-ui/core").StyledComponentProps<string>>;
export default _default;
