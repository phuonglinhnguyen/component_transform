import * as React from "react";
import { PageDecorator, getDataObject } from "@dgtx/coreui";
import { compose } from "recompose";
import ExportComponent from "../components/export_component";
import { getDataExport } from "../../../store/actionsCreator/export_configuration ";
import Reducer from "../../../store/reducers/export_configuration_reducer";
import * as constant from "../../../store/actions/export_configuration ";
interface LayoutDefautProps {
  classes?: any;
  theme?: any;
  getDataExport?: any;
}
class ExportConfigurationPage extends React.Component<LayoutDefautProps,any> {
  componentWillMount = () => {
    const { getDataExport = () => null, match, actions } = this.props;
    const projectId = getDataObject("params.projectid", match);
    getDataExport(projectId);
  };

  componentWillUnmount = () => {
    // const { unmount = () => null } = this.props;
    // unmount()
  };

  render() {
    const { data, match, getDataExport = () => null,  } = this.props;
    const projectId = getDataObject("params.projectid", match);
    return (
      <ExportComponent data={data} 
      projectId={projectId} 
      constant={constant} 
      getDataExport={getDataExport} 
      />
    );
  }
}

const resources = [
  // { name: 'project_training' },
  Reducer
];
export default compose(
  PageDecorator({
    resources,
    actions: {
      getDataExport
    },
    mapState: (state: any) => ({
      data: getDataObject(`resources.${constant.NAME_REDUCER}.data`, state.core) || [],
    })
  })
)(ExportConfigurationPage);

