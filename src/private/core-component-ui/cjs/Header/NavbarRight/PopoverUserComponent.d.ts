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
}
declare const _default: React.ComponentType<Pick<LayoutDefautProps, "open" | "themes" | "onChangeTheme" | "onReportDate" | "onChangePassword" | "onLogOut" | "userName"> & import("@material-ui/core").StyledComponentProps<string>>;
export default _default;
