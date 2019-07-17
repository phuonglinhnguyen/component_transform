import React from "react";

import Draggable from "react-draggable";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/RaisedButton";

class Expand extends React.PureComponent {
  render() {
    const { is_expand, action_expandView } = this.props;
    return (
      <Draggable onStart={() => false}>
        <Paper
          style={{
            position: "absolute",
            bottom: 175,
            right: "15px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <FlatButton
            primary={true}
            title={is_expand ? "Compress" : "Expand"}
            onClick={() => {
              if (document
                .querySelector("section.with-tabs")) {
                if (is_expand) {
                  document
                    .querySelector("section.with-tabs")
                    .classList.remove("expand");
                } else {
                  document
                    .querySelector("section.with-tabs")
                    .classList.add("expand");
                }

                action_expandView(!is_expand);
              }
            }
            }
            style={{ minWidth: 48 }}
            icon={
              <i
                style={{ color: "#FFFFFF" }}
                className={is_expand ? "fa fa-compress" : "fa fa-expand"}
                aria-hidden="true"
              />
            }
          />
        </Paper>
      </Draggable>
    );
  }
}
export default Expand;
