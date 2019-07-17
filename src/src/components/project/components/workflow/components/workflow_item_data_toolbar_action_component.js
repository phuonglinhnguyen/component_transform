import React from "react";

import MenuItem from "material-ui/MenuItem";
import DropDownMenu from "material-ui/DropDownMenu";

const items = [
  <MenuItem key={1} value="migration" primaryText="Migration" />,
  <MenuItem key={2} value="monitor" primaryText="Monitor" />
];

class WorkflowItemDataButton extends React.PureComponent {
  constructor(props) {
    super(props);
    const params = this.props.match.url.split("/");

    this.state = {
      value: params[params.length - 1]
    };
  }

  handleChange = (event, index, value) => {
    const { projectid, workflow_id } = this.props.match.params;
    this.props.history.push(
      `/projects/${projectid}/workflow/${workflow_id}/${value}`
    );
  };

  render() {
    const { is_pm, is_publish, primary1Color } = this.props;

    return (
      <DropDownMenu
        style={{ width: 250 }}
        listStyle={{ width: 250 }}
        underlineStyle={{ borderColor: primary1Color }}
        iconStyle={{ fill: primary1Color }}
        labelStyle={{ color: primary1Color }}
        value={this.state.value}
        onChange={this.handleChange}
      >
        <MenuItem key={0} value="design" primaryText="Design" />
        {is_publish && is_pm && items}
      </DropDownMenu>
    );
  }
}

export default WorkflowItemDataButton;
