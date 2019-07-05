import * as React from 'react';
export interface LayoutDefautProps {
    classes?: any;
    open: boolean;
    themes?: any;
    onChangeTheme?: any;
    onReportDate?: any;
    onChangePassword?: any;
    onLogOut?: any;
    userName?: string;
    className?: any;
    style?: any;
    anchorEl?: any;
    onRequestClose?: any;
    anchorOrigin?: any;
    transformOrigin?: any;
}
declare const _default: React.ComponentType<Pick<LayoutDefautProps, "open" | "style" | "transformOrigin" | "className" | "anchorEl" | "anchorOrigin" | "themes" | "onChangeTheme" | "onReportDate" | "onChangePassword" | "onLogOut" | "userName" | "onRequestClose"> & import("@material-ui/core").StyledComponentProps<string>>;
export default _default;
