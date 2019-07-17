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
    const { channel, title, content, created_date, project_name } = data || {
      channel: "",
      title: "",
      content: "",
      created_date: "",
      project_name: ""
    };
    return (
      <Dialog
        title={`${channel === "system" ? "SYSTEM" : project_name}`}
        style={{ paddingTop: "0px", zIndex: 2001 }}
        repositionOnUpdate={false}
        overlayStyle={{ zIndex: 1 }}
        actions={[
          <FlatButton
            label="close"
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
        <h3>
          {title}
          <span
            style={{
              fontSize: 15,
              fontWeight: 400,
              paddingLeft: 20
            }}
          >
            {Moment(created_date).format("MM/DD HH:mm")}
          </span>
        </h3>
        <p style={{ whiteSpace: "pre-line" }}>{content}</p>
      </Dialog>
    );
  }
}

export default DialogMain;
