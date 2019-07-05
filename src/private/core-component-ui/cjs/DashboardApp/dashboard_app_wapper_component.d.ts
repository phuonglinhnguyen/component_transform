import * as React from 'react';
export interface LayoutDefautProps {
    classes: any;
    theme?: any;
    groups?: any;
    selectItemGroupTree?: (...args: any[]) => void | any;
}
declare const _default: React.ComponentType<Pick<LayoutDefautProps, "groups" | "selectItemGroupTree"> & import("@material-ui/core").StyledComponentProps<string>>;
export default _default;
export interface PropsGroupTree {
    classes: any;
    theme: any;
    groups: any;
    open: boolean;
    onCloseDrawer?: (...args: any[]) => void | any;
    selectItem?: (...args: any[]) => void | any;
}
