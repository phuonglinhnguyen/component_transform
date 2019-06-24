import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
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
    formContent:{
      textAlign: "center"
    },
    delete:{
      background:"#c62828",
      color:"#fafafa"
    },
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
}
const ContentComponent: React.FC<IDefautProps> = props => {
  const { classes } = props;

  return (
    <React.Fragment>
      <div className={classes.content}>
        <FormLabel className={classes.titleField}>Content</FormLabel>
        <Fab size="small" color="primary" aria-label="Add">
          <AddIcon />
        </Fab>
      </div>

      <ExpansionPanel defaultExpanded className={classes.formContent}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>Content Item</Typography>
          </div>
        </ExpansionPanelSummary>
        <TextField name="convertName" label="Name" className={classes.heading} />
        <ExpansionPanelDetails className={classes.formControl}>
          <Grid container spacing={16} alignItems="flex-end">
            <Grid item sm={4}>
              <TextField name="dataKey" label="DataKey" margin="normal" />
            </Grid>
            <Grid item sm={4}>
              <TextField name="default" label="Default" margin="normal" />
            </Grid>
            <Grid item sm={4}>
              <TextField name="value" label="Value" margin="normal" />
            </Grid>
          </Grid>

          {/* <div className={classNames(classes.column, classes.helper)} /> */}
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Fab size="small" color="secondary" aria-label="Edit">
            <EditIcon />
          </Fab>
          <Fab size="small" className={classes.delete} aria-label="Delete">
            <DeleteIcon />
          </Fab>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(ContentComponent);
