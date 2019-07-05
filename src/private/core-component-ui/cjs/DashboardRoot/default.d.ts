import * as React from 'react';
export interface LayoutDefautProps {
    classes?: any;
    theme?: any;
    AppRoutes?: any;
    onClickItem?: (...args: any[]) => void | any;
}
declare const _default: React.ComponentType<Pick<LayoutDefautProps, "onClickItem" | "AppRoutes"> & import("@material-ui/core").StyledComponentProps<string>>;
export default _default;
