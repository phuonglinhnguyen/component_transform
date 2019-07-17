import React, { Component } from "react";
import clone from "clone";
import PropTypes from "prop-types";
import { Card, CardText, CardTitle, CardActions } from "material-ui/Card";
import UploadFile from "./import_batch_component";

import NavigationExpandMore from "material-ui/svg-icons/navigation/expand-more";
import NavigationExpandLess from "material-ui/svg-icons/navigation/expand-less";
import TextField from "material-ui/TextField";

import FlatButton from "material-ui/FlatButton";
import { GridList, GridTile } from "material-ui/GridList";

import _ from "lodash";

import ListTableComponent from "../../../../common/list/view/list_component_new";
let timeoutId = 0;
class BatchPriorityComponent extends Component {
  constructor(props) {
    super(props);
    this.onImportDatas = this.onImportDatas.bind(this);
    this.inputSearchChange = this.inputSearchChange.bind(this);
    this.renderSubtitle = this.renderSubtitle.bind(this);
    this.state = {
      expanded: false
    };
  }

  componentDidMount() {
    const project_id = this.props.match.params.projectid;

    this.props.actions.getProjectById(project_id);
  }

  onImportDatas(datas) {
    var { project } = this.props.project_item;

    project.batch_prioritys = datas;

    this.props.actions.updateProject({ batch_prioritys: datas }, project.id);
  }
  renderSubtitle(batch_prioritys, arr, str) {
    var text =
      batch_prioritys.length > 0
        ? `${batch_prioritys.length} high priority batches :${str}`
        : "No high priority batches.";
    return (
      <GridList cellHeight="auto">
        <GridTile>
          <CardText style={{ paddingLeft: "2px" }}>{text}</CardText>
        </GridTile>
        <GridTile>
          {batch_prioritys.length > arr.length ? (
            <FlatButton
              style={{ marginTop: "5px" }}
              primary={true}
              label="More"
              onClick={this.handleExpand}
              icon={
                this.state.expanded ? (
                  <NavigationExpandLess />
                ) : (
                  <NavigationExpandMore />
                )
              }
            />
          ) : (
            <div />
          )}
        </GridTile>
      </GridList>
    );
  }

  handleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  inputSearchChange(e) {
    const { batch_prioritys } = this.props.project_item.project;
    const { filter } = this;
    const _this = this;
    const table = this.refs.table;
    this.setState({ text_search: e.target.value || "" });

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      if (!_this.state.text_search) {
        table.filter(null);
      } else {
        const r = [];
        batch_prioritys.forEach(b => {
          if (b.batch_name.includes(_this.state.text_search)) {
            r.push(clone(b));
          }
        });
        table.filter(r);
      }
    }, 300);
  }

  render() {
    var { text_search } = this.state;

    let batch_prioritys;
    try {
      batch_prioritys = _.orderBy(
        this.props.project_item.project.batch_prioritys,
        ["priority"],
        ["desc"]
      );
    } catch (error) {
      batch_prioritys = [];
    }
    
    var arr =
      batch_prioritys.length > 5
        ? batch_prioritys.slice(0, 5)
        : [...batch_prioritys];
    var str = arr.reduce(
      (prevVal, elem) => `${prevVal} ${elem.batch_name || ""} ,`,
      ""
    );

    str = str.substr(0, str.length - 1);
    var arrExpand =
      batch_prioritys.length > 5
        ? batch_prioritys.slice(5, batch_prioritys.length)
        : [];
    var strExpand = arrExpand.reduce(
      (prevVal, elem) => `${prevVal} ${elem} ,`,
      ""
    );
    strExpand = strExpand.substr(0, strExpand.length - 1);

    return (
      <Card>
        <CardTitle
          actAsExpander={true}
          showExpandableButton={false}
          title="High priority batches"
        />
        <CardText
          style={{ wordBreak: "break-all", marginTop: "-35px" }}
          expandable={false}
        >
          <TextField
            floatingLabelFixed={true}
            floatingLabelText={"Batch Name"}
            fullWidth={true}
            id="text_search"
            name="text_search"
            value={text_search}
            onChange={this.inputSearchChange}
          />
          {batch_prioritys &&
            batch_prioritys.length > 0 && (
              <div style={{ height: 350 }}>
                <ListTableComponent
                  ref="table"
                  width={"100%"}
                  datas={batch_prioritys}
                  columns={[
                    {
                      name: "batch_name",
                      label: "Batch name",
                      style: { width: "50%" }
                    },
                    {
                      name: "priority",
                      label: "Priority",
                      style: { width: "50%" }
                    }
                  ]}
                  rowHeight={60}
                />
              </div>
            )}
        </CardText>
        <CardActions>
          <UploadFile onImportDatas={this.onImportDatas} />
        </CardActions>
      </Card>
    );
  }
}


export default BatchPriorityComponent;
