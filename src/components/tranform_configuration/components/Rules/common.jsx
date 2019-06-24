import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, FormLabel } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";

import AceEditor from "react-ace";
import CommonItems from "./common_item";

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
    common: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    titleCommon: {
      margin: "20px 0 40px 0"
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
  const { classes, mode, commonItem, setCommonItem } = props;
  
  const onChangeText = e => {
    const name = e.target.name;
    const value = e.target.value;
    setCommonItem([...commonItem, ([name]: value)]);
  };
  // handleModify(key, value) {
  //   const { datas, index } = this.state;
  //   let data = { ...this.state.data };
  //   let error_text = this.state.error_text;
  //   data[key] = value;
  //   const field_name = data.name;
  //   const index_field = lodash.findIndex(datas, _d => _d.name === field_name);
  //   if (key === 'name' && !field_name) {
  //     error_text = (
  //       <Translate
  //         value={'projects.export_configuration.this_field_is_required'}
  //       />
  //     );
  //   } else if (key === 'name' && field_name.length > 0) {
  //     error_text = '';
  //   }
  //   if (index_field !== -1 && index_field !== index) {
  //     error_text = (
  //       <Translate
  //         value={'projects.export_configuration.this_field_is_conflict'}
  //       />
  //     );
  //   }
  //   this.setState({
  //     error_text: error_text,
  //     data: data
  //   });
  // }
  return (
    <React.Fragment>
      <FormLabel className={classes.titleField}>Common </FormLabel>
      <div className={classes.common}>
        <TextField
          name="convertNumber"
          label="Name"
          margin="normal"
          onChange={onChangeText}
        />
        <TextField name="xx" label="XX" margin="normal" />
        <Fab size="small" color="primary" aria-label="Add">
          {mode === "add" ? <AddIcon /> : <DoneIcon />}
        </Fab>
      </div>

      <AceEditor
        editorProps={{ $blockScrolling: "Infinity" }}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        fontSize={16}
        height="250px"
        highlightActiveLine={true}
        mode="javascript"
        name={"expression"}
        // onChange={newValue => this.handleModify('expression', newValue)}
        showGutter={true}
        showPrintMargin={false}
        theme="solarized_dark"
        // value={data.expression || ''}
        width="100%"
      />

      <div className={classes.titleCommon}>
        <FormLabel className={classes.titleField}>List Common</FormLabel>
        <CommonItems />
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Common);
