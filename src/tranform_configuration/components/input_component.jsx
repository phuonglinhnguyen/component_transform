import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Switch } from "@material-ui/core";
import { CronTriggerQuartz } from "@dgtx/core-component-ui";
import PropTypes from "prop-types";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "@material-ui/core";
import TransformDialog from "./Dialogs/TranformDialog";

const styles: any = (theme: any) => {
  return {
    container: {
      width: "100%",
      maxWidth: "100%",
      align: "center"
    },
    paddingItem: {
      padding: theme.spacing.unit
    },
    textField: {
      marginRight: theme.spacing.unit
    },
    formControl: {
      display: "flex"
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

  const handleChangeCron = cronValue => {
    console.log("cronValue: ", cronValue);
  };

  const _onChangeText = e => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name);
    // console.log(value);

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
    const checkedRadio = e.target.checkedRadio;
    console.log(name);
    console.log("checkedRadio", checkedRadio);
    setProject({
      ...project,
      [name]: checkedRadio
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
              // value={this.state.value}
            >
              <FormControlLabel
                value="doc_status"
                control={<Radio />}
                label="Doc_status"
                // checked={}
                onChange={_onChangeActive}
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
            />
          </FormControl>

          <CronTriggerQuartz
            cronValue={"0/10 * * * * ? *"}
            viewCronValue={true}
            tabs={["minutes", "hourly", "daily", "weekly"]}
            onChange={handleChangeCron}
          />
        </form>
      </div>
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(InputComponent);
