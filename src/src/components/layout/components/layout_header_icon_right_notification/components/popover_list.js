import React from "react";

import { ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Popover from "material-ui/Popover";
import ListLazy from "react-virtualized/dist/commonjs/List";
import TextField from "material-ui/TextField";

import Moment from "moment";

import * as global_constants from "../../../../../constants";

let timeoutId = 0;
class PopoverList extends React.PureComponent {
  inputSearchChange = e => {
    const { actions } = this.props;
    const value = e.target.value.toLowerCase();
    actions.inputSearchChange(value);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      actions.filterByName(value);
    }, global_constants.TIME_OUT_KEY_SEARCH);
  };

  render() {
    const {
      anchorElMain,
      textColor,
      secondaryTextColor,
      show_item,
      show_list,
      text_search,
      results,
      datas,
      actions
    } = this.props;

    const rows = results || datas;

    return (
      <Popover
        style={{
          minWidth: 400,
          height: 448
        }}
        repositionOnUpdate={false}
        open={show_list}
        animated={false}
        anchorEl={anchorElMain}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
        onRequestClose={() => {
          if (!show_item) {
            actions.hideList();
          }
        }}
      >
        <div style={{ margin: "0 15px" }}>
          <TextField
            value={text_search}
            onChange={this.inputSearchChange}
            hintText="Search"
            fullWidth={true}
          />
        </div>
        <ListLazy
          className="cool_scroll"
          width={500}
          height={400}
          rowCount={rows.length}
          rowHeight={72}
          rowRenderer={options => {
            const { key, index, style } = options;
            const data = rows[index];
            let name;
            if (data.channel !== "system") {
              name = data.project_name;
            } else {
              name = "SYSTEM";
            }

            let title = data.title;
            if (title.length > 60) {
              title = title.substring(0, 60) + "...";
            }
            return (
              <ListItem
                onClick={() => actions.showItem(data)}
                key={key}
                style={style}
                leftAvatar={
                  <Avatar className={data.level}>
                    {data.channel === "system" ? "S" : "P"}
                  </Avatar>
                }
                secondaryText={name}
                primaryText={
                  <div style={{width: "100%"}}>
                    <span
                      style={{
                        fontWeight: 500,
                        color: data.seen ? secondaryTextColor : textColor
                      }}
                    >
                      {title}
                    </span>
                    <span
                      style={{
                        color: secondaryTextColor,
                        fontSize: 15,
                        fontWeight: 400,
                        paddingLeft: 20,
                        float: "right"
                      }}
                    >
                      {Moment(data.created_date).format("MM/DD HH:mm")}
                    </span>
                  </div>
                }
              />
            );
          }}
        />
      </Popover>
    );
  }
}

export default PopoverList;
