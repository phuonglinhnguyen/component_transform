import React, { Component } from "react";
import { GridList, GridTile } from "material-ui/GridList";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import Subheader from "material-ui/Subheader";
var Papa = require("papaparse");

class UploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,

      errorText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.onImportFile = this.onImportFile.bind(this);
  }
  onImportFile() {
    const { file } = this.state;
    const { onImportDatas } = this.props;
    if (file) {
      Papa.parse(file, {
        header: false,
        dynamicTyping: false,
        complete: function(results) {
          var datas = [];

          if (results.data.length > 1) {
            for (let i = 1; i < results.data.length; i++) {
              const data = results.data[i];
              if (data[0] && data[1]) {
                try {
                  datas.push({
                    batch_name: data[0],
                    priority: data[1]
                  });
                } catch (error) {}
              }
            }
          }

          onImportDatas(datas);
        }
      });
      this.inputFile.value = "";
      this.setState({ file: null });
    }
  }

  handleChange = event => {
    var file = event.target.files[0];
    if (file) {
      const { name, type } = file;
      if (name.endsWith(".csv") && type === "text/csv") {
        this.setState({
          file: file,
          datas: [],
          errorText: ""
        });
      } else {
        this.setState({
          file: null,

          errorText: "Only accept csv file!!!"
        });
      }
    }
  };

  render() {
    return (
      <GridList cols={5} cellHeight="auto">
        <GridTile>
          <div>
            <RaisedButton
              labelStyle={{ paddingLeft: "4px" }}
              label="Choose CSV file"
              labelPosition="before"
              primary={true}
            >
              <input
                style={{
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0
                }}
                ref={node => (this.inputFile = node)}
                type="file"
                accept=".csv"
                onChange={this.handleChange}
              />
            </RaisedButton>

            <h3 style={{ color: "red" }}>{this.state.errorText}</h3>
          </div>
        </GridTile>
        <GridTile>
          {this.state.file !== null ? (
            <Subheader style={{ lineHeight: "36px" }}>
              {this.state.file.name}
            </Subheader>
          ) : (
            <div />
          )}
        </GridTile>
        <GridTile>
          <FlatButton
            label="Save"
            primary={true}
            onClick={this.onImportFile}
            disabled={this.state.file === null}
          />
        </GridTile>
      </GridList>
    );
  }
}
export default UploadScreen;
