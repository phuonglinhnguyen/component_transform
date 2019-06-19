import React, { useState } from "react";
import { Button } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import InputComponent from "../input_component";
import Project from "../Models/Project";
import { Translate } from "react-redux-i18n";
import { KEY_TRANSLATE } from "../../../../store/actions/tranform_configuration";
import "./main.css";
const AddDialog = props => {
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
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Add Transform Config"}
      </DialogTitle>
      <DialogContent>
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

export default AddDialog;
