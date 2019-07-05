import * as React from 'react';
export interface LayoutDefautProps {
    classes: any;
    theme?: any;
    linkAppToFunctions: any;
    themes: any;
    onChangeTheme?: (...args: any[]) => void | any;
    onClickItemApp?: (...args: any[]) => void | any;
    userName: string;
    version: any;
    copyRight: any;
    dataHotLine: any;
    appRoutes: any;
    I18n?: any;
}
declare const _default: React.ComponentType<Pick<LayoutDefautProps, "version" | "themes" | "onChangeTheme" | "userName" | "copyRight" | "linkAppToFunctions" | "dataHotLine" | "appRoutes" | "onClickItemApp" | "I18n"> & import("@material-ui/core/styles").StyledComponentProps<string>>;
export default _default;
