import React from "react";

import FlatButton from "material-ui/FlatButton";
import PhoneIcon from "material-ui/svg-icons/communication/phone";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Popover from "material-ui/Popover";
import CommunicationCallIcon from "material-ui/svg-icons/communication/call";
import CommunicationEmailIcon from "material-ui/svg-icons/communication/email";

import hotlines from "../../../resources/hotline";

class LayoutHeaderIconRightHotline extends React.PureComponent {
  state = {
    open: false
  };

  handleClick = event => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { accent1Color, primary1Color } = this.props;
    return (
      <div className="hotline">
        <div
          className="circle"
          style={{
            border: `2px solid ${accent1Color}`,
            backgroundColor: `${accent1Color}`
          }}
        />
        <FlatButton
          className="icon"
          icon={<PhoneIcon />}
          disableTouchRipple={true}
          secondary={true}
          onClick={this.handleClick}
          title={"Hotline"}
        />
        <Popover
          style={{ minWidth: 250 }}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          targetOrigin={{ horizontal: "left", vertical: "top" }}
          onRequestClose={this.handleRequestClose}
        >
          {hotlines.map((e, i) => (
            <div key={i}>
              <Subheader>{e.group_name}</Subheader>
              <List>
                <ListItem
                  leftIcon={<CommunicationEmailIcon color={primary1Color} />}
                  primaryText="Email"
                  secondaryText={e.email}
                />
                {e.hotline && (
                  <ListItem
                    leftIcon={<CommunicationCallIcon color={primary1Color} />}
                    primaryText="Hotline"
                    secondaryText={e.hotline}
                  />
                )}
                {e.hotline_2 && (
                  <ListItem
                    leftIcon={<CommunicationCallIcon color={primary1Color} />}
                    primaryText="Hotline"
                    secondaryText={e.hotline_2}
                  />
                )}
              </List>
            </div>
          ))}
        </Popover>
      </div>
    );
  }
}

export default LayoutHeaderIconRightHotline;
