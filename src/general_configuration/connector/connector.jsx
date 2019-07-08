import * as React from 'react'
import {
  PageDecorator,
  getDataObject,
  // crudGetList,
  // showNotification,
} from '@dgtx/coreui'
import { compose } from 'recompose';
import GeneralConfigurationComponent from '../components/general_configuration_component';
import GeneralConfigurationState from '../../../store/reducers/general_configuration_reducer'
import * as constant from '../../../store/actions/general_configuration'
import { ConstantRender } from '@dgtx/core-component-ui'
import {
  getData,
  clickItem,
  unmount,
  clickUpdate,
  clickAdd,
  clickDelete,
  mondifyData
} from '../../../store/actionsCreator/general_configuration';
import * as Lodash from 'lodash'

export interface LayoutDefautProps {
  classes?: any,
  theme?: any,
  getData?: any,
  edit?: any,
  pending?: any,
  success?: any,
  dataParent: any,
  clickItem?: any,
  unmount?: any,
  dataItem?: any,
  clickUpdate?: any,
  clickAdd?: any,
  clickDelete?: any,
  refreshPage?: any,
  match?: any,
  projectName?: any,
  structures?: any,
  mondifyData?: any,
  keyTranslate?: any,
}

class GeneralConfigurationPage extends React.Component<LayoutDefautProps, any> {
  componentWillMount = () => {
    const { getData = () => null, dataParent, match } = this.props;
    if (Lodash.isEmpty(dataParent) && Lodash.isEmpty(this.props[`${constant.FIELD_EXPORT_FORMAT}`])) {
      const projectId = getDataObject('params.projectid', match) || ''
      getData(projectId);
    }
  }

  componentWillUnmount = () => {
    const { unmount = () => null } = this.props;
    unmount()
  }

  render() {
    const {
      dataItem,
      match,
    } = this.props;
    
    const idSelected = getDataObject(`${constant.FIELD_ID}.${ConstantRender.KEY_FIELD_VALUE}`, dataItem)
    const projectId = getDataObject('params.projectid', match) || ''
    return (
      <GeneralConfigurationComponent
        projectId={projectId}
        idSelected={idSelected || ''}
        {...this.props}
      />
    )
  }
}

const resources = [
  // { name: 'project_training' },
  GeneralConfigurationState
]
export default compose(
  PageDecorator({
    resources,
    actions: {
      getData,
      clickItem,
      unmount,
      clickUpdate,
      clickAdd,
      clickDelete,
      mondifyData,
    },
    mapState: (state: any) => ({
      dataParent: getDataObject(`resources.${constant.NAME_REDUCER}.data.dataParent`, state.core) || [],
      dataItem: getDataObject(`resources.${constant.NAME_REDUCER}.data.dataItem`, state.core) || {},
      edit: getDataObject(`resources.${constant.NAME_REDUCER}.data.edit`, state.core),
      pending: getDataObject(`resources.${constant.NAME_REDUCER}.data.pending`, state.core),
      success: getDataObject(`resources.${constant.NAME_REDUCER}.data.success`, state.core),
      refreshPage: getDataObject(`resources.${constant.NAME_REDUCER}.data.refreshPage`, state.core),
      projectName: getDataObject(`project.project_item.project.name`, state)|| "",
      structures: getDataObject(`resources.${constant.NAME_REDUCER}.data.${constant.STRUCTURES}`, state.core) || {},
      keyTranslate: constant.KEY_TRANSLATE,
    })
  })
)(GeneralConfigurationPage);