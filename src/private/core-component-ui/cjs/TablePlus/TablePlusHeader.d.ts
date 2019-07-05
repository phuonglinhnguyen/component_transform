import * as React from 'react';
export interface LayoutDefautProps {
    numSelected?: any;
    order?: any;
    orderBy?: any;
    onSelectAllClick?: (...args: any[]) => void | any;
    onRequestSort: (...args: any[]) => void | any;
    rowCount?: any;
    columns?: any;
    viewActionInColumns?: any;
    widthItem?: any;
}
declare class EnhancedTableHead extends React.Component<LayoutDefautProps> {
    createSortHandler: (property: any) => any;
    render(): JSX.Element;
}
export default EnhancedTableHead;
