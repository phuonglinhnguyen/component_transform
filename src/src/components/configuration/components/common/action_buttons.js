import React from "react";

import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { Toolbar, ToolbarTitle, ToolbarGroup } from "material-ui/Toolbar";

class ActionButtons extends React.PureComponent {
  render() {
    const {
      is_error,
      edit_label,
      delete_label,
      render_delete_button,
      ajax_call_ajax,

      saveData,
      deleteData
    } = this.props;

    if (ajax_call_ajax.is_calling) {
      return (
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={ajax_call_ajax.action_type} />
          </ToolbarGroup>
        </Toolbar>
      );
    }

    return (
      <Toolbar>
        {!is_error && (
          <ToolbarGroup firstChild={true}>
            <RaisedButton
              onClick={saveData}
              label={edit_label}
              primary={true}
            />
            {render_delete_button && (
              <FlatButton onClick={deleteData} label={delete_label} />
            )}
          </ToolbarGroup>
        )}
      </Toolbar>
    );
  }
}

export default ActionButtons;
