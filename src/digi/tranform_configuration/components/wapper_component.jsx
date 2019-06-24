import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { TextField, Button } from "@material-ui/core";
import "font-awesome/css/font-awesome.min.css";
import { getDataTranform } from "../../../providers/faKedata/tranform_configuration";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormLabel from "@material-ui/core/FormLabel";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import AddDialog from "./Dialogs/AddDialog";
import EditDialog from "./Dialogs/EditDialog";

const styles: any = (theme: any) => {
  return {
    container: {
      width: "80%",
      maxWidth: "100%",
      height: "100%",
      maxHeight: `calc(100vh - ${theme.spacing.unit * 8}px)`,
      margin: `${theme.spacing.unit * 8}px 0px 0px 0px`,
      align: "center"
    },
    top: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: "10px"
    },
    paddingItem: {
      padding: theme.spacing.unit
    },
    table: {
      fontSize: "15px",
      color: "white",
      fontWeight: "700",
      textAlign: "center"
    },
    tableItem: {
      textAlign: "center"
    },
    titleField: {
      fontWeight: "bold",
      margin: `${theme.spacing.unit * 3}px 0px 0px 0px`,
      fontSize: "20px"
    },
    headTab: {
      background: "#212121",
      color: "#fafafa"
    },
    selectRow: {
      cursor: "pointer",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "lightgray"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing.unit * 3,
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: {
      background: "#d3d3d375",
      borderRadius: "50px",
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
  projectId?: any;
}

const WapperComponent: React.FC<IDefautProps> = props => {
  const { classes, data, projectId } = props;

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [projects, setProjects] = useState(() => {
    return getDataTranform();
  });

  console.log("projects :", projects);
  console.log("filter:", projects.filter);
  // const handleGetData = () => {
  //   console.log("projectId: ", projectId);
  //   console.log("data: ", data);
  //   getDataTranform(data, projectId);
  // };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.top}>
          <FormLabel className={classes.titleField}>
            Tranform Configuration
          </FormLabel>
          <div className={classes.top}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsOpenAddModal(true)}
            >
              Add Project
            </Button>
          </div>
        </div>

        <AddDialog
          isOpen={isOpenAddModal}
          setIsOpen={setIsOpenAddModal}
          projects={projects}
          setProjects={setProjects}
          selectedList={selectedProject}
          setSelectedList={setSelectedProject}
        />

        <EditDialog
          isOpen={isOpenEditModal}
          setIsOpen={setIsOpenEditModal}
          projects={projects}
          setProjects={setProjects}
          project={selectedProject}
          setProject={setSelectedProject}
          selectedList={selectedProject}
          setSelectedList={setSelectedProject}
        />

        <Table>
          <TableHead className={classes.headTab}>
            <TableRow>
              <TableCell className={classes.table}>Project Name</TableCell>
              <TableCell className={classes.table} align="right">
                Cron Trigger
              </TableCell>
              <TableCell className={classes.table} align="right">
                Version
              </TableCell>
              <TableCell className={classes.table} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map(project => (
              <TableRow
                key={project.name}
                className={classes.selectRow}
                onClick={() => {
                  setSelectedProject(project);
                  setIsOpenEditModal(true);
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableItem}
                >
                  {project.name}
                </TableCell>
                <TableCell align="right" className={classes.tableItem}>
                  {project.cron_trigger}
                </TableCell>
                <TableCell align="right" className={classes.tableItem}>
                  {project.version}
                </TableCell>
                <TableCell align="right" className={classes.tableItem}>
                  <span className="edit_transform">
                    <i className="fa fa-trash items" aria-hidden="true" />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(WapperComponent);
