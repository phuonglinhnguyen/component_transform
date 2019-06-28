import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";

import FormLabel from "@material-ui/core/FormLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Config from "../../Models/Config";

const styles: any = (theme: any) => {
  return {
    titleField: {
      fontWeight: "bold",
      margin: `${theme.spacing.unit * 3}px 0px 0px 0px`
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
      overflowY: "auto",
      height: "300px"
    },
    selectList: {
      cursor: "pointer",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "lightgray",
      }
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
  dictionary?: any;
  setSelectedDictItem?: any;
  setMode?: any;
}
const CommonList: React.FC<IDefautProps> = props => {
  const {
    classes,
    common,
    setMode,
    setConfig,
    config,
    setSelectedCommonItem
  } = props;
  const [dense] = useState(false);

  // const deleteCommon = (e, commonName) => {
  //   e.stopPropagation();
  //   const newCommon = common.filter(
  //     common_item => common_item.commonName !== commonName
  //   );

  // };

  return (
    <React.Fragment>
      <FormLabel className={classes.titleField}>Common List</FormLabel>
      <div className={classes.demo}>
        <List dense={dense}>
          {common.map(common_item => {
            return (
              <ListItem
                key={common_item.id}
                className={classes.selectList}
                onClick={() => {
                  setSelectedCommonItem(common_item);
                  // setMode("edit");
                }}
              >
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary={common_item.commonName}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Delete"
                    // onClick={e => {
                    //   deleteDict(e, common_item.commonName);
                    // }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
             ); 
           })}
        </List>
      </div>
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(CommonList);
