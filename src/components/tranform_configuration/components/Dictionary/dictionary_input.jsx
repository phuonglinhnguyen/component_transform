import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
const styles: any = (theme: any) => {
  return {
    titleField: {
      fontWeight: "bold"
    },
    textField: {
      width: "95%"
    },
    textField1: {
      width: "90%"
    },
    add: {
      background: "#3f51b5",
      color: "#fafafa",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "#1a237e"
      }
    },
    save: {
      background: "#689f38",
      color: "#fafafa",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "#1b5e20"
      }
    },
    formInput: {
      margin: "20px 0"
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
  config?: any;
  setConfig?: any;
  dictItem?: any;
  setDictItem?: any;
  mode?: any;
  dictionary?: any;
}
const DictionaryComponent: React.FC<IDefautProps> = props => {
  const {
    classes,
    config,
    setConfig,
    dictItem,
    setDictItem,
    mode,
    dictionary,
    setMode
  } = props;

  const onChangeText = e => {
    const name = e.target.name;
    const value = e.target.value;

    setDictItem({
      ...dictItem,
      [name]: value
    });
  };

  const onAddDictionary = () => {
    if (mode === "add") {
      const newDictItem = { ...dictItem };
      console.log("dsdsff", newDictItem);

      setConfig({
        ...config,
        dictionary: [...config.dictionary, newDictItem]
      });
      setDictItem(null);
    } else if (mode === "edit") {
      const newDictionary = dictionary.map(_dictItem => {
        if (_dictItem.fieldKey === dictItem.fieldKey) {
          return { ...dictItem };
        }
        return _dictItem;
      });

      setConfig({
        ...config,
        dictionary: newDictionary
      });
      setMode("add");
      setDictItem(null);
      console.log(newDictionary);
    }
  };

  return (
    <React.Fragment>
      <FormLabel className={classes.titleField}>Dictionary</FormLabel>
      <div className={classes.formInput}>
        <Grid container spacing={12} alignItems="flex-end">
          <Grid item xs={6}>
            <TextField
              label="Field Key"
              className={classes.textField}
              name="fieldKey"
              margin="dense"
              variant="outlined"
              onChange={onChangeText}
              value={dictItem && dictItem.fieldKey ? dictItem.fieldKey : ""}
              disabled={mode === "edit"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Database Type"
              className={classes.textField}
              name="database_type"
              margin="dense"
              onChange={onChangeText}
              variant="outlined"
              value={
                dictItem && dictItem.database_type ? dictItem.database_type : ""
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={12} alignItems="flex-end">
          <Grid item xs={6}>
            <TextField
              name="host"
              label="Host"
              className={classes.textField}
              margin="dense"
              onChange={onChangeText}
              variant="outlined"
              value={dictItem && dictItem.host ? dictItem.host : ""}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              name="port"
              label="Port"
              className={classes.textField1}
              margin="dense"
              onChange={onChangeText}
              variant="outlined"
              value={dictItem && dictItem.port ? dictItem.port : ""}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              name="query"
              label="Query"
              className={classes.textField1}
              margin="dense"
              onChange={onChangeText}
              variant="outlined"
              // value={dictItem && dictItem.port ? dictItem.port : ""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={12} alignItems="flex-end">
          <Grid item xs={6}>
            <TextField
              name="username"
              label="Username"
              className={classes.textField}
              type="text"
              margin="dense"
              onChange={onChangeText}
              variant="outlined"
              value={dictItem && dictItem.username ? dictItem.username : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="password"
              placeHolder="Password"
              label="Password"
              type="password"
              className={classes.textField}
              margin="dense"
              onChange={onChangeText}
              variant="outlined"
              value={dictItem && dictItem.password ? dictItem.password : ""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={12} alignItems="flex-end">
          <Grid item xs={6}>
            <TextField
              name="database_name"
              label="Database Name"
              className={classes.textField}
              type="text"
              margin="dense"
              onChange={onChangeText}
              variant="outlined"
              value={
                dictItem && dictItem.database_name ? dictItem.database_name : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="schema_name"
              label="Schema Name"
              type="text"
              className={classes.textField}
              margin="dense"
              onChange={onChangeText}
              variant="outlined"
              value={
                dictItem && dictItem.schema_name ? dictItem.schema_name : ""
              }
            />
          </Grid>
        </Grid>
      </div>

      <Fab
        size="small"
        aria-label="Add"
        className={mode === "add" ? classes.add : classes.save}
        onClick={onAddDictionary}
      >
        {mode === "add" ? <AddIcon /> : <DoneIcon />}
      </Fab>
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(DictionaryComponent);
