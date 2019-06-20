import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
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

const styles: any = (theme: any) => {
  return {
    root: {
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15)
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    },
    icon: {
      verticalAlign: "bottom",
      height: 20,
      width: 20
    },
    column: {
      flexBasis: "33.33%"
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline"
      }
    },
    formControl: {
      boxShadow: "-4px 3px 33px -10px rgba(0,0,0,0.75)",
      margin: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3
    }
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
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>Content </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.formControl}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <TextField name="dataKey" label="DataKey" margin="normal" />
            </Grid>
            <Grid item>
              <TextField name="default" label="Default" margin="normal" />
            </Grid>
            <Grid item>
              <TextField name="value" label="Value" margin="normal" />
            </Grid>
          </Grid>

          {/* <div className={classNames(classes.column, classes.helper)} /> */}
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Fab size="small" color="primary" aria-label="Add">
            <AddIcon />
          </Fab>
          <Fab size="small" color="secondary" aria-label="Delete">
            <DeleteIcon />
          </Fab>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(ContentComponent);
