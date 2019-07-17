import React from "react";

import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";

import NavigationClose from "material-ui/svg-icons/navigation/close";

import Draggable from "react-draggable";

class Property extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    return (
      <div>
        <Draggable onStart={() => false}>
          <Paper
            style={{
              position: "absolute",
              bottom: 255,
              right: 15,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <FlatButton
              title="Properties"
              onClick={this.handleToggle}
              style={{ minWidth: 48 }}
              icon={<i className="fa fa-cog" aria-hidden="true" />}
            />
          </Paper>
        </Draggable>

        <Drawer
          containerClassName="cool_scroll"
          width="30%"
          containerStyle={{top:64}}
          openSecondary={true}
          open={this.state.open}
        >
          <AppBar
            title="Properties"
            iconElementLeft={
              <IconButton onClick={this.handleToggle}>
                <NavigationClose />
              </IconButton>
            }
          />
          {this.props.children}
        </Drawer>
      </div>
    );
  }
}
export default Property;
