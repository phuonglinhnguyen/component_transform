import * as React from "react";
export interface Props {
    classes?: any;
    item?: any;
    onClickTask?: (...args: any[]) => void | any;
    children?: React.ReactNode;
}
declare const _default: React.ComponentType<Pick<Props, "children" | "item" | "onClickTask"> & import("@material-ui/core/styles/withStyles").StyledComponentProps<string>>;
export default _default;
