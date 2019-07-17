import React from "react";

import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";

import Draggable from "react-draggable";

import IconCenterFocusStrong from "material-ui/svg-icons/image/center-focus-strong";
import IconZoomIn from "material-ui/svg-icons/action/zoom-in";
import IconZoomOut from "material-ui/svg-icons/action/zoom-out";

class Zoom extends React.PureComponent {
  render() {
    return (
      <Draggable onStart={() => false}>
        <Paper
          style={{
            position: "absolute",
            bottom: "25px",
            right: "15px",
            display: "flex",
            zIndex: 0,
            flexDirection: "column"
          }}
        >
          <IconButton tooltipPosition="top-left" tooltip="Reset Zoom" onClick={this.props.resetZoom}>
            <IconCenterFocusStrong />
          </IconButton>
          <Divider />
          <IconButton tooltipPosition="top-left" tooltip="Zoom Out"
            onClick={() => {
              this.props.onZoom(/*is_zoom_out*/ true);
            }}
          >
            <IconZoomOut />
          </IconButton>
          <IconButton tooltipPosition="top-left" tooltip="Zoom In"
            onClick={() => {
              this.props.onZoom(/*is_zoom_in*/ false);
            }}
          >
            <IconZoomIn />
          </IconButton>
        </Paper>
      </Draggable>
    );
  }
}
export default Zoom;
