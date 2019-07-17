import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import { Translate } from "react-redux-i18n";

class WorkflowItemDialog extends React.PureComponent {
    render() {
    const {
      show_confirm,
      message_confirm,
      action_type,
      hideConfirm,
      action_execute
    } = this.props;

    if (!show_confirm) {
      return null;
    }

    return (
      <Dialog
        contentStyle={{ width: 350 }}
        actions={[
          <FlatButton
            label={<Translate value={`commons.actions.${action_type}`} />}
            onClick={action_execute}
            primary={true}
          />,
          <FlatButton
            label={<Translate value={"commons.actions.cancel"} />}
            onClick={hideConfirm}
          />
        ]}
        modal={false}
        open={show_confirm}
        onRequestClose={hideConfirm}
      >
        {message_confirm && <Translate value={message_confirm} />}
      </Dialog>
    );
  }
}
export default WorkflowItemDialog;
