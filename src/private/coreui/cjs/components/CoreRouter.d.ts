import * as React from 'react';
interface CoreRouterProps {
    routeProvider: any;
    pages: any;
    user?: any;
    userLogout?: any;
    rootLayout: React.ComponentType;
}
declare class CoreRouter extends React.Component<CoreRouterProps> {
    state: {
        children: never[];
    };
    componentWillMount(): void;
    initializeResources: (nextProps: any) => void;
    initializeResourcesAsync: (props: any) => Promise<void>;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof CoreRouter, Pick<CoreRouterProps, "pages" | "routeProvider" | "rootLayout">>;
export default _default;
