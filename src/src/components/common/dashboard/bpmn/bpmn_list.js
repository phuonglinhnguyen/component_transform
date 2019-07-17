import React from "react";

import FloatingActionButton from "material-ui/FloatingActionButton";

import { GridList, GridTile } from "material-ui/GridList";
import BPMNItemComponent from "./bpmn_item";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";

import ContentAdd from "material-ui/svg-icons/content/add";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

const styles = {
  wrapper: {
    padding: 2
  },
  button_add: {
    zIndex: 1,
    position: "fixed",
    bottom: 46,
    right: 36
  }
};

class BPMNList extends React.Component {
  render() {
    const {
      is_pm,
      palette,

      datas,
      addItem
    } = this.props;

    const accent1Color = palette.accent1Color;
    const backgroundColor = palette.background4Color;

    return (
      <div style={styles.wrapper}>
        <FloatingActionButton
          secondary={true}
          style={styles.button_add}
          onClick={() => addItem(null, "design")}
        >
          <ContentAdd />
        </FloatingActionButton>

        <GridList cols={3} cellHeight={250}>
          {datas.map((data, i) => (
            <GridTile
              key={i}
              title={data.name}
              actionPosition="right"
              actionIcon={
                data.publish_id && is_pm && (
                  <IconMenu
                    iconButtonElement={
                      <IconButton>
                        <MoreVertIcon color="#FFFFFF"/>
                      </IconButton>
                    }
                    anchorOrigin={{ horizontal: "left", vertical: "top" }}
                    targetOrigin={{ horizontal: "left", vertical: "top" }}
                    onItemClick={(event, child) => addItem(data, child.props.value)}
                  >
                    <MenuItem value="monitor" primaryText="Monitor" />
                    <MenuItem value="migration" primaryText="Migration" />
                  </IconMenu>
                )
              }
            >
              <BPMNItemComponent
                onClick={() => addItem(data, "design")}
                index={i}
                xml={data.xml}
                accent1Color={accent1Color}
                backgroundColor={backgroundColor}
              />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default BPMNList;
