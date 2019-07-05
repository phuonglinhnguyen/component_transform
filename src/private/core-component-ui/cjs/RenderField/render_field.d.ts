import * as React from 'react';
export interface IProps {
    classes?: any;
    input: any;
    styleCustom?: any;
    onChange?: (...args: any[]) => void | any;
    onKeyDown?: (...args: any[]) => void | any;
    onBlur?: (...args: any[]) => void | any;
    onClickItemCheckBoxList?: (...args: any[]) => void | any;
}
declare const _default: React.ComponentType<Pick<IProps, "input" | "onBlur" | "onChange" | "onKeyDown" | "styleCustom" | "onClickItemCheckBoxList"> & import("@material-ui/core/styles").StyledComponentProps<string>>;
export default _default;
