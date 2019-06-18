import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Switch } from "@material-ui/core";
// import { CronTriggerQuartz } from "@dgtx/core-component-ui";
const styles: any = (theme: any) => {
  return {
    container: {
      width: "100vw",
      maxWidth: "100%",
      // height: "100%",
      // maxHeight: `calc(100vh - ${theme.spacing.unit * 8}px)`,
      // margin: `${theme.spacing.unit * 8}px 0px 0px 0px`,
      align: "center"
    },
    paddingItem: {
      padding: theme.spacing.unit
    }
  };
};

const PROJECT_NAME = "Project Name";
export interface IDefautProps {
  classes?: any;
  theme?: any;
}
const InputComponent: React.FC<IDefautProps> = props => {
  const { classes, project, setProject } = props;

  // const handleGetData = () => {
  //   const { data, projectId, getDataTranform } = this.props;
  //   // console.log("projectId: ", projectId)
  //   console.log("getDataTranform: ", getDataTranform);
  //   getDataTranform(projectId);
  // };

  // const handleChange = name => event => {
  //   setState({ ...state, [name]: event.target.checked });
  // };

  const handleChangeCron = cronValue => {
    console.log("cronValue: ", cronValue);
  };
  const _onChangeText = (e) => {
    const name = e.target.name
    const value = e.target.value
    // console.log(name);
    // console.log(value);

    // project, setProject
    setProject({
      ...project,
      [name]: value
    })

  }
  const _onChangeActive = (e) => {
    const name = e.target.name
    const checked = e.target.checked
    // console.log(checked);
    setProject({
      ...project,
      [name]: checked
    })
    
  }
  console.log(project);
  

  return (
    <React.Fragment>
      <div className={classes.container}>
        {/* <Button onClick={this.handleGetData}>Get Data Tranform</Button> */}
        <form>
          <TextField
            required
            value={project ? project.name : ''}
            name="name"
            label={PROJECT_NAME}
            className={classes.textField}
            margin="normal"
            onChange={_onChangeText}
          />
          <Switch
            name="active"
            checked={project ? project.active: true}
            onChange={_onChangeActive}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />

          {/* <CronTriggerQuartz
            cronValue={"0/10 * * * * ? *"}
            viewCronValue={true}
            tabs={["minutes", "hourly", "daily", "weekly"]}
            onChange={handleChangeCron}
          /> */}
        </form>
      </div>
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(InputComponent);
