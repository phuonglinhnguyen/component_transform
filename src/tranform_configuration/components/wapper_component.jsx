import React, { useState } from "react";
import { Translate } from "react-redux-i18n";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import { AutoSizer, Column } from 'react-virtualized';
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

import { KEY_TRANSLATE } from "../../../store/actions/tranform_configuration";

import { Button } from "@material-ui/core";
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
import CircularProgress from '@material-ui/core/CircularProgress';

import AddDialog from "./Dialogs/AddDialog";
import EditDialog from "./Dialogs/EditDialog";

const styles: any = (theme: any) => {
  return {
    container: {
      maxHeight: `calc(100vh - ${theme.spacing.unit * 8}px)`,
      margin: `${theme.spacing.unit * 8}px 0px 0px 0px`,
      height: "880px"
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
    tableConfig: {
      height: "200px",
      overflowY: "scroll"
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
    },
    iconProgress: {
      position: "absolute",
      padding: `${theme.spacing.unit}px`,
      color: theme.palette.primary.contrastText,
      top: '0px',
      right: "0px"
    },
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    tableRow: {
      cursor: 'pointer',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: 'initial',
    },
  };
};

export interface IDefautProps {
  classes?: any;
  theme?: any;
  data?: any;
  getData?: any,
  pending?: any,
  success?: any,
  createData?: any;
  updateData?: any;
  deleteData?: any;
  refreshPage?: any,
  keyTranlate?: any,
}
export interface IDefautState {
  isOpenAddModal?: any;
  setIsOpenAddModal?: any;
  selectedConfig?: any;
  setSelectedConfig?: any;
  setIsOpenEditModal?: any;
  isOpenEditModal?: any;
  strSearch?: any;
  setStrSearch?: any;

}
const MuiVirtualizedTable: React.PureComponent = props => {
  const { classes, columns, ...tableProps } = props;

  const cellRenderer = ({ cellData, columnIndex }) => {
    const { rowHeight, onRowClick } = props;
    return (
      <TableCell
        component="div"
        // className={clsx(classes.tableCell, classes.flexContainer, {
        //   [classes.noClick]: onRowClick == null,
        // })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  const headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = props;

    return (
      <TableCell
        component="div"
        // className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };
  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table height={height} width={width} {...tableProps} rowClassName={this.getRowClassName}>
          {columns.map(({ dataKey, ...other }, index) => {
            return (
              <Column
                key={dataKey}
                headerRenderer={headerProps =>
                  this.headerRenderer({
                    ...headerProps,
                    columnIndex: index,
                  })
                }
                className={classes.flexContainer}
                cellRenderer={this.cellRenderer}
                dataKey={dataKey}
                {...other}
              />
            );
          })}
        </Table>
      )}
    </AutoSizer>
  );

}
const WapperComponent: React.FC<IDefautProps, IDefautState> = props => {
  const {
    getData,
    classes,
    data,
    deleteData,
    createData,
    updateData,
    pending = false,
    success,
    refreshPage,
    keyTranlate } = props;

  const configs = data.data || [];
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [strSearch, setStrSearch] = useState(null);

  // =====Search
  let searchTimeout = null;

  const onChangeSearch = e => {
    const value = e.target.value;
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(() => {
      setStrSearch(value);
    }, 500);
  };
  //===Filter Data
  const configData = filter(configs, config => {
    if (isEmpty(strSearch)) {
      return true;
    }
    const strToSearch = config.name.toLowerCase();
    return strToSearch.indexOf(strSearch.toLowerCase()) + 1;
  });

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
                onChange={onChangeSearch}
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
          <TableBody className={classes.tableConfig}>
            {configData.map(config => (
              <TableRow
                key={config.name}
                className={classes.selectRow}
                onClick={() => {
                  setSelectedConfig(config);
                  setIsOpenEditModal(true);
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableItem}
                >
                  {config.name}
                </TableCell>
                <TableCell align="right" className={classes.tableItem}>
                  {config.cron_trigger}
                </TableCell>
                <TableCell align="right" className={classes.tableItem}>
                  {config.version}
                </TableCell>
                <TableCell align="right" className={classes.tableItem}>
                  <IconButton
                    aria-label="Delete"
                    onClick={e => {
                      e.stopPropagation();
                      deleteData(config);
                    }}
                    disabled={pending}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {pending ?
                    <div className={classes.iconProgress}>
                      <CircularProgress
                        color="secondary"
                        size={40}
                      />
                    </div>
                    :
                    ""
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AddDialog
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        selectedList={selectedConfig}
        setSelectedList={setSelectedConfig}
        createData={createData}
        pending={pending}
        success={success}
        refreshPage={refreshPage}
      />

      <EditDialog
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
        config={selectedConfig}
        setConfig={setSelectedConfig}
        selectedList={selectedConfig}
        setSelectedList={setSelectedConfig}
        updateData={updateData}
        pending={pending}
        success={success}
        refreshPage={refreshPage}
      />
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(WapperComponent);
