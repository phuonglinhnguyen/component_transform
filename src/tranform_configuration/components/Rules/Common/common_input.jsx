import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, FormLabel } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";

import AceEditor from "react-ace";

const styles: any = (theme: any) => {
  return {
    formControl: {
      display: "inherit",
      margin: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3
    },
    formCommon: {
      margin: `0px ${theme.spacing.unit * 3}px 0px ${theme.spacing.unit * 3}px`
    },
    titleField: {
      fontWeight: "bold"
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
    common: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    titleCommon: {
      margin: "20px 0 40px 0"
    },
    ace: {
      fontSize: "16px",
      height: "250px",
      margin: "20px 0"
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
  mode?: any;
  commonItem?: any;
  setCommonItem?: any;
}

const Common: React.FC<IDefautProps> = props => {
  const {
    classes,
    common,
    mode,
    setMode,
    config,
    setConfig,
    commonName,
    setCommonName,
    commonValue,
    setCommonValue
  } = props;

  // console.log("commonData:", common);

  const onAddCommon = () => {
    if (mode === "add") {
      const newConmonItem = { [commonName]: commonValue };
      const newCommon = [...common];
      newCommon.unshift(newConmonItem);

      setConfig({
        ...config,
        rules: {
          ...config.rules,
          common: newCommon
        }
      });
      setCommonName(null);
      setCommonValue(null);
    } else if (mode === "edit") {
      console.log("edit maybe s");
      setMode("add");
    }
  };
  console.log("name:", commonName);
  // console.log({ commonValue });
  return (
    <React.Fragment>
      <div className={classes.common}>
        <FormLabel className={classes.titleField}>Common </FormLabel>
        <Fab
          size="small"
          className={mode === "add" ? classes.add : classes.save}
          aria-label="Add"
          onClick={onAddCommon}
        >
          {mode === "add" ? <AddIcon /> : <DoneIcon />}
        </Fab>
      </div>
      <TextField
        name="commonName"
        label="Name"
        margin="normal"
        value={ commonName ? commonName : ""}
        onChange={e => setCommonName(e.target.value)}
        disabled={mode === "edit"}
      />
      <AceEditor
        name="commonValue"
        className={classes.ace}
        editorProps={{ $blockScrolling: "Infinity" }}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        highlightActiveLine={true}
        height="250px"
        mode="javascript"
        onChange={commonValue => setCommonValue(commonValue)}
        showGutter={true}
        showPrintMargin={false}
        theme="solarized_dark"
        value={commonValue || ""}
        width="100%"
      />
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Common);
