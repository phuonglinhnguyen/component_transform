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
import Grid from "@material-ui/core/Grid";

const styles: any = (theme: any) => {
  return {
    container: {
      width: "100vw",
      maxWidth: "100%",
      align: "center"
    },
    paddingItem: {
      padding: theme.spacing.unit
    },
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
}
const DictionaryComponent: React.FC<IDefautProps> = props => {
  const { classes, project, setProject } = props;

  const _onChangeText = e => {
    const name = e.target.name;
    const value = e.target.value;

    setProject({
      ...project,
      [name]: value
    });
  };

  return (
    <React.Fragment>
      <Grid container spacing={8} alignItems="flex-end">
        <Grid item xs={4}>
          <TextField 
          name="fieldKey"
          label="Field Key"
           />
        </Grid>
        <Grid item xs={4}>
          <TextField 
          name="fieldKey"
          label="Field Key"
           />
        </Grid>

      </Grid>
      <Grid container spacing={8} alignItems="flex-end">
        <Grid item xs={4}>
          <TextField 
          name="fieldKey"
          label="Field Key"
           />
        </Grid>
        <Grid item xs={4}>
          <TextField 
          name="fieldKey"
          label="Field Key"
           />
        </Grid>

      </Grid>
      {/* <TextField name="database_type" label="Database Type" margin="normal" />
      <TextField name="host" label="Host" margin="normal" />
      <TextField name="port" label="Port" margin="normal" />
      <TextField name="username" label="Username" margin="normal" />
      <TextField name="password" label="Password" margin="normal" />
      <TextField name="database_name" label="Database Name" margin="normal" />
      <TextField name="schema_name" label="Schema Name" margin="normal" /> */}
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(DictionaryComponent);
