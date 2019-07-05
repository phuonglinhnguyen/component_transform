import * as React from 'react';
export interface IProps {
    classes?: any;
    data?: any;
    onChange?: (...args: any[]) => void | any;
    cronTime?: any;
}
declare const _default: React.ComponentType<Pick<IProps, "data" | "onChange" | "cronTime"> & import("@material-ui/core/styles").StyledComponentProps<string>>;
export default _default;
