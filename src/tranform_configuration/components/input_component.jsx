import React, { useState } from "react";

import { CronTriggerQuartz } from "@dgtx/core-component-ui";

import get from "lodash/get";

import { withStyles } from "@material-ui/core/styles";
import { TextField, Switch } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import TransformDialog from "./Dialogs/TranformDialog";
import ArrayField from "./array_fields_component";
import DictionaryComponent from "./dictionary_component";

const styles: any = (theme: any) => {
  return {
    container: {
      width: "100vw",
      maxWidth: "100%",
      align: "center"
    },
    wrapForm: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "space-around"
    },
    paddingItem: {
      padding: theme.spacing.unit
    },
    textField: {
      marginRight: theme.spacing.unit
    },
    group: {
      margin: `${theme.spacing.unit * 3}px 0px 0px 0px`
    },
    formControl: {
      boxShadow: "-4px 3px 33px -10px rgba(0,0,0,0.75)",
      margin: `${theme.spacing.unit * 3}px 0px 0px 0px`,
      padding: theme.spacing.unit * 3
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

  const _onChangeText = e => {
    const name = e.target.name;
    const value = e.target.value;
    setProject({
      ...project,
      [name]: value
    });
  };

  const _onChangeActive = e => {
    const name = e.target.name;
    const checked = e.target.checked;
    // console.log(checked);

    setProject({
      ...project,
      [name]: checked
    });
  };

  const _onChangeRadio = e => {
    const name = e.target.name;
    const value = e.target.value;
    const collector = get(project, "filter.collector", {});
    let newCollector = {};

    for (const key in collector) {
      if (key === value) {
        newCollector[key] = "final";
      } else {
        newCollector[key] = "";
      }
    }

    setProject({
      ...project,
      filter: {
        ...project.filter,
        collector: newCollector
      }
    });
  };

  const _collectorValue = () => {
    let value = "";
    const collector = get(project, "filter.collector", {});
    for (const key in collector) {
      const final = collector[key]; // final = 'final'
      if (final === "final") {
        value = key; // value = doc_status
      }
    }
    return value;
  };

  const _handleChangeCron = cronValue => {
    setProject({
      ...project,
      cron_trigger: cronValue
    });
  };

  console.log(project);

  return (
    <React.Fragment>
      <div>
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
            disabled
          />
        </form>
        <CronTriggerQuartz
          className={classes.group}
          cronValue={"0/10 * * * * ? *"}
          viewCronValue={true}
          tabs={["minutes", "hourly", "daily", "weekly"]}
          onChange={_handleChangeCron}
        />
        <FormGroup>
          <FormControlLabel
            label="Active"
            control={
              <Switch
                aria-label="Active"
                name="active"
                checked={project ? project.active : true}
                onChange={_onChangeActive}
                color="primary"
              />
            }
          />
        </FormGroup>
        <Grid className={classes.wrapForm} spacing={24}>
          <Grid item xs={12} sm={5} className={classes.formControl}>
            <FormLabel component="legend">Filter</FormLabel>
            <FormControl component="fieldset" margin="normal">
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
                  value="batch_status"
                  control={<Radio />}
                  label="Batch_status"
                />
                <FormControlLabel
                  value="doc_set_status"
                  control={<Radio />}
                  label="Doc_set_status"
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
              <div>{project.filter.transform.pattern}</div>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={7} className={classes.formControl}>
            <DictionaryComponent />
          </Grid>
        </Grid>
        <ArrayField />
      </div>
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(InputComponent);
