import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { isEqual } from 'lodash'

const initState = {
  data: {
    index: -1,
    name: "",
    value: "",
    type: ""
  },
  isError: null
}

export default class ExportTypeDialog extends React.Component {
  state = initState

  componentWillReceiveProps = (nextProps) => {
    if (!isEqual(this.state.data, nextProps.datas)) {
      this.setState({
        data: nextProps.datas
      })
    }
  }
  
  handleClose = () => () => {
    this.props.onSubmit()
    this.setState({ initState });
  };

  handleSubmit = () => () => {
    this.props.onSubmit(this.state.data)
    this.setState({ initState });
  };

  handleChange = (event) => {
    const { data, isError } = this.state;
    data[event.target.name] = event.target.value
    // let err = false;
    // if (data.name.length <= 0 || data.value.length <= 0) {
    //   err = true
    // }
    this.setState({
      data,
      // isError: err
    })
  }

  render() {

    const { open, title, onSubmit, multiLine, datas } = this.props;
    const { data, isError } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose()}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        // disabled={isError}
        onClick={this.handleSubmit()}
      />,
    ];
    return (
      <div>
        <Dialog
          title={(title && title) || "Dialog With Actions"}
          actions={actions}
          modal={true}
          open={open}
        >
          <TextField
            floatingLabelText={
              "Name"
            }
            // errorText={isError ? "This field is not empty!" : ""}
            multiLine={multiLine}
            name={"name"}
            onChange={event =>
              this.handleChange(event)
            }
            rows={multiLine ? 2 : 1}
            rowsMax={4}
            value={data.name}
          />

          <TextField
            floatingLabelText={
              "Value"
            }
            multiLine={multiLine}
            // errorText={isError ? "This field is not empty!" : ""}
            name={"value"}
            onChange={event =>
              this.handleChange(event)
            }
            rows={multiLine ? 2 : 1}
            rowsMax={4}
            value={data.value}
          />
        </Dialog>
      </div>
    );
  }
}
