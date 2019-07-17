import React from "react";

import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

import { Translate } from "react-redux-i18n";

class WorkflowMonitorView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null
    };

    this.moveTo = this.moveTo.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  moveTo(event, menuItem, index) {
    this.setState({
      open: false
    });

    this.props.action_moveTo(menuItem.props.value);
  }

  handleClick = event => {
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
    const { task, tasks } = this.props;
    const { open, anchorEl } = this.state;
    return (
      <div>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          targetOrigin={{ horizontal: "left", vertical: "top" }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu onItemClick={this.moveTo}>
            {tasks.map((v, i) => {
              if (!v.name || task.id === v.id) {
                return null;
              }
              return (
                <MenuItem
                  key={i}
                  value={v.id}
                  primaryText={v.name}
                  rightIcon={
                    <div
                      style={{ fontSize: 32, top: -10 }}
                      className={`entry ${v.icon}`}
                    />
                  }
                />
              );
            })}
          </Menu>
        </Popover>
        <RaisedButton
          secondary={true}
          onClick={this.handleClick}
          label={<Translate value="projects.workflow.move_to" />}
        />
      </div>
    );
  }
}

export default WorkflowMonitorView;
