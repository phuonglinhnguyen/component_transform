import React from "react";

import { Translate } from "react-redux-i18n";
import { KEY_TRANSLATE } from "../../../../store/actions/tranform_configuration";

import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./dialog.css"

import InputComponent from "../input_component";
const styles: any = (theme: any) => {
  return {
    paper: {
      maxWidth: "800px !important"
    }
  };
};
export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
  config?: any;
  setConfig?: any;
  isOpen?: any;
  setIsOpen?: any;
}

const EditDialog: React.FC<IDefautProps> = props => {
  const {
    isOpen,
    setIsOpen,
    config,
    setConfig,
    updateData
  } = props;

  const onAgree = () => {
    updateData(config)
    setIsOpen(false);
    setConfig(null);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="tilte-dialog">
        {"Edit Transform Config"}
      </DialogTitle>
      <DialogContent >
        <InputComponent
          config={config}
          setConfig={setConfig}
          editable={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)} color="primary">
          <Translate value={`${KEY_TRANSLATE}.disagree`} />
        </Button>
        <Button onClick={onAgree} color="primary" autoFocus>
          <Translate value={`${KEY_TRANSLATE}.agree`} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles, { withTheme: true })(EditDialog);
