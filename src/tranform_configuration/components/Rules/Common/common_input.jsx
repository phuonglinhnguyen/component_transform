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
    commonItem,
    setCommonItem,
    config,
    setConfig,
    commonName,
    setCommonName
  } = props;

  const onChangeText = e => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("common name:", name);
    console.log("common Val:", value);

    setCommonItem({
      ...commonItem,
      [name]: value
    });
  };
  console.log("commonData:", common);

  const onAddCommon = e => {
    // if (mode === "add") {
    const newCommonItem = [...commonItem];
    newCommonItem.unshift({
      commonName
    });
    console.log("newds", newCommonItem);

    // setConfig({
    //   ...config,
    //   rules: {
    //     ...config.rules,
    //     common: [...config.rules.common, newCommonItem]
    //   }
    // });
    setCommonItem(newCommonItem);
  };
  // }else if(mode==="edit"){
  //   const newCommon=common.map(_commonItem=>{
  //     if(_commonItem.convertNumber===commonItem.convertNumber){
  //       return {...commonItem}
  //     }
  //     return _commonItem;
  //   })

  //   setConfig({
  //     ...config,
  //     rules: {
  //       ...config.rules,
  //       content: {
  //         ...config.rules.common,
  //         [convertNumber]: commonItem
  //       }
  //     }
  //   });
  //   setMode("add");
  //   setCommonItem(null);
  // }
  // };
  return (
    <React.Fragment>
      <div className={classes.common}>
        <FormLabel className={classes.titleField}>Common </FormLabel>
        <Fab
          size="small"
          className={classes.add}
          aria-label="Add"
          onClick={onAddCommon}
        >
          <AddIcon />
          {/* {mode === "add" ? <AddIcon /> : <DoneIcon />} */}
        </Fab>
      </div>
      <TextField
        name="commonName"
        label="Name"
        margin="normal"
        value={commonName ? commonName : ""}
        onChange={e => {
          setCommonName(e.target.value);
        }}
        // onChange={onChangeText}
      />
      <AceEditor
        className={classes.ace}
        editorProps={{ $blockScrolling: "Infinity" }}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        highlightActiveLine={true}
        height="250px"
        mode="javascript"
        name={"expression"}
        onChange={onChangeText}
        showGutter={true}
        showPrintMargin={false}
        theme="solarized_dark"
        // value={data.expression || ''}
        width="100%"
      />
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Common);
