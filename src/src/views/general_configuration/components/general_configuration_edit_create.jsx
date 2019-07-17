import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
} from '@material-ui/core';
import {
    getDataObject,
} from '@dgtx/coreui'
import * as constant from '../../../store/actions/general_configuration';
import {
    FunctionRender,
    RenderField,

} from '@dgtx/core-component-ui'
import { isArray, isEmpty, isEqual } from 'lodash'
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { I18n, Translate } from 'react-redux-i18n';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classNames from "classnames";
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
        },
        paddingItem: {
            padding: theme.spacing.unit,
        },
        refreshPage: {
            display: "flex",
            alignItems: "center"
        },
        refreshPageText: {
            margin: "0 auto",
            color: theme.palette.error.main,
            fontSize: "x-large"
        }

    }
}
export interface IDefautProps {
    classes?: any,
    theme?: any,
    key?: any,
    projectId: any, 
    structures?: any,
    mondifyData?: any,
    unmount?: any, 
    getData?: any,
    keyTranslate?: any,
    dataItem?: any, 
    refreshPage?: any,
}
class GeneralConfigurationEditCreate extends React.Component<IDefautProps, any> {
    state = {
        dataForm: {},
        open: false,
        item: {},
        field: {}
    }
    handleBlur = (input: any) => {
        // const {value, level, fieldKey, fieldParent, fieldParent2} = input;
        return null;
    }

    handleChange = (input: any) => {
        // const {value, level, fieldKey, fieldParent, fieldParent2} = input;
        const { mondifyData = () => null } = this.props;
        mondifyData(input)
    }

    handleKeyDown = (input: any) => {
        // const {key_code, level, fieldKey, fieldParent, fieldParent2} = input;
        return null;
    }

    componentWillMount = () => {
        const { dataItem } = this.props;
        this.setState({ dataForm: dataItem });
    }

    componentWillReceiveProps = (nextProps: any) => {
        if (!isEqual(nextProps.dataItem, this.state.dataForm)) {
            this.setState({ dataForm: nextProps.dataItem });
        }
    }

    componentWillUnmount = () => {
        const { unmount = () => null } = this.props;
        unmount()
    }

    handleClickItemCheckboxList = (item?: any, open?: any, field?: any) => {
        if (open) {
            this.setState({ open: true, item, field })
        }
    }

    handlCloseDialog = () => {
        this.setState({ open: false, item: {}, field: {} })
    }

    handleGetData = () => {
        const { getData = () => null,   projectId, } = this.props;
        getData(projectId);
    }
    
    render() {
        const { classes, structures, keyTranslate,refreshPage } = this.props;
        const { dataForm, item, open, field } = this.state;
        const intputRenderDialog = {
            data: item, open, field,
            keyTranslate: constant.KEY_TRANSLATE,
            onclose: this.handlCloseDialog
        }
        if(refreshPage){
            return (
                <div className={classNames(classes.root, classes.refreshPage)}>
                    {renderRefreshPage(this.handleGetData, classes, keyTranslate)}
                </div>
            )
        }
        return (
            <div className={classes.root}>
                <Grid
                    container={true}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={0}
                    className={classes.container}
                >
                    {!isEmpty(dataForm) ?
                        <Grid item={true} xl={12} lg={12} md={12} sm={12} xs={12} className={classes.paddingItem} >
                            {Object.keys(structures).map((fieldKey: any, index: any) => {
                                const input: any = {
                                    fieldKey,
                                    structures,
                                    dataGeneral: dataForm,
                                    keyTranslate,
                                }
                                const outPut: any = FunctionRender.getItemByStructure(input);
                                if (isArray(outPut)) {
                                    return (outPut.map((item: any, index: any) => {
                                        return (item.data.map((item2: any, ) => {
                                            if (item[`level`] === "3") {
                                                return (item2.map((item3: any, index3: any, ) => {
                                                    const input: any = {
                                                        ...item3,
                                                        level: item.level,
                                                        keyTranslate: item.keyTranslate,
                                                        fieldParent: item.fieldParent,
                                                        fieldParent2: item.fieldParent2,
                                                    }
                                                    return (<RenderField
                                                        key={`${item3.fieldKey}-${index3}`}
                                                        input={input}
                                                        onChange={this.handleChange}
                                                        onKeyDown={this.handleKeyDown}
                                                        onBlur={this.handleBlur}
                                                        onClickItemCheckBoxList={this.handleClickItemCheckboxList}
                                                    />)
                                                })
                                                )
                                            }
                                            else {
                                                const input: any = {
                                                    ...item2,
                                                    level: item.level,
                                                    keyTranslate: item.keyTranslate,
                                                    fieldParent: item.fieldParent,
                                                    fieldParent2: item.fieldParent2,
                                                }
                                                return (<RenderField
                                                    key={`${item2.fieldKey}-${index}`}
                                                    input={input}
                                                    onChange={this.handleChange}
                                                    onKeyDown={this.handleKeyDown}
                                                    onBlur={this.handleBlur}
                                                    onClickItemCheckBoxList={this.handleClickItemCheckboxList}
                                                />)
                                            }
                                        }))
                                    }))
                                }
                                else {
                                    const inputOneField: any = {
                                        ...outPut.data,
                                        level: outPut.level,
                                        keyTranslate: outPut.keyTranslate,
                                    }
                                    return (<RenderField
                                        key={`fieldKey-${index}`}
                                        input={inputOneField}
                                        onChange={this.handleChange}
                                        onKeyDown={this.handleKeyDown}
                                        onBlur={this.handleBlur}
                                        onClickItemCheckBoxList={this.handleClickItemCheckboxList}
                                    />)
                                }
                            })}
                            {renderDialog(intputRenderDialog)}
                        </Grid>
                        :
                        <Grid item={true} xl={12} lg={12} md={12} sm={12} xs={12} className={classes.paddingItem}>
                          {""}
                        </Grid>
                    }
                </Grid>

            </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(GeneralConfigurationEditCreate);

const renderDialog = (input: any) => {
    const { data, open, field, keyTranslate, onclose = () => null } = input
    const name = getDataObject("input.fieldKey", field);
    if (name) {
        return (
            <Dialog open={open} onClose={onclose}>
                <React.Fragment>
                    <DialogTitle style={{paddingBottom: '0px'}}>
                        <Typography variant="h5" gutterBottom={true}>
                            <Translate value={`${keyTranslate}.information_item`} name={I18n.t(`${keyTranslate}.${name}`).toLowerCase()} />
                        </Typography>
                    </DialogTitle>
                    <div style={{padding: '0px 8px 8px 8px'}}>
                        <List>
                            {
                                Object.keys(data).map((item: any, index: any) => {
                                    return (
                                        <ListItem key={`${item.id}-${index}`}>
                                            <div style={{ display: 'flex' }}>
                                                <ListItemText primary={`${item.toUpperCase()}: `} style={{ maxWidth: '112px', width: "112px" }} />
                                                <ListItemText primary={data[`${item}`]} />
                                            </div>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </div>
                </React.Fragment>
            </Dialog>
        )
    }
    return "";
}

const renderRefreshPage = (getData:any, classes:any, keyTranslate:any) => {
    return (
        <div className={classes.refreshPageText}>
            <Translate value={`${keyTranslate}.inform_get_data_error`}/>
            <Button color="primary" onClick={getData}>
                {I18n.t(`${keyTranslate}.button_name_get_data_error`)}
            </Button>
        </div>
    )
}