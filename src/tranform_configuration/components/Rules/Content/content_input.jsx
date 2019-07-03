import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { isEmpty } from "lodash";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";

import { TextField } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import AceEditor from "react-ace";
import FormHelperText from "@material-ui/core/FormHelperText";
const styles: any = (theme: any) => {
  return {
    formControl: {
      boxShadow: "-4px 3px 33px -10px rgba(0,0,0,0.75)",
      margin: "20px 0",
      padding: theme.spacing.unit * 3,
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
    },
    hidden: {
      display: "none"
    },
    cancel: {
      marginRight: "10px",
      background: "#ff9800",
      color: "#fafafa",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "#e65100"
      }
    },
    titleContent: {
      fontSize: "18px",
      margin: "10px 0"
    },
    error: {
      color: "red",
      opacity: "0.8"
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
  config?: any;
  setConfig?: any;
  setContentItem?: any;
  content?: any;
  contentItem?: any;
  contentName?: any;
  setContentName?: any;
  contentArray?: any;
  setContentArray?: any;
  mode?: any;
  setMode?: any;
}
const ContentItem: React.FC<IDefautProps> = props => {
  const {
    classes,
    config,
    setConfig,
    setContentItem,
    content,
    contentItem,
    contentName,
    contentArray,
    setContentName,
    setContentArray,
    mode,
    setMode
    // contentDefault,
    // setContentDefault
  } = props;
  const [errorMessage, setErrorMessage] = useState(null);
  const onChangeText = (name, value) => {
    // const name=e.target.name;
    // const va=e.target.name;

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
  const onChangeEditor = (name, value) => {
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
      setContentItem(null);
      setContentName(null);
    } else if (mode === "edit") {
      const newContentArray = contentArray.map(_contentItem => {
        if (_contentItem.contentItem.dataKey === contentItem.dataKey) {
          return { contentItem: { ...contentItem }, contentName };
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
      setContentItem(null);
    }
  };
  const onCancel = () => {
    setMode("add");
    setContentItem(null);
  };
  const check_input = e => {
    const value = e.target.value;
    let good = !isEmpty(value);

    if (good) {
      return { message: "valid" };
    } else {
      return { message: "invalid", detail: "it's empty" };
    }
  };
  return (
    <React.Fragment>
      <div className={classes.content}>
        <FormLabel className={classes.titleField}>Content</FormLabel>
        <div className={classes.actions}>
          <Fab
            size="small"
            className={mode === "add" ? classes.hidden : classes.cancel}
            aria-label="Cancel"
            onClick={onCancel}
            hiddenCancel
          >
            {mode === "add" ? "" : <CancelIcon />}
          </Fab>
          <Fab
            size="small"
            className={mode === "add" ? classes.add : classes.save}
            aria-label="Add"
            onClick={onAddContentItem}
          >
            {mode === "add" ? <AddIcon /> : <SaveIcon />}
          </Fab>
        </div>
      </div>
      <TextField
        name="contentName"
        label="Name"
        className={classes.heading}
        error={errorMessage}
        onChange={e => {
          const message = check_input(e);
          if (message.message !== "valid") {
            setErrorMessage(message.detail);
          } else {
            setErrorMessage(null);
            setContentName(e.target.value);
          }
        }}
        defaultValue={contentName ? contentName : ""}
        disabled={mode === "edit"}
      />
      <FormHelperText className={classes.error}>{errorMessage}</FormHelperText>
      <div className={classes.formControl}>
        <TextField
          name="dataKey"
          label="DataKey"
          error={errorMessage}
          margin="dense"
          onChange={e => {
            const message = check_input(e);
            if (message.message !== "valid") {
              setErrorMessage(message.detail);
            } else {
              setErrorMessage(null);
              onChangeText(e.target.name, e.target.value);
            }
          }}
          defaultValue={
            contentItem && contentItem.dataKey ? contentItem.dataKey : ""
          }
          disabled={mode === "edit"}
        />
        <FormHelperText className={classes.error}>
          {errorMessage}
        </FormHelperText>
        {/* <TextField
          name="default"
          label="Default"
          margin="dense"
          multiline={true}
          rows={1}
          rowsMax={3}
          onChange={onChangeText}
          value={contentItem && contentItem.default ? contentItem.default : ""}
        /> */}
        <label className={classes.titleContent}>Default</label>
        <AceEditor
          name="default"
          // className={classes.ace}
          editorProps={{ $blockScrolling: "Infinity" }}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          highlightActiveLine={true}
          width="100%"
          height="250px"
          mode="javascript"
          onChange={e => {
            onChangeText("default", e);
          }}
          showGutter={true}
          showPrintMargin={false}
          theme="solarized_dark"
          defaultValue={
            contentItem && contentItem.default ? contentItem.default : ""
          }
          width="100%"
        />
        <label className={classes.titleContent}>Value</label>
        <AceEditor
          name="value"
          // className={classes.ace}
          editorProps={{ $blockScrolling: "Infinity" }}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          highlightActiveLine={true}
          width="100%"
          height="250px"
          mode="javascript"
          onChange={e => {
            onChangeText("value", e);
          }}
          showGutter={true}
          showPrintMargin={false}
          theme="solarized_dark"
          defaultValue={
            contentItem && contentItem.value ? contentItem.value : ""
          }
          width="100%"
        />
        {/* <TextField
          name="value"
          label="Value"
          margin="dense"
          multiline={true}
          rows={1}
          rowsMax={3}
          onChange={onChangeText}
          defaultValue={contentItem && contentItem.value ? contentItem.value : ""}
        /> */}
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(ContentItem);
