import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const LookupDialog = ({ lookup_dialog, actions, Translate }) => {
  let {
    open_dialog,
    title_dialog,
    handleClickSubmit,
    label_button_dialog
  } = lookup_dialog;

  const action_button = [
    <FlatButton
      label={<Translate value={'buuton.cancel'} />}
      primary={true}
      onClick={() => actions.setDialog(false)}
    />,
    <FlatButton
      label={
        label_button_dialog
          ? <Translate value={label_button_dialog} />
          : 'Submit'
      }
      primary={true}
      keyboardFocused={true}
      onClick={handleClickSubmit}
    />
  ];

  if (!open_dialog) {
    return null;
  }
  return (
    <div>
      <Dialog
        title={title_dialog}
        actions={action_button}
        modal={false}
        open={open_dialog}
        onRequestClose={() => actions.setDialog(false)}
      >
        <span>
          <Translate value={'commons.notification.are_you_sure'} />
        </span>
      </Dialog>
    </div>
  );
};

LookupDialog.propTypes = {
  open_dialog: PropTypes.bool,

  title_dialog: PropTypes.string,
  label_button_dialog: PropTypes.string,

  handleClickSubmit: PropTypes.func,
  Translate: PropTypes.func.isRequired
};

export default LookupDialog;
