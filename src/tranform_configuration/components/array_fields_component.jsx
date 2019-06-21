import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, FormLabel, FormControlLabel } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ContentComponent from "./content_component";

import AceEditor from "react-ace";

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
    },
    formControl: {
      display: "inherit",
      margin: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3
    },
    formCommon: {
      margin: `0px ${theme.spacing.unit * 3}px 0px ${theme.spacing.unit * 3}px`
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
            <Typography className={classes.heading}>Rules</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.formCommon}>
          <TextField
            name="convertNumber"
            label="Convert Number"
            margin="normal"
          />
         <AceEditor
          editorProps={{ $blockScrolling: 'Infinity' }}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          fontSize={16}
          height="250px"
          highlightActiveLine={true}
          mode="javascript"
          name={'expression'}
          // onChange={newValue => this.handleModify('expression', newValue)}
          showGutter={true}
          showPrintMargin={false}
          theme="solarized_dark"
          // value={data.expression || ''}
          width="100%"
        />
        </ExpansionPanelDetails>
        <ExpansionPanelDetails className={classes.formControl}>
          <ContentComponent />
          <ContentComponent />
          <ContentComponent />
          <ContentComponent />
          <ContentComponent />
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
            aria-label="Delete"
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
