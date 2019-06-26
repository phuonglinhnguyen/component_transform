import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";

import { TextField } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";

const styles: any = (theme: any) => {
  return {
    heading: {
      fontSize: theme.typography.pxToRem(15)
    },
    column: {
      flexBasis: "33.33%"
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    formControl: {
      boxShadow: "-4px 3px 33px -10px rgba(0,0,0,0.75)",
      margin: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3
    },
    titleField: {
      fontWeight: "bold"
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    },
    formContent: {
      textAlign: "center"
    },
    add: {
      background: "#3f51b5",
      color: "#fafafa",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "#1a237e"
      }
    },
    delete: {
      background: "#e57373",
      color: "#fafafa",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "#b71c1c"
      }
    },
    save: {
      background: "#689f38",
      color: "#fafafa",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "#1b5e20"
      }
    },
    contentItem: {
      background: "#843d8b45"
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
}
const ContentComponent: React.FC<IDefautProps> = props => {
  const {
    classes,
    contentItem,
    setContentItem,
    setMode,
    mode,
    project,
    setProject,
    content
  } = props;

  const onChangeText = e => {
    const name = e.target.name;
    const value = e.target.value;

    setContentItem({
      ...contentItem,
      [name]: value
    });
  };
  console.log("55555", content);

  const onAddContent = () => {
    if (mode === "add") {
      const newContentItem = { ...contentItem };
      console.log("newcontent:", newContentItem);

      setProject({
        ...project,
        rules: {
          ...project.rules,
          content: newContentItem
        }
      });
      setContentItem(null);
    }
  };

  // console.log("contentItem", newContentItem);

  return (
    <React.Fragment>
      <div className={classes.content}>
        <FormLabel className={classes.titleField}>Content</FormLabel>
        <Fab
          size="small"
          className={classes.add}
          aria-label="Add"
          onClick={onAddContent}
        >
          <AddIcon />
        </Fab>
      </div>
      <div>
        {/* {content.map(contentItem => {
          return ( */}
        <ExpansionPanel
          // key={contentItem.id}
          defaultExpanded
          className={classes.formContent}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.contentItem}
          >
            <div>
              {content ? (
                <Typography className={classes.heading}>
                  {content.convertName}
                </Typography>
              ) : (
                <Typography className={classes.heading}>
                  A new content
                </Typography>
              )}
            </div>
          </ExpansionPanelSummary>)
          <TextField
            name="convertName"
            label="Name"
            className={classes.heading}
            onChange={onChangeText}
          />
          <ExpansionPanelDetails className={classes.formControl}>
            <Grid container spacing={16} alignItems="flex-end">
              <Grid item sm={4}>
                <TextField
                  name="dataKey"
                  label="DataKey"
                  margin="normal"
                  onChange={onChangeText}
                  // value={contentItem}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  name="default"
                  label="Default"
                  margin="normal"
                  onChange={onChangeText}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  name="value"
                  label="Value"
                  margin="normal"
                  onChange={onChangeText}
                />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Fab
              size="small"
              className={classes.save}
              aria-label="Edit"
              onClick={onAddContent}
            >
              <SaveIcon />
            </Fab>
            <Fab size="small" className={classes.delete} aria-label="Delete">
              <DeleteIcon />
            </Fab>
          </ExpansionPanelActions>
        </ExpansionPanel>
        {/* );
        })} */}
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(ContentComponent);
