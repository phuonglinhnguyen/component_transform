import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core';
import GeneralConfigurationList from './general_configuration_list';
import GeneralConfigurationEditCreate from './general_configuration_edit_create';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles: any = (theme: any) => {
  return {
    container: {
      width: "100vw",
      maxWidth: "100%",
      height: "100%",
      maxHeight: `calc(100vh - ${theme.spacing.unit * 8}px)`,
      margin: `${theme.spacing.unit * 8}px 0px 0px 0px`
    },
    paddingItem: {
      padding: theme.spacing.unit,
    },

  }
}
export interface IDefautProps {
  classes?: any,
  theme?: any,
  key?: any,
  edit?: any,
  pending?: any,
  success?: any,
  dataParent?: any,
  clickItem?: any,
  idSelected?: any,
  clickUpdate?: any,
  clickAdd?: any,
  clickDelete?: any,
  projectId?: any,
  projectName?: any,
  refreshPage?: any,
  structures?: any,
  mondifyData?: any,
  unmount?: any,
  getData?: any,
  keyTranslate?: any,
  dataItem?: any,
}
class GeneralConfigurationComponent extends React.Component<IDefautProps> {
  render() {
    const { classes, dataParent, clickItem, idSelected, edit,
      clickUpdate,
      clickAdd,
      clickDelete,
      pending,
      success,
      projectId,
      projectName,
      refreshPage,
      structures,
      mondifyData = () => null,
      unmount = () => null,
      getData = () => null,
      keyTranslate,
      dataItem
    } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid
          container={true}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={0}
          className={classes.container}
        >
          <Grid item={true} xl={3} lg={3} md={3} sm={12} xs={12} className={classes.paddingItem}>
            <GeneralConfigurationList
              datas={dataParent}
              clickItem={clickItem}
              idSelected={idSelected}
              edit={edit}
              clickUpdate={clickUpdate}
              clickAdd={clickAdd}
              clickDelete={clickDelete}
              pending={pending}
              success={success}
              projectId={projectId}
              projectName={projectName}
              refreshPage={refreshPage}
            />
          </Grid>
          <Grid item={true} xl={9} lg={9} md={9} sm={12} xs={12} className={classes.paddingItem}>
            <GeneralConfigurationEditCreate
              projectId={projectId}
              structures={structures}
              mondifyData={mondifyData}
              unmount={unmount}
              getData={getData}
              keyTranslate={keyTranslate}
              dataItem={dataItem}
              refreshPage={refreshPage}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}
export default withStyles(styles, { withTheme: true })(GeneralConfigurationComponent);  