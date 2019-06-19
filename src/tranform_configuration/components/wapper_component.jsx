import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
// import InputComponent from "./input_component";
import "font-awesome/css/font-awesome.min.css";
import { getDataTranform } from "../../../providers/faKedata/tranform_configuration";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import AddDialog from "./Dialogs/AddDialog";
import EditDialog from "./Dialogs/EditDialog";

const styles: any = (theme: any) => {
  return {
    container: {
      width: "100vw",
      maxWidth: "100%",
      height: "100%",
      maxHeight: `calc(100vh - ${theme.spacing.unit * 8}px)`,
      margin: `${theme.spacing.unit * 8}px 0px 0px 0px`,
      align: "center"
    },
    paddingItem: {
      padding: theme.spacing.unit
    },
    table: {
      minWidth: 650
    },
    selectRow: {
      cursor: "pointer",
      transition: "background 0.1s ease-in",
      "&:hover": {
        background: "lightgray"
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
  console.log("filter:",projects.filter);
  const handleGetData = () => {
    console.log("projectId: ", projectId);
    console.log("data: ", data);
    getDataTranform(data, projectId);
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setIsOpenAddModal(true)}
        >
          Add Project
        </Button>

        <AddDialog
          isOpen={isOpenAddModal}
          setIsOpen={setIsOpenAddModal}
          projects={projects}
          setProjects={setProjects}
        />

        <EditDialog
          isOpen={isOpenEditModal}
          setIsOpen={setIsOpenEditModal}
          projects={projects}
          setProjects={setProjects}
          project={selectedProject}
          setProject={setSelectedProject}
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell align="right">Cron Trigger</TableCell>
              <TableCell align="right">Version</TableCell>
              <TableCell align="right">Actions</TableCell>
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
                <TableCell component="th" scope="row">
                  {project.name}
                </TableCell>
                <TableCell align="right">{project.cron_trigger}</TableCell>
                <TableCell align="right">{project.version}</TableCell>
                <TableCell align="right">
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
