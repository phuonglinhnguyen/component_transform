import React, { useState } from "react";
import { Translate } from "react-redux-i18n";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

import { getDataTranform } from "../../../providers/faKedata/tranform_configuration";
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
  const { classes, data, deleteData, createData, updateData } = props;

  const configs = data.data || [];
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [strSearch, setStrSearch] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [configs2, setConfigs] = useState(() => {
    return getDataTranform();
  });
  console.log("configs:", configs);
  const onAddConfig = () => {
    const config = {
      name: "DA_HOAI 7s",
      cron_trigger: "0/1000 * * * * ?",
      active: false,
      project_id: "5b9f49f8ea99f2002092b9cc",
      version: "0.0",
      filter: {
        collector: {
          doc_status: "301",
          batch_status: "",
          doc_set_status: ""
        },
        transform: {
          pattern: ""
        }
      },
      rules: {
        content: {
          wahrung: {
            value: "function(input){ return input;}",
            dataKey: "wahrung"
          },
          debitor_nr: {
            value: "function(input){ return input;}",
            dataKey: "debitor_nr"
          },
          rechnungsdatum: {
            value: "function(input){ return input;}",
            dataKey: "rechnungsdatum"
          },
          sachkonto_kto: {
            value: "function(input){ return input;}",
            dataKey: "sachkonto_kto"
          },
          note: {
            value: "function(input){ return input;}",
            dataKey: "note"
          },
          betriebsstellen_bst: {
            value: "function(input){ return input;}",
            dataKey: "betriebsstellen_bst"
          },
          lieferanten_name: {
            value: "function(input){ return input;}",
            dataKey: "lieferanten_name"
          },
          netto: {
            value: "function(input){ return input;}",
            dataKey: "netto"
          },
          kostenstelle_kst: {
            value: "function(input){ return input;}",
            dataKey: "kostenstelle_kst"
          },
          steuerbetrag: {
            value: "function(input){ return input;}",
            dataKey: "steuerbetrag"
          },
          brutto: {
            value: "function(input){ return input;}",
            dataKey: "brutto"
          },
          lieferanten_nr_bbn: {
            value: "function(input){ return input;}",
            dataKey: "lieferanten_nr_bbn"
          },
          abteilung_abt: {
            value: "function(input){ return input;}",
            dataKey: "abteilung_abt"
          },
          "mahnstufe ": {
            value: "function(input){ return input;}",
            dataKey: "mahnstufe "
          },
          auftragsbestell_nr: {
            value: "function(input){ return input;}",
            dataKey: "auftragsbestell_nr"
          },
          instructrion: {
            value: "function(input){ return input;}",
            dataKey: "instructrion"
          },
          land: {
            value: "function(input){ return input;}",
            dataKey: "land"
          },
          lieferschein_nr: {
            value: "function(input){ return input;}",
            dataKey: "lieferschein_nr"
          },
          debitor_name: {
            value: "function(input){ return input;}",
            dataKey: "debitor_name"
          },
          innenauftrag_ia: {
            value: "function(input){ return input;}",
            dataKey: "innenauftrag_ia"
          },
          "rechnungtype ": {
            value: "function(input){ return input;}",
            dataKey: "rechnungtype "
          },
          steuerstatz: {
            value: "function(input){ return input;}",
            dataKey: "steuerstatz"
          },
          rechnung_nr: {
            value: "function(input){ return input;}",
            dataKey: "rechnung_nr"
          },
          vertragsnr_fm: {
            value: "function(input){ return input;}",
            dataKey: "vertragsnr_fm"
          }
        }
      },
      dictionary: [
        {
          fieldKey: "lookup_Export_fieldA",
          database_type: "MongoDB",
          host: "sit-mgdb.digi-texx.vn",
          port: "27017",
          username: "",
          password: "",
          database_name: "phoenix",
          schema_name: "5c18695273ea2000234651f6_acquisition_item_management",
          query: {
            _id: "?"
          }
        }
      ]
    };
    createData(config);
  };
  const onDeleteConfig = () => {
    const config = {
      id: "5d1efb2da9d7d940985e75b4",
      name: "DA_HOAI 9",
      cron_trigger: "0/1000 * * * * ?",
      active: false,
      project_id: "5b9f49f8ea99f2002092b9cc",
      version: "0.0",
      filter: {
        collector: {
          doc_status: "301",
          batch_status: "",
          doc_set_status: ""
        },
        transform: {
          pattern: ""
        }
      },
      rules: {
        content: {
          wahrung: {
            value: "function(input){ return input;}",
            dataKey: "wahrung"
          },
          debitor_nr: {
            value: "function(input){ return input;}",
            dataKey: "debitor_nr"
          },
          rechnungsdatum: {
            value: "function(input){ return input;}",
            dataKey: "rechnungsdatum"
          },
          sachkonto_kto: {
            value: "function(input){ return input;}",
            dataKey: "sachkonto_kto"
          },
          note: {
            value: "function(input){ return input;}",
            dataKey: "note"
          },
          betriebsstellen_bst: {
            value: "function(input){ return input;}",
            dataKey: "betriebsstellen_bst"
          },
          lieferanten_name: {
            value: "function(input){ return input;}",
            dataKey: "lieferanten_name"
          },
          netto: {
            value: "function(input){ return input;}",
            dataKey: "netto"
          },
          kostenstelle_kst: {
            value: "function(input){ return input;}",
            dataKey: "kostenstelle_kst"
          },
          steuerbetrag: {
            value: "function(input){ return input;}",
            dataKey: "steuerbetrag"
          },
          brutto: {
            value: "function(input){ return input;}",
            dataKey: "brutto"
          },
          lieferanten_nr_bbn: {
            value: "function(input){ return input;}",
            dataKey: "lieferanten_nr_bbn"
          },
          abteilung_abt: {
            value: "function(input){ return input;}",
            dataKey: "abteilung_abt"
          },
          "mahnstufe ": {
            value: "function(input){ return input;}",
            dataKey: "mahnstufe "
          },
          auftragsbestell_nr: {
            value: "function(input){ return input;}",
            dataKey: "auftragsbestell_nr"
          },
          instructrion: {
            value: "function(input){ return input;}",
            dataKey: "instructrion"
          },
          land: {
            value: "function(input){ return input;}",
            dataKey: "land"
          },
          lieferschein_nr: {
            value: "function(input){ return input;}",
            dataKey: "lieferschein_nr"
          },
          debitor_name: {
            value: "function(input){ return input;}",
            dataKey: "debitor_name"
          },
          innenauftrag_ia: {
            value: "function(input){ return input;}",
            dataKey: "innenauftrag_ia"
          },
          "rechnungtype ": {
            value: "function(input){ return input;}",
            dataKey: "rechnungtype "
          },
          steuerstatz: {
            value: "function(input){ return input;}",
            dataKey: "steuerstatz"
          },
          rechnung_nr: {
            value: "function(input){ return input;}",
            dataKey: "rechnung_nr"
          },
          vertragsnr_fm: {
            value: "function(input){ return input;}",
            dataKey: "vertragsnr_fm"
          }
        }
      },
      dictionary: [
        {
          fieldKey: "lookup_Export_fieldA",
          database_type: "MongoDB",
          host: "sit-mgdb.digi-texx.vn",
          port: "27017",
          username: "",
          password: "",
          database_name: "phoenix",
          schema_name: "5c18695273ea2000234651f6_acquisition_item_management",
          query: {
            _id: "?"
          }
        }
      ]
    };
    deleteData(config);
  };
  const onUpdateConfig = () => {
    const config = {
      id: "5d2302cbf626f7001ede93c0",
      name: "DA_HOAI 10",
      cron_trigger: "0/1000 * * * * ?",
      active: false,
      project_id: "5b9f49f8ea99f2002092b9cc",
      version: "0.0",
      filter: {
        collector: {
          doc_status: "301",
          batch_status: "",
          doc_set_status: ""
        },
        transform: {
          pattern: ""
        }
      },
      rules: {
        content: {
          wahrung: {
            value: "function(input){ return input;}",
            dataKey: "wahrung"
          },
          debitor_nr: {
            value: "function(input){ return input;}",
            dataKey: "debitor_nr"
          },
          rechnungsdatum: {
            value: "function(input){ return input;}",
            dataKey: "rechnungsdatum"
          },
          sachkonto_kto: {
            value: "function(input){ return input;}",
            dataKey: "sachkonto_kto"
          },
          note: {
            value: "function(input){ return input;}",
            dataKey: "note"
          },
          betriebsstellen_bst: {
            value: "function(input){ return input;}",
            dataKey: "betriebsstellen_bst"
          },
          lieferanten_name: {
            value: "function(input){ return input;}",
            dataKey: "lieferanten_name"
          },
          netto: {
            value: "function(input){ return input;}",
            dataKey: "netto"
          },
          kostenstelle_kst: {
            value: "function(input){ return input;}",
            dataKey: "kostenstelle_kst"
          },
          steuerbetrag: {
            value: "function(input){ return input;}",
            dataKey: "steuerbetrag"
          },
          brutto: {
            value: "function(input){ return input;}",
            dataKey: "brutto"
          },
          lieferanten_nr_bbn: {
            value: "function(input){ return input;}",
            dataKey: "lieferanten_nr_bbn"
          },
          abteilung_abt: {
            value: "function(input){ return input;}",
            dataKey: "abteilung_abt"
          },
          "mahnstufe ": {
            value: "function(input){ return input;}",
            dataKey: "mahnstufe "
          },
          auftragsbestell_nr: {
            value: "function(input){ return input;}",
            dataKey: "auftragsbestell_nr"
          },
          instructrion: {
            value: "function(input){ return input;}",
            dataKey: "instructrion"
          },
          land: {
            value: "function(input){ return input;}",
            dataKey: "land"
          },
          lieferschein_nr: {
            value: "function(input){ return input;}",
            dataKey: "lieferschein_nr"
          },
          debitor_name: {
            value: "function(input){ return input;}",
            dataKey: "debitor_name"
          },
          innenauftrag_ia: {
            value: "function(input){ return input;}",
            dataKey: "innenauftrag_ia"
          },
          "rechnungtype ": {
            value: "function(input){ return input;}",
            dataKey: "rechnungtype "
          },
          steuerstatz: {
            value: "function(input){ return input;}",
            dataKey: "steuerstatz"
          },
          rechnung_nr: {
            value: "function(input){ return input;}",
            dataKey: "rechnung_nr"
          },
          vertragsnr_fm: {
            value: "function(input){ return input;}",
            dataKey: "vertragsnr_fm"
          }
        }
      },
      dictionary: [
        {
          fieldKey: "lookup_Export_fieldA",
          database_type: "MongoDB",
          host: "sit-mgdb.digi-texx.vn",
          port: "27017",
          username: "",
          password: "",
          database_name: "phoenix",
          schema_name: "5c18695273ea2000234651f6_acquisition_item_management",
          query: {
            _id: "?"
          }
        }
      ]
    };
    updateData(config);
  };
  return (
    <div className={classes.container}>
      <button onClick={onAddConfig}>add</button>
      <button onClick={onUpdateConfig}>update</button>
      <button onClick={onDeleteConfig}>delete</button>
    </div>
  );
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
  //==Rows Per Page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };
  //===Filter Data
  const configData = filter(configs, config => {
    if (isEmpty(strSearch)) {
      return true;
    }
    const strToSearch = config.name.toLowerCase();
    // console.log(strToSearch, strSearch);
    // console.log(strToSearch.indexOf(strSearch.toLowerCase()));
    return strToSearch.indexOf(strSearch.toLowerCase()) + 1;
  });

  //===Delete config
  const deleteConfig = (e, id) => {
    e.stopPropagation();
    deleteData({ id });
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
          <TableBody>
            {configData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(config => (
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
                        deleteConfig(e, config.id);
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
        count={configData.length}
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
      <AddDialog
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        configs={configs}
        setConfigs={setConfigs}
        selectedList={selectedConfig}
        setSelectedList={setSelectedConfig}
        createData={createData}
      />

      <EditDialog
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
        configs={configs}
        setConfigs={setConfigs}
        config={selectedConfig}
        setConfig={setSelectedConfig}
        selectedList={selectedConfig}
        setSelectedList={setSelectedConfig}
      />
    </React.Fragment>
  );
};
export default withStyles(styles, { withTheme: true })(WapperComponent);
