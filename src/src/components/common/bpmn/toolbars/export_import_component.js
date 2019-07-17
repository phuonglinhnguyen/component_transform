import React from "react";

import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";

import IconImage from "material-ui/svg-icons/image/image";

import Draggable from "react-draggable";

const styles = {
  uploadButton: {
    verticalAlign: "middle",
    minWidth: 44
  },
  uploadInput: {
    cursor: "pointer",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    opacity: 0
  }
};

class ExportImport extends React.PureComponent {
  render() {
    return (
      <Draggable onStart={() => false}>
        <div
          style={{
            position: "absolute",
            bottom: "25px",
            left: "20px",
            zIndex: 0,
            display: "flex",
            width: this.props.onUpload ? 136 : 94,
            justifyContent: "space-between"
          }}
        >
          <Paper>
            {this.props.onUpload && (
              <FlatButton
                icon={<i className="fa fa-upload" aria-hidden="true" />}
                title="Open BPMN diagram from local file system"
                style={styles.uploadButton}
              >
                <input
                  ref="file"
                  onChange={this.props.onUpload}
                  type="file"
                  accept=".bpmn"
                  style={styles.uploadInput}
                />
              </FlatButton>
            )}
            <FlatButton
              onClick={this.props.downloadXML}
              style={{ minWidth: 44 }}
              icon={<i className="fa fa-download" aria-hidden="true" />}
              title="Dowload BPMN diagram"
            />
          </Paper>
          <Paper>
            <FlatButton
              onClick={this.props.downloadPDF}
              style={{ minWidth: 44 }}
              icon={<IconImage />}
              title="Dowload PDF"
            />
          </Paper>
        </div>
      </Draggable>
    );
  }
}
export default ExportImport;
