import * as React from 'react';
export interface IProps {
    classes?: any;
    theme?: any;
    input?: any;
    cronValue?: any;
    className?: any;
    viewCronValue?: any;
    erroText?: any;
    onChange?: (...args: any[]) => void | any;
    tabs?: any;
}
declare const _default: React.ComponentType<Pick<IProps, "input" | "className" | "onChange" | "cronValue" | "viewCronValue" | "erroText" | "tabs"> & import("@material-ui/core/styles").StyledComponentProps<string>>;
export default _default;
