import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import * as constants from '../../../store/actions/general_configuration'
import { Translate } from 'react-redux-i18n';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {isEmpty} from 'lodash';
const styles: any = (theme: any) => {
    return {
        root: {
            width: "100vw",
            maxWidth: "100%",
            height: "100vh",
            maxHeight: `calc(100vh - ${theme.spacing.unit * 13}px)`,
            overflow: "auto",
            boxShadow: theme.overrides.shadowsHover_1,
            background: theme.palette.common.white,
        },
        container: {
            width: "100vw",
            maxWidth: "100%",
            position: "relative",
            padding: theme.spacing.unit,
            flexDirection: "column",
            display: "flex",
        },
        item: {
            border: "0",
            height: `${theme.spacing.unit * 7}px`,
            margin: `${theme.spacing.unit * 2}px 0px 0px 0px`,
            borderRadius: `${theme.spacing.unit * 4}px`,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            wordWrap: "break-word",
            fontSize: ".875rem",
            // background: 'linear-gradient(45deg, #3f51b5 30%, #fff 90%)',
            boxShadow: theme.overrides.shadowsHover_1,
            background: theme.overrides.backgroundHover_1,
            // boxShadow: theme.overrides.shadowsHoverPri_1,
            // background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.common.white} 90%)`,
            color: theme.overrides.colorHover_1,
            "&:hover": {
                boxShadow: theme.overrides.shadowsHover_1,
                background: theme.overrides.backgroundHover_1,
                color: theme.overrides.colorHover_1,
                fontWeight: "bold",
            }
        },
        itemFocused: {
            // boxShadow: theme.overrides.shadowsHover_1,
            // background: theme.overrides.backgroundHover_1,
            boxShadow: theme.overrides.shadowsHoverPri_1,
            background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.common.white} 90%)`,
            fontWeight: "bold",
            color: `${theme.palette.primary.contrastText} !important`,
        },
        iconDelete: {
            position: "absolute",
            zIndex: 100,
            top: "0px",
            right: "0px",
            "&:hover": {
                color: theme.palette.error[`${theme.palette.type}`],
            }
        },
        text: {
            fontSize: "20px",
            fontWeight: "300",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            lineHeight: `${theme.spacing.unit * 7}px`,
            paddingLeft: theme.spacing.unit * 2,
            borderRadius: `${theme.spacing.unit * 4}px`,
            // color: theme.overrides.colorHover_1,
            color: `${theme.overrides.colorHover_1}`,
            "&:hover": {
                boxShadow: theme.overrides.shadowsHover_1,
                background: theme.overrides.backgroundHover_1,
                color: theme.overrides.colorHover_1,

                fontWeight: "bold",
            }
        },
        rootTitle: {
            position: "relative",
            height: `${theme.spacing.unit * 7}px`,
            display: "flex",
            lineHeight: `${theme.spacing.unit * 7}px`,
        },
        titleContainer: {
            flexGrow: 3,
            padding: theme.spacing.unit
        },
        titleName: {
            lineHeight: "56px",
            textAlign: "center",
        },
        hoverIconTitle: {
            color: theme.palette.primary.contrastText,
            "&:hover": {
                boxShadow: theme.overrides.shadowsHover_1,
                background: theme.overrides.backgroundHover_1,
                color: theme.overrides.colorHover_1,
                fontWeight: "bold",
            }
        },
        titleIcon: {
            margin: "8px",
            position: "relative",
            display: "flex",
        },
        button: {
            display: "flex",
            position: "relative",
            top: '0px',
            right: "0px"
        },
        iconProgress: {
            position: "absolute",
            padding: `${theme.spacing.unit}px`,
            color: theme.palette.primary.contrastText,
            top: '0px',
            right: "0px"
        },
        iconButton: {
            position: "absolute",
            top: '0px',
            right: "0px"
        },
        titleIconContainer: {
            position: "relative",
            flexGrow: 1
        },
        titleIconAdd: {
            position: "absolute",
            top: '0px',
            right: "64px",
            padding: `${theme.spacing.unit}px 0px ${theme.spacing.unit}px ${theme.spacing.unit}px`,
        },
        titleIconUpdate: {
            position: "absolute",
            top: '0px',
            right: "0px",
            padding: `${theme.spacing.unit}px 0px ${theme.spacing.unit}px ${theme.spacing.unit}px`,
        }
    }
}
export interface IDefautProps {
    classes?: any,
    theme?: any,
    key?: any,
    edit?: any,
    datas?: any,
    clickItem?: any,
    clickUpdate?: any,
    clickAdd?: any,
    clickDelete?: any,
    idSelected?: any,
    pending?: any,
    success?: any,
    projectId?: any,  
    refreshPage?: any, 
    projectName?: any, 
}
class GeneralConfigurationList extends React.Component<IDefautProps> {
    state = {
        open: false,
        item: {}
    }
    handleClickItem = (item: any, type?: any) => () => {
        const { clickItem = () => null } = this.props;
        if (type === "clickItem") {
            if (item) {
                clickItem(item);
            }
        }
    }

    handleClickUpdate = () => {
        const { clickUpdate = () => null} = this.props;
        clickUpdate();
    }

    handleClickAdd = () => {
        const { clickAdd = () => null, projectId, projectName } = this.props;
        clickAdd(projectId, projectName);
    }

    handleClickDelete = (itemNext?: any, type?: any) => () => {
        const { clickDelete = () => null} = this.props;
        const { item } = this.state;
        switch (type) {
            case "delete":
                if (itemNext) {
                    this.setState({ item: itemNext, open: true })
                }
                break;
            case "disagree":
                this.setState({ open: false, item: {} })
                break;
            case "agree":
                clickDelete(item)
                this.setState({ open: false, item: {} })
                break;
            default:
                break;
        }
    }

    handlCloseDialog = () => {
        this.setState({ open: false })
    }
    render() {
        const { classes, datas, idSelected, edit,
            pending = false,
            refreshPage
            // success
        } = this.props;
        const { open } = this.state;
        const inputDialog = {
            open,
            onclose: this.handlCloseDialog,
            onSubmit: this.handleClickDelete
        }
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <div className={classes.rootTitle}>
                        <div className={classes.titleContainer}>
                            <Typography variant={"h5"} className={classes.titleName}>
                                {!isEmpty(datas) ?
                                    <Translate value={`${constants.KEY_TRANSLATE}.list_file`} />
                                    :
                                    <Translate value={`${constants.KEY_TRANSLATE}.list_no_file`} />
                                }
                            </Typography>
                        </div>
                        {/* {!isEmpty(datas) && */}
                            <div className={classes.titleIconContainer}>
                                <div className={classes.titleIconAdd}>
                                    <div className={classes.button}>
                                        <div className={classNames(classes.iconButton, classes.iconTitleRight)}>
                                            <Tooltip title="Add new file" aria-label="Add new file" placement="left">
                                                <Fab
                                                    color="primary"
                                                    aria-label="AddConfig"
                                                    className={classes.hoverIconTitle}
                                                    onClick={this.handleClickAdd}
                                                    disabled={pending ? pending : refreshPage}
                                                >
                                                    <Add fontSize="large" />
                                                </Fab>
                                            </Tooltip>
                                        </div>
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
                                    </div>
                                </div>

                                <div className={classes.titleIconUpdate}>
                                    <div className={classes.button}>
                                        <div className={classNames(classes.iconButton)}>
                                            <Tooltip title="Update file" aria-label="Update file" placement="right">
                                                <Fab
                                                    color="secondary"
                                                    aria-label="EditConfig"
                                                    className={classes.hoverIconTitle}
                                                    onClick={this.handleClickUpdate}
                                                    disabled={edit ? edit : pending}
                                                >
                                                    <Edit fontSize="large" />
                                                </Fab>
                                            </Tooltip>
                                        </div>
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
                                    </div>
                                </div>
                            </div>
                        {/* } */}
                    </div>
                    {!isEmpty(datas) ? datas.map((item: any, index: any) => {
                        return <div className={item[`${constants.FIELD_ID}`] === idSelected ? classNames(classes.item, classes.itemFocused) : classes.item}
                            key={`GeneralConfigurationList${index}`}
                        >
                            <div
                                className={item[`${constants.FIELD_ID}`] === idSelected ? classNames(classes.text, classes.itemFocused) : classes.text}
                                // className={classes.text} 
                                onClick={this.handleClickItem(item, "clickItem")}>{item.name}</div>
                            <div className={classes.iconDelete}>
                                <div className={classes.button}>
                                    <div className={classes.iconButton}>
                                        <Tooltip title="Delete file" aria-label="Delete file" placement="right">
                                            <Fab
                                                color="secondary"
                                                aria-label="deleteConfig"
                                                onClick={this.handleClickDelete(item, "delete")}
                                                disabled={pending}
                                                className={classes.hoverIconTitle}
                                            >
                                                <Delete
                                                    fontSize="large"
                                                />
                                            </Fab>
                                        </Tooltip>

                                    </div>
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
                                </div>
                            </div>
                        </div>
                    }) : ""}
                </div>
                {renderDialog(inputDialog)}
            </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(GeneralConfigurationList);

const renderDialog = (input: any) => {
    const { open, onclose = () => null, onSubmit = () => () => null } = input
    return (
        <Dialog open={open} onClose={onclose}>
            <React.Fragment>
                <DialogTitle style={{ paddingBottom: '0px' }}>
                    <Typography variant="h5" gutterBottom={true}>
                        <Translate value={`${constants.KEY_TRANSLATE}.title_delete`} />
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        <Translate value={`${constants.KEY_TRANSLATE}.inform_message_delete`} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onSubmit(null, "disagree", null)} color="primary">
                        <Translate value={`${constants.KEY_TRANSLATE}.disagree`} />
                    </Button>
                    <Button onClick={onSubmit(null, "agree", null)} color="primary">
                        <Translate value={`${constants.KEY_TRANSLATE}.agree`} />
                    </Button>
                </DialogActions>
            </React.Fragment>
        </Dialog>
    )
}