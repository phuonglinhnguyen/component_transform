import * as React from 'react';
import { connect } from 'react-redux';
import { PageDecorator ,userLogout,getDataObject } from '@dgtx/coreui';
import { LayoutRoot } from '../../../@components/layout';
import { 
    THEME_BLUE ,
    themes,
     blueLightTheme,darkTheme} from '../../../@components/themes'
import { changeTheme } from '../../../actions'
import { functions } from '../../../constants/functions'
import { getProjectById } from '../../../components/project/actions/project_item_action';
import { getTheme } from '@dgtx/core-component-ui'

export default PageDecorator({
    mapState: (state) => ({
        theme: getTheme('default'),
        themeName:state.layout.theme_name,
        themes:{},
        loading:state.core.loading,
        functions:functions,
        project:getDataObject('project.project_item.project',state)
    })
    ,actions:{
        changeTheme,
        onLogout:userLogout,
        getProjectById,
    }
})(
LayoutRoot
)

