import React, { useState } from "react";
import get from 'lodash/get'
import { withStyles } from "@material-ui/core/styles";
import { TextField, Switch, Button, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from "@material-ui/core";
// import { CronTriggerQuartz } from "@dgtx/core-component-ui";
import TransformDialog from "./Dialogs/TranformDialog";
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
  const [isOpenTransformModal, setIsOpenTransformModal] = useState(false);

  const _onChangeText = (e) => {
    const name = e.target.name
    const value = e.target.value

    setProject({
      ...project,
      [name]: value
    })
  }
  // const _handleChangeCron = (cronValue) => {
  //   setProject({
  //     ...project,
  //     cron_trigger: cronValue
  //   })
  // }
  const _onChangeActive = (e) => {
    const name = e.target.name
    const checked = e.target.checked
    // console.log(checked);
    setProject({
      ...project,
      [name]: checked
    })

  }
  const _onChangeRadio = e => {
    const name = e.target.name;
    const value = e.target.value;
    const collector = get(project, 'filter.collector', {})
    let newCollector = {}

    for (const key in collector) {
      if (key === value) {
        newCollector[key] = 'final'
      } else {
        newCollector[key] = ''
      }
    }

    setProject({
      ...project,
      filter: {
        ...project.filter,
        collector: newCollector
      },
    });
  };
  
  const _collectorValue = () => {
    let value = ''
    const collector = get(project, 'filter.collector', {})
    for (const key in collector) {
      const final = collector[key]; // final = 'final'
      if (final === 'final') {
        value = key // value = doc_status
      }
    }
    return value
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <form>
          <TextField
            required
            value={project ? project.name : ""}
            name="name"
            label={PROJECT_NAME}
            className={classes.textField}
            margin="normal"
            onChange={_onChangeText}
          />
          <TextField
            name="version"
            value={project ? project.version : ""}
            label="Version"
            className={classes.textField}
            margin="normal"
            onChange={_onChangeText}
          />
          <FormControl className={classes.formControl}>
            <FormLabel component="label">Active</FormLabel>
            <Switch
              aria-label="Active"
              name="active"
              checked={project ? project.active : true}
              onChange={_onChangeActive}
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </FormControl>

          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Collector</FormLabel>
            <RadioGroup
              aria-label="Collector"
              name="collector"
              className={classes.group}
              value={_collectorValue()}
              onChange={_onChangeRadio}
            >
              <FormControlLabel
                value="doc_status"
                control={<Radio />}
                label="Doc_status"
              />
              <FormControlLabel
                value="doc_set_status"
                control={<Radio />}
                label="Doc_set_status"
              />
              <FormControlLabel
                value="batch_status"
                control={<Radio />}
                label="Datch_status"
              />
            </RadioGroup>
          </FormControl>
          
          <FormControl>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsOpenTransformModal(true)}
            >
              Transform
            </Button>
            <TransformDialog
              isOpen={isOpenTransformModal}
              setIsOpen={setIsOpenTransformModal}
              project={project}
              setProject={setProject}
            />
          </FormControl>
          {/* <CronTriggerQuartz
            cronValue={"0/10 * * * * ? *"}
            viewCronValue={true}
            tabs={["minutes", "hourly", "daily", "weekly"]}
            onChange={_handleChangeCron}
          /> */}
        </form>
        <div>{project.filter.transform.pattern}</div>
      </div>
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(InputComponent);
