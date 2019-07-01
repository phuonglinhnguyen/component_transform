import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import get from "lodash/get";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Done";

import { TextField } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";

const styles: any = (theme: any) => {
  return {
    formControl: {
      boxShadow: "-4px 3px 33px -10px rgba(0,0,0,0.75)",
      margin: "20px 0",
      padding: theme.spacing.unit * 3,
      textAlign: "center",
      display: "flex",
      flexDirection: "column"
    },
    titleField: {
      fontWeight: "bold"
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    },
    formContent: {
      textAlign: "center"
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
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
}
const ContentItem: React.FC<IDefautProps> = props => {
  const {
    classes,
    config,
    setConfig,
    setContentItem,
    content,
    contentItem,
    contentArray,
    contentName,
    setContentName,
    setContentArray,
    mode,
    setMode
  } = props;
  const onChangeText = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (mode === "add") {
      setContentItem({
        ...contentItem,
        [name]: value
      });
    } else if (mode === "edit") {
      setContentItem({
        contentName,
        contentItem: {
          ...contentItem,
          [name]: value
        }
      });
    }
  };

  const onAddContentItem = () => {
    if (mode === "add") {
      const newContentArray = [...contentArray];
      newContentArray.unshift({
        contentName,
        contentItem
      });
      setConfig({
        ...config,
        rules: {
          ...config.rules,
          content: {
            ...config.rules.content,
            [contentName]: contentItem
          }
        }
      });
      setContentArray(newContentArray);
      setContentItem(null)
      setContentName(null)
    } else if (mode === "edit") {
      const newContentArray = contentArray.map(_contentItem => {
        if (_contentItem.contentItem.dataKey === contentItem.dataKey) {
          return { contentItem: {...contentItem}, contentName };
        }
        return _contentItem;
      });

      setConfig({
        ...config,
        rules: {
          ...config.rules,
          content: {
            ...config.rules.content,
            [contentName]: contentItem
          }
        }
      });
      setMode("add");
      setContentArray(newContentArray);
      setContentItem(null)
    }
  };
  return (
    <React.Fragment>
      <div className={classes.content}>
        <FormLabel className={classes.titleField}>Content</FormLabel>

        <Fab
          size="small"
          className={mode === "add" ? classes.add : classes.save}
          aria-label="Add"
          onClick={onAddContentItem}
        >
          {mode === "add" ? <AddIcon /> : <SaveIcon />}
        </Fab>
      </div>
      <TextField
        name="contentName"
        label="Name"
        className={classes.heading}
        onChange={e => setContentName(e.target.value)}
        value={contentName ? contentName : ""}
        disabled={mode === "edit"}
      />
      <div className={classes.formControl}>
        <TextField
          name="dataKey"
          label="DataKey"
          margin="dense"
          onChange={onChangeText}
          value={contentItem && contentItem.dataKey ? contentItem.dataKey : ""}
          disabled={mode === "edit"}
        />

        <TextField
          name="default"
          label="Default"
          margin="dense"
          multiline={true}
          rows={1}
          rowsMax={3}
          onChange={onChangeText}
          value={contentItem && contentItem.default ? contentItem.default : ""}
        />

        <TextField
          name="value"
          label="Value"
          margin="dense"
          multiline={true}
          rows={1}
          rowsMax={3}
          onChange={onChangeText}
          value={contentItem ? contentItem.value : ""}
        />
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(ContentItem);
