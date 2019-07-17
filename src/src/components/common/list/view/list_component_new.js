import React, { PureComponent } from "react";

import List from "react-virtualized/dist/commonjs/List";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import ArrowDownwardIcon from "material-ui/svg-icons/navigation/arrow-downward";
import ArrowUpwardIcon from "material-ui/svg-icons/navigation/arrow-upward";

import { Translate } from "react-redux-i18n";
import _ from "lodash";
import clone from "clone";

class ListTable extends PureComponent {
  constructor(props) {
    super(props);

    this.getRowHeight = this.getRowHeight.bind(this);
    this.sortByField = this.sortByField.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);

    this.state = {
      datas: props.datas,
      results: null,
      columns: props.columns
    };
  }

  filter(results) {
    this.setState({ results });
  }

  sortFieldString(a, b, desc) {
    if (!a) {
      a = "";
    }
    if (!b) {
      b = "";
    }
    return a.localeCompare(b) * (desc ? -1 : 1);
  }

  sortFieldNumber(a, b, desc) {
    const a1 = parseInt(a);
    const b2 = parseInt(b);
    return (a - b) * (desc ? -1 : 1);
  }

  sortByField(name) {
    let { datas, results, columns } = this.state;

    let sort;
    for (let index = 0; index < columns.length; index++) {
      const column = columns[index];
      if (column.name === name) {
        sort = column;
        sort.desc = !sort.desc;
        sort.is_sort = true;
      } else {
        column.is_sort = false;
      }
    }

    if (sort.number) {
      if (results) {
        results.sort((a, b) =>
          this.sortFieldNumber(a[name], b[name], sort.desc)
        );
      }
      datas.sort((a, b) => this.sortFieldNumber(a[name], b[name], sort.desc));
    } else {
      if (results) {
        results.sort((a, b) =>
          this.sortFieldString(a[name], b[name], sort.desc)
        );
      }
      datas.sort((a, b) => this.sortFieldString(a[name], b[name], sort.desc));
    }

    this.setState({ datas, results, columns: clone(columns) });
    this.updateTable();
  }

  getRowHeight({ index }) {
    return 53;
  }

  rowRenderer(options) {
    const { row_index, action_onRowClick } = this.props;
    const { datas, results, columns } = this.state;
    const datas_ = results || datas;

    const { list } = this;
    const { key, index, style } = options;
    const data = datas_[index];

    return (
      <div
        onClick={() => {
          if (action_onRowClick) {
            action_onRowClick(data, index);
          }
        }}
        key={key}
        style={style}
        className={`${index === row_index ? "active" : ""} ${
          index % 2 ? "odd" : "even"
        }`}
      >
        <div className={`row-data`}>
          {columns.map((column, cell_index) => {
            if (column.render) {
              const d = column.render(data, list, index);
              return (
                <div
                  key={cell_index}
                  style={column.style}
                  title={column.title || d  + " "}
                  className={`cell ${column.className}`}
                >
                  {d}
                </div>
              );
            }

            return (
              <div
                key={cell_index}
                style={column.style}
                title={data[column.name]}
                className={`cell ${column.className}`}
              >
                {data[column.name] + " "}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  componentWillUpdate(nextProps) {
    if (nextProps.row_index !== this.props.row_index) {
      this.updateTable();
    }
  }

  updateTable() {
    const { list } = this;
    list.recomputeRowHeights();
    list.forceUpdate();
  }

  render() {
    const {
      width,
      is_hide_header,
      rowRenderer,
      rowHeight,

      action_sort
    } = this.props;
    const { results, datas, columns } = this.state;

    const datas_ = results || datas;

    return (
      <div className="table-inline " style={{ width: width }}>
        {!is_hide_header && (
          <div className="row-header">
            {columns.map((column, index) => (
              <div
                onClick={() => this.sortByField(column.name)}
                key={index}
                title={column.title}
                style={column.style}
                className={`cell ${column.className} ${
                  column.is_sort ? "sort" : ""
                }`}
              >
                {column.is_sort && (
                  <div style={{ display: "inline" }}>
                    {column.desc ? (
                      <ArrowDownwardIcon
                        style={{
                          height: 15,
                          width: 15,
                          paddingRight: 5
                        }}
                      />
                    ) : (
                      <ArrowUpwardIcon
                        style={{
                          height: 15,
                          width: 15,
                          paddingRight: 5
                        }}
                      />
                    )}
                  </div>
                )}
                {column.label}
              </div>
            ))}
          </div>
        )}
        {!rowRenderer && (
          <AutoSizer>
            {({ height, width }) => (
              <List
                className="body cool_scroll"
                ref={ref => (this.list = ref)}
                width={width}
                height={!is_hide_header ? height - 53 : height}
                rowCount={datas_.length}
                rowHeight={rowHeight ? rowHeight : this.getRowHeight}
                rowRenderer={this.rowRenderer}
              />
            )}
          </AutoSizer>
        )}
        {rowRenderer && (
          <AutoSizer>
            {({ height, width }) => (
              <List
                className="body cool_scroll"
                ref={ref => (this.list = ref)}
                width={width}
                height={!is_hide_header ? height - 53 : height}
                rowCount={datas_.length}
                rowHeight={({ index }) => rowHeight(datas_[index])}
                rowRenderer={options => {
                  const { key, index, style } = options;
                  const data = datas_[index];

                  return rowRenderer(key, index, style, data);
                }}
              />
            )}
          </AutoSizer>
        )}
      </div>
    );
  }
}

export default ListTable;
