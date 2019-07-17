import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { Translate } from 'react-redux-i18n';

class ConfirmDialog extends React.PureComponent {
  render() {
    let {
      open,
      title,

      actionDelete,
      hideDialog,
      body_dialog = ''
    } = this.props;

    if (!open) {
      return null;
    }

    const action_button = [
      <FlatButton
        label={<Translate value="commons.actions.delete" />}
        primary={true}
        keyboardFocused={true}
        onClick={actionDelete}
      />,
      <FlatButton
        label={<Translate value={'commons.actions.cancel'} />}
        onClick={hideDialog}
      />
    ];
    return (
      <Dialog
        open={open}
        modal={false}
        title={title}
        actions={action_button}
        onRequestClose={hideDialog}
      >
        <span>
          <Translate value={'commons.notification.are_you_sure'} />
        </span>
        {body_dialog}
      </Dialog>
    );
  }
}

export default ConfirmDialog;
