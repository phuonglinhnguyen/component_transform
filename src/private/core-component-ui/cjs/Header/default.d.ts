import * as React from 'react';
export interface LayoutDefautProps {
    classes: any;
    linkAppToFunctions: any;
    themes: any;
    onChangeTheme?: (...args: any[]) => void | any;
    userName: string;
    dataHotLine: any;
    appRoutes: any;
    onClickItem: any;
}
declare const _default: React.ComponentType<Pick<LayoutDefautProps, "themes" | "onChangeTheme" | "userName" | "onClickItem" | "linkAppToFunctions" | "dataHotLine" | "appRoutes"> & import("@material-ui/core").StyledComponentProps<string>>;
export default _default;
