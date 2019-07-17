import * as  React from 'react'
import { I18n } from 'react-redux-i18n'
import { getDataObject } from '@dgtx/coreui'
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router'
import IconBuild from '@material-ui/icons/Build'
import IconFull from '@material-ui/icons/Fullscreen'
import IconFullExit from '@material-ui/icons/FullscreenExit'
import Tooltip from '@material-ui/core/Tooltip';



//stylesheet
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import {
    Paper,
    TextField,
    IconButton,
    Divider
} from '@material-ui/core'
import {
    Folder,
    FolderOpen
} from '@material-ui/icons'

import { TextSearch } from '../textFieldCustom'
import ProjectFunctions from './ProjectFunctionAssigned'
import { DialogConfirm } from './dialogConfirm'
import DialogManager from './DialogManager'
import ProjectEditer from './ProjectEditer'
import BreadCrumd from './BreadCrumd'
import ProjectList from './ProjectList'
import ListGroup from './ListGroup'


const styles = (theme) => {
    return {
        wrapper: {
            height: 'calc(100vh)',
            width: 'calc(100vw)',
            overflow: 'hidden',
            // background: 'rgb(63, 81, 181)',
        },
        content: {
            // background:'red',
            marginTop: 64,
            height: 'calc(100% - 64px)',
            width: 'calc(100%)',
            display: 'flex',
            minWidth: "680px",
            minHeight: "680px",
            flexDirection: 'row',
            flexGrow: 1,
            padding: 0,
        },
        groupList: {
            height: 'calc(100%) ',
            minWidth: '320px',
            width: '25%',
            // background: 'green',//'rgba(255,255,255,0.4)'
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            boxSizing: 'border-box',
            // boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
            borderRadius: '0px',
        },
        subview: {
            height: 'calc(100%)',
            width: '100%',
            overflow: 'hidden',
            minWidth: "680px",
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            padding: 0,
        },
        subviewHeader: {

        },
        subview_content: {
            height: 'calc(100% - 120px)',
            marginTop: 0,
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            minWidth: "680px"
        },
        project_list: {
            height: '100%',
            minWidth: '450px',
            marginLeft: 8,
            width: '35%',
            overflowY: 'auto',
            background: 'rgba(255,255,255,0.4)',
            borderRight: '1px solid rgba(0,0,0,0.1)'
        }
    }
}


const Dashboard = (props) => {
    const {
        group_id = '',
        groups = [],
        users = {},
        project_id = '',
        projects = [],
        resources,
        muiTheme,
        project_guide,
        changeGroup,
        changeProject = () => null,
        changeGroupName,
        changeProjectName,
        changeGroupNameForProject,
        showCreateGroup,
        showCreateProject,
        showEditGroup,
        showEditProject,
        onSubmit,
        changeData,
        hideDialog,
        showDialogConfirm,
        onCancelConfirm,
        onSubmitConfirm,
        onClickFunc,
        checkProjectEdit,
        dashboard = {},
        toggerSiderbar,
        classes,
        functions,
        listColumnsSortDefault
    } = props;
    let project = projects.filter(item => project_id === item.id)[0] || {};
    let breakCrumd = getDataObject('data.group_data.address', dashboard) || [];
    let _projectName = getDataObject('data.projectName', dashboard);
    let dialogConfirm = getDataObject('data.dialogConfirm', dashboard) || {};
    let showGroup = getDataObject('data.showGroup', dashboard);
    const handleChange = type => (id, data) => {
        let isEditing = checkProjectEdit(project, dashboard)
        if (isEditing) {
            if (type === 'project') {
                showDialogConfirm({
                    type: 'edit_project',
                    show: true,
                    projectTo: id
                })
            } else {
                showDialogConfirm({
                    type: 'edit_project',
                    show: true,
                    groupTo: id,
                    groupData: data,
                })
            }
        } else {
            if (type === 'project') {
                changeProject(id)
            } else {
                changeGroup(id, data)

            }
        }

    }
    let withProject = project_id ? !showGroup ? 'calc(55% - 8px)' : 'calc(45% - 8px)' : 'calc(100% - 8px)',
        withDetail = !showGroup ? '45%' : '55%';

    return (
        <div className={classnames(classes.wrapper)}  >
            <div className={classnames(classes.content)}  >
                <DialogConfirm
                    open={dialogConfirm.show}
                    type={dialogConfirm.type}
                    onCancel={onCancelConfirm}
                    onSubmit={e => onSubmitConfirm(dialogConfirm)}
                />
                {showGroup &&
                    <div className={classnames(classes.groupList)}>
                        <ListGroup
                            items={groups}
                            itemId={group_id}
                            changeGroupName={changeGroupName}
                            onChange={handleChange('group')}
                            onCreateProject={showCreateProject}
                            onCreateGroup={showCreateGroup}
                        />
                    </div>
                }
                <div className={classnames(classes.subview)}>
                    <div className={classnames(classes.subviewHeader)}>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            display: 'flex',
                            paddingRight: '16px',
                        }}>

                            <TextSearch
                                value={getDataObject('data.projectName', dashboard)}
                                onChange={changeProjectName}

                            />

                            <div style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                margin: '0px',
                                paddingTop: '0px',
                                letterSpacing: '0px',
                                fontSize: '24px',
                                fontWeight: '400',
                                color: 'rgb(255, 255, 255)',
                                height: '64px',
                                lineHeight: '64px',
                                flex: '1 1 0%'
                            }}>
                            </div>
                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingRight: 8
                            }} >

                                <Tooltip title="Goto Pre-define page" placement="bottom">

                                    <Button variant="contained" className={classes.button} onClick={() => {
                                        props.history.push("/pre-defined");
                                    }} color="primary">
                                        <IconBuild></IconBuild>
                                        Pre-define
                                </Button>
                                </Tooltip>



                                <Tooltip title={showGroup ? 'Hidden Groups' : 'Show Group'} placement="bottom">
                                    <IconButton onClick={event => { toggerSiderbar(!showGroup) }}  >
                                        {showGroup ? <IconFull /> : <IconFullExit />}
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>

                         <BreadCrumd
                            // style ={{background:'red'}}
                            items={breakCrumd}
                            muiTheme={muiTheme}
                            onSelect={item => { changeGroup(item.id, { name: item.name }) }}
                            showCreateProject={showCreateProject}
                            onAction={action => { if (action === 'create_project') showCreateProject() }}/>

                    </div>
                    <Divider />

                    <div className={classnames(classes.subview_content)} >
                        <div className={classnames(classes.project_list, 'cool_scroll_smart')}
                            style={{ width: withProject }}
                        >
                            <ProjectList
                                project_id={project_id}
                                showGroup={showGroup}
                                listColumnsSortDefault={listColumnsSortDefault}
                                projectName={_projectName}
                                groupName={getDataObject('data.groupName', dashboard)}
                                resources={resources}
                                projects={projects}
                                project={projects.filter(item => project_id === item.id)[0] || {}}
                                changeProject={handleChange('project')}
                                dashboard={dashboard}
                                changeProjectName={changeProjectName}
                                showCreateProject={showCreateProject} />
                        </div>
                        {
                            project_id &&
                            (<div style={{
                                height: '100%',
                                minWidth: '420px',
                                width: withDetail,
                                background: 'rgba(255,255,255,0.4)',
                                position: 'relative'

                            }}>
                                {project_id &&
                                    <ProjectFunctions
                                        onClose={event => changeProject()}
                                        project={projects.filter(item => project_id === item.id)[0] || {}}
                                        functions={functions}
                                        onClickItem={onClickFunc}
                                    />
                                }
                            </div>)
                        }
                    </div>
                </div>
            </div>
            <DialogManager
                dialogType={getDataObject('data.dialogType', dashboard)}
                showDialog={getDataObject('data.showDialog', dashboard)}
                groups={groups}
                users={users}
                hideDialog={hideDialog}
                changeData={changeData}
                dashboard={dashboard}
                muiTheme={muiTheme}
                onSubmit={onSubmit}
            />
        </div >
    )
};


export default compose(
    withStyles(styles),
    withRouter
)(Dashboard);