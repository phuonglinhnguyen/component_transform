import React, { useState } from "react";

import { Translate } from "react-redux-i18n";
import { KEY_TRANSLATE } from "../../../../store/actions/tranform_configuration";
import { withStyles } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import InputComponent from "../input_component";
import Project from "../Models/Project";

import "./dialog.css";
const styles: any = (theme: any) => {
  return {
    test:{
      maxWidth: "1200px",
    }
  };
};
export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
  projects?: any;
  setProjects?: any;
  isOpen?: any;
  setIsOpen?: any;
}
const AddDialog: React.FC<IDefautProps> = props => {
  const { isOpen, setIsOpen, projects, setProjects, classes } = props;

  const [project, setProject] = useState(() => {
    return new Project();
  });

  const _onAgree = () => {
    const newProjects = [...projects, project];
    setProjects(newProjects);
    setIsOpen(false);
    setProject(new Project());
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={classes.test}>
      <DialogTitle className="tilte-dialog">
        {"Add Transform Config"}
      </DialogTitle>
      <DialogContent >
        <InputComponent project={project} setProject={setProject} />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setIsOpen(false)} color="primary">
          <Translate value={`${KEY_TRANSLATE}.disagree`} />
        </Button>
        <Button onClick={_onAgree} color="primary" autoFocus>
          <Translate value={`${KEY_TRANSLATE}.agree`} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles, { withTheme: true })(AddDialog);
