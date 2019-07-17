import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { CardText } from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import _projectActions from '../action_creators/io_project_import_action_creators';
import { uploadFile } from '../../../../../utils/common/file_io';
import ioExportAction from '../action_creators/io_export_action_creators';
import InfoConfigurations from '../components/info_configurations';
import SelectProject from '../components/select_project';
import importActionCreater from '../action_creators/io_import_action_creators';
import fieldListAction from '../../field_value_definitions/actions/field_list_action'
import layoutListAction from '../../detail_sources/action/index'



class ImportConfigurations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    componentWillMount() {
        const { importActions, io_configurations_import, projects } = this.props;
        const info = { io_configurations_import, projectId: projects.projectId };
        importActions.fetchCountIfNeeded(info);
    }
    componentWillReceiveProps(nextProps) {
        const { importActions, io_configurations_import, projects } = nextProps;
        const info = { io_configurations_import, projectId: projects.projectId };
        importActions.fetchCountIfNeeded(info);
    }
    componentWillUnmount() {
        const { infoCountActions, importActions } = this.props;
        // infoCountActions.reset();
        importActions.reset();
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleChange = (event, index, value) => this.setState({ value });

    handleUploadFile = () => {
        const { importActions } = this.props;
        uploadFile('.json',(file) => {
            let fileJson = {
                file:file.file, 
                data:JSON.parse(file.data)
            }
            importActions.importDataFile(fileJson)
        })
    }
    handleChangeProjectSource = () => {
        const { importActions, io_configurations_import } = this.props;
        importActions.selectSourceForm(io_configurations_import.sourceKey === 'project' ? '' : 'project')
    }
    handleChangeFileSource = () => {
        const { importActions, io_configurations_import } = this.props;
        importActions.selectSourceForm(io_configurations_import.sourceKey === 'file' ? '' : 'file')
    }
    render() {
        const { projects,layoutListActions, projectsActions,fieldListActions, importActions, infoCountActions, io_configurations_import, io_configurations_export } = this.props;

        let infoConfig = {}
        switch (io_configurations_import.sourceKey) {
            case 'project':
                infoConfig = io_configurations_import.count || {};
                break;
            case 'file':
                infoConfig = io_configurations_import.dataFile.data || {}
                break;
            default:
                break;
        }
        const actions = [
            <FlatButton
                label="Cancel"
                onClick={() => {
                    this.handleClose();
                    projectsActions.reset();
                    importActions.reset();
                }}
            />,
            <FlatButton
                label="Import"
                primary={true}
                disabled={io_configurations_import.importList.length <= 0 || !infoConfig.configurations}
                onClick={()=>{
                    let currentProjectId =this.props.io_configurations_export.count.project_id;
                    importActions.importConfig(currentProjectId, ()=> {
                        importActions.reset();
                        infoCountActions.reset();
                        layoutListActions.getListLayouts(currentProjectId);
                        fieldListActions.getList(currentProjectId);
                        this.handleClose();
                    })
                }}
            />,
        ];
        return (
            <div>
                <RaisedButton label={`Import configurations ${io_configurations_import.importList.length ? `(${io_configurations_import.importList.length})` : ''} `} onClick={this.handleOpen} />
                <Dialog
                    title="Import configurations"
                    actions={actions}
                    contentStyle={{ minHeight: 550 }}
                    modal={true}
                    open={this.state.open}
                >
                    <div style={{ minHeight: 350 }}>
                        <Subheader>From</Subheader>
                        <CardText>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: "center",
                                marginBottom: 0,
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                width: '100%'
                            }}>
                                <Checkbox
                                    style={{ width: '150px', marginTop: 5 }}
                                    checked={io_configurations_import.sourceKey === 'project'} label="Project" onClick={this.handleChangeProjectSource} />
                                <SelectProject projectsActions={projectsActions} projects={projects} />
                            </div>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: "center",
                                marginBottom: 0,
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                width: '100%'
                            }}>
                                <Checkbox
                                    style={{ width: '150px' }}
                                    checked={io_configurations_import.sourceKey === 'file'} label="Import file" onClick={this.handleChangeFileSource} />
                                {io_configurations_import.dataFile && io_configurations_import.dataFile.file ? io_configurations_import.dataFile.file.name : ''}
                                <FlatButton
                                    label="upload file"
                                    primary={true}
                                    disabled={io_configurations_import.sourceKey !== 'file'}
                                    onClick={this.handleUploadFile} />
                            </div>
                        </CardText>
                        <CardText>
                            <InfoConfigurations
                                isFile={io_configurations_import.sourceKey === 'file'}
                                selected={io_configurations_import.importList || []}
                                projectId={projects.projectId}
                                infoConfig={infoConfig || {}}
                                addSelecteConfiguration={importActions.addImportConfiguration}
                                removeSelectedConfiguration={importActions.removeImportConfiguration}
                            />
                        </CardText>
                    </div>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        io_configurations_export: state.project.io_configurations.io_configurations_export,
        io_configurations_import: state.project.io_configurations.io_configurations_import,
        projects: state.project.io_configurations.projects,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        importActions: bindActionCreators({ ...importActionCreater }, dispatch),
        projectsActions: bindActionCreators({ ..._projectActions }, dispatch),
        infoCountActions: bindActionCreators({ ...ioExportAction }, dispatch),
        fieldListActions: bindActionCreators({ ...fieldListAction }, dispatch),
        layoutListActions: bindActionCreators({ ...layoutListAction }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportConfigurations);
