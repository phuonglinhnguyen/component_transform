import React from "react";

import { ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Popover from "material-ui/Popover";
import ListLazy from "react-virtualized/dist/commonjs/List";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import Moment from "moment";

class DialogMain extends React.PureComponent {
  render() {
    const { data, show_item, actions } = this.props;
    const { channel, title, content } = data || { channel: "", title: "", content: "" };
    return (
      <Dialog
        title={`${channel === "system" ? "SYSTEM" : "PROJECT"} - ${title}`}
        style={{ paddingTop: "0px", zIndex: 2001 }}
        repositionOnUpdate={false}
        overlayStyle={{ zIndex: 1 }}
        actions={[
          <FlatButton
            label="Cancel"
            primary={true}
            onClick={actions.hideItem}
          />
        ]}
        autoScrollBodyContent={true}
        autoDetectWindowHeight={false}
        modal={false}
        open={show_item}
        onRequestClose={actions.hideItem}
      >
        <p style={{ whiteSpace: "pre-line" }}>{content}</p>
      </Dialog>
    );
  }
}

export default DialogMain;
