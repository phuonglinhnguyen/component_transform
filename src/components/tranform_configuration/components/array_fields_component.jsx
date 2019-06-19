import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import classNames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
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
    details: {
      alignItems: "center"
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
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
}
const ArrayFieldComponent: React.FC<IDefautProps> = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>Common</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Content
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <Button variant="outlined" color="primary">
              Convert
            </Button>
          </div>
          <div className={classes.column}>
            <TextField
              name="dataKey"
              label="DataKey"
              margin="normal"
            />
            <TextField
              name="dataKey"
              label="DataKey"
              margin="normal"
            />
            <TextField
              name="dataKey"
              label="DataKey"
              margin="normal"
            />
          </div>
          {/* <div className={classNames(classes.column, classes.helper)} /> */}
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Fab
            size="small"
            color="primary"
            aria-label="Add"
            className={classes.margin}
          >
            <AddIcon />
          </Fab>
          <Fab
            size="small"
            color="secondary"
            aria-label="Add"
            className={classes.margin}
          >
            <DeleteIcon />
          </Fab>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(ArrayFieldComponent);
