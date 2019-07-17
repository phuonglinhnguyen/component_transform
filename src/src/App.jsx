import * as React from 'react';
import { CoreAdmin, initConfigApp } from '@dgtx/coreui';
import { APP_NAME, API_ENDPOINT, APP_VERSION, UAC_ENDPOINT, OAUTH_ENDPOINT } from './constants';
import i18n from './i18n'
import { dataProvider } from './providers'
import reducers from './reducers'
import { Loading, Page404 } from './views'
import * as auth from "./utils/auth";
import { createLogger } from 'redux-logger'
import { routeProvider } from './routes'
import './cool_scroll_smart.css'
import { LayoutRoot } from './views/shares/layout';
import { upperCaseFirstString } from '@dgtx/core-component-ui';
let middlewaresDev = [];
let compose;

if (process.env['NODE_ENV'] !== 'production') {
    middlewaresDev = [createLogger()];
    // compose = composeWithDevTools;
}
document.title =upperCaseFirstString(APP_NAME);
const App = (props) => {
    const { baseUrl } = props;
    initConfigApp({ appName:APP_NAME, appVersion:APP_VERSION, appURL:baseUrl, apiURL:API_ENDPOINT, uacURL:UAC_ENDPOINT, oauthURI:OAUTH_ENDPOINT })
    auth.configAxios(auth.getAccessToken());
    return (
        <CoreAdmin
            appURL={baseUrl}
            pages={
                {
                    page404: Page404,
                    PageLoading: Loading
                }
            }
            rootLayout={LayoutRoot}
            reducers={reducers}
            i18n={i18n}
            dataProvider={dataProvider}
            middlewaresDev={middlewaresDev}
            routeProvider={routeProvider}
        />
    );
}
export default App;