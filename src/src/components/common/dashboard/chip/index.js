import React from "react";

import ChipList from "./chip_list";
import ChipHeader from "./chip_header";

import _ from "lodash";

class DashboardChip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: props.datas
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(this.props.muiTheme.palette, nextProps.muiTheme.palette) ||
      !_.isEqual(this.props.datas, nextProps.datas) ||
      !_.isEqual(this.state, nextState)
    );
  }

  handleAdd() {
    const { addItem } = this.props;
    if (addItem) {
      addItem(this.state.nameData);

      this.setState({ nameData: "" });
    }
  }

  filterDatas(key) {
    key = key.toLowerCase();

    if (!key) {
      this.setState({
        datas: this.props.datas
      });
    }

    const { key_value } = this.props;
    const { datas } = this.state;

    const results = datas.filter(data =>
      data[key_value].toLowerCase().includes(key)
    );

    this.setState({
      datas: results
    });
  }

  render() {
    let {
      key_value,
      label_total,
      getIcon,
      addItem,
      import_export = false,
    } = this.props;

    let { datas = [] } = this.state;

    return (
      <div >
        <ChipHeader
          datas_length={datas.length}
          label_total={label_total}
          filterDatas={this.filterDatas.bind(this)}
        />
        <ChipList
          getIcon={getIcon}
          key_value={key_value}
          datas={datas}
          addItem={addItem}
          import_export={import_export}
        />
      </div>
    );
  }
}
export default DashboardChip;
