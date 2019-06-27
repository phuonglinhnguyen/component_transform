import React, { useState } from "react";
import { Translate } from "react-redux-i18n";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

import { getDataTranform } from "../../../providers/faKedata/tranform_configuration";
import { KEY_TRANSLATE } from "../../../store/actions/tranform_configuration";

import { TextField, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormLabel from "@material-ui/core/FormLabel";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TablePagination from "@material-ui/core/TablePagination";

import AddDialog from "./Dialogs/AddDialog";
import EditDialog from "./Dialogs/EditDialog";
// import Test from "./test"

const styles: any = (theme: any) => {
  return {
    container: {
      maxHeight: `calc(100vh - ${theme.spacing.unit * 8}px)`,
      margin: `${theme.spacing.unit * 8}px 0px 0px 0px`
    },
    top: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: "10px",
      marginRight: "10px"
    },
    paddingItem: {
      padding: theme.spacing.unit
    },
    table: {
      fontSize: "17px",
      color: "white",
      fontWeight: "700",
      textAlign: "center"
    },
    tableItem: {
      textAlign: "center",
      fontSize: "15px"
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
    },
    rowPerPage: {
      background: "gray"
    }
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
  projectId?: any;
}

const WapperComponent: React.FC<IDefautProps> = props => {
  const { classes } = props;

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [strSearch, setStrSearch] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [projects, setProjects] = useState(() => {
    return getDataTranform();
  });

  // const handleGetData = () => {
  //   console.log("projectId: ", projectId);
  //   console.log("data: ", data);
  //   getDataTranform(data, projectId);
  // };

  // const handlerOnChange = e => {
  //   const value = e.target.value;
  //   setStrSearch()
  // };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const deleteProject = (e, project_id) => {
    e.stopPropagation();
    const newProjects = projects.filter(
      project => project.project_id !== project_id
    ); // use ===, !==. Need to read different == and === in js
    console.log(newProjects);
    setProjects(newProjects);
  };
  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.top}>
          <FormLabel className={classes.titleField}>
            <Translate value={`${KEY_TRANSLATE}.title_wrapper`} />
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
              Add Config
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
              <TableCell className={classes.table}>Name</TableCell>
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
            {projects
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(project => (
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
                    <IconButton
                      aria-label="Delete"
                      onClick={e => {
                        deleteProject(e, project.project_id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* <Test/> */}
      </div>
      <TablePagination
        className={classes.rowPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={projects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(WapperComponent);
