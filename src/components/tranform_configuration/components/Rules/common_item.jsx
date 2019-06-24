import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";

const styles: any = (theme: any) => {
  return {
    formControl: {
      display: "inherit",
      margin: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3
    },
    column: {
      flexBasis: "33.33%"
    },
    formCommon: {
      margin: `0px ${theme.spacing.unit * 3}px 0px ${theme.spacing.unit * 3}px`
    },
    titleField: {
      fontWeight: "bold"
    },
    common: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    },
    delete: {
      background: "#c62828",
      color: "#fafafa"
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
  editCommon?: any;
  setEditCommon?: any;
}

const Common: React.FC<IDefautProps> = props => {
  const { classes, editCommon, setEditCommon } = props;
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <React.Fragment>
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>General settings</Typography>
          <Typography className={classes.secondaryHeading}>
            I am an expansion panel
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Fab
            size="small"
            color="secondary"
            aria-label="Edit"
            onclick={() => {
              // setEditCommon()
            }}
          >
            <EditIcon />
          </Fab>
          <Fab size="small" aria-label="Delete" className={classes.delete}>
            <DeleteIcon />
          </Fab>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Personal data</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Fab size="small" color="secondary" aria-label="Edit">
            <EditIcon />
          </Fab>
          <Fab size="small" aria-label="Delete" className={classes.delete}>
            <DeleteIcon />
          </Fab>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Common);
