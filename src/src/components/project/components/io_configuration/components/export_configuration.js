import React from 'react'
import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import { Translate } from 'react-redux-i18n';
import { IO_SUPPORT, IO_TITLE, IO_HIDDEN } from '../constants';
export const ExportConfiguration = (props) => {
    const { io_configurations_export, actions, projectId } = props;
    const selectAll = () => {
        let configNames = Object.keys(IO_SUPPORT).map(key => IO_SUPPORT[key]);
        actions.addExportConfiguration(configNames);
    }
    const getCheckList = (count, exportsConfig = []) => {
        let countInfo = (count && count.configurations) || {
            'field_value_definitions': 0,
            'layout_definitions': 0,
            'section_definitions': 0,
            'acquisitors': 0,
            'upload_configurations': 0,
            'project_workflow': 0,
            'response_evaluations': 0,
            'project_users': 0,
            'export_configurations': 0
        }
        let result = [];
        /***remove  */
        const getConfigsdependentOnThis = (configName) => {
            let relations = (count && count.relationship_configuration) || {};
            let dependThis = {};
            Object.keys(relations).forEach(key => {
                let depends = relations[key]
                if ((Array.isArray(depends) && depends.includes(configName)) || depends === configName) {
                    dependThis[key] = 1;
                    let dependsSub = getConfigsdependentOnThis(key);
                    dependsSub.forEach(subKey => {
                        dependThis[subKey] = 1;
                    })
                }
            })
            return Object.keys(dependThis);
        }
        /***add */
        const getThisdependentConfigs = (configName) => {
            let relations = (count && count.relationship_configuration) || {};
            let dependentsResult = {}
            let dependents = relations[configName];
            if (Array.isArray(dependents)) {
                dependents.forEach(key => {
                    dependentsResult[key] = 1;
                    let subDependents = getThisdependentConfigs(key);
                    subDependents.forEach(subKey => {
                        dependentsResult[subKey] = 1;
                    })
                })
            } else if (typeof dependents === 'string') {
                dependentsResult[dependents] = 1;
                let subDependents = getThisdependentConfigs(dependents);
                subDependents.forEach(subKey => {
                    dependentsResult[subKey] = 1;
                })
            }
            return Object.keys(dependentsResult);
        }
        const onChangeCheckListItem = (event, isInputChecked, configName) => {
            if (isInputChecked) {
                let depends = getThisdependentConfigs(configName)
                if (depends.length) {
                    depends.forEach(key => {
                        actions.addExportConfiguration(key);
                    })
                }
                actions.addExportConfiguration(configName)
            } else {
                let depends = getConfigsdependentOnThis(configName)
                actions.removeExportConfiguration(configName)
                if (depends.length) {
                    depends.forEach(key => {
                        actions.removeExportConfiguration(key);
                    })
                }
            }
        }
        Object.keys(IO_SUPPORT).forEach(key => {
            if (!IO_HIDDEN.includes(IO_SUPPORT[key])) {
                result.push(<Checkbox
                    key={`export-${key}`}
                    label={<Translate value={IO_TITLE[IO_SUPPORT[key]]} count={countInfo[IO_SUPPORT[key]]} />}
                    checked={exportsConfig.includes(IO_SUPPORT[key])}
                    style={{
                        marginBottom: 16,
                    }}
                    onCheck={(event, isInputChecked) => onChangeCheckListItem(event, isInputChecked, IO_SUPPORT[key])}
                />)
            }
        })
        return result;
    }
    const onGetExportData = () => {
        actions.getExportConfigurations({ io_configurations_export, projectId })
    }
    let infoShort = (io_configurations_export.count && io_configurations_export.count.configurations) || {
        'field_value_definitions': 0,
        'layout_definitions': 0,
        'section_definitions': 0,
        'acquisitors': 0,
        'upload_configurations': 0,
        'project_workflow': 0,
        'response_evaluations': 0,
        'project_users': 0,
        'export_configurations': 0
    }
    
    return (
        <Card>
            <CardTitle
                actAsExpander={true}
                showExpandableButton={true}
                title="Export project's configurations"
                subtitle={`
                 ${infoShort.layout_definitions} Forms;
                 ${infoShort.field_value_definitions} Fields;
                 ${infoShort.acquisitors} Acquisitions
                 ${infoShort.upload_configurations} Upload Configuration;
                 ${infoShort.upload_configurations} Upload Configuration;
                 ${infoShort.project_workflow} Workflow;
                 ${infoShort.response_evaluations} Response evaluations;
                 ${infoShort.project_users} Project's users;
                 ${infoShort.export_configurations} Export configurations
                 `}
            />
            <CardText
                style={{ wordBreak: "break-all", marginTop: '-15px' }}
                expandable={true}>
                <CardText style={{ padding: '2px' }}>
                    {getCheckList(io_configurations_export.count, io_configurations_export.exportList)}
                </CardText>
            </CardText>
            <CardActions>
                <RaisedButton
                    labelStyle={{ paddingLeft: '4px' }}
                    label="select all "
                    labelPosition="before"
                    primary={true}
                    onClick={selectAll}
                >
                </RaisedButton>
                <RaisedButton
                    disabled={io_configurations_export.isFetchingExport}
                    labelStyle={{ paddingLeft: '4px' }}
                    label={io_configurations_export.isFetchingExport?"Exporting ...": `export ${io_configurations_export.exportList.length?`(${io_configurations_export.exportList.length})`:''}`}
                    labelPosition="before"
                    primary={true}
                    onClick={onGetExportData}
                >
                </RaisedButton>
            </CardActions>

        </Card>
    )
}

export default ExportConfiguration;