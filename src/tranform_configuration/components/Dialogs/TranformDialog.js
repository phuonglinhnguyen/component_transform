import React, { useState } from "react";

import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Translate } from "react-redux-i18n";
import { KEY_TRANSLATE } from "../../../../store/actions/tranform_configuration";
import AceEditor from "react-ace";
// import JSONInput from "react-json-editor-ajrm";
// import locale from "react-json-editor-ajrm/locale/en";

const styles: any = (theme: any) => {
  return {
    ace: {
      fontSize: "16px",
      height: "250px",
      margin: "20px 0"
    }
  };
};
export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
  config?: any;
  setConfig?: any;
  configs?: any;
  setConfigs?: any;
  isOpen?: any;
  setIsOpen?: any;
}
const TransformDialog: React.FC<IDefautProps> = props => {
  const {classes, isOpen, setIsOpen, configs, setConfigs, config, setConfig } = props;

  // const [pattern, setTransform] = useState({});
  const [patternValue, setPatternValue] = useState(null);
  const onAgree = () => {
    console.log(patternValue);
    setIsOpen(false);
    setConfig({
      ...config,
      filter: {
        ...config.filter,
        transform: {
          pattern: JSON.stringify(patternValue)
        }
      }
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="tilte-dialog">{"Pattern"}</DialogTitle>
      <DialogContent>
        {/* <JSONInput
          id="a_unique_id"
          placeholder={pattern}
          locale={locale}
          height="300px"
          onChange={e => {
            setTransform(e.jsObject);
          }}
        /> */}
        <AceEditor
          name="pattern"
          className={classes.ace}
          // editorProps={{ $blockScrolling: "Infinity" }}
          // enableBasicAutocompletion={true}
          // enableLiveAutocompletion={true}
          // enableSnippets={true}
          // highlightActiveLine={true}
          width="500px"
          height="500px"
          mode="javascript"
          // onChange={pattern => setTransform(pattern)}
          onChange={patternValue => {
            setPatternValue(patternValue);
          }}
          // showGutter={true}
          // showPrintMargin={false}
          theme="solarized_dark"
          value={patternValue || ""}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setIsOpen(false)} color="primary">
          {" "}
          <Translate value={`${KEY_TRANSLATE}.disagree_tranform`} />
        </Button>

        <Button onClick={onAgree} color="primary" autoFocus>
          {" "}
          <Translate value={`${KEY_TRANSLATE}.agree_tranform`} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles, { withTheme: true })(TransformDialog);
