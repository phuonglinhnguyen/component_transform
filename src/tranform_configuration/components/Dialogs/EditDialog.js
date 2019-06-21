import React, { useState } from "react";

import { Translate } from "react-redux-i18n";
import { KEY_TRANSLATE } from "../../../../store/actions/tranform_configuration";

import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import InputComponent from "../input_component";

const EditDialog = props => {
  const {
    isOpen,
    setIsOpen,
    projects,
    setProjects,
    project,
    setProject
  } = props;

  const _onAgree = () => {
    const newProjects = projects.map(_project => {
      if (_project.project_id === project.project_id) {
        return { ...project };
      }
      return _project;
    });
    setProjects(newProjects);
    setIsOpen(false);
    setProject(null);
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
      <DialogContent>
        <InputComponent
          project={project}
          setProject={setProject}
          editable={true}
        />
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

export default EditDialog;
