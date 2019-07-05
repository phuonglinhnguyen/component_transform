import * as React from 'react';
export interface PropsToolbar {
    buttonActions?: any;
    selectView?: any;
    keySearchs?: any;
    numSelected?: any;
    classes?: any;
    onSearch?: (...args: any[]) => void | any;
    viewActionToolbar: any;
    iconTable?: any;
    nameTable?: any;
}
declare const _default: React.ComponentType<Pick<PropsToolbar, "numSelected" | "buttonActions" | "selectView" | "keySearchs" | "onSearch" | "viewActionToolbar" | "iconTable" | "nameTable"> & import("@material-ui/core").StyledComponentProps<string>>;
export default _default;
