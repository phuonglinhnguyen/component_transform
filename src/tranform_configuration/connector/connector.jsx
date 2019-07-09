import * as React from "react";
import { PageDecorator, getDataObject } from "@dgtx/coreui";
import { compose } from "recompose";
import WapperComponent from "../components/wapper_component";
import {
  getDataTranform,
  deleteData,
  createData,
  // unmount,
  updateData
} from "../../../store/actionsCreator/tranform_configuration";
import Reducer from "../../../store/reducers/tranform_configuration_reducer";
import * as constant from "../../../store/actions/tranform_configuration";
interface LayoutDefautProps {
  classes?: any;
  theme?: any;
  getDataTranform?: any;
  deleteData?: any;
  createData?: any;
}
class TranformConfigurationPage extends React.Component<
  LayoutDefautProps,
  any
> {
  componentWillMount = () => {
    const { getDataTranform, match, actions } = this.props;
    const projectId = getDataObject("params.projectid", match);
    getDataTranform(projectId);
  };

  // componentWillUnmount = () => {
  //   const { unmount = () => null } = this.props;
  //   unmount();
  // };

  render() {
    const { match } = this.props;
    const projectId = getDataObject("params.projectid", match);
    return (
      <WapperComponent
        projectId={projectId}
        constant={constant}
        {...this.props}
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
      getDataTranform,
      // unmount,
      deleteData,
      createData,
      updateData
    },
    mapState: (state: any) => ({
      data:
        getDataObject(`resources.${constant.NAME_REDUCER}.data`, state.core) ||
        []
    })
  })
)(TranformConfigurationPage);
