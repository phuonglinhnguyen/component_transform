import React from "react";

import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn
} from "material-ui/Table";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class WorkflowItemMigrationTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, row_index, source_activity_id, value) {
    this.props.action_changeTargetActivity(row_index, value);
    const node = this.refs[`row_${source_activity_id}`];
    setTimeout(function() {
      node.onRowClick(event);
    }, 0);
  }

  onCellClick(row_index) {
    this.props.action_focusElement(row_index);
  }

  render() {
    const { instructions, targetActivityIds } = this.props;

    const items = [];
    for (var i = 0; i < targetActivityIds.length; i++) {
      var element = targetActivityIds[i];
      items.push(
        <MenuItem key={i} value={element.key} primaryText={element.name} />
      );
    }

    return (
      <div
        className="cool_scroll"
        style={{
          margin: "10px 24px 0px 24px",
          height: "calc(50% - 20px)",
          overflow: "auto"
        }}
      >
        <Table
          selectable={true}
          fixedHeader={true}
          multiSelectable={false}
          onCellClick={this.onCellClick.bind(this)}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>Source Activity</TableHeaderColumn>
              <TableHeaderColumn>Target Activity</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={true} displayRowCheckbox={false}>
            {instructions.map((data, row_index) => (
              <TableRow
                key={data.sourceActivityIds[0]}
                ref={`row_${data.sourceActivityIds[0]}`}
              >
                <TableRowColumn>{data.sourceActivityName}</TableRowColumn>
                <TableRowColumn>
                  <SelectField
                    value={data.targetActivityIds[0]}
                    onChange={(event, index, value) => {
                      this.handleChange(
                        event,
                        row_index,
                        data.sourceActivityIds[0],
                        value
                      );
                    }}
                    fullWidth={true}
                    floatingLabelStyle={{ color: "red" }}
                  >
                    {items}
                  </SelectField>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default WorkflowItemMigrationTable;
