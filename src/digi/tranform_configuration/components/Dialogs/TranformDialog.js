import React, { useState } from "react";

import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Translate } from "react-redux-i18n";
import { KEY_TRANSLATE } from "../../../../store/actions/tranform_configuration";

import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

const styles: any = (theme: any) => {
  return {};
};
export interface IDefautProps {
  classes?: any;
  styles?: any;
  theme?: any;
  project?: any;
  setProject?: any;
  projects?: any;
  setProjects?: any;
  isOpen?: any;
  setIsOpen?: any;
}
const TransformDialog: React.FC<IDefautProps> = props => {
  const {
    isOpen,
    setIsOpen,
    projects,
    setProjects,
    project,
    setProject
  } = props;

  const [pattern, setTransform] = useState({});

  const _onAgree = () => {
    console.log(pattern);
    console.log();
    setIsOpen(false);
    setProject({
      ...project,
      filter: {
        ...project.filter,
        transform: {
          pattern: JSON.stringify(pattern)
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
        <JSONInput
          id="a_unique_id"
          placeholder={pattern}
          locale={locale}
          height="300px"
          onChange={e => {
            setTransform(e.jsObject);
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setIsOpen(false)} color="primary">
          {" "}
          <Translate value={`${KEY_TRANSLATE}.disagree_tranform`} />
        </Button>

        <Button onClick={_onAgree} color="primary" autoFocus>
          {" "}
          <Translate value={`${KEY_TRANSLATE}.agree_tranform`} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles, { withTheme: true })(TransformDialog);
