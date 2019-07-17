import React from "react";

import BPMNListComponent from "./bpmn_list";
import ChipHeaderComponent from "../chip/chip_header";

import _ from "lodash";

class DashboardBPMN extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: props.datas
    };

    this.filterDatas = this.filterDatas.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(this.props.palette, nextProps.palette) ||
      !_.isEqual(this.props.datas, nextProps.datas) ||
      !_.isEqual(this.state, nextState)
    );
  }

  filterDatas(key) {
    key = key.toLowerCase();

    if (!key) {
      this.setState({
        datas: this.props.datas
      });
    }

    const { datas } = this.props;

    const results = datas.filter(data => data.name.toLowerCase().includes(key));

    this.setState({
      datas: results
    });
  }

  render() {
    let {
      is_pm,
      label_total,

      palette,

      addItem,
      migration
    } = this.props;

    let { datas } = this.state;

    return (
      <div>
        <ChipHeaderComponent
          datas_length={datas.length}
          label_total={label_total}
          filterDatas={this.filterDatas}
        />
        <BPMNListComponent
          is_pm={is_pm}
          datas={datas}
          palette={palette}
          addItem={addItem}
          migration={migration}
        />
      </div>
    );
  }
}
export default DashboardBPMN;
