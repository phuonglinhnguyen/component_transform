import React, { useState } from "react";

import { Translate } from "react-redux-i18n";
import { KEY_TRANSLATE } from "../../../../store/actions/tranform_configuration";
import { withStyles } from "@material-ui/core/styles";
// import * as constants from '../../../store/actions/tranform_configuration'
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import InputComponent from "../input_component";
import Config from "../Models/Config";

import "./dialog.css";
import { isEmpty } from "lodash";

const styles: any = (theme: any) => {
  return {
    showDialog: {
      maxWidth: "1200px"
    }
  };
};
export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
  configs?: any;
  setConfigs?: any;
  isOpen?: any;
  setIsOpen?: any;
}
const AddDialog: React.FC<IDefautProps> = props => {
  const { isOpen, setIsOpen, configs, setConfigs, classes,createData } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [config, setConfig] = useState(() => {
    return new Config();
  });
  const [cronValue, setCronValue] = useState(" ");

  const onAgree = e => {
    // const newConfigs = [...configs, config];

    // setConfigs(newConfigs);
    createData(config)
    setIsOpen(false);
    setConfig(new Config());
  };
  // const validateInput = () => {
  //   let errorMessage = "test";
  //   if (isEmpty(name)) {
  //     return setErrorMessage(errorMessage);
  //   }
  // };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={classes.test}
    >
      <DialogTitle className="tilte-dialog">
        {"Add Transform Config"}
      </DialogTitle>
      <DialogContent>
        <InputComponent
          config={config}
          setConfig={setConfig}
          cronValue={cronValue}
          setCronValue={setCronValue}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
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

export default withStyles(styles, { withTheme: true })(AddDialog);
