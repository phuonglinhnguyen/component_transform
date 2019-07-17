import React from "react";

import Draggable from "react-draggable";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";

class History extends React.PureComponent {
  render() {
    const { action_openHistories } = this.props;

    return (
      <Draggable onStart={() => false}>
        <Paper
          style={{
            position: "absolute",
            bottom: 215,
            right: "15px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <FlatButton
            title="Versions"
            onClick={action_openHistories}
            style={{ minWidth: 48 }}
            icon={<i className="fa fa-history" aria-hidden="true" />}
          />
        </Paper>
      </Draggable>
    );
  }
}
export default History;
